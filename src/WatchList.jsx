import { useEffect, useState } from "react";
import WatchListMovie from "./WatchListMovie";
import StarRating from "./StarRating";
import Loading from "./Loading";

export default function WatchList({
  KEY,
  movie,
  isSelected,
  setIsSelected,
  setSelectedMovie,
  selectedMovie,
  setSearch,
  setMobileSelected,
}) {
  const [watchlist, setWatchlist] = useState([]);
  const [rating, setRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      setIsLoading(true);
      async function fetchMovie() {
        const res = await fetch(
          `http://www.omdbapi.com/?i=${movie?.imdbID}&apikey=${KEY}`
        );

        if (!res.ok)
          throw new Error("Something went wrong with fetching movies");

        const data = await res.json();
        if (data.Response === "False") throw new Error("Movie not found");

        console.log(data.Response);

        console.log(data);
        setSelectedMovie(data);
        setIsLoading(false);
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
      userRating: rating,
      isRated: true,
    };

    setWatchlist([...watchlist, newMovie]);
    setIsSelected(false);
    setSearch("");
    setRating(0);
    setMobileSelected(false);

    console.log(watchlist);
  }

  function handleDeleteMovie() {
    const newList = watchlist.filter(
      (movie) => movie.imdbID !== selectedMovie.imdbID
    );
    setWatchlist(newList);
    setIsSelected(false);
    setSelectedMovie({});
    setMobileSelected(false);
  }

  function handleSelection() {
    setIsSelected(false);
    setMobileSelected(false);
  }

  useEffect(
    function () {
      if (!selectedMovie.Title) return;
      document.title = selectedMovie.Title;

      return function () {
        document.title = "Movie Watchlist";
      };
    },
    [selectedMovie.Title]
  );

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
                rating={rating}
                setMobileSelected={setMobileSelected}
              />
            ))}
          </ul>
        </>
      ) : (
        <>
          {isLoading && <Loading />}
          {!isLoading && (
            <>
              <div className="selected-movie">
                <button className="back-btn" onClick={handleSelection}>
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
                  {!selectedMovie.isRated && (
                    <StarRating rating={rating} setRating={setRating} />
                  )}
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
        </>
      )}
    </div>
  );
}
