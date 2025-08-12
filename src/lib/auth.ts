export interface User {
  id: string;
  username: string;
  role: 'admin' | 'client' | 'customer';
  name: string;
  email?: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
  role: 'admin' | 'client' | 'customer';
}

// Mock user database - In production, this would be replaced with actual database calls
const mockUsers: User[] = [
  {
    id: '1',
    username: 'admin',
    role: 'admin',
    name: 'System Administrator',
    email: 'admin@company.com'
  },
  {
    id: '2',
    username: 'client1',
    role: 'client',
    name: 'John Client',
    email: 'john@client.com'
  },
  {
    id: '3',
    username: 'customer1',
    role: 'customer',
    name: 'Jane Customer',
    email: 'jane@customer.com'
  }
];

// Mock password validation - In production, use proper password hashing
const mockPasswords: Record<string, string> = {
  'admin': 'admin123',
  'client1': 'client123',
  'customer1': 'customer123'
};

export async function login(credentials: LoginCredentials): Promise<User | null> {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = mockUsers.find(
      u => u.username === credentials.username && u.role === credentials.role
    );
    
    if (!user) {
      throw new Error('User not found');
    }
    
    const expectedPassword = mockPasswords[credentials.username];
    if (credentials.password !== expectedPassword) {
      throw new Error('Invalid password');
    }
    
    // Store user session in localStorage (in production, use secure session management)
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('isAuthenticated', 'true');
    }
    
    return user;
  } catch (error) {
    console.error('Login error:', error);
    return null;
  }
}

export function logout(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
  }
}

export function getCurrentUser(): User | null {
  if (typeof window !== 'undefined') {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch (error) {
        console.error('Error parsing user data:', error);
        return null;
      }
    }
  }
  return null;
}

export function isAuthenticated(): boolean {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('isAuthenticated') === 'true';
  }
  return false;
}

export function getUserRole(): string | null {
  const user = getCurrentUser();
  return user ? user.role : null;
}

export function requireAuth(allowedRoles?: string[]): boolean {
  const authenticated = isAuthenticated();
  if (!authenticated) return false;
  
  if (allowedRoles && allowedRoles.length > 0) {
    const userRole = getUserRole();
    return userRole ? allowedRoles.includes(userRole) : false;
  }
  
  return true;
}
