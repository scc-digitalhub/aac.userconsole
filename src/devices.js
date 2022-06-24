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

export const DeviceList = () => (
    <div>
        Sei nella sezione DeviceList!
    </div>
);