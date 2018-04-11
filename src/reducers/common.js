const initalState = {
  movies: [],
  typeOfMovies: ""
};

export const common = (state = initalState, action) => {
  switch (action.type) {
    case "NEW_MOVIES":
      return {
        ...state,
        movies: action.payload.results.filter(m => m.poster_path),
        inProgress: false
      };
    case "LOGIN":
      return {
        ...state,
        user: action.payload.results,
        inProgress: false
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

    default:
      return state;
  }
};

export default common;
