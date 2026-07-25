import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from './context/AuthContext';
import { BookingProvider } from './context/BookingContext';

import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';

import { Home } from './pages/Home';
import { Services } from './pages/Services';
import { ServiceDetails } from './pages/ServiceDetails';
import { BookingPage } from './pages/Booking';
import { Payment } from './pages/Payment';
import { CoverageMap } from './pages/CoverageMap';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/dashboard/Dashboard';
import { NotFound } from './pages/NotFound';

import { BookingModal } from './components/modals/BookingModal';
import { useBooking } from './context/BookingContext';

function AppShell() {
  const [globalBookingModalService, setGlobalBookingModalService] = useState(null);
  const { services } = useBooking();

  const handleOpenDefaultBookingModal = () => {
    const defaultSrv = (services && services.length > 0) ? services[0] : null;
    setGlobalBookingModalService(defaultSrv);
  };

  return (
        <Router>
          <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0F172A] text-slate-900 dark:text-slate-100 transition-colors duration-200 font-sans">
            
            {/* Global Navbar */}
            <Navbar onOpenBookingModal={handleOpenDefaultBookingModal} />

            {/* Main Application Body */}
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/services" element={<Services />} />
                <Route path="/services/:id" element={<ServiceDetails />} />
                <Route path="/booking" element={<BookingPage />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/coverage-map" element={<CoverageMap />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>

            {/* Global Footer */}
            <Footer />

            {/* Global Quick Booking Modal */}
            <BookingModal
              isOpen={!!globalBookingModalService}
              onClose={() => setGlobalBookingModalService(null)}
              selectedService={globalBookingModalService}
            />

            {/* Notification Toasts */}
            <ToastContainer position="bottom-right" theme="colored" autoClose={3000} />

          </div>
        </Router>
  );
}

export function App() {
  return (
    <AuthProvider>
      <BookingProvider>
        <AppShell />
      </BookingProvider>
    </AuthProvider>
  );
}

export default App;
