import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import LoginForm from './containers/LoginForm';
import RegisterForm from './containers/RegisterForm';
import CandidateHome from './containers/Candidate/CandidateHome';
import RecruiterHome from './containers/Recruiter/RecruiterHome';
import CandidateProfile from './containers/Candidate/CandidateProfile';
import SavedApplications from './containers/Candidate/SavedApplications';
import TrackApplications from './containers/Candidate/TrackApplications';
import JobDescription from './containers/Recruiter/JobDescription';
import EditJob from './containers/Recruiter/EditJob';
import PostNewJob from './containers/Recruiter/PostNewJob';
import RecruiterCart from './containers/Recruiter/RecruiterCart';
import ViewApplicants from './containers/Recruiter/ViewApplicants';
import ViewApplicantProfile from './containers/Recruiter/ViewApplicantProfile';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <BrowserRouter>
            <Switch>
              {/* <Route path='/' component={HomePage} exact /> */}
              <Route path='/' component={LoginForm} exact />
              <Route path='/register' component={RegisterForm} exact />
              <Route path='/candidatehome' component={CandidateHome} exact />
              <Route path='/recruiterhome' component={RecruiterHome} exact />
              <Route path="/profile" component={CandidateProfile} exact/>
              <Route path='/savedapplications' component={SavedApplications} exact />
              <Route path='/trackapplications' component={TrackApplications} exact />
              <Route path='/jobdescription' component={JobDescription} exact />
              <Route path='/editjob' component={EditJob} exact />
              <Route path='/postnewjob' component={PostNewJob} exact />
              <Route path='/recruitercart' component={RecruiterCart} exact />
              <Route path='/viewapplicants' component={ViewApplicants} exact />
              <Route path='/viewapplicantprofile' component={ViewApplicantProfile} exact />
              <Route />
            </Switch>
          </BrowserRouter>
        </Layout>        
      </div>
    );
  }
}

export default App;
