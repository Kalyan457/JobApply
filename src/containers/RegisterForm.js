import React, { Component } from 'react';
import classes from './RegisterForm.css';
import {Button, Form, FormFroup,Label, Input, FormGroup}from 'reactstrap';
import {FacebookLoginButton} from 'react-social-login-buttons';
import loginimg from '../images/login_img.png';

class RegisterForm extends Component {
  render() {    
    return (
      <div className="container">     
        <Form className={classes.loginForm}>
          <h1><span className="font-weight-bold"> JobApply</span>.com</h1>
          <h2 className="text-center">Welcome</h2>
          <h4 className="text-center">You are just a step away from landing your dream job!</h4>
          <img src ={loginimg} width="250" height="200" alt="Login"/>
          <FormGroup>
            <label>Email</label>
            <Input type="email" placeholder="Email" required="required" />
          </FormGroup>
          <FormGroup>
            <label>Password</label>
            <Input type="password" placeholder="Password" required="required"/>
          </FormGroup>
          <FormGroup>
            <label>Re-enter Password</label>
            <Input type="password" placeholder="Password" required="required"/>
          </FormGroup>
          <Button className="btn-lg btn-dark btn-block"> Sign up </Button>
          <div className="text-center pt-3">
              Or continue with your social account
          </div>
          <FacebookLoginButton className="mt-3 mb-3"/>
          <div className="text-center">
            Already have an account?
            <a href="/sign-up">Login</a>
          </div>
        </Form>
      </div>
    );
  }
}

export default RegisterForm;
