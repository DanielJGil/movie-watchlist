import { useEffect, useState } from "react";
import Box from "./Box";
import Header from "./Header";
import MainContent from "./MainContent";
import SearchResults from "./SearchResults";
import WatchList from "./WatchList";
import Loading from "./Loading";

const KEY = "d4e50f45";

export default function App() {
  const [search, setSearch] = useState("bloodhounds");
  const [movieResults, setMovieResults] = useState(null);
  const [movie, setMovie] = useState({});
  const [isSelected, setIsSelected] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      const controller = new AbortController();

      async function fetchMovies() {
        setIsLoading(true);

        const res = await fetch(
          `http://www.omdbapi.com/?i=tt3896198&apikey=${KEY}&s=${search}`,
          { signal: controller.signal }
        );

        if (!res.ok)
          throw new Error("Something went wrong with fetching movies");

        const data = await res.json();
        if (data.Response === "False") throw new Error("Movie not found");

        setMovieResults(data.Search);
        setIsLoading(false);
      }

      fetchMovies();

      return function () {
        controller.abort();
      };
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
          {isLoading && <Loading />}
          {!isLoading && (
            <SearchResults
              movieResults={movieResults}
              setMovie={handleSetMovie}
            />
          )}
        </Box>

        <Box>
          <WatchList
            KEY={KEY}
            movie={movie}
            isSelected={isSelected}
            setIsSelected={setIsSelected}
            selectedMovie={selectedMovie}
            setSelectedMovie={setSelectedMovie}
            setSearch={setSearch}
          />
        </Box>
      </MainContent>
    </div>
  );
}
