const apiKey = '2277dc53';
const searchInput = document.getElementById('search');
const searchResults = document.getElementById('movie-list');

// function to get list of moviews based on passed query
async function searchMovies(query) {
  const url = `http://www.omdbapi.com/?apikey=${apiKey}&s=${query}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.Search || [];
}

// Event listener for keystrokes in the search input field
searchInput.addEventListener('input', async function () {

  const query = searchInput.value
  if (query.length > 2) { // Perform search when at least 3 characters are entered
    const results = await searchMovies(query);
    displaySearchResults(results);
  }
});

// render target div movie-list
function displaySearchResults(results) {
  searchResults.innerHTML = ''    //clear last movie list
  results.forEach(movie => {
    searchResults.innerHTML += createMovieHTML(movie);
  })

}

// create movie card
function createMovieHTML(movie) {
  const movieImage = movie.Poster === 'N/A' || movie.Poster === undefined
    ? `<img src="../image_not_found.png" width="200" height="200" alt="Placeholder"/>`
    : `<img src="${movie.Poster}" width="200" height="200" alt="Movie poster"/>`;

  return `
      <div class="rounded-lg border bg-card text-card-foreground shadow-sm" >
        <div class="p-4 flex flex-col items-center gap-4 h-full">
          <div class="flex flex-grow items-center justify-center ">
            ${movieImage}
          </div>
          <div class="flex flex-col items-center gap-2">
            <h2 class="font-semibold">${movie.Title}</h2>
            <div class="flex items-center gap-2">
              <span>${movie.Year.substring(0, 4)}</span>
              <button id="addFavorite${movie.imdbID}"
              onclick="addToFavorites(this,'${encodeURIComponent(JSON.stringify(movie))}')"
                class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium 
                ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 
                focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 
                hover:bg-accent hover:text-accent-foreground h-10 w-10 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="h-6 w-6"
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 
                  5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                </svg>
              </button>
            </div>
            <a href="movie.html?i=${movie.imdbID}"><h2 class="font-semibold uppercase">${movie.Type}</h2></a>
          </div>
        </div>
      </div>`;
}

// add to favorite
function addToFavorites(button, movieString) {
  var decodedString = decodeURIComponent(movieString);
  var movie = JSON.parse(decodedString);
  let moviesArray = JSON.parse(localStorage.getItem('imdbData')) || [];
  let alreadyExists = moviesArray.some(existingMovie => existingMovie.imdbID === movie.imdbID);
  if (alreadyExists) {
    alert('Movie already exists.');
    return;
  }
  moviesArray.push(movie);
  localStorage.setItem('imdbData', JSON.stringify(moviesArray));
  const heartIcon = button.querySelector('svg');
  heartIcon.setAttribute('fill', 'red');
  alert(`${movie.Title} Added to favourites!`);
}