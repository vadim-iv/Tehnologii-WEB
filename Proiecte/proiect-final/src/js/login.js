import { showToast } from './shared.js';

const loginBox = document.querySelector('#loginBox');
const signupBox = document.querySelector('#signupBox');
const goToSignup = document.querySelector('#goToSignUp');
const goToLogin = document.querySelector('#goToLogin');

goToSignup.addEventListener('click', () => {
    loginBox.classList.toggle('hidden');
    signupBox.classList.toggle('hidden');
});

goToLogin.addEventListener('click', () => {
    loginBox.classList.toggle('hidden');
    signupBox.classList.toggle('hidden');
});

// MARK: Login Logic
const loginForm = loginBox.querySelector('form');
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(loginForm);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch('/api/login.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        if (result.status === 'success') {
            window.location.href = 'index.html';
        } else {
            showToast(result.message, 'error');
        }
    } catch (error) {
        console.error('Login error:', error);
        showToast('An error occurred during login.', 'error');
    }
});

// MARK: Signup Logic
const signupForm = signupBox.querySelector('form');
signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(signupForm);
    const data = Object.fromEntries(formData.entries());

    if (data.password !== data.repeatPassword) {
        showToast("Passwords do not match!", 'error');
        return;
    }

    // Map fields to match backend
    const payload = {
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        email: data.email,
        password: data.password
    };

    try {
        const response = await fetch('/api/register.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const result = await response.json();
        if (result.status === 'success') {
            showToast('Account created! Please log in.', 'success');
            loginBox.classList.remove('hidden');
            signupBox.classList.add('hidden');
        } else {
            showToast(result.message, 'error');
        }
    } catch (error) {
        console.error('Signup error:', error);
        showToast('An error occurred during registration.', 'error');
    }
});