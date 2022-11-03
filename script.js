const API_KEY = `5bb080bfe388f1e0acb9aa9c3e174e83`;
const API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`;
const API_SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=&page=1`;
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";
const container = document.querySelector('.container');
const input = document.querySelector('#input');
const form = document.querySelector('form')
displayMovies(API_URL);


form.addEventListener('submit',async (e)=>{
        e.preventDefault();
        const query = input.value;
        if(query===''){
            displayMovies(API_URL)
        }else{

            const API_SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&page=1`;
            displayMovies(API_SEARCH_URL);
            input.value='';
            input.blur();
        }

})

async function fetchMovies(url){
    const res = await fetch(url);
    const data = await res.json() 
    return data.results
}

async function displayMovies(url){
    const movies = await fetchMovies(url)
   container.innerHTML = movies.map(movie=>{
       const ratingColor = movie.vote_average>=8? 'good': movie.vote_average>=4? 'average': 'bad';
       return `<div class="movie">
                <img src="${IMAGE_URL}${movie.poster_path}" alt=${movie.title} class="poster">
                <div class="info">
                    <h2 class="title">${movie.title}</h2>
                    <div class="rating ${ratingColor}">${movie.vote_average}</div>
                </div>
                <span class="overview">
                    <h3>Overview</h3>
                    <p>${movie.overview}</p>
                </span>
            </div>`;
   }).join('')
}


