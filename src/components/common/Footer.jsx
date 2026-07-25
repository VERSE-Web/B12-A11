import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, MapPin, Phone, Mail, Clock, Shield, Award, Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 via-cyan-500 to-amber-400 p-0.5 shadow-lg shadow-violet-500/20">
                <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-violet-400 fill-violet-400/20" />
                </div>
              </div>
              <span className="text-2xl font-bold font-serif tracking-tight text-white">
                Style<span className="text-violet-400">Decor</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Elevating life’s grandest moments with bespoke stage architecture, fine botanical garlands, and crystal ambient lighting. The trusted consultation platform for weddings, galas, and milestones.
            </p>
            <div className="flex items-center gap-4 text-xs font-medium text-slate-400 pt-2">
              <div className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-cyan-400" />
                <span>100% On-Time Guarantee</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-400" />
                <span>Award-Winning Designers</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/services" className="hover:text-violet-400 transition-colors">
                  All Decoration Services
                </Link>
              </li>
              <li>
                <Link to="/coverage-map" className="hover:text-violet-400 transition-colors">
                  Coverage Area & Dispatch
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-violet-400 transition-colors">
                  About Our Studio
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-violet-400 transition-colors">
                  Contact & Consultations
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-violet-400 transition-colors">
                  Customer & Decorator Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Event Types
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>Royal Wedding Stages</li>
              <li>Ethereal Birthday Pastels</li>
              <li>Corporate Galas & Summits</li>
              <li>Festival & Holiday Lighting</li>
              <li>Boho Housewarmings</li>
              <li>Sunset Waterfront Pavilions</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Headquarters
            </h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-violet-400 flex-shrink-0 mt-0.5" />
                <span>100 Executive Blvd, Metropolitan Design District, NY</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>+1 (800) 555-DECOR</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>concierge@styledecor.com</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Mon–Sat: 8:00 AM – 8:00 PM</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} StyleDecor Inc. All rights reserved. Built with React & Tailwind CSS.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-400 cursor-pointer">Decorator Guidelines</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
