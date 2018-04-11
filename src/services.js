const MOVIE_BASE_URL = `https://api.themoviedb.org/3`;

const API_URL = `https://codercamps-conduit.herokuapp.com/api/`;

const Movie = {
  getDetails: movieId =>
    fetch(
      `${MOVIE_BASE_URL}/movie/${movieId}?api_key=2434d246ec60c162a86db597467ef4ed`
    ),
  search: term => {
    const uriEncoded = encodeURIComponent(term);
    return fetch(
      `${MOVIE_BASE_URL}/search/movie?api_key=2434d246ec60c162a86db597467ef4ed&language=en-US&query=${uriEncoded}&include_adult=false&sort_by=created_at.asc&page=1`
    );
  }
};

const User = {
  login: (useremail, password) =>
    fetch(API_URL + "users/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user: {
          email: "meow@pants.com",
          password: "password18"
        }
      })
    })
};

export default {
  Movie,
  User
};
