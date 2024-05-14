import { useState } from "react";
import { Form, NavLink, useNavigation, useActionData } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button';


export default function Register() {
    const responseError = useActionData();
    const navigation = useNavigation();
    const busy = (navigation.state === 'submitting' || navigation.state === 'loading');
    const registerError = !busy && responseError;
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [passwordValid, setPasswordValid] = useState(true);
    const diffPasswords = password !== password2;

    function validatePassword(password) {
      const re = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).*$/;
      return re.test(password);
    }

    const handlePasswordChange = (e) => {
      const newPassword = e.target.value;
      setPassword(newPassword);
      setPasswordValid(validatePassword(newPassword));
    }

    return (
        <Stack direction="row" justifyContent="center" alignItems="center"
          sx={{ width: 1, height: "100vh" }}>
          <Paper elevation={4} sx={{ p: 2, borderRadius: 2 }}>
            <Form method="post">
              <Stack direction="column" justifyContent="center" alignItems="center">
                <AccountBoxIcon color="action" sx={{ fontSize: 40, mb: 2 }}/>
                <TextField margin="dense" size="small" required fullWidth disabled={busy}
                  label="First name"
                  name="first_name"
                />
                <TextField margin="dense" size="small" required fullWidth disabled={busy}
                  label="Last name"
                  name="last_name"
                />
                <TextField margin="dense" size="small" required fullWidth disabled={busy}
                  label="Email"
                  name="email"
                  type="email"
                />
                <TextField margin="dense" size="small" required fullWidth disabled={busy}
                  label="Password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  error={!passwordValid}
                  helperText={!passwordValid && "Incorrect password format"}
                />
                <TextField  margin="dense" size="small" required fullWidth
                  label="Repeat password"
                  name="password2"
                  type="password"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                  error={diffPasswords}
                  helperText={diffPasswords && "Passwords must be the same"}
                />
                <Alert variant="outlined" severity="error" sx={{
                  mt:1, width:'100%', py:0, visibility: registerError ? 'visible' : 'hidden'}}>
                  {registerError && registerError.status === 409 ? 'User is already registered' : 'Invalid password format' }
                </Alert>
                <LoadingButton type="submit" variant="contained" fullWidth sx={{mt:2,mb:1}} 
                  loading={busy} disabled={busy || diffPasswords}>
                    Register
                </LoadingButton>
                <NavLink to='/users/login' style={{width: '100%'}}>
                  <Button fullWidth disabled={busy}>Sign In</Button>
                </NavLink>
              </Stack>
            </Form>
          </Paper>
        </Stack>
      )
    }