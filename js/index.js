const apiKey = '2277dc53';
const searchInput = document.getElementById('search');
const searchResults = document.getElementById('movie-list');

// function to get list of moviews based on passed query
async function searchMovies(query) {
    const url = `http://www.omdbapi.com/?apikey=${apiKey}&s=${query}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data.Search || [];
}

// Event listener for keystrokes in the search input field
searchInput.addEventListener('input', async function() {
  
    const query = searchInput.value
    console.log(searchInput.value)
    // console.log(query)
    if (query.length > 2) { // Perform search when at least 3 characters are entered
        const results = await searchMovies(query);
        displaySearchResults(results);
    } 
});

function displaySearchResults(results){
    console.log(document.body)
    searchResults.innerHTML=''    //clear last movie list
    let htmlString = '<div class="grid grid-cols-4 gap-6" id="movie-list">';
    results.forEach(movie=>{
        htmlString+=createMovieHTML(movie);
    })
    htmlString+="</div>"
    searchResults.innerHTML = htmlString;

}

function createMovieHTML(movie){
    const movieImage = movie.Poster === 'N/A' || movie.Poster === undefined
        ? '<p class="text-center my-4">No image available</p>'
        : `<img src="${movie.Poster}" class="card-img-top w-64 h-64" >`;

    return `
    <div className="relative group overflow-hidden rounded-lg min-w-64 min-h-64">
              ${movieImage}
              <div className="grid gap-2 p-2">
                <h3 className="font-semibold text-lg md:text-xl line-clamp-2">The Midnight Sky</h3>
                <button
                  className="absolute top-2 right-2 p-2 rounded-full bg-white dark:bg-gray-800"
                  onClick={undefined}
                >
                  <HeartIcon className="w-6 h-6" />
                </button>
                <p className="text-sm text-gray-500 dark:text-gray-400">2020</p>
                <div className="flex items-center gap-2">
                  <StarIcon className="w-4 h-4 fill-primary" />
                  <StarIcon className="w-4 h-4 fill-primary" />
                  <StarIcon className="w-4 h-4 fill-primary" />
                  <StarIcon className="w-4 h-4 fill-muted stroke-muted-foreground" />
                  <StarIcon className="w-4 h-4 fill-muted stroke-muted-foreground" />
                  <span className="text-sm font-semibold">5.6/10</span>
                </div>
              </div>
            </div>`;
}