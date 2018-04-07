import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Navbar from "components/Navbar";

import Login from "pages/Login";
import Home from "pages/Home";
import Customer from "pages/Customer";
import Employee from "pages/Employee";
import Job from "pages/Job";
import CreateCustomer from "pages/Customer/CreateCustomer";
import CreateEmployee from "pages/Employee/CreateEmployee";
import CreateJob from "pages/Job/CreateJob";
import EditCustomer from "pages/Customer/EditCustomer";
import EditEmployee from "pages/Employee/EditEmployee";
import EditJob from "pages/Job/EditJob";
import CustomerDetails from "pages/Customer/CustomerDetails";
import EmployeeDetails from "pages/Employee/EmployeeDetails";
import JobDetails from "pages/Job/JobDetails";

import Project from "pages/Project";
import CreateProject from "pages/Project/CreateProject";
import EditProject from "pages/Project/EditProject";
import ProjectDetails from "pages/Project/ProjectDetails";

import JobHours from "pages/JobHours";
import CreateJobHours from "pages/JobHours/CreateJobHours";
import EditJobHours from "pages/JobHours/EditJobHours";
import JobHoursDetails from "pages/JobHours/JobHoursDetails";

import Page_401 from "pages/401";

import { Provider } from "components/Context";
import withAuth from "components/withAuth";

import "react-select/dist/react-select.css";
import "react-virtualized/styles.css";
import "react-virtualized-select/styles.css";
import "./App.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Provider>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route>
              <div id="site" className="site">
                <Navbar />
                <div className="site-content">
                  <Switch>
                    <Route exact path="/home" component={withAuth(Home)} />
                    <Route
                      path="/customer/create"
                      component={withAuth(CreateCustomer)}
                    />
                    <Route
                      path="/customer/edit/:id"
                      component={withAuth(EditCustomer)}
                    />
                    <Route
                      path="/customer/:id"
                      component={withAuth(CustomerDetails)}
                    />
                    <Route path="/customer" component={withAuth(Customer)} />

                    <Route
                      path="/employee/create"
                      component={withAuth(CreateEmployee)}
                    />
                    <Route
                      path="/employee/edit/:id"
                      component={withAuth(EditEmployee)}
                    />
                    <Route
                      path="/employee/:id"
                      component={withAuth(EmployeeDetails)}
                    />
                    <Route path="/employee" component={withAuth(Employee)} />

                    <Route
                      path="/project/create"
                      component={withAuth(CreateProject)}
                    />
                    <Route
                      path="/project/edit/:id"
                      component={withAuth(EditProject)}
                    />
                    <Route
                      path="/project/:id"
                      component={withAuth(ProjectDetails)}
                    />
                    <Route path="/project" component={withAuth(Project)} />

                    <Route path="/job/create" component={withAuth(CreateJob)} />
                    <Route path="/job/edit/:id" component={withAuth(EditJob)} />
                    <Route path="/job/:id" component={withAuth(JobDetails)} />
                    <Route path="/job" component={withAuth(Job)} />

                    <Route
                      path="/jobhours/create"
                      component={withAuth(CreateJobHours)}
                    />
                    <Route
                      path="/jobhours/edit/:id"
                      component={withAuth(EditJobHours)}
                    />
                    <Route
                      path="/jobhours/:id"
                      component={withAuth(JobHoursDetails)}
                    />
                    <Route path="/jobhours" component={withAuth(JobHours)} />

                    <Route path="/401" component={Page_401} />

                    <Redirect to="/" />
                  </Switch>
                </div>
              </div>
            </Route>
          </Switch>
        </Provider>
      </BrowserRouter>
    );
  }
}

export default App;
