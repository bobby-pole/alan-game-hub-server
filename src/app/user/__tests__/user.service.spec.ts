import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user.service';
import { User, UserDocument } from '../entities/user.entity';
import { CreateUserInput } from '../dto/create-user.input';

describe('UserService', () => {
  let userService: UserService;
  let userModel: Model<UserDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: {
            new: jest.fn().mockResolvedValue({}),
            create: jest.fn().mockResolvedValue({}),
            find: jest.fn().mockResolvedValue([]),
            findById: jest.fn().mockResolvedValue({}),
            findByIdAndUpdate: jest.fn().mockResolvedValue({}),
            findByIdAndDelete: jest.fn().mockResolvedValue({}),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            // Dostarcz mocka dla ConfigService, jeśli potrzebujesz
          },
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userModel = module.get<Model<UserDocument>>(getModelToken(User.name));
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const createUserInput: CreateUserInput = {
        name: 'nowy',
        email: 'example@gmail.com',
        password: 'admin1',
        role: 'admin',
      };

      const result = await userService.createUser(createUserInput);

      expect(result).toBeDefined();
      expect(userModel.create).toHaveBeenCalledWith(createUserInput);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = await userService.findAll();

      expect(result).toEqual([]);
      expect(userModel.find).toHaveBeenCalled();
    });
  });
});
