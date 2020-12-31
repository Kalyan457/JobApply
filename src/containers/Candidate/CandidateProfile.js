import React, { Component, useState } from 'react';
import classes from './CandidateProfile.css';
import {Button, Form,Label, Input,FormGroup} from 'reactstrap';
import axios from 'axios';
import Auxillary from '../../hoc/Auxillary';
import MainHeader from '../../components/MainHeader';

class CandidateProfile extends Component {
    constructor(props){
      super(props)
      this.state={
        userName:'',
        userid:'',
        isHR:0,
        firstname:'',
        lastname:'',
        phonenumber:'',
        address:'',
        university:'',
        degree:'bachelors',
        major:'',
        startdateUniv:'',
        enddateUniv:'',
        companyWorkExName:'',
        startdateWorkEx:'',
        enddateWorkEx:'',
        jobdescription:'',
        gender:'Male',
        hispaniclatino:'Yes',
        race:'White',
        veteran:'I am a veteran',
        visa:'Yes',
        cgpa:'',
        dob:'',
        fields: {},
        errors: {}
      };
      this.saveProfileHandler = this.saveProfileHandler.bind(this);
      this.onChange = this.onChange.bind(this);
    }

    onChange(e){
      console.log("inonchange func");
      this.setState({[e.target.name]:e.target.value});
    }

    componentDidMount = () =>{
      if(!sessionStorage.getItem('userData')){
        this.props.history.push('/');
      }
      else if(JSON.parse(sessionStorage.getItem('userData')).isHR==1){
          this.props.history.push('/recruiterhome');
      }
      else{
        var userData = JSON.parse(sessionStorage.getItem('userData'));
        console.log(userData);
        this.setState({
            //...this.state,
            userName:userData.firstname,
            userid:userData.userId,
            firstname:userData.firstname,
            lastname:userData.lastname
        })
        const dataSentToDB = {              
            userid:userData.userId,
        }
        console.log(dataSentToDB);
        axios.post("http://localhost:8888/jobapply/populateProfile.php",dataSentToDB)
            .then(res => {
                console.log(res.data);
                if(res.data=="Empty"){

                }
                else{
                  const dataFromDB = res.data[0];
                  this.setState({
                    phonenumber:dataFromDB.phone,
                    address:dataFromDB.address,
                    university:dataFromDB.university,
                    degree:dataFromDB.degreetype,
                    major:dataFromDB.major,
                    startdateUniv:dataFromDB.attendedfrom,
                    enddateUniv:dataFromDB.graduationdate,
                    companyWorkExName:dataFromDB.workexcompanyname,
                    startdateWorkEx:dataFromDB.workedfrom,
                    enddateWorkEx:dataFromDB.workedto,
                    jobdescription:dataFromDB.workexdescription,
                    gender:dataFromDB.gender,
                    hispaniclatino:dataFromDB.hispaniclatino,
                    race:dataFromDB.race,
                    veteran:dataFromDB.protectedveteran,
                    visa:dataFromDB.requirevisa,
                    cgpa:dataFromDB.cgpa,
                    dob:dataFromDB.dob
                  })
                  var fieldsCopy = {};
                  fieldsCopy["phonenumber"] = dataFromDB.phone;
                  fieldsCopy["address"] = dataFromDB.address;
                  fieldsCopy["dob"] = dataFromDB.dob;
                  fieldsCopy["university"] = dataFromDB.university;
                  fieldsCopy["major"] = dataFromDB.major;
                  fieldsCopy["cgpa"] = dataFromDB.cgpa;
                  fieldsCopy["startdateUniv"] = dataFromDB.attendedfrom;
                  fieldsCopy["enddateUniv"] = dataFromDB.graduationdate;
                  this.setState({
                    fields:fieldsCopy
                  })
                }  
            })
            .catch(function (error) {
                console.log(error);
            })
      }
    }

    onChange(e){
      var oldStartUniv = this.state.startdateUniv;
      var oldStartWorkEx = this.state.startdateWorkEx;
      this.setState({[e.target.name]:e.target.value});
      var startdateUniv = document.getElementById("startdateUniv").value;
      var enddateUniv = document.getElementById("enddateUniv").value;
      var startdateWorkEx = document.getElementById("startdateWorkEx").value;
      var enddateWorkEx = document.getElementById("enddateWorkEx").value;
      if(Date.parse(enddateUniv)<=Date.parse(startdateUniv)){
        this.setState({startdateUniv:oldStartUniv});
        alert("End Date Cannot be greater than start date");  
      }
      if(Date.parse(enddateWorkEx)<=Date.parse(startdateWorkEx)){
        this.setState({startdateUniv:oldStartWorkEx});
        alert("End Date Cannot be greater than start date");  
      }
      /******/
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
      console.log(fields["phonenumber"]);
      if (!fields["phonenumber"]) {
        formIsValid = false;
        errors["phonenumber"] = "*Please enter proper phonenumber.";
      }
      if (typeof fields["phonenumber"] !== "undefined") {
        if (!fields["phonenumber"].match(/^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/)) {
          formIsValid = false;
          errors["phonenumber"] = "*Please enter numbers only.";
        }
      }
      if (!fields["address"]) {
        formIsValid = false;
        errors["address"] = "*Please enter address.";
      }
      if (!fields["dob"]) {
        formIsValid = false;
        errors["dob"] = "*Please enter your DOB";
      }
      
      if (!fields["university"]) {
        formIsValid = false;
        errors["university"] = "*Please enter your university.";
      }
      if (typeof fields["university"] !== "undefined") {
        if (!fields["university"].match(/^[a-zA-Z ]*$/)) {
          formIsValid = false;
          errors["university"] = "*Please enter alphabets only.";
        }
      }
      if (!fields["major"]) {
        formIsValid = false;
        errors["major"] = "*Please enter your major.";
      }
      if (typeof fields["major"] !== "undefined") {
        if (!fields["major"].match(/^[a-zA-Z ]*$/)) {
          formIsValid = false;
          errors["major"] = "*Please enter alphabets only.";
        }
      }
      if (!fields["cgpa"]) {
        formIsValid = false;
        errors["cgpa"] = "*Please enter your cgpa.";
      }
      if (typeof fields["cgpa"] !== "undefined") {
        if (!fields["cgpa"].match(/^(\d{1,5}|\d{0,5}\.\d{1,2})$/)) {
          formIsValid = false;
          errors["cgpa"] = "*Please enter numbers only.";
        }
      }
      if (!fields["startdateUniv"]) {
        formIsValid = false;
        errors["startdateUniv"] = "*Please enter Start date";
      }
      if (!fields["enddateUniv"]) {
        formIsValid = false;
        errors["enddateUniv"] = "*Please enter End date";
      }
      this.setState({
        errors: errors
      });
      return formIsValid;
    }

    saveProfileHandler = () =>{
      if(this.validateForm()){
          console.log(this.state);
          var phonenumber = this.state.phonenumber;
          var address = this.state.address;
          var university = this.state.university;
          var degree = this.state.degree;
          var major = this.state.major;
          var startdateUniv = this.state.startdateUniv;
          var enddateUniv = this.state.enddateUniv;
          var companyWorkExName = this.state.companyWorkExName;
          var startdateWorkEx = this.state.startdateWorkEx;
          var enddateWorkEx = this.state.enddateWorkEx;
          var jobdescription = this.state.jobdescription;
          var gender = this.state.gender;
          var hispaniclatino = this.state.hispaniclatino;
          var race = this.state.race;
          var veteran = this.state.veteran;
          var visa = this.state.visa;
          var cgpa = this.state.cgpa;
          var dob = this.state.dob;

          const dataSentToDB={
            phonenumber:phonenumber,
            address:address,
            university:university,
            degree:degree,
            major:major,
            startdateUniv:startdateUniv,
            enddateUniv:enddateUniv,
            companyWorkExName:companyWorkExName,
            startdateWorkEx:startdateWorkEx,
            enddateWorkEx:enddateWorkEx,
            jobdescription:jobdescription,
            gender:gender,
            hispaniclatino:hispaniclatino,
            race:race,
            veteran:veteran,
            visa:visa,
            cgpa:cgpa,
            dob:dob,
            userid:this.state.userid
          }

          console.log(dataSentToDB);

          axios.post("http://localhost:8888/jobapply/profilepage.php",dataSentToDB)
            .then(res => {
                console.log(res.data);
                alert("You profile has been successfully created!! You are all set to apply for jobs");
                
            })
            .catch(function (error) {
                console.log(error);
            })
      }
    }

  render() {
    console.log(this.state);
    return (
      <Auxillary>
        <MainHeader userName={this.state.userName} isHR={this.state.isHR}/> 
        <div className={classes.candidateprofile}> 
            <Form className="candidateprofile">
              <h1><span className="font-weight-bold"> Create Profile</span></h1>
              <span className="font-weight-bold"> Personal Details</span>
              <FormGroup>
                <label>First Name</label>
                <span><Input type="text" placeholder="First Name" name="firstname" required="required" defaultValue={this.state.firstname} disabled/></span>
              </FormGroup>
              <FormGroup>
                <label>Last Name</label>
                <Input type="text" placeholder="Last Name" name="lastname" required="required" defaultValue={this.state.lastname} disabled/>
              </FormGroup>
              <FormGroup>
                <label> Phone Number </label>
                <Input type="text" placeholder="Phone Number" name="phonenumber" required="required" onChange={this.onChange} value={this.state.phonenumber}/>
                <div className={classes.errorMsg}>{this.state.errors.phonenumber}</div>
              </FormGroup>
              <FormGroup>
                <label>Address</label>
                <Input type="text" placeholder="" name="address" required="required" onChange={this.onChange} value={this.state.address}/>
                <div className={classes.errorMsg}>{this.state.errors.address}</div>
              </FormGroup>
              <FormGroup>
                <label>Data of Birth</label>
                <Input type="date" name="dob" required="required" value={this.state.dob} onChange={this.onChange}/>
                <div className={classes.errorMsg}>{this.state.errors.dob}</div>
              </FormGroup>            
              <label>Visa Sponsorship</label>
              <select name="visa" id="visa" value={this.state.visa} onChange={this.onChange} className={classes.dropdown}>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            <div>
              <h4><span className="font-weight-bold"> Education</span></h4>
              <FormGroup>
                <label>University</label>
                <Input type="text" placeholder="" name="university" required="required" value={this.state.university} onChange={this.onChange}/>
                <div className={classes.errorMsg}>{this.state.errors.university}</div>
              </FormGroup>
              <FormGroup>
                <label>Degree</label>
                <select name="degree" id="degree" value={this.state.degree} onChange={this.onChange} className={classes.dropdown}>
                  <option value="bachelors">Bachelors</option>
                  <option value="masters">Masters</option>
                  <option value="highschool">High School</option>
                </select>
              </FormGroup>
              <FormGroup>
                <label>Major</label>
                <Input type="text" name="major" placeholder="Computer Science" required="required" value={this.state.major} onChange={this.onChange}/>
                <div className={classes.errorMsg}>{this.state.errors.major}</div>
              </FormGroup>
              <FormGroup>
                <label>CGPA</label>
                <Input type="text" name="cgpa" placeholder="" value={this.state.cgpa} onChange={this.onChange}/>
                <div className={classes.errorMsg}>{this.state.errors.cgpa}</div>
              </FormGroup>
              <FormGroup>
                <label>Start Date</label>
                <Input type="date" name="startdateUniv" id="startdateUniv"  required="required" value={this.state.startdateUniv} onChange={this.onChange}/>
                <div className={classes.errorMsg}>{this.state.errors.startdateUniv}</div>
              </FormGroup>
              <FormGroup>
                <label>End Date</label>
                <Input type="date" name="enddateUniv" id="enddateUniv" required="required"  min={this.state.startdateUniv} value={this.state.enddateUniv} onChange={this.onChange}/>
                <div className={classes.errorMsg}>{this.state.errors.enddateUniv}</div>
              </FormGroup>
            </div>
            <div>
              <h4><span className="font-weight-bold">Work Experience</span></h4>
            </div>
            <div>
              <span className="font-weight-bold">Work Experience</span>
              <FormGroup>
                <label>Company</label>
                <Input type="text" placeholder="" required="required" name="companyWorkExName" value={this.state.companyWorkExName} onChange={this.onChange}/>
              </FormGroup>
            </div>
            <div>
              <FormGroup>
                <Label>Job Description</Label>
                <Input type="textarea" name="decription" maxLength="250" name="jobdescription" value={this.state.jobdescription} onChange={this.onChange}/>
              </FormGroup>
              <FormGroup>
                <label>Start Date</label>
                <Input type="date" name="startdateWorkEx" id="startdateWorkEx" required="required" value={this.state.startdateWorkEx} onChange={this.onChange}/>
              </FormGroup>
              <FormGroup>
                <label>End Date</label>
                <Input type="date" name="enddateWorkEx" id="enddateWorkEx" required="required" min={this.state.startdateWorkEx} value={this.state.enddateWorkEx} onChange={this.onChange}/>
              </FormGroup>
            </div>
            <div>
              <h4><span className="font-weight-bold"> EEO Statement</span></h4>
              <label> Gender</label>
              <select name="gender" id="gender" value={this.state.gender} onChange={this.onChange} className={classes.dropdown} >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Decline to self-identify">Decline to self-identify</option>
              </select>
              <label> Are you Hispanic or Latino?</label>
              <select name="hispaniclatino" id="hispanicLatino" value={this.state.hispaniclatino} onChange={this.onChange} className={classes.dropdown}>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="Decline to self-identify">Decline to self-identify</option>
              </select>
              <label>Race</label>
              <select name="race" id="race" value={this.state.race} onChange={this.onChange} className={classes.dropdown}>
                <option value="White">White</option>
                <option value="Black or African American">Black or African American</option>
                <option value="Asian">Asian</option>
                <option value="Native Hawaian">Native Hawaian</option>
                <option value="American Indian or Alaska Native">American Indian or Alaska Native</option>
                <option value="Decline to self-identify">Decline to self-identify</option>
              </select>
              <label>Veteran status</label>
              <select name="veteran" id="veteran" value={this.state.veteran} onChange={this.onChange} className={classes.dropdown}>
                <option value="I am a veteran">I am a veteran</option>
                <option value="I am not a veteran">I am not a veteran</option>
                <option value="Decline to self-identify">Decline to self-identify</option>
              </select>
            </div>  
            <div>
              <Button className="btn-lg btn-dark btn-block font" onClick={this.saveProfileHandler}> Save Profile </Button>
            </div> 
          </Form>
        </div>
      </Auxillary>
    );
  }
}

export default CandidateProfile;
