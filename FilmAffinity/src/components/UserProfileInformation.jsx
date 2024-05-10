import { useLoaderData, useNavigation, Form, NavLink } from "react-router-dom";
import './catalog.css';
import { Button } from "@mui/material";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";


// We create a Card that will hold the user information and the reviews
function UserInfo({user}) {
  return (
    <div className="card">
      <h1>{user.first_name} {user.last_name}</h1>
      <strong>Email: </strong>{user.email}
      <br/>
      <Button variant="contained" href="/users/edit-profile">Edit</Button>
      <Form method="post">
        <Button variant="contained" type="submit" color="error">Delete Account</Button>
      </Form>
    </div>
  )
}


function UserProfileInformation() {
  // We get the user information
  const user = useLoaderData();
  const navigation = useNavigation();
  const busy = navigation.state === 'submitting' ||
               navigation.state === 'loading';

  const { isLoggedIn, checkSession } = useAuth();
  checkSession();
  return (
    <>
      <div className="container">
        <UserInfo user={user}/>
      </div>
    </>)
}

export default UserProfileInformation;