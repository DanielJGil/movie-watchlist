import WatchListMovie from "./WatchListMovie";

export default function WatchList({ tempWatchedData }) {
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
