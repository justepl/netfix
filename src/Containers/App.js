import React, {Component} from 'react';
import SearchBar from '../Components/searchBar';
import VideoList from './videoList';
import VideoDetail from '../Components/videoDetail';
import Video from '../Components/video';
import axios from 'axios';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import '../style/App.css';

const apiEndPoint = "https://api.themoviedb.org/3/";
const popularMovieUrl = "discover/movie?@sort_by=popularity.desc&&include_adult=false&append_to_response=images";
const searchUrl = "search/movie?adult=false";
const  apikey = "api_key=693d50a14607be1f9bd799b70ebc1c92";
const languageApi = "language=fr"
const imageBaseUrl = "https://image.tmdb.org/t/p/w500/";


class App extends Component{

  constructor(props) {
    super(props);
    this.childDiv = React.createRef();
    this.state = {movieList:{}, adventureMovies:{}, actionMovies:{}, animationMovies:{}, documentaryMovies:{}, fantaisyMovies:{}, musicMovies:{}, hororMovies:{}, thrilerMovies:{}, warMovies:{}, westernMovies:{}, currentMovie:{}};
  }

  componentWillMount() {
    this.initMovies();
    this.scrollToTop()
  }

  initMovies() {
    axios.get(`${apiEndPoint}${popularMovieUrl}&${apikey}&${languageApi}`).then(
        function (response) {
          this.setState({movieList:response.data.results, currentMovie:response.data.results[0]}, function () {
            this.applyVideoToCurrentMovie();
          });
        }.bind(this)
    );
    axios.get(`${apiEndPoint}${popularMovieUrl}&${apikey}&${languageApi}&with_genres=12`).then(
        function (response) {
          this.setState({adventureMovies:response.data.results})
        }.bind(this)
    );
    axios.get(`${apiEndPoint}${popularMovieUrl}&${apikey}&${languageApi}&with_genres=28`).then(
        function (response) {
          this.setState({actionMovies:response.data.results})
        }.bind(this)
    );
    axios.get(`${apiEndPoint}${popularMovieUrl}&${apikey}&${languageApi}&with_genres=16`).then(
        function (response) {
          this.setState({animationMovies:response.data.results})
        }.bind(this)
    );
    axios.get(`${apiEndPoint}${popularMovieUrl}&${apikey}&${languageApi}&with_genres=99`).then(
        function (response) {
          this.setState({documentaryMovies:response.data.results})
        }.bind(this)
    );
    axios.get(`${apiEndPoint}${popularMovieUrl}&${apikey}&${languageApi}&with_genres=14`).then(
        function (response) {
          this.setState({fantaisyMovies:response.data.results})
        }.bind(this)
    );
    axios.get(`${apiEndPoint}${popularMovieUrl}&${apikey}&${languageApi}&with_genres=10402`).then(
        function (response) {
          this.setState({musicMovies:response.data.results})
        }.bind(this)
    );
    axios.get(`${apiEndPoint}${popularMovieUrl}&${apikey}&${languageApi}&with_genres=27`).then(
        function (response) {
          this.setState({hororMovies:response.data.results})
        }.bind(this)
    );
    axios.get(`${apiEndPoint}${popularMovieUrl}&${apikey}&${languageApi}&with_genres=53`).then(
        function (response) {
          this.setState({thrilerMovies:response.data.results})
        }.bind(this)
    );
    axios.get(`${apiEndPoint}${popularMovieUrl}&${apikey}&${languageApi}&with_genres=10752`).then(
        function (response) {
          this.setState({warMovies:response.data.results})
        }.bind(this)
    );
    axios.get(`${apiEndPoint}${popularMovieUrl}&${apikey}&${languageApi}&with_genres=37`).then(
        function (response) {
          this.setState({westernMovies:response.data.results})
        }.bind(this)
    );
  }

  scrollStep() {
    if (window.pageYOffset === 0) {
      clearInterval(this.state.intervalId);
    }
    window.scroll(0, window.pageYOffset - this.props.scrollStepInPx);
  }

  scrollToTop() {
    let intervalId = setInterval(this.scrollStep.bind(this), this.props.delayInMs);
    this.setState({ intervalId: intervalId });
  }

  applyVideoToCurrentMovie() {
    axios.get(`${apiEndPoint}movie/${this.state.currentMovie.id}?${apikey}&append_to_response=videos&${languageApi}`).then((function (responses) {
      if (responses.data.videos.results[0]) {
        const youtubeKey = responses.data.videos.results[0].key;
        let newCurrentMovieState = this.state.currentMovie;
        newCurrentMovieState.videoId = youtubeKey;
        this.setState({currentMovie: newCurrentMovieState});
      }
    }.bind(this)))
  }

  receiveCallBack(movie) {
    this.setState({currentMovie: movie}, function () {
      this.scrollToTop();
      this.applyVideoToCurrentMovie();
    })
  }

  render() {
    const renderPopularVideoList = () => {
      if (this.state.movieList.length>=5) {
        return(
          <div className={"cardDiv"}>
            <VideoList className={"VideoList"} title={"Films les plus populaires :"} movieList={this.state.movieList} callback={this.receiveCallBack.bind(this)}/>
          </div>
        )
      }
    }

    const renderMostPopularMovie = () => {
      if (this.state.movieList.length>=5) {
        return (
          <div className="divImg">
            <h1 className={"textCurrentMovie"}>{this.state.currentMovie.title}</h1>
            <Video videoId={this.state.currentMovie.videoId}/>
            <h2 className={"textCurrentMovie"}> Résumé : </h2>
            <h3 className={"textCurrentMovie"}>{this.state.currentMovie.overview}</h3>
          </div>
        )
      }
    }

    const renderWesternMovies = () => {
      if (this.state.westernMovies.length>=5) {
        return(
            <div className={"cardDiv"}>
              <VideoList className={"VideoList"} title={"Films de western :"} movieList={this.state.westernMovies} callback={this.receiveCallBack.bind(this)}/>
            </div>
        )
      }
    }

    const renderWarMovies = () => {
      if (this.state.warMovies.length>=5) {
        return(
            <div className={"cardDiv"}>
              <VideoList className={"VideoList"} title={"Films de guerre :"} movieList={this.state.warMovies} callback={this.receiveCallBack.bind(this)}/>
            </div>
        )
      }
    }

    const renderThrilerMovies = () => {
      if (this.state.thrilerMovies.length>=5) {
        return(
            <div className={"cardDiv"}>
              <VideoList className={"VideoList"} title={"Thriler :"} movieList={this.state.thrilerMovies} callback={this.receiveCallBack.bind(this)}/>
            </div>
        )
      }
    }

    const renderHororMovies = () => {
      if (this.state.hororMovies.length>=5) {
        return(
            <div className={"cardDiv"}>
              <VideoList className={"VideoList"} title={"Films d'horreur :"} movieList={this.state.hororMovies} callback={this.receiveCallBack.bind(this)}/>
            </div>
        )
      }
    }

    const renderMusicMovies = () => {
      if (this.state.musicMovies.length>=5) {
        return(
            <div className={"cardDiv"}>
              <VideoList className={"VideoList"} title={"Films musicaux :"} movieList={this.state.musicMovies} callback={this.receiveCallBack.bind(this)}/>
            </div>
        )
      }
    }

    const renderFantaisyMovies = () => {
      if (this.state.fantaisyMovies.length>=5) {
        return(
            <div className={"cardDiv"}>
              <VideoList className={"VideoList"} title={"Films de fantaisie :"} movieList={this.state.fantaisyMovies} callback={this.receiveCallBack.bind(this)}/>
            </div>
        )
      }
    }

    const renderDocumentarynMovies = () => {
      if (this.state.documentaryMovies.length>=5) {
        return(
            <div className={"cardDiv"}>
              <VideoList className={"VideoList"} title={"Documentaires :"} movieList={this.state.documentaryMovies} callback={this.receiveCallBack.bind(this)}/>
            </div>
        )
      }
    }

    const renderAnimationMovies = () => {
      if (this.state.animationMovies.length>=5) {
        return(
            <div className={"cardDiv"}>
              <VideoList className={"VideoList"} title={"Films d'animation :"} movieList={this.state.animationMovies} callback={this.receiveCallBack.bind(this)}/>
            </div>
        )
      }
    }

    const renderActionMovies = () => {
      if (this.state.actionMovies.length>=5) {
        return(
            <div className={"cardDiv"}>
              <VideoList className={"VideoList"} title={"Films d'action :"} movieList={this.state.actionMovies} callback={this.receiveCallBack.bind(this)}/>
            </div>
        )
      }
    }

    const renderAdventureMovies = () => {
      if (this.state.adventureMovies.length>=5) {
        return(
            <div className={"cardDiv"}>
              <VideoList className={"VideoList"} title={"Films d'aventure :"} movieList={this.state.adventureMovies} callback={this.receiveCallBack.bind(this)}/>
            </div>
        )
      }
    }

    const onSearch = (search) => {
      if (search) {
        axios.get(`${apiEndPoint}${searchUrl}&${apikey}&${languageApi}&query=${search}`).then(function (response) {
          if (response.data && response.data.results[0]) {
            if (response.data.results[0].id != this.state.currentMovie.id) {
              this.setState({currentMovie: response.data.results[0]}, () => {
                this.applyVideoToCurrentMovie();
              })
            }
          }
        }.bind(this))
      }
    }

    return (
     <div className="app">
       {/* App Bar*/}
       <div className="root">
         <AppBar position="static" className="appBar" color="inherit">
           <Toolbar>
             <Typography variant="h4" color="inherit" className="grow">
             <img height={"50px"} src="https://fontmeme.com/permalink/190609/d301ef105c6e3e1bff94a698e5349054.png" alt="netflix-font"/>
             </Typography>
             <SearchBar callback={onSearch}/>
           </Toolbar>
         </AppBar>
       </div>
       {/* fin AppBar*/}
       {renderMostPopularMovie()}
       {renderPopularVideoList()}
       {renderActionMovies()}
       {renderAdventureMovies()}
       {renderAnimationMovies()}
       {renderDocumentarynMovies()}
       {renderMusicMovies()}
       {renderHororMovies()}
       {renderFantaisyMovies()}
       {renderThrilerMovies()}
       {renderWarMovies()}
       {renderWesternMovies()}
       <VideoDetail title={this.state.currentMovie.title} description={this.state.currentMovie.overview}/>
     </div>
    );
  }
}

export default App;
