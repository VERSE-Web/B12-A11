import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, Sparkles, AlertCircle, ArrowRight } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { useAuth } from '../context/AuthContext';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { StatusBadge } from '../components/common/Badge';
import { Timeline } from '../components/common/Timeline';

export const BookingPage = () => {
  const { bookings, cancelBooking } = useBooking();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Filter bookings for user
  const userBookings = bookings.filter((b) => b.userId === user?.id || b.userEmail === user?.email);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-violet-600 dark:text-violet-400">
            Appointments & On-Site Projects
          </span>
          <h1 className="text-3xl font-extrabold font-serif text-slate-900 dark:text-white mt-1">
            Your Bookings & Tracking
          </h1>
        </div>
        <Link to="/services">
          <Button variant="primary" leftIcon={<Sparkles className="w-4 h-4" />}>
            Book New Decoration
          </Button>
        </Link>
      </div>

      {userBookings.length > 0 ? (
        <div className="space-y-6">
          {userBookings.map((bk) => (
            <Card key={bk.id} className="p-6 space-y-6">
              
              {/* Header info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-4">
                  <img
                    src={bk.serviceImage}
                    alt={bk.serviceName}
                    className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
                  />
                  <div>
                    <span className="text-[10px] font-mono font-bold text-slate-400">ID: {bk.id}</span>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white font-serif">{bk.serviceName}</h3>
                    <p className="text-xs text-slate-500 font-medium">${bk.amount} USD • {bk.serviceType}</p>
                  </div>
                </div>

                <div className="flex flex-col sm:items-end gap-1.5">
                  <StatusBadge status={bk.status} />
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                    Payment: {bk.paymentStatus}
                  </span>
                </div>
              </div>

              {/* Event Metadata */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-violet-500" />
                  <span>Date: <strong className="text-slate-900 dark:text-white">{bk.date}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-cyan-500" />
                  <span>Setup Time: <strong className="text-slate-900 dark:text-white">{bk.time}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-500" />
                  <span className="truncate">Location: <strong className="text-slate-900 dark:text-white">{bk.location}</strong></span>
                </div>
              </div>

              {/* Project Status Flow Timeline */}
              <div className="pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Live Project Status Timeline
                </h4>
                <Timeline currentStatus={bk.status} statusHistory={bk.statusHistory} />
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                {bk.paymentStatus === 'Pending' ? (
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={() => navigate(`/payment?bookingId=${bk.id}`)}
                  >
                    Complete Stripe Payment
                  </Button>
                ) : (
                  <span className="text-xs text-slate-400">Assigned Decorator: <strong className="text-slate-800 dark:text-slate-200">{bk.decoratorName || 'Elena Rostova'}</strong></span>
                )}

                <Button
                  size="sm"
                  variant="outline"
                  className="text-rose-600 hover:bg-rose-50 border-rose-200"
                  onClick={() => cancelBooking(bk.id)}
                >
                  Cancel Booking
                </Button>
              </div>

            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-12 text-center space-y-4">
          <AlertCircle className="w-12 h-12 text-violet-500 mx-auto" />
          <h3 className="text-lg font-bold font-serif">No Active Bookings</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            You don't have any decoration appointments scheduled yet. Explore our packages to book your consultation!
          </p>
          <Link to="/services">
            <Button variant="primary">Browse Decoration Packages</Button>
          </Link>
        </Card>
      )}

    </div>
  );
};
