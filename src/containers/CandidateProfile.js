import React, { Component, useState } from 'react';
import classes from './CandidateProfile.css';
import Datepicker from '../components/datepicker';
import {Button, Form, FormFroup,Label, Input, FormText,FormGroup} from 'reactstrap';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import {FacebookLoginButton} from 'react-social-login-buttons';
import loginimg from '../images/login_img.png';
import Select from 'react-select'
import countryList from 'react-select-country-list'
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

class CandidateProfile extends Component {
    state = { phone: "" };
    handleOnChange = value => {
      console.log(value);
      this.setState({ phone: value }, () => {
        console.log(this.state.phone);
      });
    };
    constructor(props) {
        super(props)
        this.options = countryList().getData()
        this.state = {
          options: this.options,
          value: null,
        }
    }
     
    changeHandler = value => {
      this.setState({ value })
    }

  render() {
    return (
      <body>
        <div className={classes.candidateprofile}>     
          <Form className="candidateprofile">
            <h1><span className="font-weight-bold"> Create Profile</span></h1>
            <span className="font-weight-bold"> Personal Details</span>
            <h2></h2>
            <FormGroup>
              <label>First Name</label>
              <span><Input type="text" placeholder="First Name" required="required"/></span>
            </FormGroup>
            <FormGroup>
              <label>Last Name</label>
              <Input type="text" placeholder="Last Name" required="required"/>
            </FormGroup>
            <label> Phone Number </label>
            {/* <PhoneInput
                name = "phoneNumber"
                placeholder="(123) 123 4567"
                type = "text"
                country={'us'}
                enableAreaCodes={true}
                onlyCountries={['us']}
                areaCodes={{us: ['999']}}
                inputProps={{
                  name: 'phone',
                  country:'us',
                  required: true,
                  autoFocus: true
                }}
                value={this.state.phone}
                onChange={this.handleOnChange}      
                required/> */}
            <FormGroup>
              <label>Address</label>
              <Input type="text" placeholder="" required="required"/>
            </FormGroup>
            <FormGroup>
              <label>City</label>
              <Input type="text" placeholder="ex: Dallas" required="required"/>
            </FormGroup>
            <FormGroup>
              <label>State</label>
              <Input type="text" placeholder="ex: Texas" required="required"/>
            </FormGroup>
            <label>Country</label>
            <Select
              options={this.state.options}
              value={this.state.value}
              onChange={this.changeHandler}
            />
          <div>
            <h4><span className="font-weight-bold"> Education</span></h4>
            <FormGroup>
              <label>University</label>
              <Input type="text" placeholder="" required="required"/>
            </FormGroup>
            <label>Degree</label>
            <Dropdown options={['Bachelors','Masters','PhD','Other']} onChange={this._onSelect} placeholder="Select an option" required/>
            <FormGroup>
              <label>Major</label>
              <Input type="text" placeholder="Computer Science" required="required"/>
              <label>Minor</label>
              <Input type="text" placeholder=""/>
            </FormGroup>
            <Datepicker />
            <FormGroup check inline>
              <Label check>
                <Input type="checkbox" /> Present
              </Label>
            </FormGroup>
          </div>
          <div>
            <h4><span className="font-weight-bold"> Work Experience</span></h4>
          </div>
          <div>
            <span className="font-weight-bold"> Work Experience 1</span>
            <FormGroup>
              <label>Company</label>
              <Input type="text" placeholder="" required="required"/>
            </FormGroup>
          </div>
          <div>
            <Datepicker />
            <FormGroup check inline>
              <Label check>
              <Input type="checkbox" /> Present
              </Label>
            </FormGroup>
          </div> 
          <div>
            <FormGroup>
              <Label> Job Description</Label>
              <Input type="textarea" name="decription" maxLength="250"  />
            </FormGroup>
            <FormGroup>
              <Label for="exampleFile">Upload CV/Resume</Label>
              <Input type="file" name="file" id="exampleFile" />
              <FormText color="black">
                Upload CV in .PDF Format only
              </FormText>
            </FormGroup>
          </div>
          <div>
            <h4><span className="font-weight-bold"> EEO Statement</span></h4>
            <label> Gender</label>
            <Dropdown options={['Female','Male','Decline to self-identify']} onChange={this._onSelect} placeholder="Select an option" required/>
            <label> Are you Hispanic or Latino?</label>
            <Dropdown options={['Yes','No','Decline to self-identify']} onChange={this._onSelect} placeholder="Select an option" required/>
            <label> Race</label>
            <Dropdown options={['Hispanic or Latino','White','Black or African American','Asian','Native Hawaian','American Indian or Alaska Native','Decline to self-identify']} onChange={this._onSelect} placeholder="Select an option" required/>
            <label> Veteran status</label>
            <Dropdown options={['I am a veteran','I am not a veteran','Decline to self-identify']} onChange={this._onSelect} placeholder="Select an option" required/>
          </div>  
          <div>
            <Button className="btn-lg btn-dark btn-block font"> Save Profile </Button>
          </div> 
        </Form>
      </div>
    </body>
    );
  }
}

export default CandidateProfile;
