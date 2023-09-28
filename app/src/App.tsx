import React from "react";
import "./App.css";

import { HashRouter as Router, Route, Routes } from "react-router-dom";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";

import AuthProvider, {
  AuthIsSignedIn,
  AuthIsNotSignedIn,
} from "./contexts/authContext";

import SignIn from "./routes/auth/signIn";
import SignUp from "./routes/auth/signUp";
import VerifyCode from "./routes/auth/verify";
import RequestCode from "./routes/auth/requestCode";
import ForgotPassword from "./routes/auth/forgotPassword";
import ChangePassword from "./routes/auth/changePassword";
import Landing from "./routes/landing";
import Home from "./routes/home";
import Operations from "./routes/operations";
import SideBar from "./routes/sidebar";

const SignInRoute: React.FunctionComponent = () => (
  <Routes>
    <Route path="/signin" element={<SignIn />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/verify" element={<VerifyCode />} />
    <Route path="/requestcode" element={<RequestCode />} />
    <Route path="/forgotpassword" element={<ForgotPassword />} />
    <Route path="/" element={<Landing />} />
  </Routes>
);

const MainRoute: React.FunctionComponent = () => (
  <Routes>
    <Route path="/changepassword" element={<ChangePassword />} />
    <Route path="/" element={<Home />} />
    <Route path="/operations" element={<Operations />} />
  </Routes>
);

const App: React.FunctionComponent = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <AuthProvider>
      <AuthIsSignedIn>
        <SideBar></SideBar>
        <MainRoute />
      </AuthIsSignedIn>
      <AuthIsNotSignedIn>
        <SignInRoute />
      </AuthIsNotSignedIn>
    </AuthProvider>
  </ThemeProvider>
);

export default App;
