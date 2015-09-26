import React from 'react';
import AuthenticatedView from './AuthenticatedView';
import { UI } from 'touchstonejs';
import PanelNextButton from '../components/ui/PanelNextButton';

import Employee from './components/Employee';
import Employer from './components/Employer';

import LoginStore from '../stores/LoginStore';
import EmployeeStore from '../stores/EmployeeStore';
import EmployerStore from '../stores/EmployerStore';

import ReactMixin from 'react-mixin';
import ModalMixin from '../mixins/ModalMixin';

class Home extends React.Component {

  componentWillMount(){
    this.state = {
      employee:EmployeeStore.employee,
      employer:EmployerStore.employer
    };
  }

  componentDidMount() {
    this.employeeChangeListener = this._onEmployeeChange.bind(this);
    this.employerChangeListener = this._onEmployerChange.bind(this);
    EmployeeStore.addChangeListener(this.employeeChangeListener);
    EmployerStore.addChangeListener(this.employerChangeListener);
  }

  _onEmployeeChange() {
    this.setState({employee:EmployeeStore.employee});
  }

  _onEmployerChange() {
    this.setState({employer:EmployerStore.employer});
  }

  componentWillUnmount() {
    EmployeeStore.removeChangeListener(this.employeeChangeListener);
    EmployerStore.removeChangeListener(this.employerChangeListener);
  }

  render() {

    const user = this.props.user;
    const avatarURL = user.fbPicture || user.gravatar + '?s=400&d=retro&r=g';
    const imgStyle = {
      display: 'block',
      margin: '40px auto',
      borderRadius: '50%',
      width: '200px',
      height: '200px'
    };
    const isUnregistered = !!user.employeeId === false && !!user.employerId === false;
    const isEmployee = !!user.employeeId && !!this.state.employee && user.employeeId.toString() === this.state.employee._id.toString();
    const isEmployer = !!user.employerId && !!this.state.employer && user.employerId.toString() === this.state.employer._id.toString();
    const hasCareer = isEmployee && this.state.employee.careers.length > 0;

    return (

      <UI.ViewContent grow scrollable>
        <div className="panel-header u-text-truncate text-xl">
            {this.props.user.name}
          </div>
          <img src={avatarURL} style={imgStyle}/>

          {
            isUnregistered &&
            <div>
              {
                user.userType === 'employee' &&
                <PanelNextButton nextPath="/employeeform" nextLabel="Add employee details" />
              }
              {
                user.userType === 'employer' &&
                <PanelNextButton nextPath="/employerform" nextLabel="Add employer details" />
              }
              {
                !!user.userType === false &&
                <div>
                  <PanelNextButton nextPath="/employeeform" nextLabel="I'm looking for Jobs" />
                  <PanelNextButton nextPath="/employerform" nextLabel="I'm looking for Part-Timers" />
                </div>
              }
            </div>
          }

          {
            isEmployee &&
            <div>
              <Employee employee={this.state.employee} isEmployee={isEmployee}/>
              <PanelNextButton nextPath="/careers" nextLabel={hasCareer ? "Change your career" : "Choose a career"} />
              <PanelNextButton nextPath="/jobsearch" nextLabel="Search for jobs" />
            </div>
          }

          {
            isEmployer &&
            <div>
              <Employer employer={this.state.employer}/>
              <PanelNextButton nextPath="/jobform" nextLabel="Post a job" />
              {
                this.state.employer.totalJobs && <PanelNextButton nextPath="/employerjobs" nextLabel="View your jobs" />
              }
              {
                this.state.employer.employees.length > 0 &&
                <PanelNextButton nextPath="/employeremployees" nextLabel="View your employees" />
              }
            </div>
          }
        </UI.ViewContent>
    );
  }
}

ReactMixin(Home.prototype, ModalMixin);

export default AuthenticatedView(Home);
