export default function Header({ movie, setMovie }) {
  return (
    <div className="header">
      <h1 className="title">MOVIE WATCHLIST</h1>
      <input
        type="text"
        className="search"
        placeholder="Search movies..."
        value={movie}
        onChange={(e) => setMovie(e.target.value)}
      />
      {/* <p className="p">?</p> */}
    </div>
  );
}
