import * as React from 'react';
import { AppBar, Layout, UserMenu, useUserMenu } from 'react-admin';
import { Link } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import { Container, Box, Grid, Paper, Typography, Button } from '@mui/material';


const MyAppBar = (props) => (
    <AppBar {...props} color='primary' >
        <Box flex="1">
            <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                    mr: 2,
                    display: { xs: 'none', md: 'flex' },
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    // letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                }}
            >
                AAC
            </Typography>
        </Box>
    </AppBar>
);

const MyLayout = props => (
    <Container maxWidth="xl">
        <Layout {...props} appBar={MyAppBar} />
    </Container>
);

export default MyLayout;