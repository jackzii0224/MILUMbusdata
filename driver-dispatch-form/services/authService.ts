import { User } from '../types';

const USERS_KEY = 'dispatch_users';
const CURRENT_USER_KEY = 'dispatch_current_user';
const ADMIN_USERNAME = 'Admin';

// Seed a default admin user if one doesn't exist
const seedAdminUser = () => {
  const users = JSON.parse(localStorage.getItem(USERS_KEY) || '{}');
  if (!users[ADMIN_USERNAME]) {
    users[ADMIN_USERNAME] = 'adaS$128'; // Plain text password for simplicity
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }
};

seedAdminUser();

export const createUser = (username: string, password: string): User | null => {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '{}');
    if (users[username]) {
        return null; // User already exists
    }
    users[username] = password;
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    const newUser: User = { username, role: 'user' };
    return newUser;
};


export const login = (username: string, password: string): User | null => {
  const users = JSON.parse(localStorage.getItem(USERS_KEY) || '{}');
  if (users[username] && users[username] === password) {
    const user: User = {
      username,
      role: username === ADMIN_USERNAME ? 'admin' : 'user',
    };
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    return user;
  }
  return null;
};

export const logout = () => {
  localStorage.removeItem(CURRENT_USER_KEY);
};

export const getCurrentUser = (): User | null => {
  const userJson = localStorage.getItem(CURRENT_USER_KEY);
  return userJson ? JSON.parse(userJson) : null;
};

export const getAllUsers = (): User[] => {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '{}');
    return Object.keys(users).map(username => ({
        username,
        role: username === ADMIN_USERNAME ? 'admin' : 'user',
    }));
};

export const deleteUser = (usernameToDelete: string): void => {
    if (usernameToDelete === ADMIN_USERNAME) {
        console.error("Cannot delete the admin user.");
        return;
    }
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '{}');
    delete users[usernameToDelete];
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
};