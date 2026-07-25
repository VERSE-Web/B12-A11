import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, Sparkles, User, Mail, MessageSquare, CheckCircle } from 'lucide-react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { useAuth } from '../../context/AuthContext';
import { useBooking } from '../../context/BookingContext';

export const BookingModal = ({ isOpen, onClose, selectedService }) => {
  const { user } = useAuth();
  const { addBooking } = useBooking();
  const navigate = useNavigate();

  const [serviceType, setServiceType] = useState('On-Site Decoration');
  const [date, setDate] = useState('2026-08-20');
  const [time, setTime] = useState('14:00');
  const [location, setLocation] = useState(user?.address || '742 Grand Ballroom, Metropolitan Ave');
  const [specialNotes, setSpecialNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!selectedService) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const bookingPayload = {
      userId: user?.id || 'guest-01',
      userName: user?.name || 'Valued Guest',
      userEmail: user?.email || 'guest@example.com',
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      serviceCategory: selectedService.category,
      serviceImage: selectedService.image,
      amount: selectedService.price,
      serviceType,
      date,
      time,
      location,
      specialNotes,
      status: 'Assigned',
      paymentStatus: 'Pending'
    };

    setTimeout(() => {
      const createdBooking = addBooking(bookingPayload);
      setIsSubmitting(false);
      onClose();
      // Redirect to Payment page with booking ID
      navigate(`/payment?bookingId=${createdBooking.id}`);
    }, 500);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Book ${selectedService.name}`}>
      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* Service Summary Banner */}
        <div className="flex items-center gap-4 p-3.5 bg-violet-50 dark:bg-violet-950/40 rounded-xl border border-violet-100 dark:border-violet-900/50">
          <img
            src={selectedService.image}
            alt={selectedService.name}
            className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
          />
          <div>
            <span className="text-[10px] uppercase tracking-wider font-bold text-violet-600 dark:text-violet-400">
              {selectedService.category}
            </span>
            <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 line-clamp-1">
              {selectedService.name}
            </h4>
            <p className="text-xs font-bold text-slate-900 dark:text-slate-100 mt-0.5">
              ${selectedService.price} USD <span className="text-slate-400 font-normal">({selectedService.estimatedDuration})</span>
            </p>
          </div>
        </div>

        {/* Autofilled User Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
              Client Name (Autofilled)
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                readOnly
                value={user?.name || 'Guest User'}
                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-700 dark:text-slate-300 font-medium cursor-not-allowed"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
              Email Address (Autofilled)
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                readOnly
                value={user?.email || 'guest@example.com'}
                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-700 dark:text-slate-300 font-medium cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* Service Type Selection */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Service Format
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setServiceType('On-Site Decoration')}
              className={`p-3 text-left rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                serviceType === 'On-Site Decoration'
                  ? 'border-violet-600 bg-violet-50 dark:bg-violet-950/40 text-violet-900 dark:text-violet-200 ring-2 ring-violet-500/20'
                  : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <div className="font-bold">On-Site Setup</div>
              <div className="text-[11px] opacity-75 mt-0.5">Full design crew setup & teardown</div>
            </button>
            <button
              type="button"
              onClick={() => setServiceType('Consultation')}
              className={`p-3 text-left rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                serviceType === 'Consultation'
                  ? 'border-violet-600 bg-violet-50 dark:bg-violet-950/40 text-violet-900 dark:text-violet-200 ring-2 ring-violet-500/20'
                  : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <div className="font-bold">Virtual Consultation</div>
              <div className="text-[11px] opacity-75 mt-0.5">1-on-1 session with Lead Designer</div>
            </button>
          </div>
        </div>

        {/* Date and Time Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
              Select Event Date
            </label>
            <div className="relative">
              <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-violet-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
              Preferred Setup Start Time
            </label>
            <div className="relative">
              <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="time"
                required
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-violet-500"
              />
            </div>
          </div>
        </div>

        {/* Location Input */}
        <div>
          <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
            Event Venue Address / Location
          </label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              required
              placeholder="Enter venue name, address or hotel ballroom..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-violet-500"
            />
          </div>
        </div>

        {/* Special Notes */}
        <div>
          <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
            Special Notes & Color Palette Preferences
          </label>
          <div className="relative">
            <MessageSquare className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <textarea
              rows={2}
              placeholder="e.g., Blush roses, gold candle stands, ceiling height is 14 feet..."
              value={specialNotes}
              onChange={(e) => setSpecialNotes(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-violet-500"
            />
          </div>
        </div>

        {/* Submit Actions */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <Button type="button" variant="ghost" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="md"
            isLoading={isSubmitting}
            rightIcon={<Sparkles className="w-4 h-4" />}
          >
            Proceed to Payment (${selectedService.price})
          </Button>
        </div>

      </form>
    </Modal>
  );
};
