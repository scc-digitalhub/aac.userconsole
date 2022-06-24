import * as React from "react";
import { Admin, Resource, EditGuesser } from 'react-admin';
import { List, Datagrid } from "react-admin";
import { Show, SimpleShowLayout } from "react-admin";
import {  TextField,  RichTextField } from "react-admin";
import { Container} from '@mui/material';
import { fetchUtils } from 'react-admin'
import radataprovider from "./dataprovider";
import raauthprovider from "./authProvider";
import { defaultTheme } from 'react-admin';
import MyLayout from './layout'
import { AccountList} from "./accounts";
import { ProfileShow} from "./profile";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import HubIcon from '@mui/icons-material/Hub';
import { ConnectionList} from "./connections";
import dashboard from "./dashboard";

function fetchJson(url, options = {}) {
  if (!options.headers) {
    options.headers = new Headers({ Accept: 'application/json' })
  }

  options.credentials = 'include'

  return fetchUtils.fetchJson(url, options)
}

const dataProvider = radataprovider('http://localhost:8080/console/user', fetchJson);
const authProvider = raauthprovider('http://localhost:8080/console/user', fetchJson);


const myTheme = {
  ...defaultTheme,
  palette: {
    primary: {
      main: '#0066cc',
      dark: '#00478e',
      light: '#3384d6'
    },
    secondary: {
      main: '#b2b2b2',
      dark: '#7c7c7c',
      light: '#c1c1c1'
    },
  },
  typography: {
    fontFamily: ['"Titillium Web"', 'Geneva', 'Tahoma', 'sans-serif'].join(','),
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 700,
    },
    // Use the system font instead of the default Roboto font.
    // fontFamily: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Arial', 'sans-serif'].join(','),
  },
  components: {
    // Name of the component
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          fontWeight: 700,
          fontSize: '.92rem',
        },
      },
    },
  },
};




export const ScopeList = () => (
  <List>
    <Datagrid rowClick="show">
      <TextField source="scope" />
      <TextField source="name" />
      <TextField source="description" />
      <TextField source="id" />
    </Datagrid>
  </List>
);

export const ScopeShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="scope" />
      <TextField source="name" />
      <RichTextField source="description" />
      <TextField label="ResourceId" source="resourceId" />
    </SimpleShowLayout>
  </Show>
);

const App = () => (
  <Container maxWidth="xl">
    <Admin title="AAC" disableTelemetry authProvider={authProvider} dataProvider={dataProvider} theme={myTheme} dashboard={dashboard} layout={MyLayout}>
      <Resource name="accounts" list={AccountList} icon={ManageAccountsIcon}/>
      <Resource name="connections" list={ConnectionList} icon={HubIcon}/>
      <Resource name="profile" show={ProfileShow} edit={EditGuesser}/>

    </Admin>
  </Container>
);
export default App;
