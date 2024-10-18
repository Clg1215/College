import React, { useState } from 'react';

const AuthPage = () => {
    const [isSignUp, setIsSignUp] = useState(false); // Toggle between Sign In and Sign Up
    const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (isSignUp) {
            // Handle sign-up logic here
            console.log('Sign up with:', formData);
        } else {
            // Handle sign-in logic here
            console.log('Sign in with:', formData);
        }
    };

    return (
        <div className="auth-container">
            <h2>{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
            <form onSubmit={handleFormSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                />
                {isSignUp && (
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required
                    />
                )}
                <button type="submit">{isSignUp ? 'Sign Up' : 'Sign In'}</button>
            </form>
            <button onClick={() => setIsSignUp(!isSignUp)}>
                {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
            </button>
        </div>
    );
};

export default AuthPage;
