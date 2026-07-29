import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const cardEntranceVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
    },
};

export default function Signup() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [status, setStatus] = useState('idle');

    const [windowWidth, setWindowWidth] = useState(
        typeof window !== 'undefined' ? window.innerWidth : 1440
    );

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const isMobile = windowWidth < 768;
    const isTablet = windowWidth >= 768 && windowWidth < 1024;

    const validateField = (name, value) => {
        let err = '';
        if (name === 'name') {
            if (!value) err = 'Name is required';
            else if (value.length < 2) err = 'Name must be at least 2 characters';
        }
        if (name === 'email') {
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!value) err = 'Email is required';
            else if (!emailRegex.test(value)) err = 'Please enter a valid email address';
        }
        if (name === 'password') {
            if (!value) err = 'Password is required';
            else if (value.length < 8) err = 'Password must be at least 8 characters';
        }
        if (name === 'confirmPassword') {
            if (!value) err = 'Please confirm your password';
            else if (value !== formData.password) err = 'Passwords do not match';
        }

        setErrors((prev) => ({ ...prev, [name]: err }));
        return err;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) validateField(name, value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const nameErr = validateField('name', formData.name);
        const emailErr = validateField('email', formData.email);
        const passErr = validateField('password', formData.password);
        const confirmErr = validateField('confirmPassword', formData.confirmPassword);

        if (nameErr || emailErr || passErr || confirmErr) return;

        setStatus('submitting');
        setTimeout(() => {
            setStatus('success');
        }, 1500);
    };

    const styles = {
        // Parent constraint breakout styles
        outerWrapper: {
            position: 'relative',
            width: '100vw',
            left: '50%',
            right: '50%',
            marginLeft: '-50vw',
            marginRight: '-50vw',
            backgroundColor: '#0F172A',
            minHeight: '100vh',
            overflowX: 'hidden',
        },
        container: {
            minHeight: '100vh',
            width: '100%',
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            fontFamily: "'Inter', system-ui, sans-serif",
            boxSizing: 'border-box',
        },
        leftPane: {
            display: isMobile ? 'none' : 'flex',
            width: isTablet ? '45%' : '50%',
            backgroundColor: '#0F172A',
            borderRight: '1px solid #334155',
            padding: isTablet ? '2.5rem' : '4rem 5rem',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative',
            boxSizing: 'border-box',
        },
        glow: {
            position: 'absolute',
            top: '-6rem',
            left: '-6rem',
            width: '24rem',
            height: '24rem',
            background: 'rgba(37, 99, 235, 0.2)',
            borderRadius: '50%',
            filter: 'blur(48px)',
            pointerEvents: 'none',
        },
        rightPane: {
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: isMobile ? '1.5rem' : '3rem',
            boxSizing: 'border-box',
            backgroundColor: '#0F172A',
        },
        card: {
            width: '100%',
            maxWidth: '440px',
            backgroundColor: '#1E293B',
            border: '1px solid #334155',
            borderRadius: '0.75rem',
            padding: isMobile ? '1.5rem' : '2.25rem',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            boxSizing: 'border-box',
            textAlign: 'left',
        },
        headerTitle: {
            fontSize: '1.5rem',
            fontWeight: 'bold',
            margin: 0,
            color: '#F8FAFC',
        },
        headerSubtitle: {
            color: '#94A3B8',
            fontSize: '0.875rem',
            marginTop: '0.25rem',
            marginBottom: '1.5rem',
        },
        formGroup: {
            marginBottom: '1rem',
            textAlign: 'left',
        },
        label: {
            display: 'block',
            fontSize: '0.813rem',
            fontWeight: '500',
            color: '#94A3B8',
            marginBottom: '0.375rem',
        },
        inputWrapper: {
            position: 'relative',
            width: '100%',
        },
        input: (hasError) => ({
            width: '100%',
            backgroundColor: '#020617',
            color: '#F8FAFC',
            fontSize: '0.875rem',
            padding: '0.625rem 0.75rem 0.625rem 2.25rem',
            borderRadius: '0.5rem',
            border: `1px solid ${hasError ? '#EF4444' : '#334155'}`,
            boxSizing: 'border-box',
            outline: 'none',
            transition: 'all 0.2s ease',
        }),
        icon: {
            position: 'absolute',
            left: '0.75rem',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#94A3B8',
            pointerEvents: 'none',
            fontSize: '0.875rem',
        },
        toggleBtn: {
            position: 'absolute',
            right: '0.75rem',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'none',
            border: 'none',
            color: '#94A3B8',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            fontSize: '0.875rem',
        },
        errorText: {
            fontSize: '0.7rem',
            color: '#EF4444',
            marginTop: '0.25rem',
            marginBottom: 0,
        },
        submitBtn: {
            width: '100%',
            marginTop: '0.75rem',
            padding: '0.75rem 1rem',
            borderRadius: '0.5rem',
            fontWeight: '600',
            fontSize: '0.875rem',
            border: 'none',
            backgroundColor: status === 'success' ? '#10B981' : '#2563EB',
            color: 'white',
            cursor: status === 'submitting' ? 'not-allowed' : 'pointer',
            opacity: status === 'submitting' ? 0.75 : 1,
            transition: 'all 0.2s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
        },
        footer: {
            marginTop: '1.5rem',
            textAlign: 'center',
            fontSize: '0.813rem',
            color: '#94A3B8',
        },
        link: {
            color: '#fff',
            textDecoration: 'none',
            fontWeight: '500',
        },
    };

    return (
        <div style={styles.outerWrapper}>
            <div style={styles.container}>
                {/* MOBILE TOP LOGO BAR (<768px) */}
                {isMobile && (
                    <div style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ height: '2rem', width: '2rem', backgroundColor: '#2563EB', borderRadius: '0.375rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#FFF' }}>
                            S
                        </div>
                        {/* <span style={{ fontWeight: 'bold', fontSize: '1.125rem', color: '#FFF' }}>SyncSpace</span> */}
                        <span style={{ fontWeight: 'bold', fontSize: '1.125rem', color: '#FFF' }}>
                            <a href="/landing" style={styles.link}>
                                SyncSpace
                            </a>
                        </span>
                    </div>
                )}

                {/* LEFT BRANDING PANE */}
                <div style={styles.leftPane}>
                    <div style={styles.glow} />

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ height: '2.5rem', width: '2.5rem', backgroundColor: '#2563EB', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.25rem', color: '#FFFFFF' }}>
                            S
                        </div>
                        {/* <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#FFF' }}>SyncSpace</span> */}
                        <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#FFF' }}>
                            <a href="/" style={styles.link}>
                                SyncSpace
                            </a>
                        </span>
                    </div>

                    <div style={{ marginTop: 'auto', marginBottom: 'auto', maxWidth: '34rem', textAlign: 'left' }}>
                        <span style={{ fontSize: '0.75rem', fontFamily: 'monospace', textTransform: 'uppercase', color: '#2563EB', backgroundColor: 'rgba(37, 99, 235, 0.1)', padding: '0.375rem 0.875rem', borderRadius: '9999px', border: '1px solid rgba(37, 99, 235, 0.2)' }}>
                            Real-Time Collaboration
                        </span>
                        <h1 style={{ fontSize: isTablet ? '2rem' : '2.5rem', fontWeight: '800', marginTop: '1.25rem', marginBottom: '1rem', lineHeight: 1.15, color: '#F8FAFC' }}>
                            The IDE for Remote Engineering Teams
                        </h1>
                        <p style={{ color: '#94A3B8', fontSize: '1.063rem', lineHeight: 1.6 }}>
                            Create an account to access shared code rooms, synchronized whiteboards, and real-time developer workflows.
                        </p>
                    </div>

                    <div style={{ fontSize: '0.813rem', color: '#94A3B8', fontFamily: 'monospace', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ height: '0.5rem', width: '0.5rem', borderRadius: '50%', backgroundColor: '#10B981' }} />
                        <span>Live Active Sessions: 1,420 Users</span>
                    </div>
                </div>

                {/* RIGHT SIGNUP FORM PANE */}
                <div style={styles.rightPane}>
                    <motion.div
                        variants={cardEntranceVariants}
                        initial="hidden"
                        animate="visible"
                        style={styles.card}
                    >
                        <div>
                            <h2 style={styles.headerTitle}>Create Account</h2>
                            <p style={styles.headerSubtitle}>Get started with SyncSpace today</p>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Full Name</label>
                                <div style={styles.inputWrapper}>
                                    <span style={styles.icon}>👤</span>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Enter your name"
                                        style={styles.input(!!errors.name)}
                                    />
                                </div>
                                {errors.name && <p style={styles.errorText}>{errors.name}</p>}
                            </div>

                            <div style={styles.formGroup}>
                                <label style={styles.label}>Email Address</label>
                                <div style={styles.inputWrapper}>
                                    <span style={styles.icon}>✉️</span>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="alex.dev@syncspace.io"
                                        style={styles.input(!!errors.email)}
                                    />
                                </div>
                                {errors.email && <p style={styles.errorText}>{errors.email}</p>}
                            </div>

                            <div style={styles.formGroup}>
                                <label style={styles.label}>Password</label>
                                <div style={styles.inputWrapper}>
                                    <span style={styles.icon}>🔒</span>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        style={styles.input(!!errors.password)}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        style={styles.toggleBtn}
                                    >
                                        {showPassword ? '🙈' : '👁️'}
                                    </button>
                                </div>
                                {errors.password && <p style={styles.errorText}>{errors.password}</p>}
                            </div>

                            <div style={styles.formGroup}>
                                <label style={styles.label}>Confirm Password</label>
                                <div style={styles.inputWrapper}>
                                    <span style={styles.icon}>🔒</span>
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        style={styles.input(!!errors.confirmPassword)}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        style={styles.toggleBtn}
                                    >
                                        {showConfirmPassword ? '🙈' : '👁️'}
                                    </button>
                                </div>
                                {errors.confirmPassword && <p style={styles.errorText}>{errors.confirmPassword}</p>}
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'submitting'}
                                style={styles.submitBtn}
                            >
                                {status === 'submitting' ? (
                                    <span>Loading...</span>
                                ) : status === 'success' ? (
                                    <span>✓ Account Created</span>
                                ) : (
                                    <span>CREATE WORKSPACE ACCOUNT</span>
                                )}
                            </button>
                        </form>

                        <div style={styles.footer}>
                            Already have an account?{' '}
                            <a href="/login" style={styles.link}>
                                Sign In
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}