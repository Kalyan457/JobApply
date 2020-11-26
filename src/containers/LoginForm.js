import React, { Component } from 'react';
import classes from './LoginForm.css';
import {Button, Form, FormFroup,Label, FormGroup} from 'reactstrap';
import {FacebookLoginButton} from 'react-social-login-buttons';
import loginimg from '../images/login_img.png';
import {Input} from 'reactstrap';
class LoginForm extends Component {
  render() {    
    return (
      <div className="container">   
        <Form className={classes.loginForm}>
            <h1><span className="font-weight-bold"> JobApply</span>.com</h1>
            <h2 className="text-center">Welcome</h2>
            <img src ={loginimg} width="250" height="200" alt="Login"/>
            <FormGroup>
              <label>Email</label>
              <Input type="email" placeholder="Email" required="required" />
            </FormGroup>
            <FormGroup>
              <label>Password</label>
              <Input type="password" placeholder="Password" required="required"/>
            </FormGroup>
            <Button className="btn-lg btn-dark btn-block"> Login </Button>
            {/* <div className="text-center pt-3">
                Or continue with your social account
            </div>
            <FacebookLoginButton className="mt-3 mb-3"/> */}
            <div className="text-center">
              <a href="/sign-up">Sign up</a>
              <span className='p-2'>|</span>
              <a href="/forgot-password">Forgot Password</a>
            </div>
        </Form>
      </div>
    );
  }
}

export default LoginForm;
