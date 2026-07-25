import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid
} from 'recharts';
import {
  ShieldCheck,
  TrendingUp,
  DollarSign,
  Users,
  Calendar,
  Layers,
  Plus,
  UserPlus,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Edit,
  Trash2
} from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { StatusBadge, Badge } from '../../components/common/Badge';
import { Avatar } from '../../components/common/Avatar';
import { Modal } from '../../components/common/Modal';
import { MONTHLY_REVENUE_DATA, SERVICE_DEMAND_DATA, BOOKINGS_HISTOGRAM_DATA } from '../../data/mockData';

const COLORS = ['#8B5CF6', '#06B6D4', '#F59E0B', '#10B981', '#EC4899'];

export const AdminDashboard = () => {
  const { bookings, decorators, services, assignDecoratorToBooking, addDecorator, addService } = useBooking();

  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'bookings' | 'decorators' | 'services'
  
  // Modals state
  const [isAddDecoratorOpen, setIsAddDecoratorOpen] = useState(false);
  const [isAddServiceOpen, setIsAddServiceOpen] = useState(false);

  // New Decorator form
  const [newDecName, setNewDecName] = useState('');
  const [newDecSpecialty, setNewDecSpecialty] = useState('Wedding Stage Architecture');

  // New Service form
  const [newSrvName, setNewSrvName] = useState('');
  const [newSrvCat, setNewSrvCat] = useState('Wedding');
  const [newSrvPrice, setNewSrvPrice] = useState(1500);

  // Total Metrics
  const totalRevenue = bookings.reduce((sum, b) => sum + (b.paymentStatus === 'Paid' ? b.amount : 0), 0);
  const activeBookingsCount = bookings.filter((b) => b.status !== 'Completed').length;

  const handleAddDecSubmit = (e) => {
    e.preventDefault();
    if (!newDecName.trim()) return;

    addDecorator({
      name: newDecName,
      role: 'Staff Lead Designer',
      specialties: [newDecSpecialty, 'Lighting Setup'],
      rating: 4.9,
      completedProjects: 12,
      avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300`,
      bio: 'Newly appointed lead designer with expertise in architectural stage setups.'
    });

    setIsAddDecoratorOpen(false);
    setNewDecName('');
  };

  const handleAddSrvSubmit = (e) => {
    e.preventDefault();
    if (!newSrvName.trim()) return;

    addService({
      name: newSrvName,
      category: newSrvCat,
      price: Number(newSrvPrice),
      description: 'Custom architectural decoration package tailored for high-profile galas.',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800',
      rating: 5.0,
      reviewCount: 1,
      estimatedDuration: '4 Hours',
      whatsIncluded: ['3D CAD Layout', 'Stage Rigging', 'DMX Ambient Lights'],
      gallery: ['https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800'],
      availableDecorators: ['dec-01', 'dec-02'],
      popular: true
    });

    setIsAddServiceOpen(false);
    setNewSrvName('');
  };

  return (
    <div className="space-y-8">
      
      {/* Admin Executive Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-violet-950 to-slate-900 rounded-3xl p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-violet-600/30 border border-violet-500/40 flex items-center justify-center text-violet-400">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-violet-500/20 px-2.5 py-0.5 rounded-full text-violet-300 border border-violet-500/30">
              Executive Director Console
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-serif mt-1">
              StyleDecor Operations & Analytics
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Real-time booking revenue, decorator dispatch, and service catalog management.
            </p>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap items-center gap-2 bg-slate-800/80 p-1.5 rounded-2xl border border-slate-700">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              activeTab === 'overview' ? 'bg-violet-600 text-white shadow-md' : 'text-slate-300 hover:text-white'
            }`}
          >
            Analytics
          </button>
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              activeTab === 'bookings' ? 'bg-violet-600 text-white shadow-md' : 'text-slate-300 hover:text-white'
            }`}
          >
            Bookings ({bookings.length})
          </button>
          <button
            onClick={() => setActiveTab('decorators')}
            className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              activeTab === 'decorators' ? 'bg-violet-600 text-white shadow-md' : 'text-slate-300 hover:text-white'
            }`}
          >
            Decorators ({decorators.length})
          </button>
          <button
            onClick={() => setActiveTab('services')}
            className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              activeTab === 'services' ? 'bg-violet-600 text-white shadow-md' : 'text-slate-300 hover:text-white'
            }`}
          >
            Services ({services.length})
          </button>
        </div>
      </div>

      {/* OVERVIEW ANALYTICS TAB */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          
          {/* Executive Stats Bar */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 space-y-2 border-l-4 border-l-violet-600">
              <span className="text-[10px] uppercase font-bold text-slate-400">Total Booking Revenue</span>
              <p className="text-2xl font-extrabold font-serif text-slate-900 dark:text-white">
                ${totalRevenue.toLocaleString()} <span className="text-xs font-semibold text-emerald-500">+18%</span>
              </p>
            </Card>
            <Card className="p-6 space-y-2 border-l-4 border-l-cyan-500">
              <span className="text-[10px] uppercase font-bold text-slate-400">Active Setup Projects</span>
              <p className="text-2xl font-extrabold font-serif text-slate-900 dark:text-white">
                {activeBookingsCount} Events
              </p>
            </Card>
            <Card className="p-6 space-y-2 border-l-4 border-l-amber-500">
              <span className="text-[10px] uppercase font-bold text-slate-400">Certified Staff</span>
              <p className="text-2xl font-extrabold font-serif text-slate-900 dark:text-white">
                {decorators.length} Decorators
              </p>
            </Card>
            <Card className="p-6 space-y-2 border-l-4 border-l-emerald-500">
              <span className="text-[10px] uppercase font-bold text-slate-400">Client Satisfaction</span>
              <p className="text-2xl font-extrabold font-serif text-slate-900 dark:text-white">
                4.95 / 5.0
              </p>
            </Card>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Monthly Revenue Bar Chart */}
            <Card className="lg:col-span-8 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold font-serif text-slate-900 dark:text-white">
                    Monthly Revenue Trend ($ USD)
                  </h3>
                  <p className="text-xs text-slate-400">Projected vs actual booking settlements</p>
                </div>
                <Badge variant="success">YTD Growth</Badge>
              </div>

              <div className="h-72 w-full pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={MONTHLY_REVENUE_DATA}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                    <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1E293B',
                        borderColor: '#334155',
                        borderRadius: '12px',
                        color: '#fff',
                        fontSize: '12px'
                      }}
                    />
                    <Bar dataKey="revenue" fill="#8B5CF6" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Service Category Share Pie Chart */}
            <Card className="lg:col-span-4 p-6 space-y-4">
              <div>
                <h3 className="text-base font-bold font-serif text-slate-900 dark:text-white">
                  Demand by Category
                </h3>
                <p className="text-xs text-slate-400">Share of total event reservations</p>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={SERVICE_DEMAND_DATA}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={85}
                      paddingAngle={5}
                      dataKey="percentage"
                    >
                      {SERVICE_DEMAND_DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px]">
                {SERVICE_DEMAND_DATA.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-1.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                    />
                    <span className="text-slate-600 dark:text-slate-300 truncate">{item.category} ({item.percentage}%)</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Bookings Histogram */}
            <Card className="lg:col-span-12 p-6 space-y-4">
              <div>
                <h3 className="text-base font-bold font-serif text-slate-900 dark:text-white">
                  Weekly Booking Volume Histogram
                </h3>
                <p className="text-xs text-slate-400">Completed vs active decoration setup count</p>
              </div>

              <div className="h-60 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={BOOKINGS_HISTOGRAM_DATA}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                    <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Line type="monotone" dataKey="count" stroke="#06B6D4" strokeWidth={3} dot={{ r: 5 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>

          </div>
        </div>
      )}

      {/* MANAGE BOOKINGS TAB */}
      {activeTab === 'bookings' && (
        <Card className="p-6 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-base font-bold font-serif text-slate-900 dark:text-white">
                All Event Reservations ({bookings.length})
              </h3>
              <p className="text-xs text-slate-400">Assign certified lead decorators to active bookings</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-semibold uppercase text-[10px]">
                  <th className="py-3 px-3">Booking ID</th>
                  <th className="py-3 px-3">Service & Format</th>
                  <th className="py-3 px-3">Client</th>
                  <th className="py-3 px-3">Date & Time</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3">Assigned Decorator</th>
                  <th className="py-3 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {bookings.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="py-3 px-3 font-mono text-violet-600 font-bold">{b.id}</td>
                    <td className="py-3 px-3 font-semibold text-slate-900 dark:text-white">{b.serviceName}</td>
                    <td className="py-3 px-3">{b.userName}</td>
                    <td className="py-3 px-3">{b.date} ({b.time})</td>
                    <td className="py-3 px-3"><StatusBadge status={b.status} /></td>
                    <td className="py-3 px-3">
                      <select
                        value={b.decoratorId || ''}
                        onChange={(e) => {
                          const dec = decorators.find((d) => d.id === e.target.value);
                          if (dec) assignDecoratorToBooking(b.id, dec.id, dec.name);
                        }}
                        className="px-2 py-1 text-xs bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                      >
                        <option value="">-- Assign Staff --</option>
                        {decorators.map((d) => (
                          <option key={d.id} value={d.id}>{d.name}</option>
                        ))}
                      </select>
                    </td>
                    <td className="py-3 px-3 text-right font-bold text-slate-900 dark:text-white">${b.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* MANAGE DECORATORS TAB */}
      {activeTab === 'decorators' && (
        <Card className="p-6 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-base font-bold font-serif text-slate-900 dark:text-white">
                Certified Staff Decorators ({decorators.length})
              </h3>
              <p className="text-xs text-slate-400">Manage lead designers and stage riggers</p>
            </div>
            <Button
              size="sm"
              onClick={() => setIsAddDecoratorOpen(true)}
              leftIcon={<UserPlus className="w-4 h-4" />}
            >
              Add New Decorator
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {decorators.map((dec) => (
              <Card key={dec.id} className="p-5 space-y-3">
                <div className="flex items-center gap-3">
                  <Avatar src={dec.avatar} alt={dec.name} size="lg" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white font-serif">{dec.name}</h4>
                    <p className="text-xs text-violet-600 dark:text-violet-400">{dec.role}</p>
                    <p className="text-[10px] text-slate-400">⭐ {dec.rating} ({dec.completedProjects} events)</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  {dec.specialties.map((spec, i) => (
                    <span key={i} className="px-2 py-0.5 text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded">
                      {spec}
                    </span>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </Card>
      )}

      {/* MANAGE SERVICES TAB */}
      {activeTab === 'services' && (
        <Card className="p-6 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-base font-bold font-serif text-slate-900 dark:text-white">
                Decoration Package Catalog ({services.length})
              </h3>
              <p className="text-xs text-slate-400">Create or modify stage and botanical packages</p>
            </div>
            <Button
              size="sm"
              onClick={() => setIsAddServiceOpen(true)}
              leftIcon={<Plus className="w-4 h-4" />}
            >
              Add New Package
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((srv) => (
              <Card key={srv.id} className="p-4 space-y-3">
                <img src={srv.image} alt={srv.name} className="w-full h-36 object-cover rounded-xl" />
                <div>
                  <Badge variant="primary">{srv.category}</Badge>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white font-serif mt-1">{srv.name}</h4>
                  <p className="text-sm font-bold text-violet-600 dark:text-violet-400">${srv.price} USD</p>
                </div>
              </Card>
            ))}
          </div>
        </Card>
      )}

      {/* Modal: Add Decorator */}
      <Modal isOpen={isAddDecoratorOpen} onClose={() => setIsAddDecoratorOpen(false)} title="Add Certified Decorator">
        <form onSubmit={handleAddDecSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Full Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Julian Vance"
              value={newDecName}
              onChange={(e) => setNewDecName(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Primary Specialty</label>
            <input
              type="text"
              required
              value={newDecSpecialty}
              onChange={(e) => setNewDecSpecialty(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
            />
          </div>
          <Button type="submit" size="sm" className="w-full">
            Register Staff Member
          </Button>
        </form>
      </Modal>

      {/* Modal: Add Service */}
      <Modal isOpen={isAddServiceOpen} onClose={() => setIsAddServiceOpen(false)} title="Create Decoration Package">
        <form onSubmit={handleAddSrvSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Package Name</label>
            <input
              type="text"
              required
              placeholder="e.g., Celestial Dusk Canopy"
              value={newSrvName}
              onChange={(e) => setNewSrvName(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Category</label>
              <select
                value={newSrvCat}
                onChange={(e) => setNewSrvCat(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
              >
                <option value="Wedding">Wedding</option>
                <option value="Birthday">Birthday</option>
                <option value="Corporate">Corporate</option>
                <option value="Festival">Festival</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Price ($ USD)</label>
              <input
                type="number"
                required
                value={newSrvPrice}
                onChange={(e) => setNewSrvPrice(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
              />
            </div>
          </div>
          <Button type="submit" size="sm" className="w-full">
            Publish Package Catalog
          </Button>
        </form>
      </Modal>

    </div>
  );
};
