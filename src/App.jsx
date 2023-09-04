import { useEffect, useState } from "react";
import Box from "./Box";
import Header from "./Header";
import MainContent from "./MainContent";
import SearchResults from "./SearchResults";
import WatchList from "./WatchList";
import Loading from "./Loading";

const KEY = "d4e50f45";

export default function App() {
  const [search, setSearch] = useState("interstellar");
  const [movieResults, setMovieResults] = useState(null);
  const [movie, setMovie] = useState({});
  const [isSelected, setIsSelected] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [mobileSelected, setMobileSelected] = useState(false);

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
    setMobileSelected(true);

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
        <Box
          className={mobileSelected || search.length === 0 ? "box open" : "box"}
        >
          {isLoading && <Loading />}
          {!isLoading && (
            <SearchResults
              movieResults={movieResults}
              setMovie={handleSetMovie}
              mobileSelected={mobileSelected}
              search={search}
            />
          )}
        </Box>
        <Box
          className={
            search.length > 0 && !mobileSelected ? "search-closed box" : "box"
          }
        >
          <WatchList
            KEY={KEY}
            movie={movie}
            isSelected={isSelected}
            setIsSelected={setIsSelected}
            selectedMovie={selectedMovie}
            setSelectedMovie={setSelectedMovie}
            setSearch={setSearch}
            setMobileSelected={setMobileSelected}
          />
        </Box>
      </MainContent>
    </div>
  );
}
