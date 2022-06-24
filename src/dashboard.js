import * as React from "react";
import { useGetIdentity } from 'react-admin';
import LinearProgress from '@mui/material/LinearProgress';
import { Card, CardContent, CardActions, CardHeader } from '@mui/material';
import { Container, Box, Grid, Typography, Button, Avatar } from '@mui/material';

import { ProfileShow } from './profile';
import { AccountsListDashBoard } from "./accounts";
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';



function MillisecondsToDate(props) {
    const date = new Date(props);
    return date.toLocaleString('en-GB');
}
function BooleanToString(props) {
    return props.toString();
}

const Dashboard = () => {
    const { identity, isLoading } = useGetIdentity();
    if (isLoading === true) {
        return <LinearProgress />;
    }

    let profile = false;
    if (identity && !isLoading) {
        profile = identity.identities.find((item) => (item.authority === "internal"));
    }



    return (
        <Container maxWidth="lg">
            <Typography variant="h4" gutterBottom sx={{ pt: 2, pb: 2, textAlign: 'center' }} >
                Welcome, {identity.fullName}
            </Typography >
            {!!identity.emailAddress &&
                <Typography variant="h6" gutterBottom sx={{ pt: 0, pb: 2, textAlign: 'center' }} >
                    {identity.emailAddress}
                </Typography >
            }
            <Typography sx={{ pb: 2, textAlign: 'center' }} >
                Manage you personal information, accounts and review your security settings.
            </Typography>







            <Grid container spacing={2} >


                <Grid item xs={12} md={6} zeroMinWidth >
                    <Card sx={{ height: '100%' }}>
                        <CardHeader
                            title="Profile"

                            avatar={<Avatar sx={{ bgcolor: 'darkorange' }}><BadgeOutlinedIcon /></Avatar>}
                            titleTypographyProps={{ variant: 'h6' }} />
                        <CardContent>
                            <Typography variant="h6" gutterBottom sx={{ pt: 2, pb: 2, textAlign: 'left', fontWeight: "bold" }} >
                                {identity.subjectId}
                            </Typography >
                            <Typography variant="h6" gutterBottom sx={{ pt: 2, pb: 2, textAlign: 'left' }} >
                                Le tue informazioni personali come dalla registrazione
                            </Typography>
                            <ProfileShow />
                        </CardContent>
                        <CardActions>
                            <Button variant="outlined" color="error">Delete Profile</Button>

                        </CardActions>
                    </Card>
                </Grid>


                <Grid item xs={12} md={6} zeroMinWidth >
                    <Card sx={{ height: '100%' }}>
                        <CardHeader
                            title="Account Internal"
                            avatar={<Avatar sx={{ bgcolor: 'darkviolet' }}><SupervisorAccountOutlinedIcon /></Avatar>}
                            titleTypographyProps={{ variant: 'h6' }} />
                        <CardContent >
                            {profile && <Box>
                                <Typography variant="button" component="div" gutterBottom>
                                    <h5>Email:</h5>
                                    {profile.account.email}
                                </Typography>
                                <Typography variant="button" component="div" gutterBottom>
                                    <h5>Username:</h5>
                                    {profile.account.username}
                                </Typography>
                                <Typography variant="button" component="div" gutterBottom>
                                    <h5>Name:</h5>
                                    {profile.account.name}
                                </Typography>
                                <Typography variant="button" component="div" gutterBottom>
                                    <h5>Surname:</h5>
                                    {profile.account.surname}
                                </Typography>
                                <Typography variant="button" component="div" gutterBottom>
                                    <h5>DAte:</h5>
                                    {MillisecondsToDate(profile.account.createDate)}
                                </Typography></Box>}

                        </CardContent>
                        <CardActions >
                            {!profile && <Box sx={{ pt: 37 }}><Button>Get Registered</Button> </Box>}

                        </CardActions>

                    </Card>

                </Grid>

                <Grid item xs={12} md={12} zeroMinWidth >
                    <Card sx={{ height: '100%' }}>
                        <CardHeader
                            title="All accounts"

                            avatar={<Avatar sx={{ bgcolor: 'red' }}><ManageAccountsOutlinedIcon /></Avatar>}
                            titleTypographyProps={{ variant: 'h6' }} />
                        <CardContent>
                            <AccountsListDashBoard />
                        </CardContent>

                    </Card>
                </Grid>




            </Grid>
        </Container>

    )
};

export default Dashboard;