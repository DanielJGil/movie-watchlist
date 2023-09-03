export default function WatchListMovie({
  movie,
  setIsSelected,
  setSelectedMovie,
  userRating,
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
          <p>{movie.imdbRating} IMDb</p>
        </div>

        <div>
          <span>🌟</span>
          <p>{userRating}/10</p>
        </div>
      </div>
    </li>
  );
}
