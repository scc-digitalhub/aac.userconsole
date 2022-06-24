import * as React from "react";
import { 
    List,
    // Datagrid,
    TextField,
    // ReferenceField,
    // EditButton,
    Edit,
    // SimpleList,
    SimpleForm,
    // ReferenceInput,
    // SelectInput,
    TextInput,
    // Create,
    SimpleShowLayout,
    Show,
    // DeleteButton,
    // useRedirect,
    // ListButton,
    // Button,
    useRecordContext,
    useGetIdentity,
    LinearProgress
    
} from 'react-admin';
    import Table from '@mui/material/Table';
    import TableBody from '@mui/material/TableBody';
    import TableCell from '@mui/material/TableCell';
    import TableContainer from '@mui/material/TableContainer';
    import TableHead from '@mui/material/TableHead';
    import TableRow from '@mui/material/TableRow';
    import Paper from '@mui/material/Paper';
    import Typography from '@mui/material/Typography';
    import { Box } from '@mui/material'

import PersonIcon from '@mui/icons-material/Person';
import { StackList } from "./stackList";
import GridList from './gridList';
// import { useMediaQuery } from '@mui/material';
// import ArrowBack from '@material-ui/icons/ArrowBack';

function BooleanToString(props) {
    return props.toString();
}


export function ProfileShow () {
    const { identity, isLoading } = useGetIdentity();
    if (isLoading === true) {
        return <LinearProgress />;
    }

    let profile = false;
    if (identity && !isLoading){
        profile = identity.attributeSets.find((item) => ( item.identifier === "aac.openid"));
    }


    return (
        <Box sx={{ pt: 2}}>
            {profile && 
                <TableContainer component={Paper}>
                    <Table size="small" aria-label="a dense table">
                        <TableBody>
                        {profile.attributes.map((row) => (
                            <TableRow
                            key={row.key}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row">
                                {row.key}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {row.value && String(row.value)}{!row.value && "None"}
                            </TableCell>
                            
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            }
            </Box>
            );
    


}
