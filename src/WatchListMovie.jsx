export default function WatchListMovie({
  movie,
  setIsSelected,
  setSelectedMovie,
}) {
  function handleWatchListMovie() {
    setSelectedMovie(movie);
    setIsSelected(true);
  }

  return (
    <li className="movie" onClick={handleWatchListMovie}>
      <img src={movie.Poster} />
      <h3>{movie.Title}</h3>
      <div>
        <div>
          <span>⏳</span>
          <p>{movie.Runtime}</p>
        </div>

        <div>
          <span>⭐</span>
          <p>{movie.imdbRating}</p>
        </div>

        <div>
          <span>🌟</span>
          <p>{movie.userRating}</p>
        </div>
      </div>
    </li>
  );
}
