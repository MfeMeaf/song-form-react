import React from "react";

function SongLista({songs, onRemoveSong, onEditSong}){
    return (
        <div className="flexis">
            {songs.map(song => (
                <div className="song" key={song.id}>
                <h2>{song.name}</h2>
                <p>{song.year}</p>
                <p>{song.artist}</p>
                <button onClick={() => onRemoveSong(song.id)}>Delete</button>
                <button onClick={() => onEditSong(song.id)}>Edit</button>
                </div>
            )
            )}
        </div>
    )
}

export default SongLista;