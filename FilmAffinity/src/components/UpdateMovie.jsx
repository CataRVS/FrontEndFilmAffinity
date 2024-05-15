import React from 'react';
import { useLoaderData, useNavigation, Form } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


function UpdateMovie() {
    const { id } = useParams(); // Extrae el id de la URL
    const [ movie, setMovie ] = useState(null);
    const { isLoggedIn, isAdmin, checkSession } = useAuth();
    checkSession();
  
    useEffect(() => {
      const fetchMovie = async () => {
        try {
          const response = await fetch(`http://localhost:8000/filmaffinity/movies/${id}/`);
          if (!response.ok) {
            throw new Error('It was not possible to obtain the movie details');
          }
          const data = await response.json();
          setMovie(data); // Actualiza el estado con los detalles del producto
        } catch (error) {
          console.error('Error while requesting movie details:', error);
        }
      };
  
      fetchMovie();
      checkSession();
    }, [id]); // Este efecto se ejecutará cada vez que el id cambie
  
    if (!movie) {
      return <div>Loading...</div>; // Muestra un mensaje de carga o un spinner
    }

    // movie.poster
    return <>
        <h1>Update Movie</h1>
        <Card>
            <Form method="put">
            <CardContent>
            <Stack spacing={2}>
                <TextField
                name="title"
                label="Title"
                defaultValue={movie.title}
                variant="outlined"
                required
                />
                <TextField
                name="release_date"
                label="Release Date"
                defaultValue={movie.release_date}
                variant="outlined"
                required
                />
                <TextField
                name="duration"
                label="Duration"
                defaultValue={movie.duration}
                variant="outlined"
                required
                />
                <TextField
                name="language"
                label="Language"
                defaultValue={movie.language}
                variant="outlined"
                required
                />
                <ListGenresEdit genres={movie.genres} />
                <ListActorsEdit actors={movie.actors} />
                <DirectorEdit director={movie.director} />
                <TextField
                name="synopsis"
                label="Synopsis"
                defaultValue={movie.synopsis}
                variant="outlined"
                required
                />
            </Stack>
            </CardContent>
            <Divider />
            <CardActions sx={{justifyContent: "center"}}>
                <Button type="submit" variant="contained" color="primary" size="small">
                Update
                </Button>
            </CardActions>
            </Form>
            <Form method="delete">
                <Button variant="contained" type="submit" color="error">Delete Movie</Button>
            </Form>
            <br/>
        </Card>
    </>
}

function DirectorEdit({ director }) {
    // Separar el nombre del director en dos partes nombre y apellido
    const director_list = director.split(" ");
    const director_name = director_list[0];
    // juntar el apellido en una sola variable
    const director_surname = director_list.slice(1).join(" ");
    return <Stack spacing={2}>
        <TextField
        name="director_name"
        id="director_name"
        label="Director Name"
        defaultValue={director_name}
        variant="outlined"
        required
        />
        <TextField
        name="director_surname"
        id="director_surname"
        label="Director Surname"
        defaultValue={director_surname}
        variant="outlined"
        required
        />
    </Stack>
}

function ActorEdit({ actor, index }) {
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


function ListActorsEdit({ actors }) {
    const [actorList, setActorList] = useState(actors);
    
    const addActor = () => {
        setActorList([...actorList, ""]);
    };

    const removeLastActor = () => {
        if (actorList.length > 1) {
            setActorList(actorList.slice(0, -1));
        }
    };

    return (
        <div>
            {actorList.map((actor, index) => (
                <div key={index}>
                    <h3>Actor {index + 1}</h3>
                    <AccountBoxIcon />
                    <ActorEdit actor={actor} index={index} />
                </div>
            ))}
            <Button onClick={addActor}>Add New Actor</Button>
            <Button onClick={removeLastActor}>Remove Last Actor</Button>
        </div>
    );
}


function GenreEdit({ genre, index }) {
    const [genreEdit, setGenreEdit] = useState(genre);

    useEffect(() => {
        setGenreEdit(genreEdit);
    }, [genreEdit]);

    return <TextField
    name={`genre[${index}]`}
    label="Genre"
    value={genreEdit}
    onChange={e => setGenreEdit(e.target.value)}
    variant="outlined"
    required
    />;
}

function ListGenresEdit({ genres }) {
    // We map each genre to a GenreEdit component
    // and add 2 buttons, one to add a new genre and one to remove the last genre
    // add logic for the buttons
    const [genreList, setGenreList] = useState(genres);

    // Function to add a new genre
    const addGenre = () => {
        const newGenre = '';
        setGenreList([...genreList, newGenre]);
    };

    // Function to remove the last genre from the list
    const removeLastGenre = () => {
        if (genreList.length > 1) {
            setGenreList(genreList.slice(0, -1));
        }
    };

    return (
        <div>
            {genreList.map((genre, index) => (
                <GenreEdit index={index} genre={genre} key={index}/>
            ))}
            <br />
            <Button onClick={addGenre}>Add New Genre</Button>
            <Button onClick={removeLastGenre}>Remove Last Genre</Button>
        </div>
    );
}


export default UpdateMovie;