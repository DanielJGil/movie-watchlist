export default function WatchListMovie({ movie }) {
  return (
    <li className="movie">
      <img src={movie.Poster} />
      <h3>{movie.Title}</h3>
      <div>
        <div>
          <span>⏳</span>
          <p>{movie.runtime} min</p>
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
