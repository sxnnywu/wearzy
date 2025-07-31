export interface SignUpData {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  isEmailVerified: boolean;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export class AuthService {
  private static baseUrl = '/auth';

  static async signUp(data: SignUpData): Promise<void> {
    const response = await fetch(`${this.baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create account');
    }
  }

  static async login(data: LoginData): Promise<AuthResponse> {
    const response = await fetch(`${this.baseUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to sign in');
    }

    return await response.json();
  }

  static async getVerificationStatus(): Promise<{ isEmailVerified: boolean }> {
    const token = this.getToken();
    
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${this.baseUrl}/verify-status`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        this.clearAuth();
        throw new Error('Authentication expired');
      }
      throw new Error('Failed to check verification status');
    }

    return await response.json();
  }

  static async resendVerification(): Promise<void> {
    const token = this.getToken();
    
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${this.baseUrl}/resend-verification`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to resend verification email');
    }
  }

  // Token management
  static getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  static setToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  static clearToken(): void {
    localStorage.removeItem('authToken');
  }

  // User profile management
  static getUserProfile(): User | null {
    const profile = localStorage.getItem('userProfile');
    if (!profile) return null;
    
    try {
      return JSON.parse(profile);
    } catch {
      return null;
    }
  }

  static setUserProfile(user: User): void {
    localStorage.setItem('userProfile', JSON.stringify(user));
  }

  static clearUserProfile(): void {
    localStorage.removeItem('userProfile');
  }

  // Complete auth management
  static setAuth(token: string, user: User): void {
    this.setToken(token);
    this.setUserProfile(user);
  }

  static clearAuth(): void {
    this.clearToken();
    this.clearUserProfile();
  }

  static isAuthenticated(): boolean {
    return !!this.getToken();
  }
}