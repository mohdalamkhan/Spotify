
import React, { useEffect, useState } from "react";

const App = () => {
  const CLIENT_ID = "3907a2a12bdc4293bbd2ba606c429fc0";
  const CLIENT_SECRET = "37826830e04b41dfb722edd976f83773";

  const [token, setToken] = useState("");
  const [newReleases, setNewReleases] = useState([]);
  const [featuredPlaylists, setFeaturedPlaylists] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [playing, setPlaying] = useState(null);

  // Get access token from Spotify
  useEffect(() => {
    const getToken = async () => {
      const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Basic " + btoa(CLIENT_ID + ":" + CLIENT_SECRET),
        },
        body: "grant_type=client_credentials",
      });
      const data = await response.json();
      setToken(data.access_token);
    };
    getToken();
  }, []);

  // Fetch all data once we have the token
  useEffect(() => {
    if (token) {
      const fetchData = async () => {
        try {
          // Fetch new releases
          const newReleasesResponse = await fetch(
            "https://api.spotify.com/v1/browse/new-releases",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          const newReleasesData = await newReleasesResponse.json();
          setNewReleases(newReleasesData.albums.items);

          // Fetch featured playlists
          const playlistsResponse = await fetch(
            "https://api.spotify.com/v1/browse/featured-playlists",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          const playlistsData = await playlistsResponse.json();
          setFeaturedPlaylists(playlistsData.playlists.items);

          // Fetch genres
          const genresResponse = await fetch(
            "https://api.spotify.com/v1/browse/categories",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          const genresData = await genresResponse.json();
          setGenres(genresData.categories.items);

          setLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [token]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm) return;
    setLoading(true);

    try {
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${searchTerm}&type=track&limit=12`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      setSearchResults(data.tracks.items);
      setLoading(false);
    } catch (error) {
      console.error("Error searching:", error);
      setLoading(false);
    }
  };

  const togglePlay = (previewUrl) => {
    if (playing && playing.url === previewUrl) {
      playing.audio.pause();
      setPlaying(null);
    } else {
      if (playing) {
        playing.audio.pause();
      }
      const audio = new Audio(previewUrl);
      audio.play();
      setPlaying({ url: previewUrl, audio });
    }
  };

  // Track Card Component
  const TrackCard = ({ track }) => (
    <div className="col-lg-3 col-md-6 mb-4">
      <div className="card h-100">
        <img
          src={track.album?.images[0]?.url || track.images?.[0]?.url}
          className="card-img-top"
          alt={track.name}
          style={{ height: "200px", objectFit: "cover" }}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title text-truncate">{track.name}</h5>
          <p className="card-text">
            {track.artists?.map((artist) => artist.name).join(", ")}
          </p>
          {track.preview_url ? (
            <button
              className={`btn ${
                playing?.url === track.preview_url ? "btn-danger" : "btn-success"
              } mt-auto`}
              onClick={() => togglePlay(track.preview_url)}
            >
              <i className={`fas ${playing?.url === track.preview_url ? "fa-stop" : "fa-play"}`}></i>
              {" "}
              {playing?.url === track.preview_url ? "Stop" : "Play"}
            </button>
          ) : (
            <button className="btn btn-secondary mt-auto" disabled>
              No Preview Available
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
        <div className="container">
          <a className="navbar-brand" href="#">
            🎵 Spotify Clone
          </a>
          <form className="d-flex flex-grow-1 mx-4" onSubmit={handleSearch}>
            <div className="input-group">
              <input
                className="form-control"
                type="search"
                placeholder="Search for songs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="btn btn-success" type="submit">
                <i className="fas fa-search"></i> Search
              </button>
            </div>
          </form>
        </div>
      </nav>

      <div className="container mt-4">
        {loading ? (
          <div className="d-flex justify-content-center my-5">
            <div className="spinner-border text-success" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            {/* Search Results */}
            {searchResults.length > 0 && (
              <section className="mb-5">
                <h2 className="mb-4">Search Results</h2>
                <div className="row">
                  {searchResults.map((track) => (
                    <TrackCard key={track.id} track={track} />
                  ))}
                </div>
              </section>
            )}

            {/* New Releases Section */}
            <section className="mb-5">
              <h2 className="mb-4">New Releases</h2>
              <div className="row">
                {newReleases.slice(0, 4).map((track) => (
                  <TrackCard key={track.id} track={track} />
                ))}
              </div>
            </section>

            {/* Featured Playlists Section */}
            <section className="mb-5">
              <h2 className="mb-4">Featured Playlists</h2>
              <div className="row">
                {featuredPlaylists.slice(0, 4).map((playlist) => (
                  <div key={playlist.id} className="col-lg-3 col-md-6 mb-4">
                    <div className="card h-100">
                      <img
                        src={playlist.images[0].url}
                        className="card-img-top"
                        alt={playlist.name}
                        style={{ height: "200px", objectFit: "cover" }}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{playlist.name}</h5>
                        <p className="card-text">{playlist.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Genres Section */}
            <section className="mb-5">
              <h2 className="mb-4">Browse Genres</h2>
              <div className="row">
                {genres.slice(0, 8).map((genre) => (
                  <div key={genre.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                    <div className="card h-100">
                      <img
                        src={genre.icons[0].url}
                        className="card-img-top"
                        alt={genre.name}
                        style={{ height: "200px", objectFit: "cover" }}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{genre.name}</h5>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </>
  );
};

export default App;

