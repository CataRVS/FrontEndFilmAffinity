import { useLoaderData, useNavigation, Form } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { useState } from "react";

// TODO: Show the reviews of the user
export default function UserProfileEdit() {
  // Datos del usuario
  const user = useLoaderData();
  const navigation = useNavigation();
  const busy = navigation.state === 'submitting' ||
               navigation.state === 'loading';
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const diffPasswords = password !== password2;

  return (
    <Stack direction="row" justifyContent="center" alignItems="center"
      sx={{ width: 1, p: 4 }}>
      <Card variant="outlined" sx={{minWidth: '15%'}}>
        <Form method="put">
          <CardContent>
            <Stack direction="column" justifyContent="center" alignItems="center">
              <AccountBoxIcon color="action" sx={{ fontSize: 40, mb: 2 }}/>
              <TextField margin="dense" size="small" required fullWidth disabled={busy}
                label="First Name"
                name="first_name"
                defaultValue={user.first_name}
              />
              <TextField margin="dense" size="small" required fullWidth disabled={busy}
                label="Last Name"
                name="last_name"
                defaultValue={user.last_name}
              />
              <TextField margin="dense" size="small" required fullWidth disabled={busy}
                label="Email"
                name="email"
                type="email"
                defaultValue={user.email}
              />
              <TextField margin="dense" size="small" required fullWidth disabled={busy}
                label="Password"
                name="password"
                type="password"
                defaultValue={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <TextField margin="dense" size="small" required fullWidth
                label="Repeat password"
                name="password2"
                type="password"
                defaultValue={password2}
                onChange={(e) => setPassword2(e.target.value)}
                error={diffPasswords}
                helperText={diffPasswords && "Passwords must be the same"}
              />
            </Stack>
          </CardContent>
          <Divider/>
          <CardActions sx={{justifyContent: "center"}}>
            <Button type="submit" variant="contained" color="primary" size="small" disabled={busy || diffPasswords}>
              Update
            </Button>
          </CardActions>
        </Form>
        <Form method="delete">
            <Button variant="contained" type="submit" color="error">Delete Account</Button>
        </Form>
        <br/>
      </Card>
    </Stack>
    );
}