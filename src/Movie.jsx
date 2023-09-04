export default function Movie({ movie, setMovie }) {
  return (
    <li className="movie" onClick={() => setMovie(movie)}>
      <img src={movie.Poster} />
      <h3>{movie.Title}</h3>
      <div>
        <div>
          <span>📅</span>
          <p>{movie.Year}</p>
        </div>
      </div>
    </li>
  );
}
