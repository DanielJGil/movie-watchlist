export default function Movie({ movie }) {
  return (
    <li className="movie">
      <img src={movie.Poster} />
      <h3>{movie.Title}</h3>
      <div>
        <div>
          <span>📅</span>
          <p>{movie.Year}</p>
        </div>

        {/* <div>
          <span>⏳</span>
          <p>{movie.runtime} min</p>
        </div> */}
      </div>
    </li>
  );
}
