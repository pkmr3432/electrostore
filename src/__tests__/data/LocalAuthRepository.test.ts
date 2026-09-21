import { LocalAuthRepository } from '../../data/local/LocalAuthRepository';

describe('LocalAuthRepository', () => {
  let repository: LocalAuthRepository;
  let mockDbStorage: any;
  let secureStorage: any;
  let dbStore: Record<string, string>;
  let secureStore: Record<string, string>;

  beforeEach(() => {
    dbStore = {};
    secureStore = {};

    mockDbStorage = {
      getItem: jest.fn(async (key: string) => dbStore[key] || null),
      setItem: jest.fn(async (key: string, value: string) => { dbStore[key] = value; }),
      removeItem: jest.fn(async (key: string) => { delete dbStore[key]; }),
      clear: jest.fn(),
    };

    secureStorage = {
      getItem: jest.fn(async (key: string) => secureStore[key] || null),
      setItem: jest.fn(async (key: string, value: string) => { secureStore[key] = value; }),
      removeItem: jest.fn(async (key: string) => { delete secureStore[key]; }),
      clear: jest.fn(),
    };

    repository = new LocalAuthRepository(mockDbStorage, secureStorage);
  });

  it('should login a valid default user', async () => {
    const { user, session } = await repository.login('helena.vance@atelier-tech.com', 'password');
    
    expect(user).toBeDefined();
    expect(user.id).toBe('user-helen');
    expect(session.token).toContain('mock_jwt_token_user-helen');
    
    expect(secureStorage.setItem).toHaveBeenCalledWith('auth_session', expect.any(String));
  });

  it('should fail login for invalid credentials', async () => {
    await expect(repository.login('unknown@email.com', 'password')).rejects.toThrow('Invalid email or password');
    await expect(repository.login('helena.vance@atelier-tech.com', 'wrongpassword')).rejects.toThrow('Invalid email or password');
  });

  it('should register a new user', async () => {
    const newUser = {
      email: 'new.user@test.com',
      firstName: 'New',
      lastName: 'User'
    };

    const { user, session } = await repository.register(newUser, 'password123');
    
    expect(user.id).toBeDefined();
    expect(user.email).toBe('new.user@test.com');
    expect(session.token).toContain('mock_jwt_token_');
    
    expect(secureStorage.setItem).toHaveBeenCalledWith('auth_session', expect.any(String));
  });

  it('should fail registration if email exists', async () => {
    // First login to create the default user in mock db
    await repository.login('helena.vance@atelier-tech.com', 'password');

    const duplicateUser = {
      email: 'helena.vance@atelier-tech.com',
      firstName: 'Helena',
      lastName: 'Duplicate'
    };

    await expect(repository.register(duplicateUser, 'password123')).rejects.toThrow('Email already registered');
  });

  it('should clear session on logout', async () => {
    await repository.login('helena.vance@atelier-tech.com', 'password');
    await repository.logout();
    
    expect(secureStorage.removeItem).toHaveBeenCalledWith('auth_session');
  });

  it('should restore an existing session', async () => {
    const { user } = await repository.login('helena.vance@atelier-tech.com', 'password');
    
    // Simulate a new instance of repository
    const newRepo = new LocalAuthRepository(mockDbStorage, secureStorage);
    const result = await newRepo.restoreSession();
    
    expect(result).not.toBeNull();
    expect(result?.user.id).toBe(user.id);
  });
});
