import { Schema, model } from 'mongoose';

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
            minlength: [2, 'Name must be at least 2 characters'],
            maxlength: [50, 'Name cannot exceed 50 characters'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            trim: true,
            lowercase: true,
            match: [
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                'Please provide a valid email address',
            ],
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: [8, 'Password must be at least 8 characters'],
            maxlength: [100, 'Password cannot exceed 100 characters'],
            select: false,
        },
        avatar: {
            type: String,
            trim: true,
            default: () => process.env.DEFAULT_AVATAR_URL || '',
        },
        role: {
            type: String,
            required: true,
            enum: {
                values: ['user', 'admin'],
                message: 'Role must be either user or admin',
            },
            default: 'user',
        },
        isVerified: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

// Email unique index explicit declaration
userSchema.index({ email: 1 }, { unique: true });

// JSON Transformation: password aur __v ko remove karne ke liye
userSchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret.password;
        delete ret.__v;
        return ret;
    },
});

const User = model('User', userSchema);

export default User;