import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import movieTrailer from "movie-trailer";
import { getMovies } from "../api";
import "./Row.css";

const imageHost = "https://image.tmdb.org/t/p/original/";

function Row({ title, path, isLarge }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  const handleOnClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(
        movie?.title ||
          movie?.name ||
          movie?.original_name ||
          movie?.original_title ||
          ""
      )
        .then((url) => {
          if (url) {
            const urlParams = new URLSearchParams(new URL(url).search);
            setTrailerUrl(urlParams.get("v") || "");
          }
        })
        .catch((error) => {
          console.log("Error fetching movie trailer: ", error);
        });
    }
  };

  const fetchMovies = async (_path) => {
    try {
      const data = await getMovies(_path);
      setMovies(data?.results || []);
    } catch (error) {
      console.log("fetchMovies error: ", error);
    }
  };

  useEffect(() => {
    if (path) {
      fetchMovies(path);
    }
  }, [path]);

  return (
    <div className="row-container">
      <h2 className="row-header">{title}</h2>
      <div className="row-cards">
        {movies?.map((movie) => {
          return (
            <img
              className={`movie-card ${isLarge && "movie-card-large"}`}
              onClick={() => handleOnClick(movie)}
              key={movie.id}
              src={`${imageHost}${
                isLarge ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.name || movie.title}
            />
          );
        })}
      </div>

      {trailerUrl && (
        <div style={{ marginTop: "20px" }}>
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailerUrl}`}
            playing
            controls
            width="100%"
            height="400px"
          />
        </div>
      )}
    </div>
  );
}

export default Row;