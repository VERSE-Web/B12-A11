import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Sparkles, LogIn, ShieldCheck, AlertCircle } from 'lucide-react';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';

export const Login = () => {
  const { login, googleLogin, isLoading, adminEmail } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      await login(email, password);
      toast.success('Signed in successfully!');
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || 'Invalid credentials or login failed.');
      toast.error('Authentication failed. Please check your credentials.');
    }
  };

  const handleGoogle = async () => {
    setErrorMsg('');
    try {
      await googleLogin();
      toast.success('Signed in with Google!');
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || 'Google Sign-In failed.');
      toast.error('Google Sign-In failed.');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md p-8 space-y-6 shadow-xl border border-slate-200 dark:border-slate-800">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-violet-600 via-cyan-500 to-amber-400 p-0.5 mx-auto shadow-md">
            <div className="w-full h-full bg-white dark:bg-[#1E293B] rounded-[14px] flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-violet-600 dark:text-violet-400" />
            </div>
          </div>
          <h1 className="text-2xl font-bold font-serif text-slate-900 dark:text-white">
            Welcome Back to StyleDecor
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Sign in using your Firebase account to access custom decor bookings and admin controls.
          </p>
        </div>

        {/* Admin notice banner */}
        <div className="p-3 bg-violet-50 dark:bg-violet-950/40 rounded-xl border border-violet-100 dark:border-violet-900/50 space-y-1">
          <span className="text-[10px] uppercase font-bold text-violet-600 dark:text-violet-400 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Executive Director Admin Email
          </span>
          <p className="text-[11px] text-slate-700 dark:text-slate-300 font-mono">
            {adminEmail}
          </p>
          <button
            type="button"
            onClick={() => setEmail(adminEmail)}
            className="text-[10px] text-violet-600 dark:text-violet-400 font-bold hover:underline cursor-pointer"
          >
            Click to fill Admin Email
          </button>
        </div>

        {errorMsg && (
          <div className="p-3 bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 text-xs rounded-xl flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full"
            isLoading={isLoading}
            rightIcon={<LogIn className="w-4 h-4" />}
          >
            Sign In with Firebase
          </Button>
        </form>

        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
          <span className="flex-shrink mx-4 text-[10px] text-slate-400 uppercase font-bold">Or continue with</span>
          <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
        </div>

        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={handleGoogle}
          isLoading={isLoading}
        >
          Sign in with Google
        </Button>

        <p className="text-center text-xs text-slate-500">
          Don't have an account?{' '}
          <Link to="/register" className="text-violet-600 dark:text-violet-400 font-bold hover:underline">
            Register Here
          </Link>
        </p>
      </Card>
    </div>
  );
};
