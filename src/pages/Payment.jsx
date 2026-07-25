import React, { useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import {
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Sparkles,
  ArrowRight,
  Receipt,
  Calendar,
  MapPin
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';

export const Payment = () => {
  const [searchParams] = useSearchParams();
  const bookingId = searchParams.get('bookingId');
  const navigate = useNavigate();

  const { bookings, updateBookingStatus } = useBooking();

  const booking = bookings.find((b) => b.id === bookingId) || bookings[0];

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [expiry, setExpiry] = useState('12/28');
  const [cvc, setCvc] = useState('888');
  const [cardHolder, setCardHolder] = useState(booking?.userName || 'Samantha Reed');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  if (!booking) {
    return (
      <div className="max-w-md mx-auto py-20 text-center space-y-4">
        <h2 className="text-xl font-bold font-serif">No Booking Specified</h2>
        <p className="text-xs text-slate-500">Please select a service or visit your dashboard.</p>
        <Link to="/services"><Button variant="primary">Explore Services</Button></Link>
      </div>
    );
  }

  const handlePay = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      // Mark as paid
      booking.paymentStatus = 'Paid';
      booking.paymentMethod = paymentMethod === 'card' ? `Stripe Card (**** ${cardNumber.slice(-4)})` : 'Google Pay';
      updateBookingStatus(booking.id, 'Assigned', 'Payment completed via Stripe. Decorator notified.');
      setIsProcessing(false);
      setPaymentSuccess(true);
    }, 1200);
  };

  if (paymentSuccess) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16">
        <Card className="p-8 text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <Badge variant="success">Payment Confirmed via Stripe</Badge>
            <h1 className="text-3xl font-extrabold font-serif text-slate-900 dark:text-white">
              Booking Reserved!
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              Your payment of <strong className="text-slate-900 dark:text-white">${booking.amount} USD</strong> was processed successfully. Booking reference: <span className="font-mono font-bold text-violet-600">{booking.id}</span>
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200/60 dark:border-slate-800 text-left text-xs space-y-2.5 max-w-md mx-auto">
            <div className="flex justify-between">
              <span className="text-slate-500">Service:</span>
              <span className="font-bold text-slate-900 dark:text-white">{booking.serviceName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Event Date:</span>
              <span className="font-bold text-slate-900 dark:text-white">{booking.date} at {booking.time}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Location:</span>
              <span className="font-bold text-slate-900 dark:text-white truncate max-w-[200px]">{booking.location}</span>
            </div>
            <div className="flex justify-between border-t border-slate-200/60 dark:border-slate-800 pt-2">
              <span className="text-slate-500">Assigned Decorator:</span>
              <span className="font-bold text-violet-600 dark:text-violet-400">{booking.decoratorName || 'Elena Rostova'}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Button variant="primary" onClick={() => navigate('/dashboard')}>
              Go to Customer Dashboard
            </Button>
            <Button variant="outline" onClick={() => navigate('/coverage-map')}>
              View Service Area Map
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-violet-600 dark:text-violet-400">
          Secure Stripe Checkout
        </span>
        <h1 className="text-3xl font-extrabold font-serif text-slate-900 dark:text-white">
          Complete Your Reservation
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Stripe Payment Form */}
        <div className="lg:col-span-7 space-y-6">
          <Card className="p-6 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-sm font-bold font-serif text-slate-900 dark:text-white flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-violet-600" /> Payment Details
              </h3>
              <div className="flex items-center gap-1 text-[11px] text-slate-400 font-semibold">
                <Lock className="w-3.5 h-3.5 text-emerald-500" /> 256-bit SSL Encrypted
              </div>
            </div>

            {/* Method Select */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                  paymentMethod === 'card'
                    ? 'border-violet-600 bg-violet-50 dark:bg-violet-950/40 text-violet-900 dark:text-violet-200'
                    : 'border-slate-200 dark:border-slate-800 text-slate-600'
                }`}
              >
                <CreditCard className="w-4 h-4 text-violet-600" /> Credit / Debit Card
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('google')}
                className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                  paymentMethod === 'google'
                    ? 'border-violet-600 bg-violet-50 dark:bg-violet-950/40 text-violet-900 dark:text-violet-200'
                    : 'border-slate-200 dark:border-slate-800 text-slate-600'
                }`}
              >
                <span>Google Pay</span>
              </button>
            </div>

            {paymentMethod === 'card' ? (
              <form onSubmit={handlePay} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    required
                    value={cardHolder}
                    onChange={(e) => setCardHolder(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Card Number
                  </label>
                  <div className="relative">
                    <CreditCard className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="MM/YY"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      CVC / CVV
                    </label>
                    <input
                      type="password"
                      required
                      maxLength={4}
                      value={cvc}
                      onChange={(e) => setCvc(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-mono"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full mt-4"
                  isLoading={isProcessing}
                  rightIcon={<Lock className="w-4 h-4" />}
                >
                  Pay ${booking.amount} USD via Stripe
                </Button>
              </form>
            ) : (
              <div className="text-center py-6 space-y-4">
                <p className="text-xs text-slate-500">Pay instantly using Google Pay with 1-Click authorization.</p>
                <Button
                  size="lg"
                  onClick={handlePay}
                  isLoading={isProcessing}
                  className="w-full bg-slate-900 text-white hover:bg-slate-800"
                >
                  Pay ${booking.amount} with GPay
                </Button>
              </div>
            )}
          </Card>
        </div>

        {/* Right: Booking Summary */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="p-6 space-y-4">
            <h3 className="text-sm font-bold font-serif text-slate-900 dark:text-white flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
              <Receipt className="w-4 h-4 text-violet-600" /> Order & Booking Summary
            </h3>

            <div className="flex items-center gap-3">
              <img
                src={booking.serviceImage}
                alt={booking.serviceName}
                className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
              />
              <div>
                <span className="text-[10px] uppercase font-bold text-violet-600">{booking.serviceCategory}</span>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white font-serif line-clamp-1">{booking.serviceName}</h4>
                <p className="text-[11px] text-slate-400">{booking.serviceType}</p>
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-violet-500" /> Event Date</span>
                <span className="font-bold text-slate-900 dark:text-white">{booking.date} at {booking.time}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-amber-500" /> Location</span>
                <span className="font-bold text-slate-900 dark:text-white truncate max-w-[180px]">{booking.location}</span>
              </div>
            </div>

            <div className="space-y-2 text-xs border-t border-slate-100 dark:border-slate-800 pt-3">
              <div className="flex justify-between text-slate-500">
                <span>Subtotal</span>
                <span>${booking.amount} USD</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Setup & Logistics Fee</span>
                <span className="text-emerald-600 font-semibold">INCLUDED</span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-slate-900 dark:text-white pt-2 border-t border-slate-100 dark:border-slate-800">
                <span>Total Amount</span>
                <span className="text-violet-600 dark:text-violet-400">${booking.amount} USD</span>
              </div>
            </div>
          </Card>
        </div>

      </div>

    </div>
  );
};
