import React, { Component } from 'react';
import classes from './RegisterForm.css';
import {Button, Form, FormGroup, Row, Col, Alert} from 'react-bootstrap';
import logo from '../images/Logo.png';
import axios from 'axios';
import Modal from '../components/Modal';

class RegisterForm extends Component {

  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      firstname: '',
      lastname: '',
      isHR:0,
      companyname:'',
      companylocation:'',
      showCompanyTxtBox:false,
      errorRegister:false,
      redirectToReferrer: false,
      fields: {},
      errors: {}
    };
    this.signup = this.signup.bind(this);
    this.onChange = this.onChange.bind(this);
  }

 
    signup = () => {
      if (this.validateForm()) {          
          const dataSentToDB = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email,
            password: this.state.password,
            isHR : this.state.isHR,
            companyname:this.state.companyname,
            companylocation: this.state.companylocation
          }

          console.log(dataSentToDB);

          axios.post("http://localhost:8888/jobapply/signUp.php",dataSentToDB)
            .then(res => {
                console.log(res.data);
                if(res.data=="False"){
                  //alert("Email Already Exists");
                  this.setState({
                    errorRegister:true
                  })
                }
                else{
                  sessionStorage.setItem('userData',JSON.stringify(res.data[0]));
                  var userData = JSON.parse(sessionStorage.getItem('userData'));
                  console.log(res.data[0]);
                  if(userData.isHR==0){
                    this.props.history.push('/profile');
                  }
                  else if(userData.isHR==1){
                    this.props.history.push('/recruiterhome');
                  }
                  this.setState({
                    redirectToReferrer: true
                  });
                }
            })
            .catch(function (error){
                console.log(error);
            })
      }
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

    handleModalClose = () =>{
      this.setState({
        errorRegister:false
      })
    }

    onChange(e){
      this.setState({[e.target.name]:e.target.value});
      
      let fields = this.state.fields;
      fields[e.target.name] = e.target.value;
      this.setState({
        fields
      });
    }

    handleCheckbox = (e) => {
      if(this.state.isHR==0){
        this.setState({
          isHR: 1,
          showCompanyTxtBox: true
        });
      }
      else{
        this.setState({
          isHR: 0,
          showCompanyTxtBox: false
        });
      }
      
    } 
    
    validateForm() {
      let fields = this.state.fields;
      let errors = {};
      let formIsValid = true;
      if (!fields["firstname"]) {
        formIsValid = false;
        errors["firstname"] = "*Please enter your firstname.";
      }
      if (typeof fields["firstname"] !== "undefined") {
        if (!fields["firstname"].match(/^[a-zA-Z ]*$/)) {
          formIsValid = false;
          errors["firstname"] = "*Please enter alphabet characters only.";
        }
      }
      if (!fields["lastname"]) {
        formIsValid = false;
        errors["lastname"] = "*Please enter your lastname.";
      }
      if (typeof fields["lastname"] !== "undefined") {
        if (!fields["lastname"].match(/^[a-zA-Z ]*$/)) {
          formIsValid = false;
          errors["lastname"] = "*Please enter alphabet characters only.";
        }
      }
      if (!fields["email"]) {
        formIsValid = false;
        errors["email"] = "*Please enter your email-ID.";
      }
      if (typeof fields["email"] !== "undefined") {
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!pattern.test(fields["email"])) {
          formIsValid = false;
          errors["email"] = "*Please enter valid email-ID.";
        }
      }
      if (!fields["password"]) {
        formIsValid = false;
        errors["password"] = "*Please enter your password.";
      }
      if (typeof fields["password"] !== "undefined") {
        if (!fields["password"].match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
          formIsValid = false;
          errors["password"] = "*Please enter secure and strong password.";
        }
      }
      if(this.state.showCompanyTxtBox) {
        if (!fields["companyname"]) {
          formIsValid = false;
          errors["companyname"] = "*Please enter your company name.";
        }
        if (!fields["companylocation"]) {
          formIsValid = false;
          errors["companylocation"] = "*Please enter your company location.";
        }
      }

      this.setState({
        errors: errors
      });
      return formIsValid;
    }

  render() {

    var code;
    if(this.state.errorRegister){
      code = (
        <Modal show={true} modalClosed={this.handleModalClose}>
          <Alert variant="danger">
            <h3 className={classes.modalMessage}>Email Already Exists!!</h3>
          </Alert>
        </Modal>
      );
    }
    var companyName;
    var location;
    if(this.state.showCompanyTxtBox){
      companyName=(
          <FormGroup>
            <Form.Label>CompanyName</Form.Label>
            <Form.Control type="text" name="companyname" placeholder="Company" required="required" onChange={this.onChange}/>
            <div className={classes.errorMsg}>{this.state.errors.companyname}</div>
          </FormGroup>
      );
      location=(
        <FormGroup>
          <Form.Label>Company Location</Form.Label>
          <Form.Control type="text" name="companylocation" placeholder="Company Location" required="required" onChange={this.onChange}/>
          <div className={classes.errorMsg}>{this.state.errors.companylocation}</div>
        </FormGroup>
    );
    }
    return (

      <div className="container-fluid">
        {code}
        <Row>
          <Col className={classes.leftContainer} sm={4}>
            <div>
              <img className={classes.imgContainer} src ={logo} alt="Welcome"/>
            </div>
          </Col>

          <Col className={classes.rightContainer} sm={8}>
            <Form className="login-form">
              <h2 className={classes.heading}>Welcome</h2>
              <h4 className="text-center">You are just a step away from landing your dream job!</h4>
            
              <FormGroup>
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" name="firstname" id="firstname" placeholder="First Name" required="required" onChange={this.onChange} onFocus={this.nameFocusHandler} onBlur={this.nameBlurHandler}/>
                <div className={classes.errorMsg}>{this.state.errors.firstname}</div>
              </FormGroup>
              <FormGroup>
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" name="lastname" id="lastname" placeholder="Last Name" required="required" onChange={this.onChange}/>
                <div className={classes.errorMsg}>{this.state.errors.lastname}</div>
              </FormGroup>
              <FormGroup>
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" id="email" placeholder="Email" required="required " onChange={this.onChange}/>
                <div className={classes.errorMsg}>{this.state.errors.email}</div>
              </FormGroup>
              <FormGroup>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" id="password" placeholder="Password" required="required" onChange={this.onChange}/>
                <div className={classes.errorMsg}>{this.state.errors.password}</div>
              </FormGroup>
              <FormGroup check>
                <Form.Label check>
                  <Form.Check type="checkbox" onClick={this.handleCheckbox} />{' '}
                    <span>Are you Hiring?</span>
                </Form.Label>
              </FormGroup>
              <br/>
              {companyName}
              {location}
              <Button className="btn-lg btn-dark btn-block" onClick={this.signup}>Sign up</Button> 
              <br/>     
              <div className="text-center">
                <p className="text-center">Already have an account? <a href="/">Login</a> </p>
              </div>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

export default RegisterForm;
