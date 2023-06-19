import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { useContext } from 'react'
import { AppContext } from '../context/AppContext';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.5)' }}
  >
  </Box>
);

export default function BasicCard() {
  const { appState } = useContext(AppContext);
  console.log("Profile:", appState);
  return (
    <Card sx={{ minWidth: 275, width: "50%", margin: "0 auto", height: "60vh", mt: "5%", textAlign: "center", p: "25px" }}>
      <Card sx={{ backgroundColor: "#845adfcc", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <CardContent>
          <Stack direction="row" spacing={2} sx={{ display: "flex" }} >
            <Avatar alt="Remy Sharp" src="https://magical-froyo-4f47d3.netlify.app/img/user.jpg" />
            <h2 style={{ color: "#fff", fontSize: "30px" }}> {
              appState?.user?.Username
            }</h2>

          </Stack>
          <Typography variant="h5" component="div">
            <h3 style={{ color: "#fff", fontSize: "30px" }}> User Type: {
              appState?.user?.UserType
            }</h3><br />
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">

          </Typography>
          <Typography variant="body2">

            <br />

          </Typography>
        </CardContent>
        <CardActions>
          {/* <Button size="small">Learn More</Button> */}
        </CardActions>
      </Card>
    </Card>
  );
}