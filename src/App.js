import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import CandidateHome from './containers/CandidateHome';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <CandidateHome />
        </Layout>        
      </div>
    );
  }
}

export default App;
