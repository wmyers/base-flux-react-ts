import React from 'react';
import HashHistory from 'react-router/lib/HashHistory';
import { Router, Route, Redirect } from 'react-router';
import App from './views/App';
import Login from './views/Login';
import Shim from './views/RouterLoginShim';
import Signup from './views/Signup';
import Home from './views/Home';
import Settings from './views/Settings';

import EmployeeForm from './views/EmployeeForm';

import EmployerForm from './views/EmployerForm';

import EmployerJobList from './views/EmployerJobList';
import EmployerJob from './views/EmployerJob';

import EmployeeJobList from './views/EmployeeJobList';
import EmployeeJob from './views/EmployeeJob';
import EmployeeCareerProgress from './views/EmployeeCareerProgress';

import EmployerEmployeeList from './views/EmployerEmployeeList';
import EmployerEmployee from './views/EmployerEmployee';

import JobForm from './views/JobForm';
import JobSearch from './views/JobSearch';
import JobSearchJobList from './views/JobSearchJobList';
import JobSearchJob from './views/JobSearchJob';
import CareerJobList from './views/CareerJobList';
import CareerJobShortlist from './views/CareerJobShortlist';
import CareerJob from './views/CareerJob';
import CareerList from './views/CareerList';
import Career from './views/Career';
import LoggedInShim from './views/LoggedInShim'; //TODO does this have to be a React component?

React.render((
  <Router history={new HashHistory()}>
    <Route path="/" component={App} onEnter={App.onEnter}>
      <Route name="login" path="login" title="Login" component={Login} />
      <Route name="signup" path="signup" title="Sign up" component={Signup} />
      <Route name="loggedin" path="loggedin/:token" component={LoggedInShim} />

      <Route name="shim" path="shim" component={Shim} />
      <Route name="home" path="home" title="JobVaults" component={Home} onEnter={Home.onEnter} hideSubHeader/>
      <Route name="settings" path="settings" title="Settings" component={Settings} onEnter={Settings.onEnter}/>

      <Route name="employeeform" path="employeeform" title="Register Employee" component={EmployeeForm} onEnter={EmployeeForm.onEnter}/>
      <Route name="employerform" path="employerform" title="Register Employer" component={EmployerForm} onEnter={EmployerForm.onEnter}/>

      <Route name="jobform" path="jobform" title="Post Job" component={JobForm} onEnter={JobForm.onEnter}/>
      <Route name="jobformedit" path="jobform/:id"  title="Edit Job" component={JobForm} onEnter={JobForm.onEnter}/>
      <Route name="jobsearch" path="jobsearch" title="Search Jobs" component={JobSearch} onEnter={JobSearch.onEnter} nextPath="/jobsearchjobs"/>
      <Route name="jobsearchjoblist" path="jobsearchjobs" title="Search Job Results" component={JobSearchJobList} onEnter={JobSearchJobList.onEnter}/>
      <Route name="jobsearchjob" path="jobsearchjobs/:id" title="Job" component={JobSearchJob} onEnter={JobSearchJob.onEnter}/>

      <Route name="employerjoblist" path="employerjobs" title="Employer Posted Jobs" component={EmployerJobList} onEnter={EmployerJobList.onEnter}/>
      <Route name="employerjob" path="employerjobs/:id" title="Employer Posted Job" component={EmployerJob} onEnter={EmployerJob.onEnter}/>
      <Route name="employeremployeelist" path="employeremployees" title="Employees of Employer" component={EmployerEmployeeList} onEnter={EmployerEmployeeList.onEnter}/>
      <Route name="employeremployee" path="employeremployees/:id" title="Employee of Employer" component={EmployerEmployee} onEnter={EmployerEmployee.onEnter}/>

      <Route name="employeejoblist" path="employeejobs" title="Employee Jobs Applied For" component={EmployeeJobList} onEnter={EmployeeJobList.onEnter}/>
      <Route name="employeejob" path="employeejobs/:id" title="Employee Job Applied For" component={EmployeeJob} onEnter={EmployeeJob.onEnter}/>
      <Route name="employeecareerprogress" path="careerprogress" title="Employee Career Progress" component={EmployeeCareerProgress} onEnter={EmployeeCareerProgress.onEnter}/>

      <Route name="careerjoblist" path="careerjobs" title="Career Jobs" component={CareerJobList} onEnter={CareerJobList.onEnter}/>
      <Route name="careerjobshortlist" path="careerjobs/:filter/:id" title="Career Jobs" component={CareerJobShortlist} onEnter={CareerJobShortlist.onEnter}/>
      <Route name="careerjob" path="careerjobs/:filter/:id/:shortid" title="Career Job" component={CareerJob} onEnter={CareerJob.onEnter}/>

      <Route name="careerlist" path="careers"  title="Careers" component={CareerList} onEnter={CareerList.onEnter}/>
      <Route name="career" path="career/:id" title="Career Skills" component={Career} onEnter={Career.onEnter}/>
    </Route>
  </Router>
), document.getElementById('app'));
