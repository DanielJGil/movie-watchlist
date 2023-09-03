import { useEffect, useState } from "react";
import Box from "./Box";
import Header from "./Header";
import MainContent from "./MainContent";
import SearchResults from "./SearchResults";
import WatchList from "./WatchList";

const KEY = "d4e50f45";

export default function App() {
  const [search, setSearch] = useState("bloodhounds");
  const [movieResults, setMovieResults] = useState(null);
  const [movie, setMovie] = useState(null);
  const [isSelected, setIsSelected] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState({});

  useEffect(
    function () {
      async function fetchMovies() {
        const res = await fetch(
          `http://www.omdbapi.com/?i=tt3896198&apikey=${KEY}&s=${search}`
        );
        const data = await res.json();
        setMovieResults(data.Search);
      }

      fetchMovies();
    },
    [search]
  );

  function handleSetMovie(film) {
    setMovie(film);

    if (film.imdbID === selectedMovie.imdbID) {
      setIsSelected((is) => !is);
    } else {
      setIsSelected(true);
    }
  }

  return (
    <div>
      <Header search={search} setSearch={setSearch} />

      <MainContent>
        <Box>
          <SearchResults
            movieResults={movieResults}
            setMovie={handleSetMovie}
          />
        </Box>

        <Box>
          <WatchList
            KEY={KEY}
            movie={movie}
            isSelected={isSelected}
            setIsSelected={setIsSelected}
            selectedMovie={selectedMovie}
            setSelectedMovie={setSelectedMovie}
          />
        </Box>
      </MainContent>
    </div>
  );
}
