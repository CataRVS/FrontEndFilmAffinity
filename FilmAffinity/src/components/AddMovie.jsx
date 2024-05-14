import React from 'react';
import { useNavigation, Form } from "react-router-dom";
import Paper from '@mui/material/Paper';
import Stack from "@mui/material/Stack";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// import DatePicker from '@mui/lab/DatePicker';
import { useEffect, useState } from 'react';
import { useParams, useActionData } from 'react-router-dom';


export default function AddMovie() {
    const navigation = useNavigation();
    const [releaseDate, setReleaseDate] = useState(null);
    const [poster, setPoster] = useState(null);
    const busy = (navigation.state === 'submitting' || navigation.state === 'loading');

    const handleDateChange = (date) => {
        setReleaseDate(date);
    };

    return (<>
        <h1>Create Movie</h1>
        <Card>
            <Form method="post" encType="multipart/form-data">
                <CardContent>
                    <Stack spacing={2}>
                        <TextField
                            name="title"
                            label="Title"
                            variant="outlined"
                            required />
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                name="release_date"
                                label="Release Date"
                                value={releaseDate}
                                onChange={handleDateChange}
                                renderInput={(params) => <TextField {...params} />}
                                required
                            />
                        </LocalizationProvider>
                        <TextField
                            name="language"
                            label="Language"
                            variant="outlined"
                            required />
                        <GenreList />
                        <ActorsList />
                        <TextField
                            name="director_name"
                            label="Director Name"
                            variant="outlined"
                            required />
                        <TextField
                            name="director_surname"
                            label="Director Surname"
                            variant="outlined"
                            required />
                        <TextField
                            name="duration"
                            label="Duration"
                            variant="outlined"
                            type="number"
                            inputProps={{ min: 0 }}
                            inputMode="numeric"
                            required
                        />
                        <TextField
                            name="synopsis"
                            label="Synopsis"
                            variant="outlined"
                            required />
                    </Stack>
                </CardContent>
                <Divider />
                <CardActions sx={{justifyContent: "center"}}>
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={busy}
                        sx={{ mt: 2 }}>
                        Add Movie
                    </Button>
                </CardActions>
            </Form>
        </Card>
    </>);
}

function GenreField({ genre, index }) {
    const [genreinfo, setGenreEdit] = useState(genre);

    useEffect(() => {
        setGenreEdit(genreinfo);
    }, [genreinfo]);

    return <TextField
    name={`genre[${index}]`}
    label="Genre"
    value={genreinfo}
    onChange={e => setGenreEdit(e.target.value)}
    variant="outlined"
    required
    />;
}

function GenreList() {
    // We map each genre to a GenreEdit component
    // and add 2 buttons, one to add a new genre and one to remove the last genre
    // add logic for the buttons
    const [genreList, setGenreList] = useState(['']);

    // Function to add a new genre
    const addGenre = () => {
        const newGenre = '';
        setGenreList([...genreList, newGenre]);
    };

    // Function to remove the last genre from the list
    const removeLastGenre = () => {
        if (genreList.length > 0) {
            setGenreList(genreList.slice(0, -1));
        }
    };

    return (
        <div>
            {genreList.map((genre, index) => (
                <GenreField index={index} genre={genre} key={index}/>
            ))}
            <Button onClick={addGenre}>Add New Genre</Button>
            <Button onClick={removeLastGenre}>Remove Last Genre</Button>
        </div>
    );
}

function ActorField({ actor, index }) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    useEffect(() => {
        if (actor) {
            const names = actor.split(" ");
            setFirstName(names[0]);
            setLastName(names.slice(1).join(" "));
        }
    }, [actor]);

    return <Stack spacing={2}>
        <TextField
            name={`actors_name[${index}]`}
            label="Actor Name"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            variant="outlined"
            required
        />
        <TextField
            name={`actors_surname[${index}]`}
            label="Actor Surname"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            variant="outlined"
            required
        />
    </Stack>
}

function ActorsList() {
    const [actorList, setActorList] = useState(['']);
    
    const addActor = () => {
        setActorList([...actorList, ""]);
    };

    const removeLastActor = () => {
        setActorList(actorList.slice(0, -1));
    };

    return (
        <div>
            {actorList.map((actor, index) => (
                <div key={index}>
                    <h3>Actor {index + 1}</h3>
                    <AccountBoxIcon />
                    <ActorField actor={actor} index={index} />
                </div>
            ))}
            <Button onClick={addActor}>Add New Actor</Button>
            <Button onClick={removeLastActor}>Remove Last Actor</Button>
        </div>
    );
}

function DirectorEdit() {
    const [director_name, setDirectorName] = useState("");
    const [director_surname, setDirectorSurname] = useState("");

    useEffect(() => {
        setDirectorName(director_name);
        setDirectorSurname(director_surname);
    }, [director_name, director_surname]);


    return <Stack spacing={2}>
        <TextField
        name="director_name"
        label="Director Name"
        value={firstName}
        onChange={e => setFirstName(e.target.value)}
        variant="outlined"
        required
        />
        <TextField
        name="director_surname"
        label="Director Surname"
        value={lastName}
        onChange={e => setLastName(e.target.value)}
        variant="outlined"
        required
        />
    </Stack>
}
