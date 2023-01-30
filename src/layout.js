import * as React from "react";
import {
  AppBar,
  Layout,
  usePermissions,
  useTranslate,
} from "react-admin";
import MenuItem from "@mui/material/MenuItem";
import {  Box, Grid, Typography, Button } from "@mui/material";
import Menu from '@mui/material/Menu';
import { useNavigate  } from "react-router-dom";
import StarIcon from '@mui/icons-material/Star';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const MyAppBar = (props) => {
  const translate = useTranslate();
  return (
    <AppBar {...props} color="primary">
      <Box flex="1">
        <Grid container spacing={0}>
          <Grid item xs={1}>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                // letterSpacing: '.3rem',
                color: "inherit",
                textDecoration: "none",
              }}
            >
              {translate("AAC")}
            </Typography>
          </Grid>
          <Grid item xs={9}></Grid>
          <Grid item xs={1}><DevConsoleButton /></Grid>
          <Grid item xs={1}><AdminConsoleButton /></Grid>
        </Grid>
      </Box>
    </AppBar>
  );
};

export const DevConsoleButton = (props) => {
  const { permissions } = usePermissions();
  const translate = useTranslate();
  let navigate = useNavigate ();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleGoto = (realm) => {
    const url = 'realm/dashboard?realmId=' + realm;
    setAnchorEl(null);
    navigate(url);
  };
  if (!permissions) {
    return undefined;
  }
  const permission = permissions.find((i) => i.authority === "ROLE_DEVELOPER");
  const setPermissionDev = new Set(permissions.filter((i) => !!i.role && (i.role === "ROLE_DEVELOPER" || i.role === "ROLE_ADMIN")).map((i)=>  i.realm));
  const arrayPermDev = Array.from(setPermissionDev);
  if (!permission) {
    return <span></span>;
  }
  return (
    <Box>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{color: 'white'}}
        startIcon={<StarIcon />}
      >
        {translate("developer")}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {arrayPermDev.map((realm)=><MenuItem key={realm} onClick={()=>handleGoto(realm)}>{realm}</MenuItem>)}
      </Menu>
    </Box>
    )
};

export const AdminConsoleButton = (props) => {
  const { permissions } = usePermissions();
  const translate = useTranslate();
  let navigate = useNavigate ();
  if (!permissions) {
    return undefined;
  }
  const permission = permissions.find((i) => i.authority === "ROLE_ADMIN");
  if (!permission) {
    return <span></span>;
  }

  const handleClick = (event) => {
    navigate('/admin');
  };

  return (      
  <Button
    id="admin-button"
    onClick={handleClick}
    sx={{color: 'white'}}
    startIcon={<AdminPanelSettingsIcon />}
  >
    {translate("admin")}
  </Button>);
};

const MyLayout = (props) => <Layout {...props} appBar={MyAppBar} />;

export default MyLayout;
