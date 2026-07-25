import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  Star,
  CheckCircle2,
  Calendar,
  Users,
  ShieldCheck,
  MapPin,
  Clock,
  Layers,
  ChevronDown,
  Award,
  Zap,
  Check
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Avatar } from '../components/common/Avatar';
import { BookingModal } from '../components/modals/BookingModal';
import { FAQ_ITEMS } from '../data/mockData';

export const Home = () => {
  const { services, decorators, reviews } = useBooking();
  const navigate = useNavigate();

  const [selectedServiceForModal, setSelectedServiceForModal] = useState(null);
  const [activeFaqCategory, setActiveFaqCategory] = useState('All');
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const featuredServices = services.slice(0, 3);
  const topDecorators = decorators.slice(0, 4);

  const steps = [
    {
      num: '01',
      title: 'Explore & Select Package',
      desc: 'Browse our curated wedding, gala, or birthday packages or request a custom architectural consultation.'
    },
    {
      num: '02',
      title: 'Pick Date & Decorator',
      desc: 'Select your event date and match with certified lead designers and ambient lighting specialists.'
    },
    {
      num: '03',
      title: 'Seamless On-Site Setup',
      desc: 'Our crew handles truss rigging, floral arches, and stage erection. Track real-time progress on your portal.'
    }
  ];

  const valueProps = [
    {
      icon: Award,
      title: 'Certified Stage Architects',
      desc: 'Every decorator undergo 200+ hours of structural rigging, botanical preservation, and lighting safety training.'
    },
    {
      icon: ShieldCheck,
      title: '100% On-Time Guarantee',
      desc: 'We arrive 4–6 hours prior to your event start time. Backed by money-back punctuality SLAs.'
    },
    {
      icon: Zap,
      title: 'Live Progress Tracking',
      desc: 'Stay informed with step-by-step project updates: from floral packing to final stage chandelier handover.'
    }
  ];

  return (
    <div className="space-y-20 pb-16 overflow-hidden">
      
      {/* HERO SECTION */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden bg-gradient-to-b from-violet-50/50 via-slate-50 to-transparent dark:from-violet-950/20 dark:via-slate-900 dark:to-transparent">
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-r from-violet-400/20 via-cyan-400/20 to-amber-400/20 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-6 text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 text-xs font-semibold border border-violet-200 dark:border-violet-800 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400 fill-violet-600/30" />
                <span>Next-Gen Event Consultation & Decoration</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-serif tracking-tight text-slate-900 dark:text-white leading-[1.15]">
                Crafting Unforgettable <br />
                <span className="bg-gradient-to-r from-violet-600 via-cyan-500 to-amber-500 bg-clip-text text-transparent">
                  Atmospheres & Galas
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Connect with world-class stage architects, botanical master florists, and ambient lighting engineers. Book consultations, manage on-site setups, and track event status in real-time.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Button
                  size="lg"
                  onClick={() => setSelectedServiceForModal(services[0])}
                  leftIcon={<Sparkles className="w-5 h-5" />}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                  className="w-full sm:w-auto shadow-xl shadow-violet-500/25"
                >
                  Book Decoration Service
                </Button>

                <Link to="/services" className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Explore All Packages
                  </Button>
                </Link>
              </div>

              {/* Social Proof */}
              <div className="pt-6 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center justify-center lg:justify-start gap-6">
                <div className="flex -space-x-3">
                  {decorators.slice(0, 4).map((dec, i) => (
                    <img
                      key={i}
                      src={dec.avatar}
                      alt={dec.name}
                      className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-900 object-cover"
                    />
                  ))}
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                    <span className="text-xs font-bold text-slate-900 dark:text-white ml-1">4.95 / 5.0</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Trusted by <span className="font-semibold text-slate-800 dark:text-slate-200">1,200+</span> couples & corporate hosts
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right Hero Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 aspect-[4/5]">
                  <img
                    src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1000"
                    alt="Royal Wedding Decoration"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  
                  {/* Floating Live Badge */}
                  <div className="absolute top-4 left-4 glass-panel px-3 py-1.5 rounded-full flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white shadow-lg">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                    <span>Real-Time On-Site Setup Active</span>
                  </div>

                  {/* Overlay Card */}
                  <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-white/20 shadow-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400">
                        Featured Transformation
                      </span>
                      <span className="text-xs font-bold text-slate-900 dark:text-white">$1,850 USD</span>
                    </div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white font-serif">
                      Grand Royal Wedding Stage & Crystal Canopy
                    </p>
                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800">
                      <span>Lead: Elena Rostova</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold">98% Setup Complete</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* FEATURED SERVICES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-violet-600 dark:text-violet-400">
              Curated Collections
            </span>
            <h2 className="text-3xl font-extrabold font-serif text-slate-900 dark:text-white mt-1">
              Featured Decoration Packages
            </h2>
          </div>
          <Link to="/services">
            <Button variant="ghost" rightIcon={<ArrowRight className="w-4 h-4" />}>
              View All Services
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredServices.map((service) => (
            <Card key={service.id} hoverEffect className="overflow-hidden flex flex-col justify-between group">
              <div>
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant="primary">{service.category}</Badge>
                  </div>
                  <div className="absolute top-3 right-3 glass-panel px-2.5 py-1 rounded-full text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1 shadow-md">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{service.rating}</span>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <h3 className="text-lg font-bold font-serif text-slate-900 dark:text-white line-clamp-1 group-hover:text-violet-600 transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                    {service.whatsIncluded.slice(0, 2).map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                        <span className="truncate">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0 flex items-center justify-between border-t border-slate-100 dark:border-slate-800/60 mt-4">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Starting Price</span>
                  <p className="text-lg font-extrabold text-slate-900 dark:text-white">${service.price}</p>
                </div>
                <div className="flex gap-2">
                  <Link to={`/services/${service.id}`}>
                    <Button variant="outline" size="sm">
                      Details
                    </Button>
                  </Link>
                  <Button size="sm" onClick={() => setSelectedServiceForModal(service)}>
                    Book
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* TOP DECORATORS */}
      <section className="bg-slate-50 dark:bg-slate-900/60 py-16 border-y border-slate-200/50 dark:border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-violet-600 dark:text-violet-400">
              Master Artisans
            </span>
            <h2 className="text-3xl font-extrabold font-serif text-slate-900 dark:text-white">
              Meet Our Certified Lead Designers
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Passionate specialists in crystal rigging, botanical arches, and DMX architectural lighting.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {topDecorators.map((dec) => (
              <Card key={dec.id} hoverEffect className="p-5 text-center space-y-4">
                <Avatar src={dec.avatar} alt={dec.name} size="xl" className="mx-auto" />
                
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white font-serif">{dec.name}</h3>
                  <p className="text-xs font-semibold text-violet-600 dark:text-violet-400">{dec.role}</p>
                </div>

                <div className="flex items-center justify-center gap-3 text-xs text-slate-500 dark:text-slate-400 py-2 bg-slate-100/70 dark:bg-slate-800/50 rounded-xl">
                  <div className="flex items-center gap-1 text-amber-500 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{dec.rating}</span>
                  </div>
                  <span>•</span>
                  <span>{dec.completedProjects} Events</span>
                </div>

                <div className="flex flex-wrap justify-center gap-1">
                  {dec.specialties.map((spec, i) => (
                    <span key={i} className="px-2 py-0.5 text-[10px] bg-slate-200/60 dark:bg-slate-800 rounded-md text-slate-600 dark:text-slate-300">
                      {spec}
                    </span>
                  ))}
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {dec.bio}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {valueProps.map((vp, i) => {
            const Icon = vp.icon;
            return (
              <Card key={i} className="p-8 space-y-4 border-l-4 border-l-violet-600 dark:border-l-violet-400">
                <div className="w-12 h-12 rounded-2xl bg-violet-100 dark:bg-violet-900/40 text-violet-600 dark:text-violet-400 flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold font-serif text-slate-900 dark:text-white">{vp.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{vp.desc}</p>
              </Card>
            );
          })}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-violet-600 dark:text-violet-400">
            Simple Workflow
          </span>
          <h2 className="text-3xl font-extrabold font-serif text-slate-900 dark:text-white">
            How StyleDecor Works
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((s, idx) => (
            <div key={idx} className="relative bg-white dark:bg-[#1E293B] p-8 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
              <span className="text-4xl font-extrabold font-serif text-violet-600/20 dark:text-violet-400/20">
                {s.num}
              </span>
              <h3 className="text-lg font-bold font-serif text-slate-900 dark:text-white">{s.title}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CUSTOMER REVIEWS */}
      <section className="bg-gradient-to-b from-transparent via-slate-50 to-transparent dark:via-slate-900/40 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-violet-600 dark:text-violet-400">
              Verified Client Feedback
            </span>
            <h2 className="text-3xl font-extrabold font-serif text-slate-900 dark:text-white mt-1">
              Loved by Hosts & Couples
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((rev) => (
              <Card key={rev.id} className="p-6 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300 italic leading-relaxed">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <Avatar src={rev.userAvatar} alt={rev.userName} size="md" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">{rev.userName}</h4>
                    <p className="text-[10px] text-slate-400">{rev.date}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-violet-600 dark:text-violet-400">
            Got Questions?
          </span>
          <h2 className="text-3xl font-extrabold font-serif text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {FAQ_ITEMS.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <span className="text-base font-semibold text-slate-900 dark:text-white font-serif">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-violet-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-sm text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800/80 pt-3 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* BOOKING MODAL */}
      <BookingModal
        isOpen={!!selectedServiceForModal}
        onClose={() => setSelectedServiceForModal(null)}
        selectedService={selectedServiceForModal}
      />

    </div>
  );
};
