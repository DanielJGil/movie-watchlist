export default function Header({ search, setSearch }) {
  return (
    <div className="header">
      <h1 className="title">MOVIE WATCHLIST</h1>
      <input
        type="text"
        className="search"
        placeholder="Search movies..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {/* <p className="p">?</p> */}
    </div>
  );
}
