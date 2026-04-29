import { showToast, renderSeats, performBooking } from './shared.js';

const today = new Date("2025-03-21");

try {
    const response = await fetch('/api/schedule.php');
    const result = await response.json()
    const movies = result.data

    const dates = movies.map(movie => movie.date)
    const uniqueDates = Array.from(new Set(dates))
    const finalDatesArray = []

    uniqueDates.forEach(date => {
        const dateObject = new Date(date)
        if(dateObject.getTime() === today.getTime()){
            finalDatesArray.push('Today')
        } else {
            const day = dateObject.getDate()
            const month = dateObject.toLocaleString('default', { month: 'short' })
            finalDatesArray.push(`${day} ${month}.`)
        }
    })

    const datesBox = document.querySelector('#dates')

    finalDatesArray.forEach((date, index) => {
        const html = `
            <div class="date ${index === 0 && 'active'}">${date}</div>
            ${index < finalDatesArray.length - 1 ? '<div class="vertical-line"></div>' : ''}
        `
        datesBox.insertAdjacentHTML('beforeend', html)
    })

    const datesElements = document.querySelectorAll('.date')
    const datesElementsArr = Array.from(datesElements)
    let selectedDate = uniqueDates[0]

    const appendMovies = (selectedDate) => {
        const moviesBox = document.querySelector('#moviesContainer')
        let finalHtml = ``

        movies.forEach((movie) => {
            if(movie.date === selectedDate){
                let hoursHtml = ``
                movie.showtimes.forEach((st, idx) => {
                    hoursHtml += `<div class="hour ${idx === 0 ? 'selected' : ''}" data-id="${st.id}" data-movie-id="${movie.movie_id}" data-idx="${idx}">${st.time}</div>`
                })

                // Initial showtime (first one)
                const firstST = movie.showtimes[0];
                const initialSeatsHtml = renderSeats(firstST.seats_left, firstST.seats_right);

                const html = `
                    <div class="movie-card" data-movie-id="${movie.movie_id}" data-selected-id="${firstST.id}">
                        <div class="movie-card-left">
                            <img src="${movie.image}" alt="movie_img" draggable="false">
                            <div class="movie-info">
                                <div class="top-part">
                                    <h2>${movie.name}</h2>
                                    <p class="genres">${movie.genres}</p>
                                    <p class="description">${movie.description}</p>
                                    <div class="hours">
                                        ${hoursHtml}
                                    </div>
                                </div>
                                <button class="book-btn">Book</button>
                            </div>
                        </div>
                        <div class="movie-card-right">
                            <p class="title">Choose your seats</p>
                            <div class="seats">
                                ${initialSeatsHtml}
                            </div>
                            <div class="legend">
                                <div class="category"><div class="circle reserved"></div><p>Reserved</p></div>
                                <div class="category"><div class="circle available"></div><p>Available</p></div>
                                <div class="category"><div class="circle selected"></div><p>Selected</p></div>
                            </div>
                        </div>
                    </div>
                `
                finalHtml += html
            }
        })
        moviesBox.innerHTML = finalHtml
    }

    appendMovies(selectedDate)

    datesElementsArr.forEach((date, index) => {
        date.addEventListener('click', () => {
            datesElementsArr.forEach(date => date.classList.remove('active'));
            date.classList.add('active');
            selectedDate = uniqueDates[index];
            console.log(selectedDate);
            appendMovies(selectedDate);
    
            initializeSeatSelection();
            initializeHourSelection();
            initializeBooking();
        });
    });
    
    const initializeBooking = () => {
        const movieCards = document.querySelectorAll('.movie-card');

        movieCards.forEach(card => {
            const bookBtn = card.querySelector('.book-btn');
            bookBtn.addEventListener('click', async () => {
                const scheduleId = card.getAttribute('data-selected-id');
                
                if (!scheduleId) {
                    showToast('Please select a show-time first.', 'error');
                    return;
                }

                const selectedSeats = Array.from(card.querySelectorAll('.seat.selected')).map(seat => ({
                    side: seat.getAttribute('data-side'),
                    row: parseInt(seat.getAttribute('data-row')),
                    col: parseInt(seat.getAttribute('data-col'))
                }));

                if (selectedSeats.length === 0) {
                    showToast('Please select at least one seat.', 'error');
                    return;
                }

                const success = await performBooking(scheduleId, selectedSeats);
                if (success) {
                    window.location.reload();
                }
            });
        });
    }

    const initializeHourSelection = () => {
        const movieCards = document.querySelectorAll('.movie-card');

        movieCards.forEach(card => {
            const hourBtns = card.querySelectorAll('.hour');
            const seatsDiv = card.querySelector('.seats');
            const movieId = card.getAttribute('data-movie-id');

            hourBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    // Update UI
                    hourBtns.forEach(b => b.classList.remove('selected'));
                    btn.classList.add('selected');

                    // Update active ID for booking
                    const scheduleId = btn.getAttribute('data-id');
                    card.setAttribute('data-selected-id', scheduleId);

                    // Re-render seats for this showtime
                    const movieData = movies.find(m => m.movie_id == movieId && m.date === selectedDate);
                    const showtime = movieData.showtimes.find(st => st.id == scheduleId);

                    seatsDiv.innerHTML = renderSeats(showtime.seats_left, showtime.seats_right);

                    // Re-initialize seat selection for the new seats
                    initializeSeatSelection();
                });
            });
        });
    };
    
    const initializeSeatSelection = () => {
        const movieCards = document.querySelectorAll('.movie-card');
    
        movieCards.forEach(movieCard => {
            const seats = movieCard.querySelectorAll('.seat');
    
            seats.forEach(seat => {
                // Remove existing listeners if any (by cloning and replacing, or just be careful)
                // Actually, since we re-render innerHTML, we need to bind new listeners
                seat.onclick = () => {
                    if (seat.classList.contains('available')) {
                        seat.classList.toggle('selected');
                    }
                };
            });
        });
    };
    
    initializeSeatSelection();
    initializeHourSelection();
    initializeBooking();

    

} catch (error) {
    console.error('Error:', error);
}