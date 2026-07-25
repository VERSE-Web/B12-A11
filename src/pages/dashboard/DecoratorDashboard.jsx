import React, { useState } from 'react';
import {
  Hammer,
  Clock,
  MapPin,
  CheckCircle2,
  Truck,
  Sparkles,
  DollarSign,
  UserCheck,
  Calendar,
  MessageSquare
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useBooking } from '../../context/BookingContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { StatusBadge } from '../../components/common/Badge';
import { Avatar } from '../../components/common/Avatar';
import { Modal } from '../../components/common/Modal';

const STATUS_STEPS = [
  'Assigned',
  'Planning Phase',
  'Materials Prepared',
  'On the Way',
  'Setup in Progress',
  'Completed'
];

export const DecoratorDashboard = () => {
  const { user } = useAuth();
  const { bookings, updateBookingStatus } = useBooking();

  // Selected project to update status
  const [selectedBookingForUpdate, setSelectedBookingForUpdate] = useState(null);
  const [newStatus, setNewStatus] = useState('Setup in Progress');
  const [statusNote, setStatusNote] = useState('');

  // Filter bookings assigned to decorator
  const assignedProjects = bookings; // In demo view, display active assignments

  const handleStatusSubmit = (e) => {
    e.preventDefault();
    if (!selectedBookingForUpdate) return;

    updateBookingStatus(selectedBookingForUpdate.id, newStatus, statusNote);
    setSelectedBookingForUpdate(null);
    setStatusNote('');
  };

  return (
    <div className="space-y-8">
      
      {/* Decorator Header */}
      <div className="bg-gradient-to-r from-cyan-600 via-teal-600 to-slate-900 rounded-3xl p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <Avatar src={user?.avatar} alt={user?.name} size="xl" className="ring-4 ring-white/20" />
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full text-cyan-100">
              Staff Decorator Portal
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-serif mt-1">
              Lead Designer: {user?.name}
            </h1>
            <p className="text-xs text-cyan-100 mt-1">
              On-Site Setup Dispatch & Stage Rigging Command Center
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/20">
          <div>
            <span className="text-[10px] font-semibold text-cyan-200 uppercase block">Active Projects</span>
            <span className="text-xl font-extrabold font-serif">{assignedProjects.length}</span>
          </div>
          <div className="h-8 w-px bg-white/20" />
          <div>
            <span className="text-[10px] font-semibold text-cyan-200 uppercase block">Total Commission</span>
            <span className="text-xl font-extrabold font-serif text-amber-300">$3,450</span>
          </div>
        </div>
      </div>

      {/* Projects List */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold font-serif text-slate-900 dark:text-white flex items-center gap-2">
            <Hammer className="w-5 h-5 text-cyan-500" /> Assigned Event Projects
          </h2>
          <span className="text-xs text-slate-400 font-medium">Click to update live status</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {assignedProjects.map((proj) => (
            <Card key={proj.id} className="p-6 space-y-5 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-4 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400">PROJECT ID: {proj.id}</span>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white font-serif">{proj.serviceName}</h3>
                    <p className="text-xs text-slate-500 font-medium">Client: {proj.userName} ({proj.userEmail})</p>
                  </div>
                  <StatusBadge status={proj.status} />
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs text-slate-600 dark:text-slate-300 py-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-violet-500" />
                    <span>{proj.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-cyan-500" />
                    <span>{proj.time}</span>
                  </div>
                  <div className="col-span-2 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-amber-500 flex-shrink-0" />
                    <span className="truncate">{proj.location}</span>
                  </div>
                </div>

                {proj.specialNotes && (
                  <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl text-xs text-slate-600 dark:text-slate-300 italic border border-slate-100 dark:border-slate-800">
                    <strong className="not-italic text-slate-800 dark:text-slate-200">Notes:</strong> "{proj.specialNotes}"
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  Payout: ${Math.round(proj.amount * 0.45)} USD
                </span>
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => {
                    setSelectedBookingForUpdate(proj);
                    setNewStatus(proj.status);
                  }}
                  leftIcon={<Hammer className="w-3.5 h-3.5" />}
                >
                  Update Setup Status
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Update Status Modal */}
      {selectedBookingForUpdate && (
        <Modal
          isOpen={!!selectedBookingForUpdate}
          onClose={() => setSelectedBookingForUpdate(null)}
          title={`Update Status: ${selectedBookingForUpdate.serviceName}`}
        >
          <form onSubmit={handleStatusSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2">
                Select New Project Status Stage
              </label>
              <div className="grid grid-cols-2 gap-2">
                {STATUS_STEPS.map((step) => (
                  <button
                    key={step}
                    type="button"
                    onClick={() => setNewStatus(step)}
                    className={`p-2.5 text-xs font-semibold rounded-xl border text-left transition-all cursor-pointer ${
                      newStatus === step
                        ? 'border-violet-600 bg-violet-50 text-violet-900 dark:bg-violet-950/40 dark:text-violet-200'
                        : 'border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {step}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Dispatch Note / Log Details
              </label>
              <textarea
                rows={3}
                placeholder="e.g. Truss rigging finished, floral arch lights tested..."
                value={statusNote}
                onChange={(e) => setStatusNote(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="ghost" size="sm" onClick={() => setSelectedBookingForUpdate(null)}>
                Cancel
              </Button>
              <Button type="submit" size="sm" variant="primary">
                Broadcast Status Update
              </Button>
            </div>
          </form>
        </Modal>
      )}

    </div>
  );
};
