import { Form, NavLink, useNavigation, useActionData, useLocation } from "react-router-dom";
import Button from '@mui/material/Button';
import Stack from "@mui/material/Stack";
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import LockIcon from '@mui/icons-material/Lock';
import LoadingButton from '@mui/lab/LoadingButton';

export default function Login() {
  const responseError = useActionData();
  const navigation = useNavigation();
  const busy = (navigation.state === 'submitting' || navigation.state === 'loading');
  const credIncorrectas = !busy && responseError;
  const registered = useLocation().search === '?registered';

  return (
    <>
      <Stack direction="row" justifyContent="center" alignItems="center"
      sx={{ width: 1, height: "100vh" }}>
        <Paper elevation={4} sx={{ p: 2, borderRadius: 2 }}>
          <Form method="post">
            <Stack direction="column" justifyContent="center" alignItems="center">
              <LockIcon color="action" sx={{ fontSize: 40, mb: 2 }}/>
              <TextField margin="dense" size="small" required fullWidth disabled={busy}
                  label="Email"
                  name="email"
                  type="email"
              />
              <TextField margin="dense" size="small" required fullWidth disabled={busy}
                label="Password"
                name="password"
                type="password"
              />
              {credIncorrectas && <Alert severity="error" sx={{ mt: 1, width: '100%', py:0 }}>
                Incorrect Credentials, try again</Alert>}
              {registered && <Alert variant="outlined" severity="success" sx={{ mt: 1, width: '100%' }}>
              Everything is ready! Sign In
              </Alert>}
              <LoadingButton type="submit" variant="contained" fullWidth sx={{ mt: 2, mb: 1 }} 
              loading={busy} disabled={busy}>
                Sign In
              </LoadingButton>
                <NavLink to='/users/register'><Button fullWidth disabled={busy}>Sign up</Button></NavLink>
            </Stack>
          </Form>
        </Paper>
      </Stack>
    </>
  )
}


