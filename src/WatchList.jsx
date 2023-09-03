import { useEffect, useState } from "react";
import WatchListMovie from "./WatchListMovie";
import StarRating from "./StarRating";

export default function WatchList({
  KEY,
  movie,
  isSelected,
  setIsSelected,
  setSelectedMovie,
  selectedMovie,
  setSearch,
}) {
  const [watchlist, setWatchlist] = useState([]);
  // const [userRating, setUserRating] = useState(0);

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
    [KEY, movie, setSelectedMovie]
  );

  function handleWatchlist(movie) {
    const newMovie = {
      Poster: movie.Poster,
      Title: movie.Title,
      Released: movie.Released,
      Runtime: movie.Runtime,
      Genre: movie.Genre,
      imdbRating: movie.imdbRating,
      imdbID: movie.imdbID,
      Plot: movie.Plot,
      Actors: movie.Actors,
      Director: movie.Director,
      Country: movie.Country,
      Language: movie.Language,
    };

    setWatchlist([...watchlist, newMovie]);
    setIsSelected(false);
    setSearch("");
  }

  function handleDeleteMovie() {
    const newList = watchlist.filter(
      (movie) => movie.imdbID !== selectedMovie.imdbID
    );
    setWatchlist(newList);
    setIsSelected(false);
    setSelectedMovie({});
  }

  return (
    <div className="watch-list">
      {!isSelected ? (
        <>
          <h3>MY WATCHLIST</h3>
          <ul className="list">
            {watchlist.map((movie) => (
              <WatchListMovie
                movie={movie}
                key={movie.imdbID}
                setIsSelected={setIsSelected}
                setSelectedMovie={setSelectedMovie}
                userRating={userRating}
              />
            ))}
          </ul>
        </>
      ) : (
        <>
          <div className="selected-movie">
            <button className="back-btn" onClick={() => setIsSelected(false)}>
              &#10005;
            </button>
            <img src={selectedMovie.Poster} alt={selectedMovie.Title} />
            <div>
              <h3>{selectedMovie.Title}</h3>
              <p>
                {selectedMovie.Released} - {selectedMovie.Runtime}
              </p>
              <p>{selectedMovie.Genre}</p>
              <p>⭐ {selectedMovie.imdbRating} IMDb rating</p>
            </div>
          </div>
          <div className="selected-movie-info">
            <div className="movie-actions">
              <StarRating />
              {!watchlist.includes(selectedMovie) ? (
                <button onClick={() => handleWatchlist(selectedMovie)}>
                  Add to watchlist
                </button>
              ) : (
                <button onClick={handleDeleteMovie}>
                  Remove from watchlist
                </button>
              )}
            </div>
            <p>
              <em>{selectedMovie.Plot}</em>
            </p>
            <p>Starring {selectedMovie.Actors}</p>
            <p>Directed by {selectedMovie.Director}</p>
            <p>Country: {selectedMovie.Country}</p>
            <p>Language: {selectedMovie.Language}</p>
          </div>
        </>
      )}
    </div>
  );
}
