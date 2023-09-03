import Movie from "./Movie";

export default function SearchResults({ movieResults, setMovie }) {
  return (
    <div className="search-results">
      <h3>SEARCH RESULTS</h3>
      <ul className="list">
        {movieResults?.map((movie) => (
          <Movie movie={movie} key={movie.imdbID} setMovie={setMovie} />
        ))}
      </ul>
    </div>
  );
}
