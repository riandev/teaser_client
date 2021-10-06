import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./components/Login/Login";
import { createContext } from "react";
import { useState } from "react";
import Home from "./components/Home/Home";
import Dashboard from "./components/Dashboard/Dashboard";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Reports from "./components/Reports/Reports";
import Qc from "./components/Qc/Qc";
import AdminDashboard from "./components/Admin/AdminDashboard/AdminDashboard";
import PrivateRouteAdmin from "./components/Admin/PrivateRouteAdmin/PrivateRouteAdmin";
import AdminLogin from "./components/Admin/AdminLogin/AdminLogin";
import AdminSignUp from "./components/Admin/AdminSignUp/AdminSignUp";

export const userContext = createContext();
export const adminContext = createContext();
export const timeContext = createContext();
export const dateContext = createContext();

function App() {
  const [loginInfo, setLoginInfo] = useState([]);
  const [adminInfo, setAdminInfo] = useState([]);
  const [loginDate, setLoginDate] = useState("");
  const [loginTime, setLoginTime] = useState("");

  return (
    <adminContext.Provider value={[adminInfo, setAdminInfo]}>
      <userContext.Provider value={[loginInfo, setLoginInfo]}>
        <timeContext.Provider value={[loginTime, setLoginTime]}>
          <dateContext.Provider value={[loginDate, setLoginDate]}>
            <Router>
              <Switch>
                <Route exact path="/">
                  <Home></Home>
                </Route>
                <PrivateRoute exact path="/dashboard">
                  <Dashboard></Dashboard>
                </PrivateRoute>
                <PrivateRouteAdmin exact path="/admin/cep">
                  <AdminDashboard></AdminDashboard>
                </PrivateRouteAdmin>
                <Route exact path="/admin/uploadLead">
                  <AdminDashboard></AdminDashboard>
                </Route>
                <Route exact path="/admin/export">
                  <AdminDashboard></AdminDashboard>
                </Route>
                <Route exact path="/admin/delete">
                  <AdminDashboard></AdminDashboard>
                </Route>
                <Route exact path="/admin/addLead">
                  <AdminDashboard></AdminDashboard>
                </Route>
                <Route exact path="/admin/generateReport">
                  <AdminDashboard></AdminDashboard>
                </Route>
                <Route exact path="/admin/downloadReport">
                  <AdminDashboard></AdminDashboard>
                </Route>
                <Route exact path="/login">
                  <Login></Login>
                </Route>
                <Route exact path="/admin/login">
                  <AdminLogin></AdminLogin>
                </Route>
                <Route exact path="/admin/signup">
                  <AdminSignUp></AdminSignUp>
                </Route>
                <Route exact path="/dashboard/crm">
                  <Dashboard></Dashboard>
                </Route>
                <Route exact path="/admin/cep">
                  <AdminDashboard></AdminDashboard>
                </Route>
                <Route exact path="/dashboard/report">
                  <Reports></Reports>
                </Route>
                <Route exact path="/dashboard/qc">
                  <Qc></Qc>
                </Route>
              </Switch>
            </Router>
          </dateContext.Provider>
        </timeContext.Provider>
      </userContext.Provider>
    </adminContext.Provider>
  );
}

export default App;
