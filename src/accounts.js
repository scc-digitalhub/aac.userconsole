import * as React from "react";
import { Admin, Resource, ListGuesser, useRecordContext, useResourceContext, useGetResourceLabel } from 'react-admin';
import { List, Datagrid, SingleFieldList, SimpleList } from "react-admin";
import { Show, SimpleShowLayout } from "react-admin";

import { ArrayField, TextField, ChipField, RichTextField, ReferenceField, ReferenceArrayField } from "react-admin";
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material'

import PersonIcon from '@mui/icons-material/Person';
import { StackList } from "./stackList";
import GridList from './gridList';


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


export const AccountList = () => (
    <Box component="div">
        <AccountsTitle />
        <List component="div" pagination={false} actions={false}>
            <GridList cols={4}
                title={record => record.username}
                subtitle={record => record.authority}
                icon={<PersonIcon />}
                primaryText={
                    record =>
                        <Box component="div">
                            <Typography variant="button" component="div" gutterBottom>
                                {record.id}
                            </Typography>


                            <Typography variant="subtitle1" gutterBottom >
                                {record.authority}
                            </Typography>

                            <Typography variant="overline" gutterBottom >
                                {record.id}
                            </Typography>
                            <pre>
                                {JSON.stringify(record.account, null, 4)}
                            </pre>
                        </Box>
                }
            />
        </List >
    </Box>
    //         {/* <SimpleList
    //             primaryText={
    //                 record =>
    //                     <Box component="div">
    //                         <Typography variant="button" component="div" gutterBottom>
    //                             {record.id}
    //                         </Typography>


    //                         <Typography variant="subtitle1" gutterBottom >
    //                             {record.authority}
    //                         </Typography>

    //                         <Typography variant="overline" gutterBottom >
    //                             {record.id}
    //                         </Typography>
    //                     </Box>
    //             }
    //             tertiaryText={record => "actions"}
    //             leftIcon={record => <PersonIcon />}

    //         >

    //         </SimpleList> */}
    // {/* <Datagrid rowClick="edit">
    //             <TextField source="authority" />
    //             <TextField source="realm" />
    //             <TextField source="provider" />
    //             <TextField source="id" />
    //             <TextField source="principal" />
    //             <TextField source="account.authority" />
    //             <TextField source="attributes" />
    //             <TextField source="emailAddress" />
    //             <TextField source="subject" />
    //             <TextField source="type" />
    //             <TextField source="id" />
    //             <TextField source="uuid" />
    //             <TextField source="id" />
    //             <TextField source="urn" />
    //         </Datagrid> */}

);
