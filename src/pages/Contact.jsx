import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';

export const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: 'Wedding',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-violet-600 dark:text-violet-400">
          Get In Touch
        </span>
        <h1 className="text-4xl font-extrabold font-serif text-slate-900 dark:text-white">
          Contact Concierge & Studio
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Have questions about custom floral orders, venue logistics, or corporate gala quotes? Our design directors respond within 2 hours.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Form */}
        <div className="lg:col-span-7">
          <Card className="p-8">
            {submitted ? (
              <div className="text-center py-10 space-y-4">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                <h3 className="text-xl font-bold font-serif text-slate-900 dark:text-white">Message Sent!</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Thank you for reaching out. Our lead decorator concierge will review your event date and contact you shortly.
                </p>
                <Button size="sm" variant="outline" onClick={() => setSubmitted(false)}>
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Alexandra Cole"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="alexandra@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Event Category</label>
                    <select
                      value={formData.eventType}
                      onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                    >
                      <option value="Wedding">Royal Wedding Stage</option>
                      <option value="Birthday">Ethereal Birthday Party</option>
                      <option value="Corporate">Corporate Gala & Summit</option>
                      <option value="Festival">Festival & Holiday Lights</option>
                      <option value="Housewarming">Boho Housewarming</option>
                      <option value="Luxury Gala">Luxury Pavilion</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Event Details & Inquiries</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about your venue location, estimated guest count, or vision..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                  />
                </div>

                <Button type="submit" size="lg" className="w-full" rightIcon={<Send className="w-4 h-4" />}>
                  Send Consultation Inquiry
                </Button>
              </form>
            )}
          </Card>
        </div>

        {/* Right Details */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="p-6 space-y-4">
            <h3 className="text-base font-bold font-serif text-slate-900 dark:text-white">Studio Headquarters</h3>
            
            <div className="space-y-4 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-violet-500 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 dark:text-white">Address:</strong>
                  <span>100 Executive Blvd, Metropolitan Design District, NY 10001</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-cyan-500 flex-shrink-0" />
                <div>
                  <strong className="block text-slate-900 dark:text-white">Direct Line:</strong>
                  <span>+1 (800) 555-DECOR</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <div>
                  <strong className="block text-slate-900 dark:text-white">Concierge Email:</strong>
                  <span>concierge@styledecor.com</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <div>
                  <strong className="block text-slate-900 dark:text-white">Studio Hours:</strong>
                  <span>Monday – Saturday: 8:00 AM – 8:00 PM EST</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

      </div>

    </div>
  );
};
