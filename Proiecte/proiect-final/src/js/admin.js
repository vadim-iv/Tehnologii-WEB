import { showConfirmModal, showToast } from './shared.js';

// admin.js

document.addEventListener('DOMContentLoaded', async () => {
    // 1. Security Check
    const checkAdmin = async () => {
        try {
            const response = await fetch('/api/me.php');
            const result = await response.json();
            if (result.status !== 'success' || result.user.role !== 'admin') {
                window.location.href = 'index.html';
            }
        } catch (error) {
            window.location.href = 'index.html';
        }
    };
    await checkAdmin();

    // 2. Tab Logic
    const tabs = document.querySelectorAll('.tab-btn');
    const contents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));
            
            tab.classList.add('active');
            const target = document.getElementById(`${tab.dataset.tab}Tab`);
            if (target) target.classList.add('active');

            loadTabData(tab.dataset.tab);
        });
    });

    // 3. Modal Logic
    const modal = document.getElementById('adminModal');
    const closeModal = document.getElementById('closeModal');
    const adminForm = document.getElementById('adminForm');
    const formFields = document.getElementById('formFields');
    const modalTitle = document.getElementById('modalTitle');

    const openModal = (title, fieldsHtml, onSubmit) => {
        modalTitle.textContent = title;
        formFields.innerHTML = fieldsHtml;
        modal.classList.remove('hidden');
        
        adminForm.onsubmit = async (e) => {
            e.preventDefault();
            const formData = new FormData(adminForm);
            const data = Object.fromEntries(formData.entries());
            const success = await onSubmit(data);
            if (success) {
                modal.classList.add('hidden');
                loadTabData(document.querySelector('.tab-btn.active').dataset.tab);
            }
        };
    };

    closeModal.onclick = () => modal.classList.add('hidden');
    window.onclick = (e) => { if (e.target == modal) modal.classList.add('hidden'); };

    // 4. Data Loading
    const loadTabData = (tab) => {
        if (tab === 'movies') loadMovies();
        if (tab === 'schedules') loadSchedules();
        if (tab === 'users') loadUsers();
        if (tab === 'bookings') loadAllBookings();
    };

    async function loadMovies() {
        const res = await fetch('/api/admin_movies.php');
        const result = await res.json();
        const tbody = document.querySelector('#moviesTable tbody');
        tbody.innerHTML = result.data.map(m => `
            <tr>
                <td><img src="${m.image_url}" width="50" style="border-radius: 4px;"></td>
                <td>${m.title}</td>
                <td>${m.genres}</td>
                <td style="max-width: 300px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${m.description}">
                    ${m.description}
                </td>
                <td>
                    <button class="action-btn edit-btn" onclick="editMovie(${m.id})">Edit</button>
                    <button class="action-btn delete-btn" onclick="deleteMovie(${m.id})">Delete</button>
                </td>
            </tr>
        `).join('');
    }

    async function loadSchedules() {
        const res = await fetch('/api/admin_schedules.php');
        const result = await res.json();
        const tbody = document.querySelector('#schedulesTable tbody');
        tbody.innerHTML = result.data.map(s => `
            <tr>
                <td>${s.movie_title}</td>
                <td>${s.date}</td>
                <td>${s.time}</td>
                <td>
                    <button class="action-btn edit-btn" onclick="editSchedule(${s.id})">Edit</button>
                    <button class="action-btn delete-btn" onclick="deleteSchedule(${s.id})">Delete</button>
                </td>
            </tr>
        `).join('');
    }

    async function loadUsers() {
        // We'll need a backend endpoint for this, I'll add it to AdminUserController
        const res = await fetch('/api/admin_users.php');
        const result = await res.json();
        const tbody = document.querySelector('#usersTable tbody');
        tbody.innerHTML = result.data.map(u => `
            <tr>
                <td>${u.name} ${u.last_name || ''}</td>
                <td>${u.phone || '-'}</td>
                <td>${u.email}</td>
                <td>${u.role}</td>
                <td>
                    ${u.email === 'admin@cinema.com' ? 
                        '<span style="color: var(--light-gray); font-style: italic;">Protected</span>' : 
                        `
                        <button class="action-btn edit-btn" onclick="editUser(${u.id})">Edit</button>
                        <button class="action-btn delete-btn" onclick="deleteUser(${u.id})">Delete</button>
                        <button class="action-btn edit-btn" style="background: var(--gray); color: var(--white); border: 1px solid var(--white);" onclick="changeRole(${u.id}, '${u.role === 'admin' ? 'user' : 'admin'}')">Toggle Role</button>
                        `
                    }
                </td>
            </tr>
        `).join('');
    }

    async function loadAllBookings() {
        const res = await fetch('/api/admin_bookings.php');
        const result = await res.json();
        const tbody = document.querySelector('#bookingsTable tbody');
        tbody.innerHTML = result.data.map(b => `
            <tr>
                <td>
                    <strong>${b.user_name}</strong><br>
                    <small>${b.user_email}</small>
                </td>
                <td>${b.movie_title}</td>
                <td>${b.date} ${b.time}</td>
                <td>${b.seat_identifier}</td>
                <td>${new Date(b.created_at).toLocaleString()}</td>
                <td>
                    <button class="action-btn delete-btn" onclick="deleteBooking(${b.id})">Delete</button>
                </td>
            </tr>
        `).join('');
    }

    // 5. CRUD Actions (exposed to window for onclick)
    window.addMovie = () => {
        const fields = `
            <div class="input-container">
                <label>Title</label>
                <input type="text" name="title" required>
            </div>
            <div class="input-container">
                <label>Image URL</label>
                <input type="text" name="image_url" required>
            </div>
            <div class="input-container">
                <label>Genres</label>
                <input type="text" name="genres">
            </div>
            <div class="input-container">
                <label>Description</label>
                <textarea name="description"></textarea>
            </div>
        `;
        openModal('Add New Movie', fields, async (data) => {
            const res = await fetch('/api/admin_movies.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            const result = await res.json();
            if (result.status === 'success') {
                showToast('Movie added successfully!', 'success');
                return true;
            } else {
                showToast(result.message || 'Error adding movie', 'error');
                return false;
            }
        });
    };

    window.editMovie = async (id) => {
        // Fetch current data
        const res = await fetch('/api/admin_movies.php'); // Simple for now, ideally fetch by ID
        const result = await res.json();
        const movie = result.data.find(m => m.id == id);

        const fields = `
            <input type="hidden" name="id" value="${movie.id}">
            <div class="input-container">
                <label>Title</label>
                <input type="text" name="title" value="${movie.title}" required>
            </div>
            <div class="input-container">
                <label>Image URL</label>
                <input type="text" name="image_url" value="${movie.image_url}" required>
            </div>
            <div class="input-container">
                <label>Genres</label>
                <input type="text" name="genres" value="${movie.genres}">
            </div>
            <div class="input-container">
                <label>Description</label>
                <textarea name="description">${movie.description}</textarea>
            </div>
        `;
        openModal('Edit Movie', fields, async (data) => {
            const res = await fetch(`/api/admin_movies.php?id=${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            const result = await res.json();
            if (result.status === 'success') {
                showToast('Movie updated successfully!', 'success');
                return true;
            } else {
                showToast(result.message || 'Error updating movie', 'error');
                return false;
            }
        });
    };

    window.deleteMovie = async (id) => {
        const confirmed = await showConfirmModal('Delete Movie', 'Are you sure you want to delete this movie? All associated show-times will also be removed.');
        if (confirmed) {
            const res = await fetch(`/api/admin_movies.php?id=${id}`, { method: 'DELETE' });
            const result = await res.json();
            if (result.status === 'success') {
                showToast('Movie deleted.', 'success');
                loadMovies();
            } else {
                showToast(result.message || 'Error deleting movie', 'error');
            }
        }
    };

    window.addSchedule = async () => {
        const moviesRes = await fetch('/api/admin_movies.php');
        const movies = await moviesRes.json();
        const movieOptions = movies.data.map(m => `<option value="${m.id}">${m.title}</option>`).join('');

        const fields = `
            <div class="input-container">
                <label>Movie</label>
                <select name="movie_id">${movieOptions}</select>
            </div>
            <div class="input-container">
                <label>Date</label>
                <input type="date" name="date" required>
            </div>
            <div class="input-container">
                <label>Time</label>
                <input type="time" name="time" required>
            </div>
            <div class="input-container">
                <label>Price</label>
                <input type="number" name="price" value="25.00" step="0.5">
            </div>
        `;
        openModal('Add Show-time', fields, async (data) => {
            const res = await fetch('/api/admin_schedules.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            const result = await res.json();
            if (result.status === 'success') {
                showToast('Show-time added!', 'success');
                return true;
            } else {
                showToast(result.message || 'Error adding show-time', 'error');
                return false;
            }
        });
    };

    window.editSchedule = async (id) => {
        const [schRes, movRes] = await Promise.all([
            fetch('/api/admin_schedules.php'),
            fetch('/api/admin_movies.php')
        ]);
        const schResult = await schRes.json();
        const movResult = await movRes.json();
        
        const schedule = schResult.data.find(s => s.id == id);
        const movieOptions = movResult.data.map(m => `<option value="${m.id}" ${m.id == schedule.movie_id ? 'selected' : ''}>${m.title}</option>`).join('');

        const fields = `
            <div class="input-container">
                <label>Movie</label>
                <select name="movie_id">${movieOptions}</select>
            </div>
            <div class="input-container">
                <label>Date</label>
                <input type="date" name="date" value="${schedule.date}" required>
            </div>
            <div class="input-container">
                <label>Time</label>
                <input type="time" name="time" value="${schedule.time}" required>
            </div>
            <div class="input-container">
                <label>Price</label>
                <input type="number" name="price" value="${schedule.price}" step="0.5">
            </div>
        `;

        openModal('Edit Show-time', fields, async (data) => {
            const res = await fetch(`/api/admin_schedules.php?id=${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            const result = await res.json();
            if (result.status === 'success') {
                showToast('Show-time updated!', 'success');
                return true;
            } else {
                showToast(result.message || 'Error updating show-time', 'error');
                return false;
            }
        });
    };

    window.deleteSchedule = async (id) => {
        const confirmed = await showConfirmModal('Delete Show-time', 'Are you sure you want to delete this show-time?');
        if (confirmed) {
            const res = await fetch(`/api/admin_schedules.php?id=${id}`, { method: 'DELETE' });
            const result = await res.json();
            if (result.status === 'success') {
                showToast('Show-time removed.', 'success');
                loadSchedules();
            } else {
                showToast(result.message || 'Error deleting show-time', 'error');
            }
        }
    };

    window.changeRole = async (userId, newRole) => {
        const res = await fetch('/api/admin_users.php', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id: userId, role: newRole })
        });
        const result = await res.json();
        if (result.status === 'success') {
            showToast('User role updated.', 'success');
            loadUsers();
        } else {
            showToast(result.message || 'Error updating role', 'error');
        }
    };

    window.editUser = async (id) => {
        const res = await fetch('/api/admin_users.php');
        const result = await res.json();
        const user = result.data.find(u => u.id == id);

        const fields = `
            <div class="input-container">
                <label>First Name</label>
                <input type="text" name="name" value="${user.name}" required>
            </div>
            <div class="input-container">
                <label>Last Name</label>
                <input type="text" name="last_name" value="${user.last_name || ''}" required>
            </div>
            <div class="input-container">
                <label>Phone</label>
                <input type="text" name="phone" value="${user.phone || ''}" required>
            </div>
            <div class="input-container">
                <label>Email</label>
                <input type="email" name="email" value="${user.email}" required>
            </div>
        `;
        openModal('Edit User', fields, async (data) => {
            const res = await fetch(`/api/admin_users.php?id=${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            const result = await res.json();
            if (result.status === 'success') {
                showToast('User updated successfully!', 'success');
                return true;
            } else {
                showToast(result.message || 'Error updating user', 'error');
                return false;
            }
        });
    };

    window.deleteUser = async (id) => {
        const confirmed = await showConfirmModal('Delete User', 'Are you sure you want to delete this user? All their bookings will be lost.');
        if (confirmed) {
            const res = await fetch(`/api/admin_users.php?id=${id}`, { method: 'DELETE' });
            const result = await res.json();
            if (result.status === 'success') {
                showToast('User deleted.', 'success');
                loadUsers();
            } else {
                showToast(result.message || 'Error deleting user', 'error');
            }
        }
    };

    window.deleteBooking = async (id) => {
        const confirmed = await showConfirmModal('Delete Reservation', 'Are you sure you want to delete this reservation? This action cannot be undone.');
        if (confirmed) {
            const res = await fetch(`/api/admin_bookings.php?id=${id}`, { method: 'DELETE' });
            const result = await res.json();
            if (result.status === 'success') {
                showToast('Reservation deleted.', 'success');
                loadAllBookings();
            } else {
                showToast(result.message || 'Error deleting reservation', 'error');
            }
        }
    };

    // Initial load
    loadMovies();
    
    // Bind buttons
    document.getElementById('addMovieBtn').onclick = window.addMovie;
    document.getElementById('addScheduleBtn').onclick = window.addSchedule;
});
