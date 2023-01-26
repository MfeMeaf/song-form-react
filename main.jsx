"use strict";

var embeddiv = document.getElementById("embed-iframe");
var embedlist = document.getElementById("embed-list");
var root = document.getElementById("form");

let bearer = "BQBAnKPJzfSm_Roa3zkIdUUOxgzVnkpKgeHNht_kSv77_To33p7Et5GNIM2j878Zn94pZ2jrf7E_tK3StQxQ7cHXGnPviU5XitRU2FIKpn8R4kFecOEQc3m4sn_xMgYnPUFxiS0uSK8tbwvomLKmH2v4J8n6PVxmAJkC-MnGo8RmI7_oFLUU4QoOHUBP4hdZ4cQC"

let songs = [];

window.onSpotifyIframeApiReady = (IFrameAPI) => {
    let element = document.getElementById('embed-iframe');
    let options = {
        width: '60%',
        height: '200',
        uri: songs[0].uri
};
    let callback = (EmbedController) => {
        document.querySelectorAll('ul > li > button').forEach(
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
            <h3>{this.props.song.name}</h3>
            <ul>
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
            Authorization: `bearer BQBAnKPJzfSm_Roa3zkIdUUOxgzVnkpKgeHNht_kSv77_To33p7Et5GNIM2j878Zn94pZ2jrf7E_tK3StQxQ7cHXGnPviU5XitRU2FIKpn8R4kFecOEQc3m4sn_xMgYnPUFxiS0uSK8tbwvomLKmH2v4J8n6PVxmAJkC-MnGo8RmI7_oFLUU4QoOHUBP4hdZ4cQC` 
        }
    })
    .then(response => response.json())
    .then(({tracks}) => {
        songs = tracks.items; 
        console.log(songs);
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

ReactDOM.render(<Form/>,root);