
import { List, ArrayField, SimpleList } from "react-admin";
import AppShortcutIcon from '@mui/icons-material/AppShortcut';

export const ConnectionList = () => (
    <List>
      <SimpleList
        primaryText={record => record.appName}
        secondaryText={record => record.realm}
        tertiaryText={
          // <ReferenceArrayField source="scopes" reference="scopes">
          //   <SingleFieldList>
          //     <TextField source="name" />
          //   </SingleFieldList>
          // </ReferenceArrayField>
          <ArrayField source="scopes">
            <SimpleList
              primaryText={record => record.name}
              secondaryText={record => record.description}
            />
          </ArrayField>
        }
        leftIcon={record => <AppShortcutIcon />}
      />
      {/* <Datagrid>
          <TextField source="id" />
          <ReferenceField source="subjectId" reference="subjects"><TextField source="id" /></ReferenceField>
          <ReferenceField source="clientId" reference="clients"><TextField source="id" /></ReferenceField>
          <TextField source="realm" />
          <TextField source="appName" />
          <ArrayField source="scopes"><SingleFieldList><ChipField source="scope" /></SingleFieldList></ArrayField>
        </Datagrid> */}
    </List>
  );