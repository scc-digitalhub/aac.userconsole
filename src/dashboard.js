import * as React from "react";
import { useGetIdentity, EditButton} from 'react-admin';
import LinearProgress from '@mui/material/LinearProgress';
import { Card, CardContent, CardActions, CardHeader } from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import { Container, Grid,Typography, Button, Avatar } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { ProfileShow } from "./profile";
import { CollapsibleTable } from './accounts'
function MillisecondsToDate(props) {
    const date = new Date(props);
    return date.toLocaleString('en-GB');
}

const Dashboard = () => {
    const { identity, isLoading } = useGetIdentity();
    if (isLoading === true) {
        return <LinearProgress />;
    }
    let internal = false;
    if (identity && !isLoading) {
        internal = identity.identities.find((item) => (item.authority === "internal"));
    }
    return (
        <Container maxWidth="lg">

            <Typography variant="h4" gutterBottom sx={{ pt: 2, pb: 2, textAlign: 'center' }} >
                Welcome, {identity.fullName}!
            </Typography >
            {!!identity.emailAddress &&
                <Typography variant="h6" gutterBottom sx={{ pt: 0, pb: 2, textAlign: 'center' }} >
                    {identity.emailAddress}

                </Typography >
            }
            <Typography sx={{ pb: 2, textAlign: 'center' }} >
                Manage you personal information, accounts and review your security settings.
            </Typography>




            <Grid container spacing={2}>
                <Grid item xs={12} md={6} zeroMinWidth >
                    <Card sx={{ height: '100%' }}>
                        <CardHeader
                            title="Profile"
                            avatar={<Avatar sx={{ bgcolor: 'red' }}><PersonIcon /></Avatar>}
                            titleTypographyProps={{ variant: 'h6' }} />
                        <CardContent>
                            <Typography variant="h6" gutterBottom sx={{ pt: 2, pb: 2, textAlign: 'left', fontWeight: "bold" }} >
                                {identity.subjectId}
                            </Typography >
                            <Typography variant="h6" gutterBottom sx={{ pt: 2, pb: 2, textAlign: 'left' }} >
                                Your personal registration information
                            </Typography>

                            <ProfileShow />
                        </CardContent>
                        <CardActions>
                            <Button variant="outlined" color="error">
                                Delete Profile
                            </Button>

                        </CardActions>
                    </Card>
                </Grid>
                {internal && <Grid item xs={12} md={6} zeroMinWidth >
                    {/*<h1>Connected Accounts!</h1>*/}

                    <Card sx={{ height: '100%' }}>
                        <CardHeader
                            title="Internal"
                            avatar={<Avatar sx={{ bgcolor: 'blueviolet' }}><PersonIcon /></Avatar>}
                            titleTypographyProps={{ variant: 'h6' }} />
                        <CardContent>
                            <Typography variant="button" component="div" gutterBottom>
                                <h5>Email:</h5>
                                {internal.account.email}
                            </Typography>
                            <Typography variant="button" component="div" gutterBottom>
                                <h5>Username:</h5>
                                {internal.account.username}
                            </Typography >
                            <Typography variant="button" component="div" gutterBottom>
                                <h5>Name:</h5>
                                {internal.account.name}
                            </Typography >
                            <Typography variant="button" component="div" gutterBottom>
                                <h5>Surname:</h5>
                                {internal.account.surname}
                            </Typography >
                            <Typography variant="button" component="div" gutterBottom>
                                <h5>Created on:</h5>
                                {MillisecondsToDate(internal.account.createDate)}
                            </Typography>

                        </CardContent>
                        <EditButton />
                    </Card>

                    {/*identity.identities[0].account.provider === 'internal' ? <EditButton></EditButton> : false*/}
                </Grid>}
                {!internal &&
                    <Grid cointainer item xs={12} md={6} justify="center">
                        <Card sx={{ height: '100%' }}>
                            <CardHeader
                                title="Internal"
                                avatar={<Avatar sx={{ bgcolor: 'blueviolet' }}><PersonIcon /></Avatar>}
                                titleTypographyProps={{ variant: 'h6' }} />
                            <CardContent sx={{ textAlign: 'center', pt: 12 }}>
                                <Button variant="contained">Get Registered!</Button>
                            </CardContent>
                        </Card>
                    </Grid>
                }


            </Grid>
            <Typography variant="h4" gutterBottom sx={{ pt: 2, pb: 2, textAlign: 'center' }} >
                Connected Accounts!
            </Typography >
            <Grid container spacing={1}>
                <Grid item xs={12} md={12} zeroMinWidth >
                    <Card sx={{ height: '100%' }}>
                        <CardHeader
                            title="All Accounts"
                            avatar={<Avatar sx={{ bgcolor: 'blue' }}><GroupIcon /></Avatar>}
                            titleTypographyProps={{ variant: 'h6' }} />
                        <CardContent>
                            <Typography variant="h6" gutterBottom sx={{ pt: 2, pb: 2, textAlign: 'left',textDecorationLine: 'underline' }} >
                                Connected with:
                            </Typography>
                            <CollapsibleTable record={identity} />
                        </CardContent>
                        <CardActions>

                            {/*<ShowButton resource="profile" record={{ id: 1 }} label="Show profile" />*/}

                        </CardActions>
                    </Card>
                </Grid>
            </Grid>

        </Container >


    )
};
export default Dashboard;

