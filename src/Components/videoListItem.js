import React from 'react'
import "../style/videoListItem.css"

const imageBaseUrl = "https://image.tmdb.org/t/p/w500/";

const VideoListItem = (props) => {
  const {
    movie,
  } = props;

  return <li className={"liListItem"} onClick={handleClick}>
        <img className={"imageVideoList"} src={`${imageBaseUrl}${movie.poster_path}`} alt={"movie cover"}/>
      </li>

  function handleClick() {
    props.callback(movie)
  }
};

export default VideoListItem;
