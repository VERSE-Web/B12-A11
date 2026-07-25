import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  CreditCard,
  User,
  Phone,
  Mail,
  CheckCircle2,
  Trash2,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useBooking } from '../../context/BookingContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { StatusBadge } from '../../components/common/Badge';
import { Avatar } from '../../components/common/Avatar';
import { Timeline } from '../../components/common/Timeline';

export const UserDashboard = () => {
  const { user, updateUserProfile } = useAuth();
  const { bookings, cancelBooking } = useBooking();
  const navigate = useNavigate();

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileName, setProfileName] = useState(user?.name || '');
  const [profilePhone, setProfilePhone] = useState(user?.phone || '');
  const [profileAddress, setProfileAddress] = useState(user?.address || '');

  // Filter user bookings
  const myBookings = bookings.filter((b) => b.userId === user?.id || b.userEmail === user?.email);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateUserProfile({ name: profileName, phone: profilePhone, address: profileAddress });
    setIsEditingProfile(false);
  };

  return (
    <div className="space-y-8">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-violet-600 via-indigo-600 to-slate-900 rounded-3xl p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <Avatar src={user?.avatar} alt={user?.name} size="xl" className="ring-4 ring-white/20" />
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full text-violet-100">
              Client Portal
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-serif mt-1">
              Welcome, {user?.name}!
            </h1>
            <p className="text-xs text-violet-200 mt-1">
              Manage your event consultations, track on-site decoration, and process payments.
            </p>
          </div>
        </div>

        <Link to="/services">
          <Button variant="accent" leftIcon={<Sparkles className="w-4 h-4" />}>
            Book New Decoration
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Profile Card */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-sm font-bold font-serif text-slate-900 dark:text-white flex items-center gap-2">
                <User className="w-4 h-4 text-violet-600" /> Account Profile
              </h3>
              <button
                onClick={() => setIsEditingProfile(!isEditingProfile)}
                className="text-xs font-semibold text-violet-600 dark:text-violet-400 hover:underline cursor-pointer"
              >
                {isEditingProfile ? 'Cancel' : 'Edit'}
              </button>
            </div>

            {isEditingProfile ? (
              <form onSubmit={handleSaveProfile} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">Phone</label>
                  <input
                    type="text"
                    value={profilePhone}
                    onChange={(e) => setProfilePhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">Primary Address</label>
                  <input
                    type="text"
                    value={profileAddress}
                    onChange={(e) => setProfileAddress(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                  />
                </div>
                <Button type="submit" size="sm" className="w-full">
                  Save Changes
                </Button>
              </form>
            ) : (
              <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-slate-400" />
                  <span className="truncate">{user?.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-slate-400" />
                  <span>{user?.phone || 'Not provided'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <span className="truncate">{user?.address || 'Metropolitan Area'}</span>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Right: Bookings & Tracking Timeline */}
        <div className="lg:col-span-8 space-y-6">
          <h2 className="text-lg font-bold font-serif text-slate-900 dark:text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-violet-600" /> Active Event Reservations ({myBookings.length})
          </h2>

          {myBookings.length > 0 ? (
            <div className="space-y-6">
              {myBookings.map((bk) => (
                <Card key={bk.id} className="p-6 space-y-6">
                  
                  {/* Top Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-4">
                      <img
                        src={bk.serviceImage}
                        alt={bk.serviceName}
                        className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
                      />
                      <div>
                        <span className="text-[10px] font-mono text-slate-400">BOOKING #{bk.id}</span>
                        <h3 className="text-base font-bold text-slate-900 dark:text-white font-serif">{bk.serviceName}</h3>
                        <p className="text-xs text-slate-500">${bk.amount} USD • {bk.serviceType}</p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:items-end gap-1.5">
                      <StatusBadge status={bk.status} />
                      <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                        Payment: {bk.paymentStatus}
                      </span>
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-900/50 p-3.5 rounded-xl">
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase font-semibold">Date</span>
                      <span className="font-bold text-slate-900 dark:text-white">{bk.date}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase font-semibold">Setup Time</span>
                      <span className="font-bold text-slate-900 dark:text-white">{bk.time}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase font-semibold">Location</span>
                      <span className="font-bold text-slate-900 dark:text-white truncate block">{bk.location}</span>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div>
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Live Project Progress
                    </h4>
                    <Timeline currentStatus={bk.status} statusHistory={bk.statusHistory} />
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    {bk.paymentStatus === 'Pending' ? (
                      <Button
                        size="sm"
                        variant="primary"
                        onClick={() => navigate(`/payment?bookingId=${bk.id}`)}
                      >
                        Pay Now (${bk.amount})
                      </Button>
                    ) : (
                      <span className="text-xs text-slate-400">
                        Lead Decorator: <strong className="text-slate-800 dark:text-slate-200">{bk.decoratorName || 'Elena Rostova'}</strong>
                      </span>
                    )}

                    <Button
                      size="sm"
                      variant="outline"
                      className="text-rose-600 border-rose-200 hover:bg-rose-50"
                      onClick={() => cancelBooking(bk.id)}
                    >
                      Cancel Reservation
                    </Button>
                  </div>

                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center space-y-4">
              <AlertCircle className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-base font-bold font-serif">No Active Reservations</h3>
              <p className="text-xs text-slate-500">You haven't booked any decoration services yet.</p>
              <Link to="/services"><Button variant="primary">Browse Services</Button></Link>
            </Card>
          )}
        </div>

      </div>

    </div>
  );
};
