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
        document.querySelectorAll('ol > li > button').forEach(
        song => {
            song.addEventListener('click', () => {
          EmbedController.loadUri(song.dataset.spotifyId)
        });
      })
  };
    IFrameAPI.createController(element, options, callback);
};

let bearer = "BQAOmWMjlKP-7UIHs1dTV2ttguowqDZ2CTLqEQux5Pcj4r15W_csVLrKkpM4Wj6vI8Rmt9BEsIfyWGqCrWPL-vhdy8jLoMzTgZyiMN8qmAhQJhawzhACTENdY3iIVnUXbwGsu2lET1KaMfR8gTmBgpcSmP5cCJH-XY1wHqlUKUM55qQWb-HlGVY9v7Tc7SiuLU65"

let songs = [];

var songLista= ()=>{
    let i = 0;
    document.querySelectorAll('ol > li > button').forEach(
        song => {
            song.setAttribute("data-spotify-id", songs[i].uri)
            song.innerHTML = `${songs[i].name} - ${songs[i].artists[0].name}`
            i = i +1;
    });
    document.getElementById("song-list").style.visibility = "visible";
};


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
        songs = tracks.items; 
        this.setState({
            songs: songs
        });
        console.log(this.state.songs)
        songLista(this.state.songs);
    })
    },
    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <label for="songN">Keywords: </label>
                <input type="text" id="songN"/>
                <input type="submit" value="Submit"/>
            </form>
        )
    }
});

ReactDOM.render(<Form/>,root);
// ReactDOM.render(<NewComponent/>, embedlist)
