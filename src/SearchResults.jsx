import Movie from "./Movie";

export default function SearchResults({
  movieResults,
  setMovie,
  mobileSelected,
  search,
}) {
  return (
    <div
      className={
        mobileSelected || search.length === 0
          ? "search-results open"
          : "search-results"
      }
    >
      <h3>SEARCH RESULTS</h3>
      <ul className="list">
        {movieResults?.map((movie) => (
          <Movie movie={movie} key={movie.imdbID} setMovie={setMovie} />
        ))}
      </ul>
    </div>
  );
}
