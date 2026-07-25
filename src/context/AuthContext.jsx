import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updateProfile as updateFirebaseProfile
} from 'firebase/auth';
import { auth, googleProvider } from '../firebase/firebase.config';

const AuthContext = createContext(undefined);

const ADMIN_EMAIL = 'mehranislam111@gmail.com';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRoleState] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('styledecor_theme') === 'dark';
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('styledecor_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('styledecor_theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  // Firebase auth state change listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const userEmail = firebaseUser.email || '';
        const isAdmin = userEmail.toLowerCase() === ADMIN_EMAIL.toLowerCase();
        // Strictly prevent non-admins from having ADMIN role
        const savedRole = localStorage.getItem('styledecor_role');
        const userRole = isAdmin ? 'ADMIN' : (savedRole === 'ADMIN' ? 'USER' : (savedRole || 'USER'));

        const userData = {
          uid: firebaseUser.uid,
          id: firebaseUser.uid,
          name: firebaseUser.displayName || userEmail.split('@')[0] || 'Member',
          email: userEmail,
          role: userRole,
          avatar: firebaseUser.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${userEmail}`,
          phone: firebaseUser.phoneNumber || '',
          createdAt: new Date().toISOString().split('T')[0]
        };

        setUser(userData);
        setRoleState(userRole);
        localStorage.setItem('styledecor_user', JSON.stringify(userData));
        localStorage.setItem('styledecor_role', userRole);
      } else {
        setUser(null);
        setRoleState(null);
        localStorage.removeItem('styledecor_user');
        localStorage.removeItem('styledecor_role');
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const fbUser = userCredential.user;
      const isAdmin = fbUser.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase();
      const userRole = isAdmin ? 'ADMIN' : 'USER';
      
      const userData = {
        uid: fbUser.uid,
        id: fbUser.uid,
        name: fbUser.displayName || fbUser.email.split('@')[0],
        email: fbUser.email,
        role: userRole,
        avatar: fbUser.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${fbUser.email}`
      };
      setUser(userData);
      setRoleState(userRole);
      return userData;
    } catch (error) {
      console.error("Firebase Login Error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name, email, password) => {
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const fbUser = userCredential.user;
      
      if (name) {
        await updateFirebaseProfile(fbUser, { displayName: name });
      }

      const isAdmin = email.toLowerCase() === ADMIN_EMAIL.toLowerCase();
      const userRole = isAdmin ? 'ADMIN' : 'USER';

      const userData = {
        uid: fbUser.uid,
        id: fbUser.uid,
        name: name || email.split('@')[0],
        email: email,
        role: userRole,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
      };
      setUser(userData);
      setRoleState(userRole);
      return userData;
    } catch (error) {
      console.error("Firebase Register Error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const googleLogin = async () => {
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const fbUser = result.user;
      const isAdmin = fbUser.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase();
      const userRole = isAdmin ? 'ADMIN' : 'USER';

      const userData = {
        uid: fbUser.uid,
        id: fbUser.uid,
        name: fbUser.displayName || 'Google Member',
        email: fbUser.email,
        role: userRole,
        avatar: fbUser.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${fbUser.email}`
      };
      setUser(userData);
      setRoleState(userRole);
      return userData;
    } catch (error) {
      console.error("Firebase Google Login Error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await signOut(auth);
      setUser(null);
      setRoleState(null);
      localStorage.removeItem('styledecor_user');
      localStorage.removeItem('styledecor_role');
    } catch (error) {
      console.error("Firebase Logout Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const setRole = (newRole) => {
    if (user) {
      const isAdmin = user.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase();
      // Non-admin users are strictly blocked from setting role to ADMIN
      const effectiveRole = isAdmin ? 'ADMIN' : (newRole === 'ADMIN' ? 'USER' : newRole);
      setRoleState(effectiveRole);
      localStorage.setItem('styledecor_role', effectiveRole);
      setUser(prev => prev ? { ...prev, role: effectiveRole } : null);
    }
  };

  const updateProfile = (data) => {
    if (!user) return;
    const updated = { ...user, ...data };
    setUser(updated);
    localStorage.setItem('styledecor_user', JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        adminEmail: ADMIN_EMAIL,
        setRole,
        darkMode,
        toggleDarkMode,
        login,
        register,
        googleLogin,
        logout,
        updateProfile,
        isLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
