// ===================================================================
// ALISTO APP - DUMMY AUTHENTICATION FOR TESTING
// ===================================================================
// Simple authentication system with test accounts for development
// ===================================================================

export interface DummyUser {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  role: 'citizen' | 'admin';
}

// Test accounts for development
export const DUMMY_ACCOUNTS: DummyUser[] = [
  {
    id: '1',
    email: 'john.doe@example.com',
    password: 'password123',
    firstName: 'John',
    lastName: 'Doe',
    phoneNumber: '09123456789',
    address: '123 Main Street, Laoag City, Ilocos Norte',
    role: 'citizen',
  },
  {
    id: '2',
    email: 'maria.santos@example.com',
    password: 'password123',
    firstName: 'Maria',
    lastName: 'Santos',
    phoneNumber: '09987654321',
    address: '456 Rizal Avenue, Laoag City, Ilocos Norte',
    role: 'citizen',
  },
  {
    id: '3',
    email: 'admin@laoagcity.gov.ph',
    password: 'admin123',
    firstName: 'City',
    lastName: 'Administrator',
    phoneNumber: '09111222333',
    address: 'Laoag City Hall, General Second Avenue, Laoag City',
    role: 'admin',
  },
  {
    id: '4',
    email: 'test@example.com',
    password: 'test123',
    firstName: 'Test',
    lastName: 'User',
    phoneNumber: '09555666777',
    address: '789 Test Street, Laoag City, Ilocos Norte',
    role: 'citizen',
  },
];

export class DummyAuthService {
  // Simulate API delay
  private async delay(ms: number = 1000): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Authenticate user with email and password
  async login(email: string, password: string): Promise<{ success: boolean; user?: DummyUser; error?: string }> {
    await this.delay(800); // Simulate network delay

    const user = DUMMY_ACCOUNTS.find(
      account => account.email.toLowerCase() === email.toLowerCase() && account.password === password
    );

    if (user) {
      return { success: true, user };
    } else {
      return { success: false, error: 'Invalid email or password' };
    }
  }

  // Register new user (for testing)
  async register(userData: Omit<DummyUser, 'id' | 'role'>): Promise<{ success: boolean; user?: DummyUser; error?: string }> {
    await this.delay(1200); // Simulate network delay

    // Check if email already exists
    const existingUser = DUMMY_ACCOUNTS.find(
      account => account.email.toLowerCase() === userData.email.toLowerCase()
    );

    if (existingUser) {
      return { success: false, error: 'Email already exists' };
    }

    // Create new user
    const newUser: DummyUser = {
      ...userData,
      id: (DUMMY_ACCOUNTS.length + 1).toString(),
      role: 'citizen',
    };

    // In a real app, this would be saved to a database
    DUMMY_ACCOUNTS.push(newUser);

    return { success: true, user: newUser };
  }

  // Get user by ID
  async getUserById(id: string): Promise<DummyUser | null> {
    await this.delay(300);
    return DUMMY_ACCOUNTS.find(user => user.id === id) || null;
  }

  // Update user profile
  async updateUser(id: string, updates: Partial<DummyUser>): Promise<{ success: boolean; user?: DummyUser; error?: string }> {
    await this.delay(600);

    const userIndex = DUMMY_ACCOUNTS.findIndex(user => user.id === id);
    if (userIndex === -1) {
      return { success: false, error: 'User not found' };
    }

    // Update user data
    DUMMY_ACCOUNTS[userIndex] = { ...DUMMY_ACCOUNTS[userIndex], ...updates };
    
    return { success: true, user: DUMMY_ACCOUNTS[userIndex] };
  }
}

export const dummyAuthService = new DummyAuthService();