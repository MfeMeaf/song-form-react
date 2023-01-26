"use strict";

var embeddiv = document.getElementById("embed-iframe");
var embedlist = document.getElementById("embed-list");
var root = document.getElementById("form");

let songs = [];

console.log(songs)
window.onSpotifyIframeApiReady = (IFrameAPI) => {
    let element = document.getElementById('embed-iframe');
    let options = {
        width: '60%',
        height: '200',
        uri: "spotify:track:30SCXVFyQGOFMdKnbgJS18"
};
    let callback = (EmbedController) => {
      document.querySelectorAll('ul#episodes > li > button').forEach(
        episode => {
          episode.addEventListener('click', () => {
            EmbedController.loadUri(episode.dataset.spotifyId)
          });
        })
    };
    IFrameAPI.createController(element, options, callback);
};

var SongLista = React.createClass({
    render(){
        return (
        <div className="song">
            <ul>
            <h3>{this.props.song.name}</h3>
                <li>
                  <button data-spotify-id={this.props.song.uri}>
                   {this.props.song.name}
                  </button>
                </li>
            </ul>
        </div>
        )
    }
});

var Form = React.createClass({
    handleSubmit(event){
    event.preventDefault();
    fetch(`https://api.spotify.com/v1/search?q=${event.target.songN.value}&type=track&limit=10&offset=5`, {
        method: "GET",
        headers: {
            Authorization: "Bearer BQCSLrYJoH1tRpNW8n_kaXLFJFKhh_YDH48sBRf9lzPFzS-riX68_3Sqb-bBAKlNt0z9T0GuK_MTn45MoqloyjHV9_P4n_eGSocuD4FiZAKnP0Olij7i_ZVLKE9DvP19UnL13qeDstaSikgFw4tTSfZYilCAA23lUKxph-7i5wR37Jc9nnGkiSiwoKf2WkKYEzGV"
        }
    })
    .then(response => response.json())
    .then(({tracks}) => {
        songs = tracks.items; 
        this.setState({
            songs: songs
        });
        return(
            <div className="songs">
                {this.state.songs.map((song)=>{
                    console.log(song);
                    <SongLista
                    song={song}/>
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

ReactDOM.render(<Form/>,root);