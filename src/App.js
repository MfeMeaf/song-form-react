import {React, useState} from "react";
import './App.css';
import SongForm from "./songForm";
import SongLista from "./songwrite";
import EditSongForm from "./editSongForm";

function App() {
  const [songs, songsSet] = useState([
    {id:1, name: 'Kiosken min', year: 2003, artist: "Kioskmongot"},
    {id:2, name: 'Fy fan för fläsk', year: 3, artist: "Fläsk doris"},
  ])
  const [editingSongId, setEditingSongId] = useState(null);

  function addSong(song){
    songsSet([...songs,{id:Date.now(), ...song}]);
  }

  function deleteSong(songId){
    songsSet(songs.filter(song => song.id !== songId));
  }

  function editSong(song){
    songsSet(songs.map(s => (s.id === song.id ? song : s)));
    setEditingSongId(null);
  }


  return (
    <div className="App">
      <SongForm onAddSong={addSong} />
        {editingSongId ? (
            <EditSongForm
                song={songs.find(s => s.id === editingSongId)}
                onEditSong={editSong}
            />
        ) : (
            <SongLista songs={songs} onRemoveSong={deleteSong} onEditSong={setEditingSongId} />
        )}
    </div>
  );
}

export default App;