import * as React from "react";
import { useState } from "react";
import {
  useResourceContext,
  useGetResourceLabel,
  Button,
  useTranslate,
  Edit,
  EditButton,
  useEditContext,
  useDataProvider,
  useGetIdentity,
} from "react-admin";
import { List, SimpleForm,  TextInput } from "react-admin";
import { Box, Grid, Typography, Card } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import GridList from "../gridList";

const AccountsTitle = (props) => {
  const resource = useResourceContext(props);
  const getResourceLabel = useGetResourceLabel();
  const translate = useTranslate();
  return (
    <Typography variant="h4" gutterBottom sx={{ pt: 2, pb: 2 }}>
      {getResourceLabel(resource, 1)} {translate("account_page.informations")}
    </Typography>
  );
};

const UserProfile = (props) => {
  const { identity, isLoading, error } = useGetIdentity();
  let dataToLoad;
  let userId;
  const translate = useTranslate();
  if (isLoading) {
    return <div></div>;
  }
  const arr = identity["attributeSets"];
  if (arr[0]) {
    userId = arr[0]["userId"];
  }
  dataToLoad = arr.find((i) => i["attributesId"] === "aac.openid");
  if (!dataToLoad) {
    return <div></div>;
  }
  return (
    <Card sx={{ p: 2, mr: 100 }}>
      <Typography sx={{ mb: 2, fontWeight: "bold" }}>
        {translate("account_page.registered_user")}
      </Typography>
      <Typography sx={{ mb: 2 }}>{userId}</Typography>
      <Typography sx={{ mb: 2 }}>
        {translate("account_page.personal_info_reg")}
      </Typography>
      <Grid sx={{ mt: 6 }}>
        {dataToLoad.attributes.map((element) => (
          <Grid container>
            <Grid xs={6} sx={{ mb: 3 }}>
              <Typography sx={{ fontWeight: "bold" }}>
                {translate("account_page." + element.key)}
              </Typography>
            </Grid>
            <Grid xs={6} sx={{ mb: 3 }}>
              <Typography>{element.value}</Typography>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Card>
  );
};

const AccountDelete = (props) => {
  const { identity, isLoading, error } = useGetIdentity();
  const dataProvider = useDataProvider();
  const [showDialog, setShowDialog] = useState(false);
  const translate = useTranslate();
  if (isLoading) {
    return <div></div>;
  }
  const handleClick = () => {
    setShowDialog(true);
  };

  const handleCloseClick = () => {
    setShowDialog(false);
  };

  const handleSubmit = async (values) => {
    const objIdentity = identity["identities"].find(
      (i) => i["uuid"] !== undefined
    );
    const resource = "details";
    const params = { id: objIdentity["uuid"] };
    dataProvider.delete(resource, params).then(
      (res) => {
        //TODO log out
        //redirect to /

        console.log("Done");
      },
      (error) => {
        //show error
        console.log("Error: ", error);
      }
    );
    console.log("Logic to implement!");
  };

  return (
    <Box component="div" sx={{ mt: 2, mb: 2, mr: 100 }}>
      <Card sx={{ p: 2 }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ pt: 2, pb: 2, fontWeight: "bold" }}
        >
          {translate("account_page.delete_account")}
        </Typography>
        <Grid>
          <Grid>
            <Typography variant="h9" gutterBottom sx={{ pt: 2, pb: 2 }}>
              {translate("account_page.delete_account_info")}
            </Typography>
          </Grid>
          <Grid>
            <Button onClick={handleClick}>
              <Typography
                variant="h4"
                gutterBottom
                sx={{ pt: 2, pb: 2, color: "red" }}
              >
                {translate("account_page.delete")}
              </Typography>
            </Button>
          </Grid>
        </Grid>

        <Dialog fullWidth open={showDialog} onClose={handleCloseClick}>
          <Box sx={{ p: 3 }}>
            <Grid>
              <Grid>
                <Typography>
                  {translate("account_page.confirm_delete")}
                </Typography>
              </Grid>
              <Grid sx={{ mt: 4 }}>
                <Button onClick={handleSubmit}>
                  <Typography
                    variant="h4"
                    gutterBottom
                    sx={{ mr: 4, color: "red" }}
                  >
                    {translate("delete")}
                  </Typography>
                </Button>
                <Button onClick={handleCloseClick}>
                  <Typography variant="h4" gutterBottom>
                    {translate("cancel")}
                  </Typography>
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Dialog>
      </Card>
    </Box>
  );
};

export const AccountList = () => {
  const translate = useTranslate();
  return (
    <Box component="div">
      <AccountsTitle />
      <UserProfile />
      <AccountDelete />
      <Typography variant="h5" sx={{ fontWeight: "bold", mt: 8, mb: 3 }}>
        {translate("account_page.linked_accounts")}
      </Typography>
      <List component="div" pagination={false} actions={false}>
        <GridList
          key={(record)=>record.username}
          cols={6}
          title={(record) => {
            return record.username;
          }}
          subtitle={(record) => record.authority}
          icon={<PersonIcon />}
          primaryText={(record) => (
            <Box>
              <Grid container spacing={0}>
                <Grid item xs={6} sx={{ mt: 2 }}>
                  <Typography sx={{ fontWeight: "bold" }}>
                    {translate("account_page.zone_info")}
                  </Typography>
                </Grid>
                <Grid item xs={6} sx={{ mt: 2 }}>
                  <Typography>{record.zoneInfo}</Typography>
                </Grid>
                <Grid item xs={6} sx={{ mt: 2 }}>
                  <Typography sx={{ fontWeight: "bold" }}>
                    {translate("account_page.locale")}
                  </Typography>
                </Grid>
                <Grid item xs={6} sx={{ mt: 2 }}>
                  <Typography>{record.locale}</Typography>
                </Grid>
                <Grid item xs={6} sx={{ mt: 2 }}>
                  <Typography sx={{ fontWeight: "bold" }}>
                    {translate("account_page.name")}
                  </Typography>
                </Grid>
                <Grid item xs={6} sx={{ mt: 2 }}>
                  <Typography>{record.name}</Typography>
                </Grid>
                <Grid item xs={6} sx={{ mt: 2 }}>
                  <Typography sx={{ fontWeight: "bold" }}>
                    {translate("account_page.surname")}
                  </Typography>
                </Grid>
                <Grid item xs={6} sx={{ mt: 2 }}>
                  <Typography>{record.surname}</Typography>
                </Grid>
                <Grid item xs={6} sx={{ mt: 2 }}>
                  <Typography sx={{ fontWeight: "bold" }}>
                    {translate("account_page.username")}
                  </Typography>
                </Grid>
                <Grid item xs={6} sx={{ mt: 2 }}>
                  <Typography>{record.username}</Typography>
                </Grid>
                <Grid item xs={6} sx={{ mt: 2 }}>
                  <Typography sx={{ fontWeight: "bold" }}>
                    {translate("account_page.email")}
                  </Typography>
                </Grid>
                <Grid item xs={6} sx={{ mt: 2 }}>
                  <Typography>{record.email}</Typography>
                </Grid>
                <Grid item xs={6} sx={{ mt: 2 }}>
                  <Typography sx={{ fontWeight: "bold" }}>
                    {translate("account_page.email_verified")}
                  </Typography>
                </Grid>
                <Grid item xs={6} sx={{ mt: 2 }}>
                  <Typography>
                    {record.emailVerified
                      ? translate("account_page.verified")
                      : translate("account_page.not_verified")}
                  </Typography>
                </Grid>
              </Grid>
              <Box sx={{ mt: 2 }}>
                {record.authority === "password" ||
                record.authority === "internal" ? (
                  <EditButton />
                ) : null}
              </Box>
            </Box>
          )}
        />
      </List>
      {/* <Button component={Link} to="/profile">
        {translate("AccountsPage.Profile")}
      </Button> */}
    </Box>
  );
};

export const AccountEdit = () => {
  const translate = useTranslate();
  return (
    <Edit mutationMode="pessimistic">
      <SimpleForm>
        <FormAccountEdit />
        <TextInput source="name" />
        <TextInput source="surname" />
        <TextInput source="email" />
        {/* <TextInput source="lang" /> */}
      </SimpleForm>
    </Edit>
  );
};

export const FormAccountEdit = (props) => {
  const { record, isLoading } = useEditContext();
  const translate = useTranslate();
  if (isLoading) {
    return <div></div>;
  }
  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3 }}>
        {record["realm"]}
      </Typography>
      <Typography sx={{ mb: 2 }}>
        {translate("account_page.update_account")}
      </Typography>
    </Box>
  );
};
