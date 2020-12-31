import React, { Component } from 'react';
import classes from './LoginForm.css';
import {Button, Form, FormGroup, Alert, Row, Col} from 'react-bootstrap';
import loginimg from '../images/login_img.png';
import logo from '../images/Logo.png';
import axios from 'axios';
import Modal from '../components/Modal';

class LoginForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      redirectToReferrer: false,
      errorLogin:false,
      fields: {},
      errors: {}
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  handleLogin = () => {
    if (this.validateForm()) {
      var email = document.getElementById("email").value;
      var password = document.getElementById("password").value;

      const dataSentToDB = {
        email:email,
        password:password
      }

      console.log(dataSentToDB);
      axios.post("http://localhost:8888/jobapply/login.php",dataSentToDB)
          .then(res => {
              console.log(res.data);
              if(res.data=="False"){
                //alert("Invalid Details");
                this.setState({
                  errorLogin:true
                })              
              }
              else{
                sessionStorage.setItem('userData',JSON.stringify(res.data[0]));
                console.log("sess:",sessionStorage);
                var userData = JSON.parse(sessionStorage.getItem('userData'));
                if(userData.isHR==0){
                  this.props.history.push('/candidatehome');
                }
                else if(userData.isHR==1){
                  this.props.history.push('/recruiterhome');
                }
                this.setState({
                  redirectToReferrer: true
                })
              }
          })
          .catch(function (error){
              console.log(error);
          })
    }
  }

    handleModalClose = () =>{
      this.setState({
        errorLogin:false
      })
    }

    componentDidMount = () => {
      if(sessionStorage.getItem('userData')){
        var userData = JSON.parse(sessionStorage.getItem('userData'));
        if(userData.isHR==0){
          this.props.history.push('/candidatehome');
        }
        else if(userData.isHR==1){
          this.props.history.push('/recruiterhome');
        }
      }
    }

    onChange(e){
      this.setState({[e.target.name]:e.target.value});
      
      let fields = this.state.fields;
      fields[e.target.name] = e.target.value;
      this.setState({
        fields
      });
    }

    validateForm() {
      let fields = this.state.fields;
      let errors = {};
      let formIsValid = true;
      
      if (!fields["email"]) {
        formIsValid = false;
        errors["email"] = "*Please enter your email-ID!";
      }
      
      if (!fields["password"]) {
        formIsValid = false;
        errors["password"] = "*Please enter your password!";
      }

      this.setState({
        errors: errors
      });
      return formIsValid;
    }  

  render() {    
    var code;
    if(this.state.errorLogin){
      code = (
        <Modal show={true} modalClosed={this.handleModalClose}>
          <Alert variant="danger">
            <h3 className={classes.modalMessage}>Incorrect Email or Password</h3>
          </Alert>
        </Modal>
      );
    }
    return (
      <div className="container">  
        {code} 
        <Row>
          <Col className={classes.leftContainer} sm={4}>
            <div>
              <img className={classes.imgContainer} src ={logo} alt="Welcome"/>
            </div>
          </Col>

          <Col className={classes.rightContainer} sm={8}>
            <Form className={classes.loginForm}>
                <h1 className={classes.heading}><span className="font-weight-bold"> JobApply</span>.com</h1>
                <br/>
                <h2 className="text-center">Welcome</h2>
                <img src ={loginimg} width="250" height="200" alt="Login"/>
                <FormGroup>
                    <label>Email</label>
                    <Form.Control type="email" name="email" id="email" placeholder="Email" required="required" onChange={this.onChange}/>
                    <div className={classes.errorMsg}>{this.state.errors.email}</div>
                  </FormGroup>
                  <FormGroup>
                    <label>Password</label>
                    <Form.Control type="password" name="password" id="password" placeholder="Password" required="required" onChange={this.onChange}/>
                    <div className={classes.errorMsg}>{this.state.errors.password}</div>
                  </FormGroup>
                <Button className="btn-lg btn-dark btn-block" onClick={this.handleLogin}> Login </Button>
                <br/>
                <div className="text-center">
                  <p className="text-center">Don't have an Account? <a href="/register">Sign up</a> </p>
                </div>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

export default LoginForm;
