import React from "react";
import Movie from "./Movie";

function Genre(props) {
  if (props.movies.length > 0) {
    return (
      <div className="titleList">
        <div className="title">
          <h1>{props.genre}</h1>
          <div className="titles-wrapper">
            {props.movies.map((movie) => (
              <Movie
                key={movie.id}
                movie={movie}
                marked={movie.my_list}
                markedTheMovie={props.markedTheMovie}
              />
            ))}
          </div>
        </div>
      </div>
    );
  } else {
    return "";
  }
}

export default Genre;