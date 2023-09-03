import { useEffect, useState } from "react";
import WatchListMovie from "./WatchListMovie";

export default function WatchList({ KEY, movie }) {
  const [selectedMovie, setSelectedMovie] = useState({});

  useEffect(
    function () {
      async function fetchMovie() {
        const res = await fetch(
          `http://www.omdbapi.com/?i=${movie?.imdbID}&apikey=${KEY}`
        );
        const data = await res.json();
        console.log(data);
        setSelectedMovie(data);
      }
      fetchMovie();
    },
    [KEY, movie]
  );

  return (
    <div className="watch-list">
      {/* <h3>MY WATCHLIST</h3>
      <ul className="list">
        {tempWatchedData.map((movie) => (
          <WatchListMovie movie={movie} key={movie.Title} />
        ))}
      </ul> */}

      <div className="selected-movie">
        <img src={selectedMovie?.Poster} />
        <div>
          <h3>{selectedMovie?.Title}</h3>
          <p>
            {selectedMovie.Released} - {selectedMovie.Runtime}
          </p>
          <p>{selectedMovie.Genre}</p>
          <p>⭐ {selectedMovie.imdbRating} IMDb rating</p>
        </div>
      </div>

      <div className="selected-movie-info">
        <p>
          <em>{selectedMovie.Plot}</em>
        </p>
        <p>Starring {selectedMovie.Actors}</p>
        <p>Directed by {selectedMovie.Director}</p>
        <p>Country: {selectedMovie.Country}</p>
      </div>
    </div>
  );
}
