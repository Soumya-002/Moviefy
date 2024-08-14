const API_KEY='api_key=ff2c79bd02686cfefb9cf9e6294c86df';
const BASE_URL='https://api.themoviedb.org/3';
const API_URL=BASE_URL+'/discover/movie?sort_by=popularity.desc&'+API_KEY;
const IMG_URL='https://image.tmdb.org/t/p/w500';
const searchURL=BASE_URL+'/search/movie?'+API_KEY;
const container=document.getElementById('container');
const form=document.getElementById('form');
const search=document.getElementById('search');
const genreSelect=document.getElementById('genreSelect');

showMovies(API_URL);

const options = {
   method: 'GET',
   headers: {
     accept: 'application/json',
     Authorization: 'Bearer ff2c79bd02686cfefb9cf9e6294c86df'
   }
 };

 function getTrailer(movieId) {
   fetch(`${BASE_URL}/movie/${movieId}/videos?language=en-US`, options)
     .then(response => response.json())
     .then(response => {
       const trailer = response.results.find(video => video.site === 'YouTube' && video.type === 'Trailer');
       if (trailer) {
         trailerIframe.src = `https://www.youtube.com/embed/${trailer.key}`;
         trailerModal.classList.remove('hidden');
       } else {
         alert('Trailer not available');
       }
     })
     .catch(err => console.error(err));
 }

function showMovies(url){
    fetch(url).then(res => res.json())
    .then(data =>{
        console.log(data.results);
        getmovies(data.results);
    });
}

function getmovies(data){
    container.innerHTML = '';
    data.forEach(movie => {
        const { title, poster_path, overview, vote_average, genre_ids, id } = movie;
        const Element = document.createElement('div');
        Element.classList.add('card', 'rounded-lg', 'overflow-hidden', 'shadow-lg', 'transform', 'transition', 'duration-300', 'hover:scale-105');

        const stars = getStars(vote_average);

        Element.innerHTML = `
            <img src="${IMG_URL + poster_path}" alt="${title}">
            <div class="movie-info">
                <h3 class="heading">${title}</h3>
                <div class="stars">${stars}</div>
            </div>
            <span class="genre">${genre_id(genre_ids[0])}</span>
            <div id="trailer-modal" class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center hidden">
            <div class="relative w-full max-w-3xl">
               <button id="close-modal" class="absolute top-2 right-2 text-white text-2xl">&times;</button>
               <iframe id="trailer" class="w-full h-96" src="" frameborder="0" allowfullscreen></iframe>
            </div>
         </div>

            <div class="overview">
                <h1 class="heading">Overview</h1>
                ${overview}
                <br>
                <button class="bg-blue-500 text-white px-3 py-2 mt-2 trailer-btn" data-id="${id}">Watch Trailer</button>
            </div>
        `;
        container.appendChild(Element);
    });

    const trailerButtons = document.querySelectorAll('.trailer-btn');
    trailerButtons.forEach(button => {
        button.addEventListener('click', function () {
            const movieId = this.getAttribute('data-id');
            fetch(`${BASE_URL}/movie/${movieId}/videos?${API_KEY}`)
                .then(res => res.json())
                .then(videoData => {
                    const youtubeKey = videoData.results.find(video => video.site === 'YouTube' && video.type === 'Trailer')?.key;
                    if (youtubeKey) {
                        trailerIframe.src = `https://www.youtube.com/embed/${youtubeKey}`;
                        trailerModal.classList.remove('hidden');
                    } else {
                        alert('Trailer not available');
                    }
                });
        });
    });
}

function getStars(rating) {
    const fullStars = Math.floor(rating / 2);
    const halfStars = (rating % 2) >= 1 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;

    return (
        '<span class="star-full">&#9733;</span>'.repeat(fullStars) +
        '<span class="star-half">&#9733;</span>'.repeat(halfStars) +
        '<span class="star-empty">&#9734;</span>'.repeat(emptyStars)
    );
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = search.value;
    if (searchTerm && searchTerm !== '') {
        showMovies(searchURL + '&query=' + searchTerm);
    } else {
        showMovies(API_URL);
    }
});

// New event listener for genre selection
genreSelect.addEventListener('change', (e) => {
    const genreId = e.target.value;
    if (genreId) {
        showMovies(BASE_URL + '/discover/movie?with_genres=' + genreId + '&' + API_KEY);
    } else {
        showMovies(API_URL);
    }
});

closeModal.addEventListener('click', () => {
    trailerModal.classList.add('hidden');
    trailerIframe.src = '';
});

function genre_id(value) {
    if (value == 28) {
        return 'Action';
    } else if (value == 12) {
        return 'Adventure';
    } else if (value == 14) {
        return 'Fantasy';
    } else if (value == 80) {
        return 'Crime';
    } else if (value == 16) {
        return 'Animation';
    } else if (value == 35) {
        return 'Comedy';
    } else if (value == 878) {
        return 'Science Fiction';
    } else if (value == 10752) {
        return 'Drama';
    } else if (value == 27) {
        return 'Horror';
    } else if(value == 37) {
        return 'Western';
    }else return 'History';
}
