import React, { useContext } from "react";

import { useNavigate } from "react-router-dom";

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import GitHubIcon from "@mui/icons-material/GitHub";
import Link from "@mui/material/Link";

import logoImage from "./logo.png";

import { AuthContext } from "../contexts/authContext";
import SideBar from "./sidebar";

const classes = {
  root: {},
  title: {
    textAlign: "center",
  },
  hero: {
    width: "100%",
    background: "rgb(220,220,220)",
  },
};

export default function Home() {
  const navigate = useNavigate();

  const auth = useContext(AuthContext);

  function signOutClicked() {
    auth.signOut();
    navigate("/");
  }

  function changePasswordClicked() {
    navigate("changepassword");
  }

  return (
    <Grid container>
      <Grid
        sx={classes.root}
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Box sx={classes.hero} p={4}>
          <Grid
            sx={classes.root}
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Box m={2}>
              <img src={logoImage} width={224} height={224} alt="logo" />
            </Box>
            <Box m={2}>
              <Link
                underline="none"
                color="inherit"
                href="https://github.com/dbroadhurst/aws-cognito-react"
              >
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Box mr={3}>
                    <GitHubIcon fontSize="large" />
                  </Box>
                  <Typography sx={classes.title} variant="h3">
                    AWS Cognito Starter Home
                  </Typography>
                </Grid>
              </Link>
            </Box>
            <Box m={2}>
              <Button
                onClick={signOutClicked}
                variant="contained"
                color="primary"
              >
                Sign Out
              </Button>
            </Box>
            <Box m={2}>
              <Button
                onClick={changePasswordClicked}
                variant="contained"
                color="primary"
              >
                Change Password
              </Button>
            </Box>
          </Grid>
        </Box>
        <Box m={2}>
          <Typography variant="h5">Session Info</Typography>
          <pre
            style={{
              width: "80vw",
              overflow: "auto",
              overflowWrap: "break-word",
              fontSize: "16px",
            }}
          >
            {JSON.stringify(auth.sessionInfo, null, 2)}
          </pre>
        </Box>
        <Box m={2}>
          <Typography variant="h5">User Attributes</Typography>
          <pre
            style={{
              width: "80vw",
              overflow: "auto",
              overflowWrap: "break-word",
              fontSize: "16px",
            }}
          >
            {JSON.stringify(auth.attrInfo, null, 2)}
          </pre>
        </Box>
      </Grid>
    </Grid>
  );
}
