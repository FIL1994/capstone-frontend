import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Redirect, Link } from "react-router-dom";

import RMS from "./assets/RMS_No_Slogan.png";

import Home from "./pages/Home";
import Customer from "./pages/Customer";
import Employee from "./pages/Employee";
import Job from "./pages/Job";
import CreateCustomer from "./pages/Customer/CreateCustomer";
import CreateEmployee from "./pages/Employee/CreateEmployee";
import CreateJob from "./pages/Job/CreateJob";
import EditCustomer from "./pages/Customer/EditCustomer";
import EditEmployee from "./pages/Employee/EditEmployee";
import EditJob from "./pages/Job/EditJob";
import CustomerDetails from "./pages/Customer/CustomerDetails";
import EmployeeDetails from "./pages/Employee/EmployeeDetails";
import JobDetails from "./pages/Job/JobDetails";

import "react-select/dist/react-select.css";
import "react-virtualized/styles.css";
import "react-virtualized-select/styles.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div id="site" className="site">
          <Link to="/">
            <img
              src={RMS}
              alt="RMS"
              style={{ height: 100, position: "absolute", left: 5, top: 5 }}
            />
          </Link>
          <div className="site-content">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/customer/create" component={CreateCustomer} />
              <Route path="/customer/edit/:id" component={EditCustomer} />
              <Route path="/customer/:id" component={CustomerDetails} />
              <Route path="/customer" component={Customer} />

              <Route path="/employee/create" component={CreateEmployee} />
              <Route path="/employee/edit/:id" component={EditEmployee} />
              <Route path="/employee/:id" component={EmployeeDetails} />
              <Route path="/employee" component={Employee} />

              <Route path="/job/create" component={CreateJob} />
              <Route path="/job/edit/:id" component={EditJob} />
              <Route path="/job/:id" component={JobDetails} />
              <Route path="/job" component={Job} />
              <Redirect to="/" />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
