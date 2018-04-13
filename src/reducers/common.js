const initalState = {
  movies: [],
  favoriteMovies: [],
  typeOfMovies: "",
  userAuthenticated: false,
  user: null,
  token: null
};

export const common = (state = initalState, action) => {
  switch (action.type) {
    case "NEW_MOVIES":
      return {
        ...state,
        movies: action.payload.results.filter(m => m.poster_path),
        inProgress: false
      };
    case "MOVIE_FAVORITES":
      return {
        ...state,
        favoriteMovies: action.payload.movies,
        inProgress: false
      };
    case "LOGIN":
    case "REGISTER":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.user.token,
        isAuthenticated: action.payload.user ? true : false,
        inProgress: false,
        redirect: "/"
      };
    case "CREATE_SEARCH_TERM":
      return {
        ...state,
        typeOfMovies: action.payload
      };
    case "ASYNC_START":
      return {
        ...state,
        inProgress: true
      };
    case "REDIRECT":
      return {
        ...state,
        redirect: action.payload
      };
    default:
      return state;
  }
};

export default common;
