import React, { useState, useEffect } from 'react';
import { getSubmissions } from '../services/formService';
import { getAllUsers, deleteUser, createUser, getCurrentUser } from '../services/authService';
import { getDrivers, addDriver, deleteDriver } from '../services/driverService';
import { Submission, User } from '../types';
import SubmissionCard from '../components/SubmissionCard';

const AdminDashboard: React.FC = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [drivers, setDrivers] = useState<string[]>([]);
  const [newDriverName, setNewDriverName] = useState('');
  const [driverError, setDriverError] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [showNewUserPassword, setShowNewUserPassword] = useState(false);
  const [userError, setUserError] = useState('');
  const [userSuccess, setUserSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const loadData = () => {
      try {
        setSubmissions(getSubmissions());
        setUsers(getAllUsers());
        setDrivers(getDrivers());
        setCurrentUser(getCurrentUser());
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const handleDeleteUser = (username: string) => {
    if (window.confirm(`Are you sure you want to delete the user ${username}? This action cannot be undone.`)) {
        try {
            deleteUser(username);
            setUsers(currentUsers => currentUsers.filter(user => user.username !== username));
        } catch (error) {
            console.error("Failed to delete user:", error);
            alert("An error occurred while trying to delete the user.");
        }
    }
  };
  
  const handleAddDriver = (e: React.FormEvent) => {
    e.preventDefault();
    setDriverError('');
    if (!newDriverName.trim()) {
      setDriverError('Driver name cannot be empty.');
      return;
    }
    try {
      const updatedDrivers = addDriver(newDriverName);
      setDrivers(updatedDrivers);
      setNewDriverName('');
    } catch (error: any) {
      setDriverError(error.message);
    }
  };

  const handleDeleteDriver = (name: string) => {
    if (window.confirm(`Are you sure you want to delete the driver "${name}"?`)) {
      try {
        const updatedDrivers = deleteDriver(name);
        setDrivers(updatedDrivers);
      } catch (error) {
        console.error("Failed to delete driver:", error);
        alert("An error occurred while trying to delete the driver.");
      }
    }
  };

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    setUserError('');
    setUserSuccess('');

    if (!newUsername || !newUserPassword) {
      setUserError('Username and password are required.');
      return;
    }

    try {
      const newUser = createUser(newUsername, newUserPassword);
      if (newUser) {
        setUsers(currentUsers => [...currentUsers, newUser].sort((a,b) => a.username.localeCompare(b.username)));
        setNewUsername('');
        setNewUserPassword('');
        setUserSuccess(`User ${newUsername} created successfully.`);
        setTimeout(() => setUserSuccess(''), 3000);
      } else {
        setUserError('This username is already registered.');
      }
    } catch (error: any) {
      setUserError(error.message || 'An unexpected error occurred.');
    }
  };

  const filteredUsers = users.filter(user => user.username !== currentUser?.username);

  return (
    <div className="p-2 sm:p-4 md:p-8">
      <div className="w-full max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

        {/* Driver Management Section */}
        <div className="mb-10 bg-white shadow-2xl rounded-lg overflow-hidden">
            <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-700">Driver Management</h2>
                <p className="text-gray-500 mt-1">Add or remove drivers from the list.</p>
            </div>
            
            <form onSubmit={handleAddDriver} className="px-6 pb-4 border-b border-slate-200">
              <div className="flex flex-col sm:flex-row gap-2">
                <input 
                  type="text"
                  value={newDriverName}
                  onChange={(e) => {
                    setNewDriverName(e.target.value);
                    setDriverError('');
                  }}
                  placeholder="Enter new driver name"
                  className="flex-grow w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  aria-label="New driver name"
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-colors"
                >
                  Add Driver
                </button>
              </div>
              {driverError && <p className="text-red-600 text-sm mt-2">{driverError}</p>}
            </form>

            {isLoading ? (
                <p className="p-6 text-center text-gray-500">Loading drivers...</p>
            ) : drivers.length === 0 ? (
                <p className="p-6 text-center text-gray-500">No drivers found. Add one above.</p>
            ) : (
                <div className="divide-y divide-slate-200">
                {drivers.map(driver => (
                    <div key={driver} className="flex flex-col sm:flex-row justify-between sm:items-center p-4 hover:bg-slate-50 transition-colors">
                        <span className="text-gray-800 font-medium mb-2 sm:mb-0 break-all">{driver}</span>
                        <button
                            onClick={() => handleDeleteDriver(driver)}
                            className="px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75 transition-colors self-end sm:self-center"
                            aria-label={`Delete driver ${driver}`}
                        >
                            Delete
                        </button>
                    </div>
                ))}
                </div>
            )}
        </div>

        {/* User Management Section */}
        <div className="mb-10 bg-white shadow-2xl rounded-lg overflow-hidden">
            <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-700">User Management</h2>
                <p className="text-gray-500 mt-1">Add, view, and manage all registered users.</p>
            </div>

            <form onSubmit={handleCreateUser} className="px-6 pb-4 border-b border-slate-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-2">
                <input
                  type="text"
                  value={newUsername}
                  onChange={e => { setNewUsername(e.target.value); setUserError(''); }}
                  placeholder="New user's username"
                  className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  aria-label="New user username"
                />
                <div className="relative">
                    <input
                    type={showNewUserPassword ? 'text' : 'password'}
                    value={newUserPassword}
                    onChange={e => { setNewUserPassword(e.target.value); setUserError(''); }}
                    placeholder="New user's password"
                    className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    aria-label="New user password"
                    />
                    <button
                        type="button"
                        onClick={() => setShowNewUserPassword(!showNewUserPassword)}
                        className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:text-gray-700"
                        aria-label={showNewUserPassword ? "Hide password" : "Show password"}
                    >
                        {showNewUserPassword ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074L3.707 2.293zM10 12a2 2 0 110-4 2 2 0 010 4z" clipRule="evenodd" />
                            <path d="M10 17a9.95 9.95 0 01-4.522-1.074L4.08 14.5A8.008 8.008 0 0010 15c4.478 0 8.268-2.943 9.542-7a10.014 10.014 0 01-1.473-3.414l-1.42 1.42A8.008 8.008 0 0110 13a7.973 7.973 0 01-2.08-.29l-1.42 1.42A9.95 9.95 0 0110 17z" />
                        </svg>
                        ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                        </svg>
                        )}
                    </button>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75 transition-colors"
                >
                  Add User
                </button>
              </div>
              {userError && <p className="text-red-600 text-sm mt-2 text-center">{userError}</p>}
              {userSuccess && <p className="text-green-600 text-sm mt-2 text-center">{userSuccess}</p>}
            </form>

            <div className="p-6 pt-2">
              <h3 className="text-lg font-semibold text-gray-700 mt-4">Existing Users</h3>
            </div>
            {isLoading ? (
                <p className="p-6 text-center text-gray-500">Loading users...</p>
            ) : filteredUsers.length === 0 ? (
                <p className="p-6 text-center text-gray-500">There are no other registered users.</p>
            ) : (
                <div className="divide-y divide-slate-200">
                {filteredUsers.map(user => (
                    <div key={user.username} className="flex flex-col sm:flex-row justify-between sm:items-center p-4 hover:bg-slate-50 transition-colors">
                        <span className="text-gray-800 font-medium mb-2 sm:mb-0 break-all">{user.username}</span>
                        <button
                            onClick={() => handleDeleteUser(user.username)}
                            className="px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75 transition-colors self-end sm:self-center"
                        >
                            Delete User
                        </button>
                    </div>
                ))}
                </div>
            )}
        </div>

        {/* Submissions Section */}
        <div className="bg-white shadow-2xl rounded-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-700">All Form Submissions</h2>
            <p className="text-gray-500 mt-1">Review all forms submitted by drivers.</p>
          </div>

          {isLoading ? (
            <p className="p-6 text-center text-gray-500">Loading submissions...</p>
          ) : submissions.length === 0 ? (
            <p className="p-6 text-center text-gray-500">No submissions have been made yet.</p>
          ) : (
            <div className="space-y-2 p-2 sm:p-4 bg-slate-50">
              {submissions.map(submission => (
                <SubmissionCard key={submission.id} submission={submission} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;