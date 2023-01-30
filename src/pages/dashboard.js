import * as React from "react";
import { Link } from 'react-router-dom';
import { useGetIdentity, useTranslate } from "react-admin";
import LinearProgress from "@mui/material/LinearProgress";
import { Card, CardContent, CardActions, CardHeader } from "@mui/material";
import {
  Container,
  Grid,
  Typography,
  Button,
  Avatar,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import AppShortcutIcon from "@mui/icons-material/AppShortcut";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

const Dashboard = () => {
  const { identity, isLoading } = useGetIdentity();
  const translate = useTranslate();
  if (isLoading === true) {
    return <LinearProgress />;
  }
  return (
    <Container maxWidth="lg">
      <Typography
        variant="h4"
        gutterBottom
        sx={{ pt: 2, pb: 2, textAlign: "center" }}
      >
        {translate('Welcome')}, {identity.fullName}
      </Typography>
      {!!identity.emailAddress && (
        <Typography
          variant="h6"
          gutterBottom
          sx={{ pt: 0, pb: 2, textAlign: "center" }}
        >
          {identity.emailAddress}
        </Typography>
      )}
      <Typography sx={{ pb: 2, textAlign: "center" }}>
          {translate('dashboard.personal_information')}
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6} zeroMinWidth>
          <Card sx={{ height: "100%" }}>
            <CardHeader
              title={translate("dashboard.accounts")}
              avatar={<AccountBoxIcon color="primary-dark" />}
              titleTypographyProps={{ variant: "h6" }}
            />
            <CardContent> {translate('dashboard.review_manage')}</CardContent>
            <CardActions>
              <Button component={Link} to="/accounts"> {translate('dashboard.manage_accounts')}</Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} zeroMinWidth>
          <Card sx={{ height: "100%" }}>
            <CardHeader
              title={translate("dashboard.credentials")}
              avatar={
                <Avatar sx={{ bgcolor: "red" }}>
                  <PersonIcon />
                </Avatar>
              }
              titleTypographyProps={{ variant: "h6" }}
            />
            <CardContent> {translate('dashboard.view_update')}</CardContent>
            <CardActions>
              <Button component={Link} to="/credentials"> {translate('dashboard.credentials')}</Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} zeroMinWidth>
          <Card sx={{ height: "100%" }}>
            <CardHeader
              title={translate("dashboard.third_party")}
              avatar={
                <Avatar sx={{ width: 56, height: 56, bgColor: "primary" }}>
                  <AppShortcutIcon />
                </Avatar>
              }
              titleTypographyProps={{ variant: "h6" }}
            />
            <CardContent>
            {translate('dashboard.view_and')}
            </CardContent>
            <CardActions>
              <Button component={Link} to="/connections" size="small"> {translate('dashboard.manage_connections')}</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
