# FrontEndFilmAffinity
In the current digital era, where information and entertainment are just a click away, the overwhelming amount of content for movies and series available can be daunting. Sites like the popular Filmaffinity allow undecided users to discover new movies and rate them to help others in the same situation. Based on this, we have developed a project that mimics these key functionalities, combining the robustness and versatility of Django in the backend with the agility of React in the frontend, to offer a fluid and attractive user experience.

Our application allows users not only to access a small database of movies but also to interact with it dynamically. Users can filter movies according to their preferences, view specific details of each title, and contribute to the community with their own ratings and reviews. Additionally, the customized registration system enriches the experience, allowing each user to remember the reviews they have already made.


## Table of Contents
- [React + Vite](#react--vite)
  - [Table of Contents](#table-of-contents)
    - [Getting Started](#getting-started)
    - [Features](#features)
    - [Usage](#usage)

## Getting Started
This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Features
Once the app is running, you can:
- View a list of movies: "movies/catalog"
    - Title
    - Poster
    - Rating
    - Filters available by: title, rating, genre, synopsis, actor, director, language
- View the details of a specific movie: "movies/catalog/:id"
    - Title
    - Director
    - Year
    - Genre
    - Duration
    - Rating
    - Description
    - Reviews
    - Adding a review (if logged in)
- About us: "moreInfo"
- Register: "users/register"
- Login: "users/login"

If you are logged in, you can also:
- See your profile: "users/profile"
- Edit profile: "users/edit-profile"
- See your reviews: "users/reviews"

An admin user can:
- Add a movie: "movies/add"
- Edit a movie: "movies/edit/:id"
    - From this view you can also delete a movie



## Usage
Install the dependencies from the package.json file:
```bash
npm install
```

Run the development server:
```bash
npm run dev
```