import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Load users from LocalStorage
    const storedUsers = JSON.parse(localStorage.getItem('tt_users')) || [];
    
    // Add default admin if not exists
    const hasAdmin = storedUsers.find(u => u.email === 'admin@tastytracks.com');
    if (!hasAdmin) {
      storedUsers.push({
        name: 'Admin',
        email: 'admin@tastytracks.com',
        password: 'admin',
        role: 'admin',
        favorites: []
      });
      localStorage.setItem('tt_users', JSON.stringify(storedUsers));
    }
    setUsers(storedUsers);

    // Load current session
    const session = JSON.parse(localStorage.getItem('tt_session'));
    if (session) {
      setCurrentUser(session);
    }
  }, []);

  const signup = (name, email, password) => {
    if (users.find(u => u.email === email)) {
      toast.error('Email already registered!', { theme: 'dark' });
      return false;
    }
    const newUser = { name, email, password, role: 'user', favorites: [] };
    const newUsers = [...users, newUser];
    setUsers(newUsers);
    localStorage.setItem('tt_users', JSON.stringify(newUsers));
    
    setCurrentUser(newUser);
    localStorage.setItem('tt_session', JSON.stringify(newUser));
    toast.success('Account created successfully!', { theme: 'dark' });
    return true;
  };

  const login = (email, password) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      localStorage.setItem('tt_session', JSON.stringify(user));
      toast.success(`Welcome back, ${user.name}!`, { theme: 'dark' });
      return user;
    }
    toast.error('Invalid email or password!', { theme: 'dark' });
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('tt_session');
    toast.info('Logged out successfully.', { theme: 'dark' });
  };

  return (
    <AuthContext.Provider value={{ currentUser, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
