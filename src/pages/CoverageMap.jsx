import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import { MapPin, ShieldCheck, Users, Navigation, Sparkles } from 'lucide-react';
import { COVERAGE_ZONES } from '../data/mockData';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';

export const CoverageMap = () => {
  const [selectedZone, setSelectedZone] = useState(COVERAGE_ZONES[0]);

  // Map center: San Francisco Metropolitan area
  const center = [37.7749, -122.4194];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-violet-600 dark:text-violet-400">
          Metropolitan Service Radius
        </span>
        <h1 className="text-3xl font-extrabold font-serif text-slate-900 dark:text-white">
          StyleDecor Coverage Map & Dispatch
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          We operate priority setup trucks across 4 major metropolitan districts with dedicated lead decorator crews.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Interactive Map Container */}
        <div className="lg:col-span-8">
          <div className="h-[500px] w-full rounded-3xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-800 relative z-10">
            <MapContainer
              center={center}
              zoom={10}
              scrollWheelZoom={false}
              className="h-full w-full"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {COVERAGE_ZONES.map((zone) => (
                <React.Fragment key={zone.id}>
                  <Marker
                    position={zone.coordinates}
                    eventHandlers={{
                      click: () => setSelectedZone(zone)
                    }}
                  >
                    <Popup>
                      <div className="p-1 space-y-1">
                        <strong className="text-xs font-bold text-slate-900">{zone.name}</strong>
                        <p className="text-[10px] text-slate-500">{zone.activeDecorators} Active Decorators</p>
                      </div>
                    </Popup>
                  </Marker>

                  <Circle
                    center={zone.coordinates}
                    radius={zone.radiusKm * 1000}
                    pathOptions={{
                      color: selectedZone?.id === zone.id ? '#8B5CF6' : '#06B6D4',
                      fillColor: selectedZone?.id === zone.id ? '#8B5CF6' : '#06B6D4',
                      fillOpacity: 0.15,
                      weight: selectedZone?.id === zone.id ? 2.5 : 1.5
                    }}
                  />
                </React.Fragment>
              ))}
            </MapContainer>
          </div>
        </div>

        {/* Right Zone Selector Panel */}
        <div className="lg:col-span-4 space-y-4">
          <h3 className="text-sm font-bold font-serif text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
            <Navigation className="w-4 h-4 text-violet-600" /> Dispatch Coverage Zones
          </h3>

          <div className="space-y-3">
            {COVERAGE_ZONES.map((zone) => {
              const isSelected = selectedZone?.id === zone.id;
              return (
                <Card
                  key={zone.id}
                  onClick={() => setSelectedZone(zone)}
                  className={`p-4 cursor-pointer transition-all border ${
                    isSelected
                      ? 'border-violet-600 bg-violet-50/50 dark:bg-violet-950/40 ring-2 ring-violet-500/20'
                      : 'hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white font-serif">{zone.name}</h4>
                    <Badge variant={isSelected ? 'primary' : 'neutral'}>
                      {zone.radiusKm} km radius
                    </Badge>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {zone.description}
                  </p>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-semibold pt-2 mt-2 border-t border-slate-100 dark:border-slate-800">
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3 text-cyan-500" /> {zone.activeDecorators} Decorators Ready
                    </span>
                    <span className="text-emerald-600 font-bold">24/7 Priority Dispatch</span>
                  </div>
                </Card>
              );
            })}
          </div>

          <div className="p-4 bg-slate-100 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 text-center space-y-2">
            <h5 className="text-xs font-bold text-slate-900 dark:text-white">Outside standard radius?</h5>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              We travel worldwide for destination weddings and corporate summits.
            </p>
            <Button size="sm" variant="outline" className="w-full">
              Request Travel Quote
            </Button>
          </div>
        </div>

      </div>

    </div>
  );
};
