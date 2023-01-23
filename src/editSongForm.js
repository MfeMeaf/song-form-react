import {React, useState} from "react";

function EditFormSong({song,onEditSong}){
    const [name, setName] = useState('');
    const [year, setYear] = useState('');
    const [artist, setArtist] = useState('');

    function handleSubmit(event){
        event.preventDefault();
        onEditSong({...song,name,year,artist});
        
    }
    return(
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="text" value={name} onChange={event => setName(event.target.value)}/>
            </label>
            <label>
            Year Released:
                <input type="text" value={year} onChange={event => setYear(event.target.value)}/>
            </label>
            <label>
            Artist:
                <input type="text" value={artist} onChange={event => setArtist(event.target.value)}/>
            </label>
            <button type="submit">Song Save</button>
        </form>
    )
}

export default EditFormSong;