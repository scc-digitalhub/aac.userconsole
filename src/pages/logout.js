import * as React from "react";
import "./logout.css";
import { useState } from "react";
import {
  useLogin,
  useNotify,
  Notification,
  useTranslate,
  PasswordInput,
  TextInput,
  SimpleForm,
} from "react-admin";
import { Box, Grid, Typography, Card } from "@mui/material";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Link from "@mui/material/Link";

const LogoAndparams = (params) =>{
    return (<div></div>);
}

export const LogoutPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const translate = useTranslate();
  const login = useLogin();
  const notify = useNotify();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // will call authProvider.login({ email, password })
    login({ email, password }).catch(() => notify("Invalid email or password"));
  };

  return (
    <Box className="Box Center-element Margin-top">
      <SimpleForm onSubmit={handleSubmit} toolbar={<span></span>}>
        <Grid container>
          <Grid item xs={12}>
            <Typography className="BottomBox">
              {translate("login.sign_in")}
            </Typography>
          </Grid>

          <Typography>{translate("login.welcome")}</Typography>
          <Grid item xs={12}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label={translate("login.username")}
              name="email"
              autoComplete="email"
              autoFocus
            />
            <FormControl required fullWidth variant="outlined" sx={{ mt: 3 }}>
              <InputLabel
              htmlFor="outlined-adornment-password">
                {translate("login.password")}
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label={translate("login.password")}
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {translate("login.sign_in")}
            </Button>
            <Box className="Center-element  Margin-top">
              <Link href="#" variant="body2" className="Center-text">
                {translate("login.forgot_password")}
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} className="BottomBox Margin-top"></Grid>
        </Grid>
      </SimpleForm>
      <Grid container>
        <Grid item xs={12}>
          <Box className="Center-element Margin-top">
            <Button className="Full-width" variant="contained">
              {translate("login.google")}
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} className="Center-element Margin-top">
          <Box className="Center-element Margin-top">
            <Link className="Full-width" href="#" variant="body2">
              {translate("login.not_registered")}
            </Link>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
