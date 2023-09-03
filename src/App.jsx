const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    runtime: 123,
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    runtime: 148,
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    runtime: 119,
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

export default function App() {
  return (
    <div>
      <Header />

      <Main>
        <Box>
          <SearchResults />
        </Box>

        <Box>
          <WatchList />
        </Box>
      </Main>
    </div>
  );
}

function Header() {
  return (
    <div className="header">
      <h1 className="title">MOVIE WATCHLIST</h1>
      <input type="text" className="search" placeholder="Search movies..." />
      {/* <p className="p">?</p> */}
    </div>
  );
}

function Main({ children }) {
  return <div className="main">{children}</div>;
}

function Box({ children }) {
  return <div className="box">{children}</div>;
}

function SearchResults() {
  return (
    <div className="search-results">
      <h3>SEARCH RESULTS</h3>
      <ul className="list">
        {tempMovieData.map((movie) => (
          <Movie movie={movie} key={movie.Title} />
        ))}
      </ul>
    </div>
  );
}

function Movie({ movie }) {
  return (
    <li className="movie">
      <img src={movie.Poster} />
      <h3>{movie.Title}</h3>
      <div>
        <div>
          <span>📅</span>
          <p>{movie.Year}</p>
        </div>

        <div>
          <span>⏳</span>
          <p>{movie.runtime} min</p>
        </div>
      </div>
    </li>
  );
}

function WatchList() {
  return (
    <div className="watch-list">
      <h3>MY WATCHLIST</h3>
      <ul className="list">
        {tempWatchedData.map((movie) => (
          <WatchListMovie movie={movie} key={movie.Title} />
        ))}
      </ul>
    </div>
  );
}

function WatchListMovie({ movie }) {
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
