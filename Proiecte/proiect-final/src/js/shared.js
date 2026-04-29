// MARK: Toast System
export function showToast(message, type = 'info', duration = 3000) {
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<span>${message}</span>`;

    container.appendChild(toast);

    const removeToast = () => {
        toast.classList.add('fade-out');
        toast.addEventListener('animationend', () => {
            toast.remove();
            if (container.childNodes.length === 0) {
                container.remove();
            }
        });
    };

    const autoRemove = setTimeout(removeToast, duration);

    toast.onclick = () => {
        clearTimeout(autoRemove);
        removeToast();
    };
}
window.showToast = showToast;

// MARK: Confirm Modal System
export function showConfirmModal(title, message) {
    return new Promise((resolve) => {
        const overlay = document.createElement('div');
        overlay.className = 'confirm-modal-overlay';
        overlay.innerHTML = `
            <div class="confirm-modal">
                <h3>${title}</h3>
                <p>${message}</p>
                <div class="confirm-modal-btns">
                    <button class="cancel-btn">Cancel</button>
                    <button class="confirm-btn">Confirm</button>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);

        const closeModal = (result) => {
            overlay.remove();
            resolve(result);
        };

        overlay.querySelector('.cancel-btn').onclick = () => closeModal(false);
        overlay.querySelector('.confirm-btn').onclick = () => closeModal(true);
        overlay.onclick = (e) => {
            if (e.target === overlay) closeModal(false);
        };
    });
}
window.showConfirmModal = showConfirmModal;

// MARK: Shared Booking Logic
export const renderSeats = (seatsLeft, seatsRight) => {
    let leftHtml = '';
    seatsLeft.forEach((row, rowIndex) => {
        row.forEach((seat, colIndex) => {
            const dataAttrs = `data-side="left" data-row="${rowIndex}" data-col="${colIndex}"`;
            if(seat === -1) leftHtml += `<div class="no-square seat" ${dataAttrs}></div>`;
            else if(seat === 0) leftHtml += `<div class="available seat" ${dataAttrs}></div>`;
            else leftHtml += `<div class="reserved seat" ${dataAttrs}></div>`;
        });
    });

    let rightHtml = '';
    seatsRight.forEach((row, rowIndex) => {
        row.forEach((seat, colIndex) => {
            const dataAttrs = `data-side="right" data-row="${rowIndex}" data-col="${colIndex}"`;
            if(seat === -1) rightHtml += `<div class="no-square seat" ${dataAttrs}></div>`;
            else if(seat === 0) rightHtml += `<div class="available seat" ${dataAttrs}></div>`;
            else rightHtml += `<div class="reserved seat" ${dataAttrs}></div>`;
        });
    });

    return `
        <div class="seats">
            <div class="seats-left">${leftHtml}</div>
            <div class="seats-right">${rightHtml}</div>
        </div>
    `;
};

export const performBooking = async (scheduleId, selectedSeats) => {
    if (selectedSeats.length === 0) {
        showToast('Please select at least one seat.', 'error');
        return false;
    }

    try {
        const response = await fetch('/api/bookings.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                schedule_id: scheduleId,
                seats: selectedSeats
            })
        });

        const result = await response.json();
        if (result.status === 'success') {
            showToast('Booking successful!', 'success');
            return true;
        } else {
            showToast(result.message, 'error');
            if (result.message.includes('log in')) {
                window.location.href = 'login.html';
            }
            return false;
        }
    } catch (error) {
        console.error('Booking error:', error);
        showToast('An error occurred during booking.', 'error');
        return false;
    }
};

// MARK: Tickets menu
const ticketsBox = document.querySelector('#ticketsBox')
const ticketsToggle = document.querySelector('#ticketsToggle')
const menuBtn = document.querySelector('#menuBtn')
const menuBox = document.querySelector('#menuBox')

if (ticketsToggle) {
    ticketsToggle.addEventListener('click', () => {
        ticketsBox.classList.toggle('hidden')

        if(!menuBox.classList.contains('hidden')){
            menuBtn.classList.toggle('closed')
            menuBox.classList.toggle('hidden')
        }
    })
}

// MARK: Menu button
if (menuBtn) {
    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('closed')
        menuBox.classList.toggle('hidden')

        if(!ticketsBox.classList.contains('hidden')){
            ticketsBox.classList.add('hidden')
        }
    })
}

// MARK: Auth Check
async function checkAuth() {
    const loginBtn = document.querySelector('.login-btn');
    const ticketsBtnContainer = document.querySelector('.tickets-btn-container');
    
    // Hide tickets button by default
    if (ticketsBtnContainer) ticketsBtnContainer.style.display = 'none';

    if (!loginBtn) return;

    try {
        const response = await fetch('/api/me.php');
        const result = await response.json();

        if (result.status === 'success') {
            if (ticketsBtnContainer) ticketsBtnContainer.style.display = 'block';

            const logoutAction = async (e) => {
                e.preventDefault();
                await fetch('/api/logout.php', { method: 'POST' });
                window.location.reload();
            };

            loginBtn.textContent = 'Log Out';
            loginBtn.onclick = logoutAction;

            const menuLoginLink = document.querySelector('#menuBox .content p:last-child a');
            if (menuLoginLink) {
                menuLoginLink.textContent = 'Log Out';
                menuLoginLink.onclick = logoutAction;
            }

            if (result.user.role === 'admin' && !window.location.pathname.includes('admin.html')) {
                const menuContent = document.querySelector('#menuBox .content');
                if (menuContent) {
                    const adminLink = document.createElement('p');
                    adminLink.innerHTML = '<a href="admin.html">Admin Dashboard</a>';
                    menuContent.insertBefore(adminLink, menuContent.lastElementChild);
                }

                const desktopMenu = document.querySelector('nav ul');
                if (desktopMenu) {
                    const adminLi = document.createElement('li');
                    adminLi.innerHTML = '<a href="admin.html">Admin</a>';
                    desktopMenu.appendChild(adminLi);
                }
            }

            loadBookings();
        } else {
            loginBtn.onclick = () => {
                window.location.href = 'login.html';
            };
        }
    } catch (error) {
        console.error('Auth check error:', error);
    }
}

async function loadBookings() {
    const content = document.querySelector('#ticketsBox .content');
    if (!content) return;

    try {
        const response = await fetch('/api/bookings.php');
        const result = await response.json();

        if (result.status === 'success' && result.data.length > 0) {
            content.innerHTML = result.data.map(b => `
                <div class="ticket-item">
                    <div class="ticket-info">
                        <p class="movie-title">${b.movie_title}</p>
                        <p class="details">${b.date} @ ${b.time} - Seat: ${b.seat_identifier}</p>
                    </div>
                    <button class="cancel-ticket" onclick="cancelBooking(${b.id})">
                        <img src="/icons/cross.svg" alt="cancel" draggable="false">
                    </button>
                </div>
            `).join('');
        } else {
            content.innerHTML = '<p style="padding: 20px; text-align: center; color: #888;">No tickets booked yet.</p>';
        }
    } catch (error) {
        console.error('Error loading bookings:', error);
    }
}

async function cancelBooking(bookingId) {
    const confirmed = await showConfirmModal('Cancel Booking', 'Are you sure you want to cancel this booking? This action cannot be undone.');
    if (!confirmed) return;

    try {
        const response = await fetch(`/api/bookings.php?id=${bookingId}`, {
            method: 'DELETE'
        });
        const result = await response.json();

        if (result.status === 'success') {
            showToast('Booking cancelled successfully', 'success');
            loadBookings();
        } else {
            showToast(result.message, 'error');
        }
    } catch (error) {
        console.error('Error cancelling booking:', error);
        showToast('An error occurred while cancelling.', 'error');
    }
}
window.cancelBooking = cancelBooking;

checkAuth();