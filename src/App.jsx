import React, { useEffect, useState } from "react";

const App = () => {
  const [keyword, setKeyword] = useState("");
  const [tracks, setTracks] = useState([]);
  const [loader, setLoader] = useState(false);

  const getMusicTracks = async () => {
    setLoader(true);
    let musicData = await fetch(
      `https://v1.nocodeapi.com/mohdalamkhan/spotify/QAUKykoEWCwkbNUu/search?q=${keyword === ""? "new release": keyword}newsong&type=track`
    );
    let convertedData = await musicData.json();
    setTracks(convertedData.tracks.items);
    setLoader(false);
  };

  useEffect(() => {
    getMusicTracks();
  }, []);

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            🎵 Songs
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="d-flex w-100 mt-2 mt-lg-0">
              <input
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
                className="form-control me-2 w-100"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button onClick={getMusicTracks} className="btn btn-outline-success">
                Search
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Container for Content */}
      <div className="container mt-4">
        {/* Loader Section */}
        {loader && (
          <div className="d-flex justify-content-center align-items-center" style={{ height: "30vh" }}>
            <div className="spinner-border text-primary" style={{ width: "3rem", height: "3rem" }} role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {/* Tracks Section */}
        {!loader && (
          <div className="row justify-content-center">
            {tracks.length > 0 ? (
              tracks.map((element) => (
                <div key={element.id} className="col-lg-3 col-md-4 col-sm-6 col-12 mb-4 d-flex justify-content-center">
                  <div className="card shadow-lg" style={{ width: "18rem" }}>
                    <img src={element.album.images[0].url} className="card-img-top" alt="Album Cover" />
                    <div className="card-body text-center">
                      <h5 className="card-title">{element.name}</h5>
                      <p className="card-text">🎤 Artist: {element.album.artists[0].name}</p>
                      <p className="card-text">📅 Release Date: {element.album.release_date}</p>
                      {element.preview_url ? (
                        <audio src={element.preview_url} controls className="w-100"></audio>
                      ) : (
                        <p className="text-danger">No Preview Available</p>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              !loader && <p className="text-center text-muted">No tracks found</p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default App;
