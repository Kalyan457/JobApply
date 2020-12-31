import React from 'react'
import { Form } from 'react-bootstrap';
import {Button,FormFroup,Label, Input, FormGroup} from 'reactstrap';

class DatePicker extends React.Component{
    checkdate = ()=> {
        var start_date=document.getElementById("startdate");
        var end_date=document.getElementById("enddate")

        if ((Date.parse(end_date) <= Date.parse(start_date))) {
            alert("End date should be greater than Start date");
            console.log("error");
        }
    }
    render(){
        return(              
            <div className="login-form">
                <Form.Group controlId="dob">
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control type="date" name="startdate" placeholder="" width="auto" />
                    <Form.Label>End Date</Form.Label>
                    <Form.Control type="date" name="enddate" placeholder="" width="auto" onChange={this.checkdate} />
                </Form.Group>     
            </div>
        )
    }
}
export default DatePicker;