import React, { useState, useEffect } from 'react';
import { User } from './types';
import { getCurrentUser, logout } from './services/authService';
import LoginPage from './pages/LoginPage';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Header from './components/Header';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(getCurrentUser());

  const handleLogin = (user: User) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    logout();
    setCurrentUser(null);
  };

  const renderContent = () => {
    if (!currentUser) {
      return (
        <LoginPage 
          onLogin={handleLogin} 
        />
      );
    }

    return (
      <>
        <Header user={currentUser} onLogout={handleLogout} />
        <main className="flex-grow">
          {currentUser.role === 'admin' ? <AdminDashboard /> : <UserDashboard />}
        </main>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {renderContent()}
    </div>
  );
};

export default App;