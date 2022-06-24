import * as React from "react";
import { useResourceContext, useGetResourceLabel, useGetIdentity } from 'react-admin';
import { List } from "react-admin";

import { LinearProgress, EditButton } from "react-admin";
import Typography from '@mui/material/Typography';
import { Box, CardActions, Card, CardHeader, CardContent, Grid } from '@mui/material'

import GridList from './gridList';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import TagOutlinedIcon from '@mui/icons-material/TagOutlined';

import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';



function MillisecondsToDate(props) {
    const date = new Date(props);
    return date.toLocaleString('en-GB');
}
function BooleanToString(props) {
    return props.toString();
}

const AccountsTitle = (props) => {
    const resource = useResourceContext(props);
    const getResourceLabel = useGetResourceLabel();
    return (
        <Typography variant="h4" gutterBottom sx={{ pt: 2, pb: 2 }} >
            {getResourceLabel(resource, 1)}
        </Typography >
    )

}


function iconChoose(authority) {
    if (authority === "internal") {
        return <LockOpenOutlinedIcon />;
    } else if (authority === "oidc") {
        return <TagOutlinedIcon />
    } else {
        return <TagOutlinedIcon />
    }
}


export const AccountList = () => (
    <Box component="div">
        <AccountsTitle />
        <List component="div" pagination={false} actions={false}>
            <GridList cols={4}
                title={record => record.id}
                subtitle={record => record.provider}
                icon={record => (iconChoose(record.authority))}

                primaryText={
                    record =>

                        <Box>


                            <TableContainer component={Paper}>

                                <Table size="small" aria-label="a dense table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={{ fontWeight: "bold" }}>Key</TableCell>
                                            <TableCell sx={{ fontWeight: "bold" }}>Value</TableCell>

                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {Object.keys(record.account).map((key, index) => (
                                            <TableRow
                                                // key={key}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    {key}
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    {record.account[key] != null ? (record.account[key]).toString() : (key === "password" ? "****" : "null")}

                                                </TableCell>

                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>


                            <CardActions sx={{ pt: 2, pb: 0 }}>
                                {record.authority === 'internal' && <EditButton />}
                            </CardActions>

                        </Box>
                }
            />
        </List >
    </Box>

);





function Row(props) {
    const [open, setOpen] = React.useState(false);
    const { rower } = props;

    return (

        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                
             <TableCell component="th" scope="row">
                 <Typography>
                     <b>autorithy: </b> {rower.authority}
                 </Typography>
                 <Typography><b>provider: </b> {rower.provider}</Typography>
                 <Typography><b>username: </b>{rower.userId}</Typography>


                 </TableCell>
                {/* <TableCell ></TableCell> */}
                <TableCell >
                    Details
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>


            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>


                        <Box sx={{ margin: 1 }}>




                            <Table size="small" aria-label="purchases">
                                <TableBody>
                                {Object.keys(rower.account).map((key, index) => (
                                    <TableRow key={index}>
                                        <TableCell component="th" scope="row">
                                            <Typography><b>{key}: </b>{rower.account[key] != null ? (rower.account[key]).toString() : (key === "password" ? "****" : "null")}  </Typography>

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


export function AccountsListDashBoard() {

    const { identity, isLoading } = useGetIdentity();
    if (isLoading === true) {
        return <LinearProgress />;
    }



    return (

    <Box component="div">
        <Grid container spacing={2} >
        {identity.identities.map((rower) => (

            rower.authority!="internal" ?  <Grid item xs={12} md={6} zeroMinWidth >
                <Card>
                    <CardHeader
                        title={rower.authority}
                        subheader={rower.realm}
                        avatar={iconChoose(rower.authority)}
                    >

                    </CardHeader>
                    <CardContent>
                        <TableContainer component={Paper}>
                        <Row rower={rower} />
                            
                        </TableContainer>
                    </CardContent>
                </Card>

            </Grid > : ""
        ))}
        </Grid >
            
    </Box>
      
      );
}

