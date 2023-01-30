import { BooleanField, Datagrid, List, ReferenceField, TextField, Show, SimpleShowLayout } from 'react-admin';

export const ScopeList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="scope" />
            <TextField source="name" />
            <TextField source="description" />
            <ReferenceField source="resourceId" reference="resources" />
            <TextField source="type" />
            <TextField source="audience" />
            <TextField source="id" />
            <BooleanField source="userScope" />
            <BooleanField source="clientScope" />
        </Datagrid>
    </List>
);


export const ScopeShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="scope" />
            <TextField source="name" />
            <TextField source="description" />
            <ReferenceField source="resourceId" reference="resources" />
            <TextField source="type" />
            <TextField source="audience" />
            <TextField source="id" />
            <BooleanField source="userScope" />
            <BooleanField source="clientScope" />
        </SimpleShowLayout>
    </Show>
);