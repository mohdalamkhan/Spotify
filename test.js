// import React, { useEffect, useState } from "react";

// const App = () => {
//   const [newReleases, setNewReleases] = useState([]);
//   const [featuredPlaylists, setFeaturedPlaylists] = useState([]);
//   const [genres, setGenres] = useState([]);
//   const [loader, setLoader] = useState(false);
  
//   const SPOTIFY_API_BASE_URL = "https://api.spotify.com/v1";
//   const CLIENT_ID = "3907a2a12bdc4293bbd2ba606c429fc0"; // Your Client ID
//   const CLIENT_SECRET = "37826830e04b41dfb722edd976f83773"; // Your Client Secret

//   // Function to get Spotify Access Token
//   const getAccessToken = async () => {
//     const tokenUrl = 'https://accounts.spotify.com/api/token';
//     const response = await fetch(tokenUrl, {
//       method: 'POST',
//       headers: {
//         'Authorization': 'Basic ' + btoa(`${CLIENT_ID}:${CLIENT_SECRET}`), // Base64 encode Client ID and Secret
//         'Content-Type': 'application/x-www-form-urlencoded',
//       },
//       body: new URLSearchParams({
//         grant_type: 'client_credentials',
//       }),
//     });

//     const data = await response.json();
//     return data.access_token; // Return the access token
//   };

//   // Fetch New Releases
//   const fetchNewReleases = async () => {
//     setLoader(true);
//     try {
//       const accessToken = await getAccessToken(); // Get Access Token
//       const response = await fetch(`${SPOTIFY_API_BASE_URL}/browse/new-releases`, {
//         headers: { Authorization: `Bearer ${accessToken}` },
//       });
//       const data = await response.json();
//       setNewReleases(data.albums.items);
//     } catch (error) {
//       console.error("Error fetching new releases:", error);
//     }
//     setLoader(false);
//   };

//   // Fetch Featured Playlists
//   const fetchFeaturedPlaylists = async () => {
//     try {
//       const accessToken = await getAccessToken(); // Get Access Token
//       const response = await fetch(`${SPOTIFY_API_BASE_URL}/browse/featured-playlists`, {
//         headers: { Authorization: `Bearer ${accessToken}` },
//       });
//       const data = await response.json();
//       setFeaturedPlaylists(data.playlists.items);
//     } catch (error) {
//       console.error("Error fetching featured playlists:", error);
//     }
//   };

//   // Fetch Genres
//   const fetchGenres = async () => {
//     try {
//       const accessToken = await getAccessToken(); // Get Access Token
//       const response = await fetch(`${SPOTIFY_API_BASE_URL}/browse/categories`, {
//         headers: { Authorization: `Bearer ${accessToken}` },
//       });
//       const data = await response.json();
//       setGenres(data.categories.items);
//     } catch (error) {
//       console.error("Error fetching genres:", error);
//     }
//   };

//   // Call API functions after the component mounts
//   useEffect(() => {
//     fetchNewReleases();
//     fetchFeaturedPlaylists();
//     fetchGenres();
//   }, []);

//   return (
//     <>
//       {/* Navbar */}
//       <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
//         <div className="container-fluid">
//           <a className="navbar-brand" href="#">🎵 Spotify Clone</a>
//         </div>
//       </nav>

//       <div className="container mt-4">
//         {/* Loader */}
//         {loader && (
//           <div className="d-flex justify-content-center align-items-center" style={{ height: "30vh" }}>
//             <div className="spinner-border text-primary" style={{ width: "3rem", height: "3rem" }} role="status">
//               <span className="visually-hidden">Loading...</span>
//             </div>
//           </div>
//         )}

//         {/* New Releases Section */}
//         {!loader && (
//           <>
//             <h3 className="mb-3">🔥 Released This Week</h3>
//             <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
//               {newReleases.map((track) => (
//                 <div key={track.id} className="col">
//                   <div className="card shadow-lg">
//                     <img src={track.images[0]?.url} className="card-img-top" alt="Album Cover" />
//                     <div className="card-body text-center">
//                       <h5 className="card-title">{track.name}</h5>
//                       <p className="card-text">🎤 {track.artists[0]?.name}</p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Featured Playlists Section */}
//             <h3 className="mt-5 mb-3">🎶 Featured Playlists</h3>
//             <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
//               {featuredPlaylists.map((playlist) => (
//                 <div key={playlist.id} className="col">
//                   <div className="card shadow-lg">
//                     <img src={playlist.images[0]?.url} className="card-img-top" alt="Playlist Cover" />
//                     <div className="card-body text-center">
//                       <h5 className="card-title">{playlist.name}</h5>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Browse Genres Section */}
//             <h3 className="mt-5 mb-3">🎼 Browse Genres</h3>
//             <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4">
//               {genres.map((genre) => (
//                 <div key={genre.id} className="col">
//                   <div className="card shadow-lg text-center">
//                     <div className="card-body">
//                       <h5 className="card-title">{genre.name}</h5>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </>
//         )}
//       </div>
//     </>
//   );
// };

// export default App;



// import React, { useEffect, useState } from "react";

// const App = () => {
//   const [newReleases, setNewReleases] = useState([]);
//   const [featuredPlaylists, setFeaturedPlaylists] = useState([]);
//   const [genres, setGenres] = useState([]);
//   const [searchResults, setSearchResults] = useState([]);
//   const [loader, setLoader] = useState(false);
//   const [playing, setPlaying] = useState(false); // Simulate playing state

//   const SPOTIFY_API_BASE_URL = "https://api.spotify.com/v1";
//   const CLIENT_ID = "3907a2a12bdc4293bbd2ba606c429fc0"; // Your Client ID
//   const CLIENT_SECRET = "37826830e04b41dfb722edd976f83773"; // Your Client Secret

//   // Function to get Spotify Access Token
//   const getAccessToken = async () => {
//     const tokenUrl = 'https://accounts.spotify.com/api/token';
//     const response = await fetch(tokenUrl, {
//       method: 'POST',
//       headers: {
//         'Authorization': 'Basic ' + btoa(`${CLIENT_ID}:${CLIENT_SECRET}`), // Base64 encode Client ID and Secret
//         'Content-Type': 'application/x-www-form-urlencoded',
//       },
//       body: new URLSearchParams({
//         grant_type: 'client_credentials',
//       }),
//     });

//     const data = await response.json();
//     return data.access_token; // Return the access token
//   };

//   // Fetch New Releases
//   const fetchNewReleases = async () => {
//     setLoader(true);
//     try {
//       const accessToken = await getAccessToken(); // Get Access Token
//       const response = await fetch(`${SPOTIFY_API_BASE_URL}/browse/new-releases`, {
//         headers: { Authorization: `Bearer ${accessToken}` },
//       });
//       const data = await response.json();
//       setNewReleases(data.albums.items);
//     } catch (error) {
//       console.error("Error fetching new releases:", error);
//     }
//     setLoader(false);
//   };

//   // Fetch Featured Playlists
//   const fetchFeaturedPlaylists = async () => {
//     try {
//       const accessToken = await getAccessToken(); // Get Access Token
//       const response = await fetch(`${SPOTIFY_API_BASE_URL}/browse/featured-playlists`, {
//         headers: { Authorization: `Bearer ${accessToken}` },
//       });
//       const data = await response.json();
//       setFeaturedPlaylists(data.playlists.items);
//     } catch (error) {
//       console.error("Error fetching featured playlists:", error);
//     }
//   };

//   // Fetch Genres
//   const fetchGenres = async () => {
//     try {
//       const accessToken = await getAccessToken(); // Get Access Token
//       const response = await fetch(`${SPOTIFY_API_BASE_URL}/browse/categories`, {
//         headers: { Authorization: `Bearer ${accessToken}` },
//       });
//       const data = await response.json();
//       setGenres(data.categories.items);
//     } catch (error) {
//       console.error("Error fetching genres:", error);
//     }
//   };

//   // Search for Songs, Albums, or Playlists
//   const handleSearch = async (event) => {
//     const query = event.target.value;
//     if (!query) {
//       setSearchResults([]); // Reset search if the query is empty
//       return;
//     }
    
//     try {
//       const accessToken = await getAccessToken();
//       const response = await fetch(`${SPOTIFY_API_BASE_URL}/search?q=${query}&type=track,album,playlist&limit=10`, {
//         headers: { Authorization: `Bearer ${accessToken}` },
//       });
//       const data = await response.json();
//       setSearchResults(data.tracks.items);
//     } catch (error) {
//       console.error("Error searching:", error);
//     }
//   };

//   // Handle play/pause toggle
//   const togglePlayPause = () => {
//     setPlaying(!playing);
//   };

//   // Call API functions after the component mounts
//   useEffect(() => {
//     fetchNewReleases();
//     fetchFeaturedPlaylists();
//     fetchGenres();
//   }, []);

//   return (
//     <>
//       {/* Navbar with Search Bar */}
//       <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
//         <div className="container-fluid">
//           <a className="navbar-brand" href="#">🎵 Spotify Clone</a>
//           <form className="d-flex" role="search">
//             <input
//               className="form-control me-2"
//               type="search"
//               placeholder="Search for songs, albums, or playlists"
//               aria-label="Search"
//               onChange={handleSearch}
//             />
//           </form>
//         </div>
//       </nav>

//       <div className="container mt-4">
//         {/* Loader */}
//         {loader && (
//           <div className="d-flex justify-content-center align-items-center" style={{ height: "30vh" }}>
//             <div className="spinner-border text-primary" style={{ width: "3rem", height: "3rem" }} role="status">
//               <span className="visually-hidden">Loading...</span>
//             </div>
//           </div>
//         )}

//         {/* Search Results */}
//         {!loader && searchResults.length > 0 && (
//           <div>
//             <h3 className="mb-3">🎧 Search Results</h3>
//             <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
//               {searchResults.map((track) => (
//                 <div key={track.id} className="col">
//                   <div className="card shadow-lg">
//                     <img src={track.album.images[0]?.url} className="card-img-top" alt="Track Cover" />
//                     <div className="card-body text-center">
//                       <h5 className="card-title">{track.name}</h5>
//                       <p className="card-text">🎤 {track.artists.map((artist) => artist.name).join(', ')}</p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* New Releases Section */}
//         {!loader && newReleases.length > 0 && (
//           <>
//             <h3 className="mb-3">🔥 Released This Week</h3>
//             <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
//               {newReleases.map((track) => (
//                 <div key={track.id} className="col">
//                   <div className="card shadow-lg">
//                     <img src={track.images[0]?.url} className="card-img-top" alt="Album Cover" />
//                     <div className="card-body text-center">
//                       <h5 className="card-title">{track.name}</h5>
//                       <p className="card-text">🎤 {track.artists[0]?.name}</p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </>
//         )}

//         {/* Featured Playlists Section */}
//         {!loader && featuredPlaylists.length > 0 && (
//           <>
//             <h3 className="mt-5 mb-3">🎶 Featured Playlists</h3>
//             <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
//               {featuredPlaylists.map((playlist) => (
//                 <div key={playlist.id} className="col">
//                   <div className="card shadow-lg">
//                     <img src={playlist.images[0]?.url} className="card-img-top" alt="Playlist Cover" />
//                     <div className="card-body text-center">
//                       <h5 className="card-title">{playlist.name}</h5>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </>
//         )}

//         {/* Browse Genres Section */}
//         {!loader && genres.length > 0 && (
//           <>
//             <h3 className="mt-5 mb-3">🎼 Browse Genres</h3>
//             <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4">
//               {genres.map((genre) => (
//                 <div key={genre.id} className="col">
//                   <div className="card shadow-lg text-center">
//                     <div className="card-body">
//                       <h5 className="card-title">{genre.name}</h5>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </>
//         )}

//         {/* Playback Controls */}
//         <div className="mt-5 text-center">
//           <button className="btn btn-primary" onClick={togglePlayPause}>
//             {playing ? "Pause" : "Play"} 🎵
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default App;



