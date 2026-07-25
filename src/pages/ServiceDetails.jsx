import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Star,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowLeft,
  Users,
  Calendar,
  MessageSquare,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Avatar } from '../components/common/Avatar';
import { BookingModal } from '../components/modals/BookingModal';

export const ServiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getServiceById, decorators, reviews, addReview } = useBooking();

  const service = getServiceById(id || 'srv-01');

  const [activeImage, setActiveImage] = useState(service?.image || '');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // New review form state
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [reviewerName, setReviewerName] = useState('');

  if (!service) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold font-serif">Service Not Found</h2>
        <p className="text-slate-500">The requested decoration package could not be found.</p>
        <Link to="/services">
          <Button variant="primary">Back to All Services</Button>
        </Link>
      </div>
    );
  }

  // Filter assigned decorators
  const assignedDecorators = decorators.filter((d) =>
    service.availableDecorators.includes(d.id)
  );

  // Filter reviews for this service
  const serviceReviews = reviews.filter((r) => r.serviceId === service.id);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    addReview({
      serviceId: service.id,
      userName: reviewerName.trim() || 'Verified Client',
      userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
      rating: newRating,
      comment: newComment
    });

    setNewComment('');
    setReviewerName('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Breadcrumb / Back Button */}
      <div className="flex items-center justify-between">
        <Link
          to="/services"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-violet-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Services
        </Link>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span>Services</span> <ChevronRight className="w-3 h-3" />
          <span className="text-slate-700 dark:text-slate-200 font-semibold">{service.category}</span>
        </div>
      </div>

      {/* Main Grid: Gallery + Quick Booking Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Gallery & Details */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Large Image Gallery */}
          <div className="space-y-4">
            <div className="relative h-96 sm:h-[450px] w-full rounded-3xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800">
              <img
                src={activeImage || service.image}
                alt={service.name}
                className="w-full h-full object-cover transition-all duration-300"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <Badge variant="primary">{service.category}</Badge>
                {service.popular && <Badge variant="accent">Popular Choice</Badge>}
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {service.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`relative w-24 h-20 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all cursor-pointer ${
                    (activeImage || service.image) === img
                      ? 'border-violet-600 ring-2 ring-violet-500/30'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Description & Included Items */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-extrabold font-serif text-slate-900 dark:text-white">
                {service.name}
              </h1>
              <div className="flex items-center gap-4 mt-2 text-xs text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-1 text-amber-500 font-bold">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>{service.rating}</span>
                  <span className="text-slate-400">({service.reviewCount} Reviews)</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-violet-500" />
                  <span>{service.estimatedDuration}</span>
                </div>
              </div>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {service.description}
            </p>

            {/* What's Included Card */}
            <div className="bg-white dark:bg-[#1E293B] p-6 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-4 shadow-sm">
              <h3 className="text-base font-bold font-serif text-slate-900 dark:text-white flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" /> What's Included in This Package
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {service.whatsIncluded.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-600 dark:bg-violet-400 mt-1.5 flex-shrink-0" />
                    <span className="leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Decorator Availability Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold font-serif text-slate-900 dark:text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-violet-600 dark:text-violet-400" /> Available Lead Decorators
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {assignedDecorators.map((dec) => (
                  <Card key={dec.id} className="p-4 flex items-center gap-3">
                    <Avatar src={dec.avatar} alt={dec.name} size="lg" />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">{dec.name}</h4>
                      <p className="text-xs text-violet-600 dark:text-violet-400 font-medium">{dec.role}</p>
                      <p className="text-[10px] text-slate-400 mt-1">⭐ {dec.rating} rating ({dec.completedProjects} events)</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Reviews Section */}
            <div className="space-y-6 pt-6 border-t border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold font-serif text-slate-900 dark:text-white flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-violet-600 dark:text-violet-400" /> Client Reviews ({serviceReviews.length})
                </h3>
              </div>

              {/* Review Cards */}
              <div className="space-y-4">
                {serviceReviews.map((rev) => (
                  <div key={rev.id} className="p-4 bg-white dark:bg-[#1E293B] rounded-2xl border border-slate-100 dark:border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <Avatar src={rev.userAvatar} alt={rev.userName} size="sm" />
                        <div>
                          <p className="text-xs font-bold text-slate-900 dark:text-white">{rev.userName}</p>
                          <p className="text-[10px] text-slate-400">{rev.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-0.5 text-amber-500">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 italic">{rev.comment}</p>
                  </div>
                ))}
              </div>

              {/* Add Review Form */}
              <form onSubmit={handleReviewSubmit} className="p-5 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200/60 dark:border-slate-800 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Leave a Review
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Your Name..."
                    value={reviewerName}
                    onChange={(e) => setReviewerName(e.target.value)}
                    className="px-3 py-2 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                  />
                  <select
                    value={newRating}
                    onChange={(e) => setNewRating(Number(e.target.value))}
                    className="px-3 py-2 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
                    <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
                    <option value={3}>⭐⭐⭐ (3 Stars)</option>
                  </select>
                </div>
                <textarea
                  rows={2}
                  placeholder="Share your experience with this decoration setup..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                />
                <Button type="submit" size="sm" variant="secondary">
                  Post Review
                </Button>
              </form>
            </div>

          </div>

        </div>

        {/* Right Sticky Booking Box */}
        <div className="lg:col-span-4">
          <div className="sticky top-28 bg-white dark:bg-[#1E293B] p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400">
                Package Pricing
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-extrabold font-serif text-slate-900 dark:text-white">
                  ${service.price}
                </span>
                <span className="text-xs text-slate-400 font-medium">USD / Event</span>
              </div>
            </div>

            <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                <span>Category</span>
                <span className="font-semibold text-slate-900 dark:text-white">{service.category}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                <span>Setup Duration</span>
                <span className="font-semibold text-slate-900 dark:text-white">{service.estimatedDuration}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                <span>Cancellation SLA</span>
                <span className="font-semibold text-emerald-600">Full Refund 7d+</span>
              </div>
            </div>

            <Button
              size="lg"
              className="w-full"
              onClick={() => setIsBookingModalOpen(true)}
              leftIcon={<Sparkles className="w-5 h-5" />}
            >
              Book Consultation Now
            </Button>

            <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl text-center space-y-1">
              <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
                <ShieldCheck className="w-4 h-4 text-cyan-500" /> StyleDecor Guarantee
              </div>
              <p className="text-[11px] text-slate-400">
                Free initial consultation call with your assigned lead decorator.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        selectedService={service}
      />

    </div>
  );
};
