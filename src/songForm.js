import {React, useState} from 'react';

function SongForm({onAddSong}){
    const [name, setName] = useState('');
    const [year, setYear] = useState('');
    const [artist, setArtist] = useState('');

    function handleSubmit(event){
        event.preventDefault();
        onAddSong({name, year,artist});
        setYear('');
        setArtist('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="text" value={name} onChange={event => setName(event.target.value)}/>
            </label>
            <label>
                Year:
                <input type="text" value={year} onChange={event => setYear(event.target.value)} />
            </label>
            <label>
                Artist:
                <input type="text" value={artist} onChange={event => setArtist(event.target.value)} />
            </label>
            <button type="submit">Add Song</button>´
        </form>
    );
}

export default SongForm;