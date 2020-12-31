import React from 'react';
import classes from './MainHeader.css';
import logo from '../images/JA-logo.png';
import {Navbar, Nav, Button, Dropdown, ButtonGroup, Badge} from 'react-bootstrap';

class CandidateHeader extends React.Component {
    render() {
      return (
        <Nav className="mr-auto">
            <Nav.Link href="/candidatehome">All Jobs</Nav.Link>
            <Nav.Link href="/trackapplications">Applied Jobs</Nav.Link>
            <Nav.Link href="/savedapplications">Saved Jobs</Nav.Link>
        </Nav>
      );
    }
}

class RecruiterHeader extends React.Component {
    render() {
      return (
        <Nav className="mr-auto">
            <Nav.Link href="/recruiterhome">View All Jobs</Nav.Link>
            <Nav.Link href="/postnewjob">Post A New Job</Nav.Link>
            <Nav.Link href="/viewapplicants">View All Applicants</Nav.Link>
        </Nav>
      );
    }
} 

class CandidateMenu extends React.Component {
  handleSignOut = () =>{
    console.log("here in signout candidate");
    sessionStorage.clear();
  }
    render() {
      return (
        <Dropdown.Menu>
            <Dropdown.Item className={classes.userNavItem} href="/profile">My Profile</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item className={classes.userNavItem} href="/" onClick={this.handleSignOut}>Sign Out</Dropdown.Item>
        </Dropdown.Menu>
      );
    }
}

class RecruiterMenu extends React.Component {
  handleSignOut = () =>{
    console.log("here in signout rec");
    sessionStorage.clear();
  }
    render() {
      var cartItem = 0;
      if (sessionStorage.getItem('cartData')) {
        cartItem = sessionStorage.getItem('cartData')[0].length;
      }
      return (
        <Dropdown.Menu>
            <Dropdown.Item className={classes.userNavItem} href="/recruitercart">
              My Cart <Badge variant="secondary">{cartItem}</Badge>
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item className={classes.userNavItem} href="/" onClick={this.handleSignOut} >Sign Out</Dropdown.Item>
        </Dropdown.Menu>
      );
    }
}

const MainHeader = (props) =>{
  
    const userName = props.userName;
    const isHR = props.isHR;
    var HeaderClass = CandidateHeader;
    var MenuClass = CandidateMenu;
    if (isHR==1) {
        HeaderClass = RecruiterHeader;
        MenuClass = RecruiterMenu;
    }

      return (
          <Navbar bg="dark" variant="dark" fixed="top">
              <Navbar.Brand href="#home">
                  <img
                      src={logo}
                      width="30"
                      height="30"
                      className="d-inline-block align-top"
                      alt="React Bootstrap logo"
                  />
              </Navbar.Brand>
              <HeaderClass/>
              <Dropdown as={ButtonGroup}>
                  <Button variant="info">Hi {userName}</Button>
                  <Dropdown.Toggle split variant="info" id="dropdown-split-basic" />
                  <MenuClass />
              </Dropdown>
          </Navbar>
      );
};

export default MainHeader;