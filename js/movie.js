const apiKey = '2277dc53';
let pageUrl = window.location.href;
let params = (new URL(pageUrl)).searchParams;
const id = params.get('i');
var movieDetails = document.getElementById('movie-details');
renderMoiePage();

async function renderMoiePage() {
    try {
        const movie = await getMovieById(id);

        if (movie.Response == 'True') {
            renderMovieDetails(movie);
        } else {
            showError(movie.Error);
        }
    } catch (error) {
        showError('Error fetching movie details:', error);
    }
};

async function getMovieById(id){
    const url = `http://www.omdbapi.com/?apikey=${apiKey}&i=${id}`;
    const response = await fetch(url);
    const data = await response.json();

    return data;
}

async function renderMovieDetails(movie){
    movieDetails.innerHTML='';
    const movieImage = movie.Poster === 'N/A' || movie.Poster === undefined
        ? `<img src="../image_not_found.png" style="height:450px" class="w-auto">`
        : `<img src="${movie.Poster}" style="height:450px" class="w-auto">`;

    movieDetails.innerHTML=`
        <div class="grid grid-cols-1 md:grid-cols-2 px-3 gap-8 mx-10 lg:mx-40">
            <div class="my-3 flex md:justify-end">
            ${movieImage}
            </div>
            <div class="my-3 flex flex-col gap-1">
                <h2 class="font-semibold text-2xl">${movie.Title}</h2>
                <p><b>Plot:</b> ${movie.Plot}</p>
                <p><b>Duration:</b> ${movie.Runtime}</p>
                <p><b>Release Date: </b>${movie.Released}</p>
                <p><b>Actors:</b> ${movie.Actors}</p>
                <p><b>IMDB Rating:</b> ${movie.imdbRating}</p>
                <p><b>IMDB Votes:</b> ${movie.imdbVotes}</p>
                <p><b>Genre:</b> ${movie.Genre}</p>
                <p><b>Language:</b> ${movie.Language}</p>
            </div>
        </div>`
}

async function showError(error){

}