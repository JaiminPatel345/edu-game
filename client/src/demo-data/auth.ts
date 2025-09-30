// Authentication helper functions for demo app
export interface UserCredentials {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'teacher' | 'company';
}

// Demo user data based on email patterns
const DEMO_USERS: Record<string, AuthUser> = {
  'jaimin-student@gmail.com': {
    id: 'student-001',
    email: 'jaimin-student@gmail.com',
    name: 'Jaimin Patel',
    role: 'student'
  },
  'teacher@demo.com': {
    id: 'teacher-001',
    email: 'teacher@demo.com',
    name: 'Dr. Sarah Johnson',
    role: 'teacher'
  },
  'xyz@demo.com': {
    id: 'company-001',
    email: 'xyz@demo.com',
    name: 'Tech Solutions Inc.',
    role: 'company'
  }
};

// Additional demo users for testing
const ADDITIONAL_DEMO_USERS: Record<string, AuthUser> = {
  'student@demo.com': {
    id: 'student-002',
    email: 'student@demo.com',
    name: 'Alex Chen',
    role: 'student'
  },
  'faculty@demo.com': {
    id: 'teacher-002',
    email: 'faculty@demo.com',
    name: 'Prof. Michael Brown',
    role: 'teacher'
  },
  'recruiter@demo.com': {
    id: 'company-002',
    email: 'recruiter@demo.com',
    name: 'Global Corp HR',
    role: 'company'
  }
};

// Combine all demo users
const ALL_DEMO_USERS = { ...DEMO_USERS, ...ADDITIONAL_DEMO_USERS };

/**
 * Authenticates user based on email and assigns appropriate role
 * @param credentials - User email and password
 * @returns Promise with user data or null if authentication fails
 */
export const authenticateUser = async (credentials: UserCredentials): Promise<AuthUser | null> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  const { email, password } = credentials;

  // In demo mode, any password is accepted for demo users
  if (ALL_DEMO_USERS[email]) {
    return ALL_DEMO_USERS[email];
  }

  // For any other email, default to student role (demo purposes)
  if (email && password) {
    const userId = `user-${Date.now()}`;
    return {
      id: userId,
      email: email,
      name: extractNameFromEmail(email),
      role: 'student'
    };
  }

  return null;
};

/**
 * Registers a new user (demo mode - doesn't actually save)
 * @param credentials - User registration data
 * @returns Promise with user data
 */
export const registerUser = async (userData: {
  email: string;
  password: string;
  name: string;
  role?: 'student' | 'teacher' | 'company';
}): Promise<AuthUser | null> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1200));

  const { email, name, role } = userData;

  // Check if user already exists in demo data
  if (ALL_DEMO_USERS[email]) {
    throw new Error('User already exists');
  }

  // Determine role based on email if not provided
  let userRole: 'student' | 'teacher' | 'company' = role || 'student';
  
  if (email.includes('teacher') || email.includes('faculty') || email.includes('prof')) {
    userRole = 'teacher';
  } else if (email.includes('company') || email.includes('recruiter') || email.includes('hr')) {
    userRole = 'company';
  }

  const userId = `user-${Date.now()}`;
  return {
    id: userId,
    email: email,
    name: name,
    role: userRole
  };
};

/**
 * Extracts a display name from email address
 * @param email - Email address
 * @returns Formatted display name
 */
function extractNameFromEmail(email: string): string {
  const localPart = email.split('@')[0];
  const name = localPart
    .replace(/[._-]/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase());
  return name || 'User';
}

/**
 * Gets user role permissions based on role type
 * @param role - User role
 * @returns Object with permission flags
 */
export const getUserPermissions = (role: 'student' | 'teacher' | 'company') => {
  const permissions = {
    canViewProfile: true,
    canEditProfile: false,
    canViewOpportunities: false,
    canPostOpportunities: false,
    canViewApplications: false,
    canManageApplications: false,
    canAccessAnalytics: false,
    canManageUsers: false
  };

  switch (role) {
    case 'student':
      return {
        ...permissions,
        canEditProfile: true,
        canViewOpportunities: true,
        canViewApplications: true
      };
    
    case 'teacher':
      return {
        ...permissions,
        canViewOpportunities: true,
        canViewApplications: true,
        canAccessAnalytics: true,
        canManageUsers: true
      };
    
    case 'company':
      return {
        ...permissions,
        canViewOpportunities: true,
        canPostOpportunities: true,
        canViewApplications: true,
        canManageApplications: true,
        canAccessAnalytics: true
      };
    
    default:
      return permissions;
  }
};

/**
 * Mock logout function
 */
export const logoutUser = async (): Promise<void> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  // In a real app, this would clear tokens, etc.
};

export default {
  authenticateUser,
  registerUser,
  getUserPermissions,
  logoutUser
};