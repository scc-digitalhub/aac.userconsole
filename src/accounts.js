import * as React from "react";
import { List, EditButton, useResourceContext, useGetResourceLabel } from "react-admin";
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material'
import GridList from './gridList';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import GoogleIcon from '@mui/icons-material/Google';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';


const AccountsTitle = (props) => {
    const resource = useResourceContext(props);
    const getResourceLabel = useGetResourceLabel();
    return (
        <Typography variant="h4" gutterBottom sx={{ pt: 2, pb: 2 }} >
            {getResourceLabel(resource, 1)}
        </Typography >
    )
    // return <>{getResourceLabel(resource, 1)}</>;
}


function iconCustom(record) {
    if (record.authority === 'internal') {
        return <LockOpenIcon />;
    } else
        return <GoogleIcon />;
}

export const AccountList = () => (
    <Box component="div">

        <Typography variant="h6" gutterBottom sx={{ pt: 2, pb: 2, textAlign: 'left', fontWeight: "bold" }} >
            Accounts!
        </Typography >
        <List component="div" pagination={false} actions={false}>
            <GridList cols={6}
                title={record => record.id}
                subtitle={record => record.provider}
                icon={record => iconCustom(record)}
                primaryText={
                    record =>
                        <Box s={{ pb: 2 }}>

                            <TableContainer component={Paper} >

                                <Table aria-label="a dense table">



                                    <TableBody>
                                        {Object.keys(record.account).map((key, index) => (
                                            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                <TableCell align="left" sx={{ fontWeight: "bold" }} component="th" scope="row">
                                                    {key}
                                                </TableCell>
                                                {


                                                    <TableCell align="left" component="th" scope="row">
                                                        {record.account[key] != null ? (record.account[key]).toString() : key === 'password' ? '****' : 'Not Defined'}
                                                    </TableCell>


                                                }


                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                            {record.authority === 'internal' && <EditButton></EditButton>}
                        </Box>
                }
            />
        </List >
    </Box>
);
function RowAccount(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    return (
        <React.Fragment >
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell align="right">
                    {iconCustom(props)}
                </TableCell>
                <TableCell sx={{ paddingLeft: 10 }}>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell align="left">
                    <Typography variant="button" gutterBottom sx={{ pt: 2, pb: 2, textAlign: 'left', fontWeight: "bold" }} >
                        More Details!
                    </Typography >
                </TableCell>

                <TableCell align="left">
                    <Typography variant="button" gutterBottom sx={{ pt: 2, pb: 2, textAlign: 'left', fontWeight: 600 }} >
                        Authority:
                    </Typography >

                    {row.authority}
                </TableCell>
                <TableCell align="left">
                    <Typography variant="button" gutterBottom sx={{ pt: 2, pb: 2, textAlign: 'left', fontWeight: 600 }} >
                        Provider:
                    </Typography >
                    {row.provider}</TableCell>
                <TableCell align="left">
                    <Typography variant="button" gutterBottom sx={{ pt: 2, pb: 2, textAlign: 'left', fontWeight: 600 }} >
                        Username:
                    </Typography >
                    {row.username}
                </TableCell>

            </TableRow >
            {/*Per ogni identita' */}
            {Object.keys(row).map((key, index) => (
                <TableRow key={index} sx={{ border: 0 }}>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                        <Collapse in={open} timeout="auto" unmountOnExit>

                            <TableCell sx={{ borderBottom: "none" }}>
                                <Typography variant="button" gutterBottom sx={{ pt: 2, pb: 2, textAlign: 'left', fontWeight: "bold" }} >
                                    {key}
                                </Typography >
                            </TableCell>
                            <TableCell sx={{ borderBottom: "none" }}>
                                {row[key] != null ? (row[key]).toString() : key === 'password' ? '****' : 'Not Defined'}
                            </TableCell>


                        </Collapse>
                    </TableCell>
                </TableRow>
            ))}
        </React.Fragment>
    );
}



export function CollapsibleTable(data) {
    return (
        <div>
            {/*Per ogni identita' */}
            {data.record.identities.map((key) => (
                key.authority != 'internal' &&
                <TableContainer component={Paper}>
                    <Table aria-label="collapsible table">
                        <TableBody >
                            {/*Diamo in posto un'identita' a RowAccount */}
                            <RowAccount record={key} key={key.account.uuid} row={key.account} />
                        </TableBody>
                    </Table>
                </TableContainer>


            ))}
        </div>
    );
}

export default CollapsibleTable;