import * as React from "react";
import { List } from "react-admin";


import { Box, Paper, Typography, } from '@mui/material';


import GridList from './gridList';
import AppSettingsAltOutlinedIcon from '@mui/icons-material/AppSettingsAltOutlined';

import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';

import TableRow from '@mui/material/TableRow';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';



function Row(props) {
    const [open, setOpen] = React.useState(false);
    const { record } = props;

    return (

        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell >
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>

                <TableCell >Details</TableCell>



            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>


                        <Box sx={{ margin: 1 }}>




                            <Table size="small" aria-label="purchases">
                                <TableBody>
                                    {record.scopes.map((row) => (
                                        <TableRow>
                                            <TableCell component="th" scope="row">
                                                <Typography sx={{ fontWeight: "bold" }}>{row.name}</Typography> {row.date}
                                                <Typography>{row.description}</Typography>
                                            </TableCell>

                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>


                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>)
}


export function ConnectionList() {

    return (

        <Box component="div">
            <Typography variant="h4" gutterBottom sx={{ pt: 2, pb: 2 }} >
                Connections
            </Typography >
            <List component="div" pagination={false} actions={false}>
                <GridList cols={4}
                    title={record => record.appName}
                    subtitle={record => record.realm}
                    icon={<AppSettingsAltOutlinedIcon />}

                    primaryText={
                        record =>

                            <Box>
                                <TableContainer component={Paper}>
                                    <Row record={record} />
                                </TableContainer>

                            </Box>
                    }
                />
            </List >
        </Box>)
}