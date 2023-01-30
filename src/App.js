import * as React from "react";
import { Admin, Resource, useTranslate, EditGuesser, ShowGuesser } from "react-admin";
import { List, Datagrid,  } from "react-admin";
import { Show, SimpleShowLayout } from "react-admin";

import {
  TextField,
  RichTextField,
} from "react-admin";


import { fetchUtils } from "react-admin";
import radataprovider from "./dataprovider";
import raauthprovider from "./authProvider";

import { defaultTheme } from "react-admin";
import MyLayout from "./layout";
import { AccountEdit, AccountList } from "./pages/accounts";
import { ConnectionList } from "./pages/connections";
import i18nProvider from './i18nProvider';

import dashboard from "./pages/dashboard";
import GroupIcon from '@mui/icons-material/Group';
import CableIcon from '@mui/icons-material/Cable';
import CenterFocusWeakIcon from '@mui/icons-material/CenterFocusWeak';
import { LogoutPage } from "./pages/logout";
import { CredentialList, CredentialsEdit } from "./pages/credentials";

function fetchJson(url, options = {}) {
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" });
  }

  options.credentials = "include";

  return fetchUtils.fetchJson(url, options);
}

const dataProvider = radataprovider(
  "http://localhost:8080/console/user",
  fetchJson
);
const authProvider = raauthprovider(
  "http://localhost:8080/console/user",
  fetchJson
);

const myTheme = {
  ...defaultTheme,
  palette: {
    primary: {
      main: "#0066cc",
      dark: "#00478e",
      light: "#3384d6",
    },
    secondary: {
      main: "#b2b2b2",
      dark: "#7c7c7c",
      light: "#c1c1c1",
    },
  },
  typography: {
    fontFamily: ['"Titillium Web"', "Geneva", "Tahoma", "sans-serif"].join(","),
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
          fontSize: ".92rem",
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
      {/* <ReferenceField source="resourceId" reference="resources"><TextField source="id" /></ReferenceField> */}
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

const App = () => {
  const translate = useTranslate();
  return <Admin
    title='ACC'
    disableTelemetry
    authProvider={authProvider}
    dataProvider={dataProvider}
    i18nProvider={i18nProvider}
    loginPage={LogoutPage}
    theme={myTheme}
    dashboard={dashboard}
    layout={MyLayout}
  >
    <Resource name='accounts' icon={GroupIcon} list={AccountList} edit={AccountEdit} />
    <Resource name='credentials' icon={GroupIcon} list={CredentialList} edit={CredentialsEdit}/>
    <Resource name='scopes' icon={CenterFocusWeakIcon} list={ScopeList} show={ScopeShow}/>
    <Resource name='connections' icon={CableIcon} list={ConnectionList} show={ShowGuesser} edit={EditGuesser}/>
    <Resource name='details'/>
    <Resource name='logout' show={LogoutPage}/>

  </Admin>
};
export default App;
