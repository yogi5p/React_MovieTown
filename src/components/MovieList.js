import React from "react";

let MovieList = props => {
  console.log(props.movies);
  return (
    <ul>
      {props.movies.map(movie => (
        <li key={movie.poster_path}>
          {movie.title}
          <br />
          <img
            src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path}
            alt={movie.title}
            key={movie.title}
          />
        </li>
      ))};
    </ul>
  );
};

export default MovieList;
