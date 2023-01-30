import {
  useTranslate,
  Edit,
  EditButton,
  List,
  PasswordInput,
  // required,
  SaveButton,
  Toolbar,
  useEditContext,
} from "react-admin";
import { SimpleForm } from "react-admin";
import { Box, Typography } from "@mui/material";
import GridList from "../gridList";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

export const CredentialList = () => {
  const translate = useTranslate();
  return (
    <Box sx={{ mt: 4 }}>
      <List component="div" pagination={false} actions={false}>
        <GridList
          primaryText={(record) => {
            return (
              <Box>
                {" "}
                <Typography variant="h4" gutterBottom sx={{ pt: 2, pb: 2 }}>
                  {translate("edit_password.password")}
                </Typography>
                <Typography variant="h5">{record.username} </Typography>
                <Typography>{record.uuid} </Typography>
                <EditButton />
              </Box>
            );
          }}
        ></GridList>
      </List>
    </Box>
  );
};

const CustomToolbar = (props) => (
  <Toolbar {...props} sx={{ display: "flex", justifyContent: "space-between" }}>
    <SaveButton
      transform={(data) => {
        delete data.policy;
        return data;
      }}
      type="button"
    />
  </Toolbar>
);

export const CredentialsEdit = (props) => {
  const translate = useTranslate();
  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ pt: 2, pb: 2 }}>
        {translate("edit_password.change_password")}
      </Typography>
      <Typography>
        {translate("edit_password.replace_current")}
      </Typography>
      <Edit mutationMode="pessimistic">
        <CredentialsEditForm />
      </Edit>
    </Box>
  );
};

export const CredentialsEditForm = (props) => {
  const { record, isLoading } = useEditContext();
  const translate = useTranslate();
  if (isLoading) {
    return null;
  }
  const passwordPolicy = record["policy"];

  const formSchema = Yup.object().shape({
    curPassword: Yup.string()
      .required(translate("error.invalid_password.empty"))
      .nullable(translate("error.invalid_password.empty")),
    password: Yup.string()
      .required(translate("error.invalid_password.empty"))
      .nullable(translate("error.invalid_password.empty"))
      .min(
        passwordPolicy["passwordMinLength"],
        translate("error.invalid_password.min_length")
      )
      .max(
        passwordPolicy["passwordMaxLength"],
        translate("error.invalid_password.max_length")
      )
      .matches(
        passwordPolicy["passwordRequireAlpha"] ? /^.*[a-z]+.*$/i : undefined,
        translate("error.invalid_password.require_alpha")
      )
      .matches(
        passwordPolicy["passwordRequireNumber"] ? /^.*[0-9]+.*$/i : undefined,
        translate("error.invalid_password.require_number")
      )
      .matches(
        passwordPolicy["passwordRequireSpecial"]
          ? /(?=.*?[#?!@$%^&*-])/
          : undefined,
        translate("error.invalid_password.require_special")
      )
      .matches(
        passwordPolicy["passwordRequireUppercaseAlpha"]
          ? /^.*[A-Z]+.*$/
          : undefined,
        translate("error.invalid_password.require_uppercase_alpha")
      )
      .matches(
        !passwordPolicy["passwordSupportWhitespace"] ? undefined : /^.*\s+.*$/,
        translate("error.invalid_password.contains_whitespace")
      ),
    verifyPassword: Yup.string()
      .required(translate("error.invalid_password.empty"))
      .nullable(translate("error.invalid_password.empty"))
      .oneOf(
        [Yup.ref("password")],
        translate("error.invalid_password.not_match")
      ),
  });

  return (
    <SimpleForm toolbar={<CustomToolbar />} resolver={yupResolver(formSchema)}>
      <Typography variant="h5" sx={{mb: 3}}>{record.username} </Typography>
      <Box>
        <Typography>{translate("edit_password.policy")}</Typography>
        <ul>
          <li>
            {translate("edit_password.length")}{" "}
            {passwordPolicy["passwordMinLength"]} -{" "}
            {passwordPolicy["passwordMaxLength"]}
          </li>
          {passwordPolicy["passwordRequireAlpha"] ? (
            <li>{translate("edit_password.alpha_requirement")}</li>
          ) : undefined}
          {passwordPolicy["passwordRequireNumeric"] ? (
            <li>{translate("edit_password.numeric_requirement")}</li>
          ) : undefined}
          {passwordPolicy["passwordRequireSpecial"] ? (
            <li>{translate("edit_password.special_requirement")}</li>
          ) : undefined}
          {passwordPolicy["passwordRequireUppercaseAlpha"] ? (
            <li>{translate("edit_password.uppercase_requirement")}</li>
          ) : undefined}
        </ul>
      </Box>
      <PasswordInput
        required
        label={translate("edit_password.current_password")}
        source="curPassword"
        sx={{ mb: 3 }}
      />
      <PasswordInput
        required
        label={translate("edit_password.password")}
        source="password"
        sx={{ mb: 3 }}
      />
      <PasswordInput
        required
        label={translate("edit_password.verify_password")}
        source="verifyPassword"
        sx={{ mb: 3 }}
      />
    </SimpleForm>
  );
};
