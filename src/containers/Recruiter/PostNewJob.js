import React, { Component } from 'react';
import Auxillary from '../../hoc/Auxillary';
import classes from './PostNewJob.css';
import 'react-datepicker/dist/react-datepicker.css';
import MainHeader from "../../components/MainHeader";
import axios from 'axios';
import {Container, Col, Row, Button, Form, Alert} from 'react-bootstrap';

class PostNewJob extends Component{

  constructor(props){
    super(props);
    this.state = {
      userId:'',
      userName: '',
      userEmail: '',
      isHR: 1,
      companyName: '',
      jobTitle: '',
      jobLocation: '',
      expiryDate: new Date(),
      jobDesc: '',
      jobReq: '',
      jobType: '',
      visa: '',
      linkedInLink: '',
      orgLink: '',
      showNotification: false,
      fields: {},
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onChange(e) {
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
    if (!fields["jobTitle"]) {
      formIsValid = false;
      errors["jobTitle"] = "*Please enter Job Title!";
    }
    if (!fields["jobLocation"]) {
      formIsValid = false;
      errors["jobLocation"] = "*Please enter Job Location!";
    }
    if (typeof fields["expiryDate"] == "undefined") {
      formIsValid = false;
      errors["expiryDate"] = "*Please select a valid expiry date!";
    }
    if (typeof fields["expiryDate"] !== "undefined") {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd;

      if (fields["expiryDate"] < today) {
        formIsValid = false;
        errors["expiryDate"] = "*Latest Job Apply Date can't be in past!";
      }
    }
    if (typeof fields["jobType"] == "undefined") {
      formIsValid = false;
      errors["jobType"] = "*Please select Job Type!";
    }
    if (!fields["jobDesc"]) {
      formIsValid = false;
      errors["jobDesc"] = "*Job Description can't be blank!";
    }
    if (!fields["jobReq"]) {
      formIsValid = false;
      errors["jobReq"] = "*Job Requirements can't be blank!";
    }
    if (typeof fields["visa"] == "undefined") {
      formIsValid = false;
      errors["visa"] = "*Please select visa sponsorship!";
    }

    this.setState({
      errors: errors
    });
    return formIsValid;
  }

  onFormSubmit = () => {
    console.log(sessionStorage);
    if (!sessionStorage.getItem('cartData')){
      if (this.validateForm()) {          
          console.log("Form validated");
          var formData = {
            jobTitle: this.state.fields["jobTitle"],
            jobLocation: this.state.fields["jobLocation"],
            expiryDate: this.state.fields["expiryDate"],
            jobDesc: this.state.fields["jobDesc"],
            jobReq: this.state.fields["jobReq"],
            jobType: this.state.fields["jobType"],
            visa: this.state.fields["visa"],
            linkedInLink: this.state.fields["linkedInLink"],
            orgLink: this.state.fields["orgLink"]
          };

          sessionStorage.setItem('cartData',JSON.stringify(formData));
          var cartData = JSON.parse(sessionStorage.getItem('cartData'));
          console.log(cartData);

          this.setState({
            showNotification: true,
            displayMsg : "Job has been successfully added to your cart."
          });
      }
    } else {
      this.setState({
        showNotification: true,
        displayMsg: "You already have a job to be posted in your cart. Before posting a new job please checkout your cart!"
      });
    }
  }

  componentDidMount = () =>{
       
    if(!sessionStorage.getItem('userData')){
      this.props.history.push('/');
    }
    else if(JSON.parse(sessionStorage.getItem('userData')).isHR==0){
        this.props.history.push('/candidatehome');
    }
    else{
        var userData = JSON.parse(sessionStorage.getItem('userData'));
        console.log(userData);
        this.setState({
          ...this.state,
          userName:(userData.firstname).concat(" ").concat(userData.lastname),
          userId:userData.userId,
          userEmail:userData.emailid,
          isHR:userData.isHR
        })

      const dataSentToDB = {
          userId:userData.userId
      }

      this.setState({
        companyName: ""
      })

      axios.post("http://localhost:8888/jobapply/fetchUserCompanyInfo.php",dataSentToDB)
          .then(res => {
              console.log(res.data);
              this.setState({
                  companyName:res.data[0].companyname,
                  loading:false
              })
          })
          .catch(function (error) {
              console.log(error);
          })
    }
  }
    render() {
      var selectedClass = (this.state.showNotification)? classes.notify : classes.notifyDisabled;
        return (
          <Auxillary>
            <MainHeader userName={this.state.userName}
                            isHR={this.state.isHR}/>
            <Container className={classes.formContainer}> 
              <Row>
                <Col sm={2}>
                </Col>
                <Col sm={8}>
                  <br></br>
                  <h4> Post Your New Job </h4>
                  <div className={classes.applicantsList}>
                      <Form className={classes.form}>
                          <Form.Group className={classes.subHeading} as={Col}>
                            <Form.Label>BASIC INFO: </Form.Label>
                          </Form.Group>
                        <Form.Row>
                          <Form.Group as={Col}>
                            <Form.Label>Job Title</Form.Label>
                            <Form.Control type="input" name="jobTitle" placeholder="Enter job title.." required="required" onChange={this.onChange}/>
                            <div className={classes.errorMsg}>{this.state.errors.jobTitle}</div>
                          </Form.Group>

                          <Form.Group as={Col}>
                            <Form.Label>Company Name</Form.Label>
                            <Form.Control disabled type="input" placeholder={this.state.companyName} />
                          </Form.Group>
                        </Form.Row>

                        <Form.Row>
                          <Form.Group as={Col}>
                            <Form.Label>Location</Form.Label>
                            <Form.Control name="jobLocation" placeholder="Enter job location.." required="required" onChange={this.onChange}/>
                            <div className={classes.errorMsg}>{this.state.errors.jobLocation}</div>
                          </Form.Group>

                          <Form.Group as={Col} controlId="formGridState">
                            <Form.Label>Select Job Type</Form.Label>
                            <Form.Control as="select" name="jobType" required="required" onChange={this.onChange}>
                              <option value="Full-Time">Select..</option>
                              <option defaultValue value="Full-Time">Full-Time</option>
                              <option value="Part-Time">Part-Time</option>
                              <option value="Intern">Intern</option>
                            </Form.Control>
                            <div className={classes.errorMsg}>{this.state.errors.jobType}</div>
                          </Form.Group>
                        </Form.Row>
                      </Form>
                  </div>

                  <div className={classes.applicantsList}>
                      <Form className={classes.form}>
                          <Form.Group className={classes.subHeading} as={Col}>
                            <Form.Label>JOB DETAILS: </Form.Label>
                          </Form.Group>
                        <Form.Row>
                              <Form.Group as={Col}>
                                <Form.File id="exampleFormControlFile1" label="Select Company Logo" />
                              </Form.Group>
                              <Form.Group as={Col}>
                                <Form.Label>Choose Latest Date to Apply</Form.Label>
                              <Form.Control type="date" required="required"
                               dateformat="yyyy/mm/dd" onChange={ this.onChange }
                               name="expiryDate" selected={ this.state.expiryDate }
                               placeholder="yyyy/mm/dd" width="auto" />
                               <div className={classes.errorMsg}>{this.state.errors.expiryDate}</div>
                              </Form.Group>
                        </Form.Row>

                        <Form.Row>
                          <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>*Job Description</Form.Label>
                            <Form.Control as="textarea" rows={5} cols={90} name="jobDesc" required="required" onChange={this.onChange}/>
                            <div className={classes.errorMsg}>{this.state.errors.jobDesc}</div>
                          </Form.Group>
                        </Form.Row>
                        <Form.Row>
                          <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>*Job Requirements</Form.Label>
                            <Form.Control as="textarea" rows={5} cols={90} name="jobReq" required="required" onChange={this.onChange}/>
                            <div className={classes.errorMsg}>{this.state.errors.jobReq}</div>
                          </Form.Group>
                        </Form.Row>

                        <Form.Row>
                          <Form.Group as={Col}>
                            <Form.Label>Minimum Education Requirement</Form.Label>
                            <Form.Control as="select">
                              <option defaultValue value="High School">High School</option>
                              <option value="Bachelors">Bachelors</option>
                              <option value="Masters">Masters</option>
                              <option value="Phd">PHD</option>
                            </Form.Control>
                          </Form.Group>

                          <Form.Group as={Col} controlId="formGridState">
                            <Form.Label>Providing Sponsorship for this job (if needed)</Form.Label>
                            <Form.Control as="select" name="visa" required="required" onChange={this.onChange}>
                              <option value="Yes">Select..</option>
                              <option defaultValue value="Yes">Yes</option>
                              <option value="No">No</option>
                            </Form.Control>
                            <div className={classes.errorMsg}>{this.state.errors.visa}</div>
                          </Form.Group>
                        </Form.Row>
                      </Form>
                  </div>

                  <div className={classes.applicantsList}>
                      <Form className={classes.form}>
                          <Form.Group className={classes.subHeading} as={Col}>
                            <Form.Label>LINKS: </Form.Label>
                          </Form.Group>
                          <Form.Row>
                          <Form.Group as={Col}>
                            <Form.Label>LinkedIn Link</Form.Label>
                            <Form.Control type="input" name="linkedInLink" placeholder="Enter linkedin link.." onChange={ this.onChange }/>
                          </Form.Group>

                          <Form.Group as={Col}>
                            <Form.Label>Recruiter Email</Form.Label>
                            <Form.Control disabled type="input" placeholder={this.state.userEmail} />
                          </Form.Group>
                        </Form.Row>
                        <Form.Group>
                            <Form.Label>Company's Career Link</Form.Label>
                            <Form.Control type="input" name="orgLink" placeholder="Enter your organization link.." onChange={ this.onChange }/>
                        </Form.Group>
                      </Form>
                  </div>
                  <br/><br/>
                  <Row>
                    <Col sm={4}></Col>
                    <Col sm={4}>
                      <Button onClick={this.onFormSubmit} className={classes.submitBtn} variant="info" type="submit">
                        Add Job to Cart
                      </Button>
                    </Col>
                    <Alert className={selectedClass} variant="success">
                        {this.state.displayMsg}
                    </Alert>
                    <Col sm={4}></Col>
                  </Row>
                  <br/><br/>
                </Col>
                <Col sm={2}>
                </Col>
              </Row>         
            </Container>
          </Auxillary>
        );
      }
}

export default PostNewJob;