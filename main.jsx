"use strict";

var embeddiv = document.getElementById("embed-iframe");
var embedlist = document.getElementById("embed-list");
var root = document.getElementById("form");

window.onSpotifyIframeApiReady = (IFrameAPI) => {
    let element = document.getElementById('embed-iframe');
    let options = {
        width: '60%',
        height: '200',
        uri: "spotify:track:0WhSlHpA9T6S8pKyz7DRBx"
};
    let callback = (EmbedController) => {
        document.querySelectorAll('ul > li > button').forEach(
        song => {
            song.addEventListener('click', () => {
          EmbedController.loadUri(song.dataset.spotifyId)
        });
      })
  };
    IFrameAPI.createController(element, options, callback);
};

let bearer = "BQAt7WPX1R66YyRA0-w4Nidl4pFCh3hCKpA5zMmPEN8r9oWit_W1Txi4g8HvK55K191lQzTc8B8qGxtHhnOSIFJK5kxQ_LWZRzeqqSU_pPDFLirKRkO4ek7xyZBdbLXRhggpaxstyK6vna5IxIDYvbpl1d-0SkJ_DtkQORd5OPhA1uhAA2R7nwHQ0mNyZGkqg0sh"

let songs = [];

var SongLista = React.createClass({
    render(){
        return (
            <li>
                <button  data-spotify-id={this.props.song.uri}>
                        {this.props.song.name}
                </button>
            </li>
        )
    }
});


var Form = React.createClass({
    handleSubmit(event){
    event.preventDefault();
    fetch(`https://api.spotify.com/v1/search?q=${event.target.songN.value}&type=track&limit=10&offset=5`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${bearer}` 
        }
    })
    .then(response => response.json())
    .then(({tracks}) => {
        console.log(tracks);
        songs = tracks.items; 
        this.setState({
            songs: songs
        });
            return(
        <div>
            {this.state.songs.map((song)=>{
                console.log(song);
                        ReactDOM.render(<SongLista
                        song={song}/>,embedlist)
            },this)}
        </div>
    )
    })
    },
    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <label for="songN">Song name:</label>
                <input type="text" id="songN"/>
                <input type="submit" value="Submit"/>
            </form>
        )
    }
});

// var NewComponent = React.createClass({
//     render() {
//       return (
//         <ul id="episodes">
//           <li>
//             <button data-spotify-id="spotify:episode:7makk4oTQel546B0PZlDM5">
//               My Path to Spotify: Women in Engineering
//             </button>
//           </li>
//           <li>
//             <button data-spotify-id="spotify:episode:43cbJh4ccRD7lzM2730YK3">
//               What is Backstage?
//             </button>
//           </li>
//           <li>
//             <button data-spotify-id="spotify:episode:6I3ZzCxRhRkNqnQNo8AZPV">
//               Introducing Nerd Out@Spotify
//             </button>
//           </li>
//         </ul>
//       );
//     }
//   });

ReactDOM.render(<Form/>,root);
// ReactDOM.render(<NewComponent/>, embedlist)