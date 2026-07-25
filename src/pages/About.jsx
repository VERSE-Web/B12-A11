import React from 'react';
import { Award, ShieldCheck, Users, Sparkles, Heart, CheckCircle2 } from 'lucide-react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Link } from 'react-router-dom';

export const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-violet-600 dark:text-violet-400">
          Our Heritage & Passion
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold font-serif text-slate-900 dark:text-white">
          Redefining Event Decor Through Architecture & Artistry
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          StyleDecor was founded on a simple premise: life’s greatest milestones deserve stage design that rivals world-class theatrical galas. From intimate botanical housewarmings to grand royal weddings.
        </p>
      </div>

      {/* Grid Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <Card className="p-6">
          <p className="text-3xl font-extrabold font-serif text-violet-600 dark:text-violet-400">1,200+</p>
          <p className="text-xs text-slate-500 font-medium mt-1">Events Crafted</p>
        </Card>
        <Card className="p-6">
          <p className="text-3xl font-extrabold font-serif text-cyan-500">25+</p>
          <p className="text-xs text-slate-500 font-medium mt-1">Certified Designers</p>
        </Card>
        <Card className="p-6">
          <p className="text-3xl font-extrabold font-serif text-amber-500">4.95 ⭐</p>
          <p className="text-xs text-slate-500 font-medium mt-1">Average Rating</p>
        </Card>
        <Card className="p-6">
          <p className="text-3xl font-extrabold font-serif text-emerald-500">100%</p>
          <p className="text-xs text-slate-500 font-medium mt-1">On-Time Setup SLA</p>
        </Card>
      </div>

      {/* Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="p-8 space-y-3">
          <Award className="w-8 h-8 text-violet-600" />
          <h3 className="text-lg font-bold font-serif text-slate-900 dark:text-white">Architectural Precision</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            We render 3D spatial CAD mockups for every venue before packing trusses, floral drapes, or LED arrays.
          </p>
        </Card>
        <Card className="p-8 space-y-3">
          <Heart className="w-8 h-8 text-rose-500" />
          <h3 className="text-lg font-bold font-serif text-slate-900 dark:text-white">Sustainable Floristry</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            100% of our botanical arches feature locally sourced, ethically preserved florals and reusable bamboo framing.
          </p>
        </Card>
        <Card className="p-8 space-y-3">
          <ShieldCheck className="w-8 h-8 text-cyan-500" />
          <h3 className="text-lg font-bold font-serif text-slate-900 dark:text-white">Punctuality Commitment</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Our dispatch team arrives 4 to 6 hours before event commencement, leaving zero room for last-minute stress.
          </p>
        </Card>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-violet-600 to-indigo-700 rounded-3xl p-10 text-center text-white space-y-6 shadow-2xl">
        <h2 className="text-3xl font-bold font-serif">Ready to elevate your upcoming celebration?</h2>
        <p className="text-sm text-violet-100 max-w-xl mx-auto">
          Book a 1-on-1 virtual consultation or explore our packages with transparent pricing.
        </p>
        <Link to="/services">
          <Button variant="accent" size="lg" leftIcon={<Sparkles className="w-5 h-5" />}>
            Explore Decoration Packages
          </Button>
        </Link>
      </div>

    </div>
  );
};
