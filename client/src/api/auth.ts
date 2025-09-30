// Authentication API Service
import { httpClient, ApiResponse } from './client';
import { ENDPOINTS } from './config';

// Import demo data for fallback
import studentsData from '../demo-data/students.json';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role: 'student' | 'teacher' | 'company';
  department?: string;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'teacher' | 'company';
  department?: string;
  emailVerified?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthResponse {
  user: AuthUser;
  token: string;
  refreshToken: string;
}

class AuthService {
  async login(credentials: LoginRequest): Promise<AuthUser> {
    try {
      // Try real API first
      const response = await httpClient.post<AuthResponse>(ENDPOINTS.AUTH.LOGIN, credentials);
      
      if (response.success && response.data) {
        // Store tokens
        localStorage.setItem('auth_token', response.data.token);
        localStorage.setItem('refresh_token', response.data.refreshToken);
        
        return response.data.user;
      }
      
      throw new Error('Login failed');
    } catch (error) {
      // Fallback to demo data for development
      console.warn('API not available, using demo data');
      return this.loginWithDemoData(credentials);
    }
  }

  async register(userData: RegisterRequest): Promise<AuthUser> {
    try {
      // Try real API first
      const response = await httpClient.post<AuthResponse>(ENDPOINTS.AUTH.REGISTER, userData);
      
      if (response.success && response.data) {
        // Store tokens
        localStorage.setItem('auth_token', response.data.token);
        localStorage.setItem('refresh_token', response.data.refreshToken);
        
        return response.data.user;
      }
      
      throw new Error('Registration failed');
    } catch (error) {
      // Fallback to demo data for development
      console.warn('API not available, using demo data');
      return this.registerWithDemoData(userData);
    }
  }

  async logout(): Promise<void> {
    try {
      await httpClient.post(ENDPOINTS.AUTH.LOGOUT);
    } catch (error) {
      console.warn('Logout API call failed, continuing with local cleanup');
    } finally {
      // Always clean up local storage
      localStorage.removeItem('auth_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user_data');
    }
  }

  async refreshToken(): Promise<string> {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    try {
      const response = await httpClient.post<{ token: string }>(ENDPOINTS.AUTH.REFRESH, {
        refreshToken
      });
      
      if (response.success && response.data) {
        localStorage.setItem('auth_token', response.data.token);
        return response.data.token;
      }
      
      throw new Error('Token refresh failed');
    } catch (error) {
      // If refresh fails, logout user
      this.logout();
      throw error;
    }
  }

  async forgotPassword(email: string): Promise<void> {
    try {
      await httpClient.post(ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
    } catch (error) {
      throw new Error('Failed to send password reset email');
    }
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    try {
      await httpClient.post(ENDPOINTS.AUTH.RESET_PASSWORD, {
        token,
        password: newPassword
      });
    } catch (error) {
      throw new Error('Failed to reset password');
    }
  }

  // Demo data fallback methods
  private async loginWithDemoData(credentials: LoginRequest): Promise<AuthUser> {
    await this.simulateDelay(1000);

    const demoUsers = [
      { 
        id: 'student-1', 
        email: 'jaimin-student@gmail.com', 
        password: 'password', 
        name: 'Jaimin Patel', 
        role: 'student' as const,
        department: 'Computer Science'
      },
      { 
        id: 'teacher-1', 
        email: 'teacher@demo.com', 
        password: 'password', 
        name: 'Dr. Sarah Wilson', 
        role: 'teacher' as const,
        department: 'Computer Science'
      },
      { 
        id: 'company-1', 
        email: 'xyz@demo.com', 
        password: 'password', 
        name: 'XYZ Corp Recruiter', 
        role: 'company' as const
      }
    ];

    const user = demoUsers.find(u => 
      u.email === credentials.email && u.password === credentials.password
    );

    if (!user) {
      throw new Error('Invalid email or password');
    }

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  private async registerWithDemoData(userData: RegisterRequest): Promise<AuthUser> {
    await this.simulateDelay(1500);

    // Check if email already exists (in real implementation, this would be server-side)
    const existingEmails = ['jaimin-student@gmail.com', 'teacher@demo.com', 'xyz@demo.com'];
    if (existingEmails.includes(userData.email.toLowerCase())) {
      throw new Error('Email already exists');
    }

    // Create new user
    const newUser: AuthUser = {
      id: `${userData.role}-${Date.now()}`,
      email: userData.email,
      name: userData.name,
      role: userData.role,
      department: userData.department,
      emailVerified: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    return newUser;
  }

  private simulateDelay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Utility methods
  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  getCurrentUser(): AuthUser | null {
    const userData = localStorage.getItem('user_data');
    return userData ? JSON.parse(userData) : null;
  }

  saveUserData(user: AuthUser): void {
    localStorage.setItem('user_data', JSON.stringify(user));
  }
}

export const authService = new AuthService();