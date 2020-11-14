import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import CandidateHome from './containers/CandidateHome';
import SavedApplications from './containers/SavedApplications';
import TrackApplications from './containers/TrackApplications';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

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
              <Route />
            </Switch>
          </BrowserRouter>
        </Layout>        
      </div>
    );
  }
}

export default App;
