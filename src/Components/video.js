import React from 'react';
import "../style/video.css";

const ytBaseUrl = "https://www.youtube.com/embed/";

const Video = ({videoId}) => {
  return (
      <div className="videoDiv">
        <iframe width={"750px"} height={"500px"} src={`${ytBaseUrl}${videoId}`}/>
      </div>
  )
}

export default Video;
