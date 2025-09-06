import React, { useEffect } from 'react';
import "./Banner.css";
import categories, { getMovies } from '../api';

function Banner() {
    const [movie, setMovie] = React.useState({});
    const fecthRandomMovie = async (_path) => {
        try {
                const netflixOriginalsCategory = categories.find(
                 (category) => category.name === "netflixOriginals"   
                );
            const data = await getMovies(netflixOriginalsCategory.path
        )
            const movies = data?.results;
            const randomIndex = Math.floor(Math.random() * movies.length)
            setMovie(data?.results[randomIndex])            
        } catch (error) {
            console.log("Banner fetchRandomMovie error: ", error);
        };
    };

    useEffect(() => {
        fecthRandomMovie();
    }, []);

    function truncate(str, n) {
    return str?.length > n ? str.substring(0, n - 1) + "..." : str;
  }


  return (
    <header 
      className='banner-container'
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundPosition: "center-center",
      }}
    >
      <div className='banner-content'>
        <h1 className='banner-title'>
          {movie?.title || movie?.name || movie?.original_name} 
        </h1>
        <div className='banner-buttons-container'>
            <button className='banner-button'>Assistir</button>
            <button className='banner-button'>Minha Lista</button>
        </div>

        <div className='banner-description'>
          <h2>{truncate(movie?.overview, 150)}</h2>
        </div>
      </div>
    </header>
  )
}

export default Banner
