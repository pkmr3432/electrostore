import { AuthRepository } from '../../domain/repositories';
import { User, AuthSession } from '../../domain/models';
import { StorageAdapter } from '../../core/storage/AsyncStorageAdapter';
import { SecureStoreAdapter } from '../../core/storage/SecureStoreAdapter';

// We mock a user database in memory (could be AsyncStorage, but memory is fine for mock deterministic behavior)
const MOCK_DB_KEY = '@mock_users'; // Valid for AsyncStorage
const SESSION_KEY = 'auth_session'; // Valid for SecureStore

export class LocalAuthRepository implements AuthRepository {
  constructor(
    private mockDbStorage: StorageAdapter,
    private secureStorage: StorageAdapter = SecureStoreAdapter
  ) {}

  private async getMockUsers(): Promise<User[]> {
    const data = await this.mockDbStorage.getItem(MOCK_DB_KEY);
    if (!data) {
      // Default deterministic mock user
      const defaultUser: User = {
        id: 'user-helen',
        email: 'helena.vance@atelier-tech.com',
        firstName: 'Helena',
        lastName: 'Vance',
        isVerified: true,
        registeredAt: new Date(),
      };
      await this.mockDbStorage.setItem(MOCK_DB_KEY, JSON.stringify([defaultUser]));
      return [defaultUser];
    }
    return JSON.parse(data);
  }

  private async saveMockUsers(users: User[]): Promise<void> {
    await this.mockDbStorage.setItem(MOCK_DB_KEY, JSON.stringify(users));
  }

  async login(email: string, password: string): Promise<{ user: User; session: AuthSession }> {
    // Artificial delay
    await new Promise((res) => setTimeout(res, 800));

    const users = await this.getMockUsers();
    const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

    if (!user) {
      throw new Error('Invalid email or password');
    }

    if (password !== 'password') {
      throw new Error('Invalid email or password');
    }

    const session: AuthSession = {
      token: `mock_jwt_token_${user.id}_${Date.now()}`,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      userId: user.id,
    };

    await this.secureStorage.setItem(SESSION_KEY, JSON.stringify(session));

    return { user, session };
  }

  async register(
    userData: Omit<User, 'id' | 'isVerified' | 'registeredAt'>,
    password: string
  ): Promise<{ user: User; session: AuthSession }> {
    await new Promise((res) => setTimeout(res, 800));

    const users = await this.getMockUsers();
    if (users.find((u) => u.email.toLowerCase() === userData.email.toLowerCase())) {
      throw new Error('Email already registered');
    }

    const newUser: User = {
      ...userData,
      id: `user-${Date.now()}`,
      isVerified: false,
      registeredAt: new Date(),
    };

    users.push(newUser);
    await this.saveMockUsers(users);

    const session: AuthSession = {
      token: `mock_jwt_token_${newUser.id}_${Date.now()}`,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      userId: newUser.id,
    };

    await this.secureStorage.setItem(SESSION_KEY, JSON.stringify(session));

    return { user: newUser, session };
  }

  async logout(): Promise<void> {
    await new Promise((res) => setTimeout(res, 400));
    await this.secureStorage.removeItem(SESSION_KEY);
  }

  async getCurrentSession(): Promise<{ user: User; session: AuthSession } | null> {
    return this.restoreSession();
  }

  async restoreSession(): Promise<{ user: User; session: AuthSession } | null> {
    const sessionData = await this.secureStorage.getItem(SESSION_KEY);
    if (!sessionData) return null;

    try {
      const session: AuthSession = JSON.parse(sessionData);
      
      // Validate expiration
      if (new Date(session.expiresAt).getTime() < Date.now()) {
        await this.logout();
        return null;
      }

      const users = await this.getMockUsers();
      const user = users.find((u) => u.id === session.userId);

      if (!user) {
        await this.logout();
        return null;
      }

      return { user, session };
    } catch (e) {
      console.error('Failed to restore session', e);
      await this.logout();
      return null;
    }
  }
}
