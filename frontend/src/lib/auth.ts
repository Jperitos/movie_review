// Mock authentication service
export interface User {
  id: string;
  email: string;
  name: string;
}

// Demo users for testing
export const demoUsers: User[] = [
  { id: '1', email: 'demo@movie.com', name: 'Demo User' },
  { id: '2', email: 'john@example.com', name: 'John Doe' },
  { id: '3', email: 'jane@example.com', name: 'Jane Smith' }
];

export const mockAuth = {
  login: async (email: string, password: string): Promise<User | null> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user exists (password is ignored for demo)
    const user = demoUsers.find(u => u.email === email);
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      return user;
    }
    return null;
  },

  register: async (email: string, password: string, name: string): Promise<User> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser: User = {
      id: Date.now().toString(),
      email,
      name
    };
    
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    return newUser;
  },

  logout: () => {
    localStorage.removeItem('currentUser');
  },

  getCurrentUser: (): User | null => {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
  }
};