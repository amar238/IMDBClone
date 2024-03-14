// target div
const movieList = document.getElementById('movie-list');
// call to initiate page
displayFavoriteMovies();
// fetch movies from local storage and display
function displayFavoriteMovies(){
    movieList.innerHTML=''    //clear last movie list
    const movieData = JSON.parse(localStorage.getItem('imdbData')) || [];
    movieData.forEach(movie=>{
        movieList.innerHTML+=createMovieHTML(movie);
    })
}
// add movie card to html
function createMovieHTML(movie){
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
              <span>${movie.Year.substring(0,4)}</span>
              <button onclick="deleteFavorite('${movie.imdbID}')"
              class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-3">
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
                    class="mr-1 h-4 w-4"
                    >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                    </svg>
                    Remove
                </button>
            </div>
            <a href="movie.html?i=${movie.imdbID}"><h2 class="font-semibold uppercase">${movie.Type}</h2></a>
          </div>
        </div>
      </div>`;
}
// delete movie from favorites
function deleteFavorite(id){
    const moviesArray = JSON.parse(localStorage.getItem('imdbData')) || [];
    const filteredData = moviesArray.filter((movie) => movie.imdbID !== id);
    localStorage.setItem('imdbData', JSON.stringify(filteredData));
    displayFavoriteMovies();
}