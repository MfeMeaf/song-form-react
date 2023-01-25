"use strict";

var embeddiv = document.getElementById("embed-iframe");
var embedlist = document.getElementById("embed-list");
var root = document.getElementById("form");
var songs = ["1","2","3"];


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

var Lista = React.createClass({
    render(){
        console.log("sup")
        return (
            <div className="song">
            <ul>
            <p>Pew</p>
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
            Authorization: "Bearer BQCLzc8hAHejvhdn_vpwMRvfCzBzIJXnmVOPzTBkvK_fLpB9a4bvz8JcQ1LJOCn6mgaTarZC_BMlUyj-ZxJhz8ywZnQoH26jiMJ_IpQ53FHOsi4EYkpU5OBuPUJnSUHEyXBZaJ_6-AC4LKhS908hLrTzs4lSm2PkWH5aCPpOXMyxIk6TZkscXSCTFGeB4IitKJzQ"
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
                    <Lista 
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
})

ReactDOM.render(<Form/>,root);
