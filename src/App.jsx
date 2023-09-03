import { useEffect } from "react";
import Box from "./Box";
import Header from "./Header";
import MainContent from "./MainContent";
import SearchResults from "./SearchResults";
import WatchList from "./WatchList";
import { useState } from "react";

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

const KEY = "d4e50f45";

export default function App() {
  const [movie, setMovie] = useState("interstellar");
  const [movieResults, setMovieResults] = useState(null);

  useEffect(
    function () {
      async function fetchMovies() {
        const res = await fetch(
          `http://www.omdbapi.com/?i=tt3896198&apikey=${KEY}&s=${movie}`
        );
        const data = await res.json();
        console.log(data.Search);
        setMovieResults(data.Search);
      }

      fetchMovies();
    },
    [movie]
  );

  return (
    <div>
      <Header movie={movie} setMovie={setMovie} />

      <MainContent>
        <Box>
          <SearchResults movieResults={movieResults} />
        </Box>

        <Box>
          <WatchList tempWatchedData={tempWatchedData} />
        </Box>
      </MainContent>
    </div>
  );
}
