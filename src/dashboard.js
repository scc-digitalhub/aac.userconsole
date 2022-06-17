import * as React from "react";
import { Title } from 'react-admin';
import { useGetIdentity, useGetOne } from 'react-admin';
import LinearProgress from '@mui/material/LinearProgress';
import { Card, CardContent, CardActions, CardHeader } from '@mui/material';
import { Container, Box, Grid, Paper, Typography, Button, Avatar } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import AppShortcutIcon from '@mui/icons-material/AppShortcut';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import DevicesIcon from '@mui/icons-material/Devices';

const Dashboard = () => {
    const { identity, isLoading } = useGetIdentity();
    if (isLoading === true) {
        return <LinearProgress />;
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
                            title="Accounts"
                            avatar={<AccountBoxIcon color="primary-dark" />}
                            titleTypographyProps={{ variant: 'h6' }} />
                        <CardContent>
                            Review and manage your accounts
                        </CardContent>
                        <CardActions>
                            <Button variant="contained" >Manage Accounts</Button>
                        </CardActions>
                    </Card>
                </Grid>

                <Grid item xs={12} md={6} zeroMinWidth >
                    <Card sx={{ height: '100%' }}>
                        <CardHeader
                            title="Profile"
                            avatar={<Avatar sx={{ bgcolor: 'red' }}><PersonIcon /></Avatar>}
                            titleTypographyProps={{ variant: 'h6' }} />
                        <CardContent>
                            View and update your personal information
                        </CardContent>
                        <CardActions>
                            <Button >Edit profile</Button>
                        </CardActions>
                    </Card>
                </Grid>

                <Grid item xs={12} md={6} zeroMinWidth >
                    <Card sx={{ height: '100%' }}>
                        <CardHeader
                            title="Devices"
                            avatar={<Avatar variant="square"><DevicesIcon /></Avatar>}
                            titleTypographyProps={{ variant: 'h6' }} />
                        <CardContent>
                            You have currently active sessions on one or more devices.
                        </CardContent>
                        <CardActions>
                            <Button size="small">View sessions</Button>
                        </CardActions>
                    </Card>
                </Grid>

                <Grid item xs={12} md={6} zeroMinWidth >
                    <Card sx={{ height: '100%' }}>
                        <CardHeader
                            title="Connections"
                            avatar={<Avatar sx={{ width: 56, height: 56, bgColor: "primary" }}><AppShortcutIcon /></Avatar>}
                            titleTypographyProps={{ variant: 'h6' }} />
                        <CardContent>
                            View and
                        </CardContent>
                        <CardActions>
                            <Button size="small">Manage Connections</Button>
                        </CardActions>
                    </Card>
                </Grid>


                <Grid item xs={12} md={12} zeroMinWidth >
                    <Card sx={{ height: '100%', maxWidth: '100%' }}>
                        <CardContent>
                            <pre>
                                {JSON.stringify(identity, null, 4)}
                            </pre>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>

    )
};

export default Dashboard;