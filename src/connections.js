import * as React from "react";
import { List } from "react-admin";
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import { Card, CardContent, CardActions, CardHeader, Avatar } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import GridList from './gridList';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Container, Box, Grid, Paper, Typography, Button } from '@mui/material';
import HubIcon from '@mui/icons-material/Hub';
//una connessione piu' scopes {Offline Access e' uno scope}
//chiedere che dati fectha /connections






function Row(props) {
    const { record } = props;
    const { scopes } = props.record;
    const [open, setOpen] = React.useState(false);
    return (
        <Box>
            <Card>
                <CardHeader
                    title={props.record.realm}
                    avatar={<Avatar sx={{ bgcolor: 'orange' }}><HubIcon /></Avatar>}
                    titleTypographyProps={{ variant: 'h6' }} />
                <CardContent>
                    <Typography variant="h6" gutterBottom sx={{ pt: 2, pb: 2, textAlign: 'left', fontWeight: "bold" }} >
                        {props.record.appName}
                    </Typography >
                    <Typography variant="h6" gutterBottom sx={{ pt: 2, pb: 2, textAlign: 'left', fontWeight: "medium", textDecorationLine: 'underline' }} >
                        Connected with:
                    </Typography>
                </CardContent>
                <CardContent>
                    <TableContainer component={Paper}>
                        <Table aria-label="collapsible table">

                            <TableBody >
                                <React.Fragment>
                                    <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                                        <TableCell sx={{ padding: 0, textAlign: 'left' }}>
                                            <IconButton
                                                aria-label="expand row"
                                                size="small"
                                                onClick={() => setOpen(!open)}
                                            >
                                                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                            </IconButton>
                                        </TableCell>
                                        <TableCell sx={{ pt: 2, pb: 2, textAlign: 'left', fontWeight: "bold" }} component="th" scope="row">
                                            More Details!
                                        </TableCell>

                                    </TableRow>

                                </React.Fragment>
                            </TableBody>
                            {open && scopes.map((scope) =>
                                <TableRow key={scope}>
                                    <TableCell sx={{ pt: 2, pb: 2, textAlign: 'left', fontWeight: "bold" }} component="th" scope="row">
                                        {scope.name}
                                    </TableCell>
                                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                        <Collapse in={open} timeout="auto" unmountOnExit>
                                            <Box sx={{ margin: 1 }}>
                                                {scope.description}
                                            </Box>
                                        </Collapse>
                                    </TableCell>
                                </TableRow>
                            )
                            }
                        </Table>
                    </TableContainer></CardContent>
                <CardActions>
                    <Button variant="outlined" color="error">
                        Delete Connection
                    </Button>
                </CardActions>
            </Card>
        </Box>
    );

}

export const ConnectionList = () => {

    return (
        <Box component="div">
            {/*Carica tutte le connessioni */}
            <Typography variant="h6" gutterBottom sx={{ pt: 2, pb: 2, textAlign: 'left', fontWeight: "bold" }} >
                Connections!
            </Typography >
            <List component="div" pagination={false} actions={false}>

                <GridList cols={6}
                    primaryText={
                        record =>
                            <Box>
                                <TableContainer><Row record={record} /></TableContainer>
                            </Box>
                    }

                />
            </List >
        </Box>
    );
}