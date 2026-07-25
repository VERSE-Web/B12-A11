import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Star, CheckCircle2, Sparkles, Filter, SlidersHorizontal } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { SearchBar } from '../components/common/SearchBar';
import { FilterPanel } from '../components/common/FilterPanel';
import { BookingModal } from '../components/modals/BookingModal';
import { EmptyState } from '../components/common/Loader';

export const Services = () => {
  const { services } = useBooking();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [maxPrice, setMaxPrice] = useState(4000);
  const [sortBy, setSortBy] = useState('popularity');
  const [selectedServiceForModal, setSelectedServiceForModal] = useState(null);

  const filteredServices = useMemo(() => {
    return services
      .filter((s) => {
        const matchesSearch =
          s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCat = selectedCategory === 'All' || s.category === selectedCategory;
        const matchesPrice = s.price <= maxPrice;
        return matchesSearch && matchesCat && matchesPrice;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'newest') return (b.newest ? 1 : 0) - (a.newest ? 1 : 0);
        return (b.popular ? 1 : 0) - (a.popular ? 1 : 0); // Default popularity
      });
  }, [services, searchTerm, selectedCategory, maxPrice, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-violet-600 dark:text-violet-400">
          Tailored Event Consultation
        </span>
        <h1 className="text-4xl font-extrabold font-serif text-slate-900 dark:text-white">
          Decoration Services & Packages
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Browse our curated catalog of stage architecture, floral arches, neon backdrops, and lighting canopy setups.
        </p>
      </div>

      {/* Main Grid with Sidebar Filter */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Filter Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <FilterPanel
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            maxPrice={maxPrice}
            onPriceChange={setMaxPrice}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />
        </div>

        {/* Right Services List */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Top Search Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <SearchBar value={searchTerm} onChange={setSearchTerm} />
            <div className="text-xs text-slate-500 font-medium whitespace-nowrap">
              Showing <span className="font-bold text-slate-900 dark:text-white">{filteredServices.length}</span> services
            </div>
          </div>

          {/* Cards Grid */}
          {filteredServices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredServices.map((service) => (
                <Card key={service.id} hoverEffect className="overflow-hidden flex flex-col justify-between group">
                  <div>
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 flex gap-2">
                        <Badge variant="primary">{service.category}</Badge>
                        {service.popular && <Badge variant="accent">Popular</Badge>}
                        {service.newest && <Badge variant="secondary">New</Badge>}
                      </div>
                      <div className="absolute top-3 right-3 glass-panel px-2.5 py-1 rounded-full text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1 shadow-md">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{service.rating}</span>
                        <span className="text-[10px] text-slate-400">({service.reviewCount})</span>
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
                        {service.whatsIncluded.slice(0, 2).map((inc, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                            <span className="truncate">{inc}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-5 pt-0 flex items-center justify-between border-t border-slate-100 dark:border-slate-800/60 mt-4">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-semibold">Price</span>
                      <p className="text-lg font-extrabold text-slate-900 dark:text-white">${service.price}</p>
                    </div>
                    <div className="flex gap-2">
                      <Link to={`/services/${service.id}`}>
                        <Button variant="outline" size="sm">
                          Details
                        </Button>
                      </Link>
                      <Button
                        size="sm"
                        onClick={() => setSelectedServiceForModal(service)}
                        leftIcon={<Sparkles className="w-3.5 h-3.5" />}
                      >
                        Book Now
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <EmptyState
              title="No services match your filters"
              description="Try adjusting your category selection, increasing your budget range, or clearing your search query."
              actionButton={
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('All');
                    setMaxPrice(4000);
                  }}
                >
                  Reset All Filters
                </Button>
              }
            />
          )}

        </div>

      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={!!selectedServiceForModal}
        onClose={() => setSelectedServiceForModal(null)}
        selectedService={selectedServiceForModal}
      />

    </div>
  );
};
