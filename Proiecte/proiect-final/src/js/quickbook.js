import { showToast, renderSeats, performBooking } from './shared.js';

document.addEventListener('DOMContentLoaded', async () => {
    const movieSelect = document.getElementById('movieSelect');
    const dateSelect = document.getElementById('dateSelect');
    const timeSelect = document.getElementById('timeSelect');
    const quickBookBtn = document.getElementById('quickBookBtn');

    const bookingModal = document.getElementById('bookingModal');
    const bookingModalTitle = document.getElementById('bookingModalTitle');
    const bookingModalDetails = document.getElementById('bookingModalDetails');
    const seatsContainer = bookingModal.querySelector('.seats-container');
    const closeBookingModal = document.getElementById('closeBookingModal');
    const finalBookBtn = document.getElementById('finalBookBtn');

    let allSchedules = [];
    let selectedSchedule = null;

    try {
        const res = await fetch('/api/schedule.php');
        const result = await res.json();
        allSchedules = result.data;

        const uniqueMovies = [];
        allSchedules.forEach(item => {
            if (!uniqueMovies.some(m => m.id === item.movie_id)) {
                uniqueMovies.push({ id: item.movie_id, name: item.name });
            }
        });

        uniqueMovies.forEach(movie => {
            const option = document.createElement('option');
            option.value = movie.id;
            option.textContent = movie.name;
            movieSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Failed to load Quick Book data:', error);
    }

    movieSelect.addEventListener('change', () => {
        const movieId = movieSelect.value;
        const movieEntries = allSchedules.filter(m => m.movie_id == movieId);

        dateSelect.innerHTML = '<option value="" disabled selected hidden>Day</option>';
        movieEntries.forEach(entry => {
            const option = document.createElement('option');
            option.value = entry.date;
            option.textContent = formatDate(entry.date);
            dateSelect.appendChild(option);
        });
        dateSelect.disabled = false;
        timeSelect.disabled = true;
        timeSelect.innerHTML = '<option value="" disabled selected hidden>Hour</option>';
    });

    dateSelect.addEventListener('change', () => {
        const movieId = movieSelect.value;
        const date = dateSelect.value;
        const movie = allSchedules.find(m => m.movie_id == movieId && m.date === date);

        timeSelect.innerHTML = '<option value="" disabled selected hidden>Hour</option>';
        movie.showtimes.forEach(st => {
            const option = document.createElement('option');
            option.value = st.id;
            option.textContent = st.time;
            timeSelect.appendChild(option);
        });
        timeSelect.disabled = false;
    });

    quickBookBtn.addEventListener('click', () => {
        const scheduleId = timeSelect.value;
        if (!scheduleId) {
            showToast('Please select all fields first.', 'info');
            return;
        }

        const movie = allSchedules.find(m => m.showtimes.some(st => st.id == scheduleId));
        selectedSchedule = movie.showtimes.find(st => st.id == scheduleId);

        bookingModalTitle.textContent = movie.name;
        bookingModalDetails.textContent = `${formatDate(movie.date)} at ${selectedSchedule.time}`;
        seatsContainer.innerHTML = renderSeats(selectedSchedule.seats_left, selectedSchedule.seats_right);
        bookingModal.classList.remove('hidden');

        initializeModalSeatSelection();
    });

    const initializeModalSeatSelection = () => {
        const seats = seatsContainer.querySelectorAll('.seat');
        seats.forEach(seat => {
            seat.onclick = () => {
                if (seat.classList.contains('available')) {
                    seat.classList.toggle('selected');
                }
            };
        });
    };

    finalBookBtn.addEventListener('click', async () => {
        const selectedSeats = Array.from(seatsContainer.querySelectorAll('.seat.selected')).map(seat => ({
            side: seat.getAttribute('data-side'),
            row: parseInt(seat.getAttribute('data-row')),
            col: parseInt(seat.getAttribute('data-col'))
        }));

        if (selectedSeats.length === 0) {
            showToast('Please select at least one seat.', 'error');
            return;
        }

        const success = await performBooking(selectedSchedule.id, selectedSeats);
        if (success) {
            bookingModal.classList.add('hidden');
            setTimeout(() => {
                window.location.reload();
            }, 500);
        }
    });

    closeBookingModal.onclick = () => bookingModal.classList.add('hidden');
    window.onclick = (e) => { if (e.target === bookingModal) bookingModal.classList.add('hidden'); };

    function formatDate(dateStr) {
        const d = new Date(dateStr);
        const day = d.getDate();
        const month = d.toLocaleString('default', { month: 'short' });
        return `${day} ${month}.`;
    }
});
