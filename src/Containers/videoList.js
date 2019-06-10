import React from 'react';
import VideoListItem from '../Components/videoListItem';
import CardActionArea from "@material-ui/core/CardActionArea";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import "../style/videoList.css"

const imageBaseUrl = "https://image.tmdb.org/t/p/w500/";

const VideoList = (props) => {
  const {movieList, title} = props

  return (
    <div className={"videoList"}>
        <h1 className={"videoListTitle"}> {title} </h1>
      <div className={"divPoster"}>

        {
          movieList.map(movie => {
            return <VideoListItem key={movie.id} movie={movie} callback={receiveCallBack}/>
          })
        }
      </div>
    </div>
  );

  function receiveCallBack(movie){
    props.callback(movie)
  }
}

export default VideoList;
