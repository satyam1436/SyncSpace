import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import User from '../models/User.js';

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

afterEach(async () => {
    await User.deleteMany({});
});

describe('User Model Tests (TC-USER-01 to TC-USER-10)', () => {
    // TC-USER-01
    test('TC-USER-01: Valid User Creation', async () => {
        const validUser = {
            name: 'Test User',
            email: 'test@example.com',
            password: 'password123',
        };
        const user = await User.create(validUser);
        expect(user._id).toBeDefined();
        expect(user.email).toBe(validUser.email.toLowerCase());
    });

    // TC-USER-02
    test('TC-USER-02: Duplicate Email Rejection', async () => {
        const userData = {
            name: 'User One',
            email: 'duplicate@example.com',
            password: 'password123',
        };
        await User.create(userData);

        // Mongoose level unique index build hone ka wait
        await User.init();

        await expect(
            User.create({
                name: 'User Two',
                email: 'duplicate@example.com',
                password: 'password123',
            })
        ).rejects.toThrow();
    });

    // TC-USER-03
    test('TC-USER-03: Invalid Email Format', async () => {
        const invalidUser = {
            name: 'Invalid Email',
            email: 'invalid-email-format',
            password: 'password123',
        };
        await expect(User.create(invalidUser)).rejects.toThrow(
            mongoose.Error.ValidationError
        );
    });

    // TC-USER-04
    test('TC-USER-04: Missing Required Name', async () => {
        const noNameUser = {
            email: 'noname@example.com',
            password: 'password123',
        };
        await expect(User.create(noNameUser)).rejects.toThrow(
            mongoose.Error.ValidationError
        );
    });

    // TC-USER-05
    test('TC-USER-05: Password Length Validation (< 8 chars)', async () => {
        const shortPasswordUser = {
            name: 'Short Pass',
            email: 'short@example.com',
            password: '123',
        };
        await expect(User.create(shortPasswordUser)).rejects.toThrow(
            mongoose.Error.ValidationError
        );
    });

    // TC-USER-06
    test('TC-USER-06: Default Values Assignment', async () => {
        const defaultUser = await User.create({
            name: 'Default Check',
            email: 'default@example.com',
            password: 'password123',
        });
        expect(defaultUser.role).toBe('user');
        expect(defaultUser.isVerified).toBe(false);
    });

    // TC-USER-07
    test('TC-USER-07: Password Hidden from Response', async () => {
        const userData = {
            name: 'Hide Password',
            email: 'hidepass@example.com',
            password: 'password123',
        };
        const createdUser = await User.create(userData);
        const jsonUser = createdUser.toJSON();
        expect(jsonUser.password).toBeUndefined();

        const fetchedUser = await User.findById(createdUser._id);
        expect(fetchedUser.password).toBeUndefined();
    });

    // TC-USER-08
    test('TC-USER-08: Timestamp Generation', async () => {
        const user = await User.create({
            name: 'Timestamp Check',
            email: 'time@example.com',
            password: 'password123',
        });
        expect(user.createdAt).toBeInstanceOf(Date);
        expect(user.updatedAt).toBeInstanceOf(Date);
    });

    // TC-USER-09
    test('TC-USER-09: Enum Role Validation', async () => {
        const invalidRoleUser = {
            name: 'Invalid Role',
            email: 'role@example.com',
            password: 'password123',
            role: 'superuser',
        };
        await expect(User.create(invalidRoleUser)).rejects.toThrow(
            mongoose.Error.ValidationError
        );
    });

    // TC-USER-10
    test('TC-USER-10: Unique Index Verification', () => {
        const indexes = User.schema.indexes();
        const hasEmailUniqueIndex = indexes.some(
            ([indexObj, options]) => indexObj.email === 1 && options.unique === true
        );
        expect(hasEmailUniqueIndex).toBe(true);
    });
});