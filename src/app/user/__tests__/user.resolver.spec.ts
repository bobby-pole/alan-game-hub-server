import { Test, TestingModule } from '@nestjs/testing';
import { UserResolver } from '../user.resolver';
import { UserService } from '../user.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from '../entities/user.entity';

const mockUserService = {
  findAll: jest.fn(),
  findUserById: jest.fn(),
  createUser: jest.fn(),
  updateUserById: jest.fn(),
  remove: jest.fn(),
};

describe('UserResolver', () => {
  let userResolver: UserResolver;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserResolver,
        {
          provide: UserService,
          useValue: mockUserService,
        },
        {
          provide: getModelToken(User.name),
          useValue: {},
        },
      ],
    }).compile();

    userResolver = module.get<UserResolver>(UserResolver);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userResolver).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const mockUsers: User[] = [];
      jest.spyOn(userService, 'findAll').mockResolvedValueOnce(mockUsers);

      const result = await userResolver.findAll();

      expect(result).toBe(mockUsers);
    });
  });
});
