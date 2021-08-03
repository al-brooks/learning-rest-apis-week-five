// note: example url with my api key:
// http://www.omdbapi.com/?s=batman&apikey=25ae6f68

// to-do: Function for displaying movie details
function displayMovieDetails(button) {
  const movieID = button.getAttribute('movie-id');
  const chosenMovieURL = `http://www.omdbapi.com/?i=${movieID}&apikey=25ae6f68`;

  let request = new XMLHttpRequest();

  request.addEventListener('load', function () {
    const movieDetailsObject = JSON.parse(this.responseText);

    const movieDetails = `
        <h1>${movieDetailsObject.Title}</h1>
        <img src = '${movieDetailsObject.Poster}' />
        <p id='movieDescription'>${movieDetailsObject.Plot}</p>
    `;

    movieDisplay.innerHTML = movieDetails;
  });

  request.open('GET', chosenMovieURL);
  request.send();
}

// to-do: create variables for HTML elements
const movieList = document.getElementById('movieList');
const movieDisplay = document.getElementById('movieDisplay');

// to-do: create functions to separate these request functions
// make it more readable.

// to-do: create initial page load API
let request = new XMLHttpRequest();

request.addEventListener('load', function () {
  const movieObject = JSON.parse(this.responseText);

  // note: the below limits your display options
  // how can you separate these actions out?
  const movieArr = movieObject.Search;
  const movieListItems = movieArr.map(function (movie) {
    const movieItem = `
      <div class = 'movieBox'>
        <div movie-id='${movie.imdbID}' onClick = 'displayMovieDetails(this)' class = 'movieTitle'>${movie.Title}</div>
        <img class = 'moviePoster' src = '${movie.Poster}' />
      </div>
      `;

    return movieItem;
  });
  movieList.innerHTML = movieListItems.join('');
});

request.open('GET', 'http://www.omdbapi.com/?s=harry-potter&apikey=25ae6f68');

request.send();
