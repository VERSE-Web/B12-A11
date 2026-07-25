import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserDashboard } from './UserDashboard';
import { DecoratorDashboard } from './DecoratorDashboard';
import { AdminDashboard } from './AdminDashboard';

export const Dashboard = () => {
  const { role, user, adminEmail } = useAuth();

  const isAdmin = role === 'ADMIN' && user?.email?.toLowerCase() === adminEmail.toLowerCase();

  if (isAdmin) {
    return <AdminDashboard />;
  }

  if (role === 'DECORATOR') {
    return <DecoratorDashboard />;
  }

  return <UserDashboard />;
};
