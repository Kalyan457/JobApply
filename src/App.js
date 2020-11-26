import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import CandidateHome from './containers/CandidateHome';
import Recruiterhome from './containers/RecruiterHome';
import SavedApplications from './containers/SavedApplications';
import TrackApplications from './containers/TrackApplications';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LoginForm from './containers/LoginForm';
import RegisterForm from './containers/RegisterForm';
import CandidateProfile from './containers/CandidateProfile';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <BrowserRouter>
            <Switch>
              <Route path='/savedapplications' component={SavedApplications} exact />
              <Route path='/trackapplications' component={TrackApplications} exact />
              <Route path='/home' component={CandidateHome} exact />
              <Route path='/recruiterhome' component={Recruiterhome} exact />
              <Route path='/register' component={RegisterForm} exact />
              <Route path='/login' component={LoginForm} exact />
              <Route path='/profile' component={CandidateProfile} exact />
              <Route />
            </Switch>
          </BrowserRouter>
        </Layout>        
      </div>
    );
  }
}

export default App;
