import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_BOOKINGS,
  INITIAL_REVIEWS,
  COVERAGE_ZONES
} from '../data/mockData';
import { apiService } from '../services/api';

const BookingContext = createContext(undefined);

export const BookingProvider = ({ children }) => {
  const [services, setServices] = useState(() => {
    const saved = localStorage.getItem('styledecor_services');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {}
    }
    return [];
  });

  const [decorators, setDecorators] = useState(() => {
    const saved = localStorage.getItem('styledecor_decorators');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {}
    }
    return [];
  });

  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem('styledecor_bookings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {}
    }
    return INITIAL_BOOKINGS;
  });

  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [coverageZones] = useState(COVERAGE_ZONES);
  const [isDataLoading, setIsDataLoading] = useState(true);

  // Sync state changes to localStorage
  useEffect(() => {
    localStorage.setItem('styledecor_services', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem('styledecor_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('styledecor_decorators', JSON.stringify(decorators));
  }, [decorators]);

  // Load live initial data from Vercel MongoDB Server on mount
  useEffect(() => {
    let isMounted = true;

    async function loadVercelData() {
      try {
        setIsDataLoading(true);

        const [remoteServices, remoteBookings, remoteDecorators, remoteReviews] = await Promise.all([
          apiService.getServices([]),
          apiService.getBookings([]),
          apiService.getDecorators([]),
          apiService.getReviews([])
        ]);

        if (isMounted) {
          if (remoteServices && remoteServices.length > 0) {
            setServices((prev) => {
              // Priority to remote DB services, plus any newly user-created local services
              const dbIds = new Set(remoteServices.map(s => s.id || s._id));
              const localCreated = prev.filter(s => (s.id && !dbIds.has(s.id)) && (!s._id || !dbIds.has(s._id)));
              return [...remoteServices, ...localCreated];
            });
          }
          if (remoteBookings && remoteBookings.length > 0) {
            setBookings((prev) => {
              const existingIds = new Set(prev.map(b => b.id || b._id));
              const newFromDb = remoteBookings.filter(b => !existingIds.has(b.id || b._id));
              return [...newFromDb, ...prev];
            });
          }
          if (remoteDecorators && remoteDecorators.length > 0) {
            setDecorators(remoteDecorators);
          }
          if (remoteReviews && remoteReviews.length > 0) {
            setReviews(remoteReviews);
          }
        }
      } catch (error) {
        console.warn('Vercel API sync notice:', error.message);
      } finally {
        if (isMounted) setIsDataLoading(false);
      }
    }

    loadVercelData();

    return () => {
      isMounted = false;
    };
  }, []);

  const addBooking = async (bookingData) => {
    const newBookingId = `BK-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date().toISOString();
    
    let decId = bookingData.decoratorId;
    let decName = bookingData.decoratorName;
    if (!decId && decorators.length > 0) {
      const availableDec = decorators.find((d) => d.available) || decorators[0];
      decId = availableDec.id;
      decName = availableDec.name;
    }

    const newBooking = {
      ...bookingData,
      id: newBookingId,
      createdAt: now,
      decoratorId: decId,
      decoratorName: decName,
      statusHistory: [
        {
          status: 'Assigned',
          timestamp: now,
          note: `Booking created and assigned to ${decName || 'Design Team'}.`
        }
      ]
    };

    setBookings((prev) => [newBooking, ...prev]);

    // Send async payload to Vercel DB
    apiService.addBooking(newBooking).catch((err) => console.warn('Vercel DB post error:', err));
    
    return newBooking;
  };

  const updateBookingStatus = async (bookingId, newStatus, note) => {
    const now = new Date().toISOString();
    let updatedBooking = null;

    setBookings((prev) =>
      prev.map((b) => {
        if (b.id === bookingId) {
          updatedBooking = {
            ...b,
            status: newStatus,
            statusHistory: [
              ...(b.statusHistory || []),
              {
                status: newStatus,
                timestamp: now,
                note: note || `Status updated to ${newStatus}.`
              }
            ]
          };
          return updatedBooking;
        }
        return b;
      })
    );

    if (updatedBooking) {
      apiService.updateBooking(bookingId, updatedBooking).catch((err) => console.warn('Vercel DB put error:', err));
    }
  };

  const assignDecorator = async (bookingId, decoratorId) => {
    const decorator = decorators.find((d) => d.id === decoratorId);
    if (!decorator) return;

    let updatedBooking = null;

    setBookings((prev) =>
      prev.map((b) => {
        if (b.id === bookingId) {
          updatedBooking = {
            ...b,
            decoratorId: decorator.id,
            decoratorName: decorator.name,
            statusHistory: [
              ...(b.statusHistory || []),
              {
                status: b.status,
                timestamp: new Date().toISOString(),
                note: `Reassigned to ${decorator.name} (${decorator.role}).`
              }
            ]
          };
          return updatedBooking;
        }
        return b;
      })
    );

    if (updatedBooking) {
      apiService.updateBooking(bookingId, updatedBooking).catch((err) => console.warn('Vercel DB put error:', err));
    }
  };

  const cancelBooking = (bookingId) => {
    setBookings((prev) => prev.filter((b) => b.id !== bookingId));
  };

  const addService = async (newServiceData) => {
    const newService = {
      ...newServiceData,
      id: `srv-${Date.now()}`,
      rating: 5.0,
      reviewCount: 0
    };
    setServices((prev) => [newService, ...prev]);

    // Persist to Vercel DB
    apiService.addService(newService).catch((err) => console.warn('Vercel DB post error:', err));
  };

  const updateService = (serviceId, updatedData) => {
    setServices((prev) => prev.map((s) => (s.id === serviceId ? { ...s, ...updatedData } : s)));
  };

  const addDecorator = async (newDecoratorData) => {
    const newDec = {
      ...newDecoratorData,
      id: `dec-${Date.now()}`,
      rating: 5.0,
      completedProjects: 0
    };
    setDecorators((prev) => [...prev, newDec]);

    apiService.addDecorator(newDec).catch((err) => console.warn('Vercel DB post error:', err));
  };

  const addReview = async (newReviewData) => {
    const newRev = {
      ...newReviewData,
      id: `rev-${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    };
    setReviews((prev) => [newRev, ...prev]);

    apiService.addReview(newRev).catch((err) => console.warn('Vercel DB post error:', err));
  };

  const getServiceById = (id) => services.find((s) => s.id === id);
  const getBookingById = (id) => bookings.find((b) => b.id === id);

  return (
    <BookingContext.Provider
      value={{
        services,
        decorators,
        bookings,
        reviews,
        coverageZones,
        isDataLoading,
        addBooking,
        updateBookingStatus,
        assignDecorator,
        cancelBooking,
        addService,
        updateService,
        addDecorator,
        addReview,
        getServiceById,
        getBookingById
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
