import { useLoaderData, useNavigation, Form } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

// TODO: Show the email and reviews of the user
export default function UserProfile() {
  // Datos del usuario
  const user = useLoaderData();
  const navigation = useNavigation();
  const busy = navigation.state === 'submitting' ||
               navigation.state === 'loading';

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
            </Stack>
          </CardContent>
          <Divider/>
          <CardActions sx={{justifyContent: "center"}}>
            <Button type="submit" variant="outlined" color="warning" size="small" disabled={busy}>
              Update
            </Button>
          </CardActions>
        </Form>
      </Card>
    </Stack>
    );
}