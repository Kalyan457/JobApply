import React, { Component, useEffect, useState } from 'react';
import Auxillary from '../../hoc/Auxillary';
import classes from './JobDescription.css';
import MainHeader from "../../components/MainHeader";
import axios from 'axios';
import {Link} from 'react-router-dom';
import {Container, Col, Row, Button,Badge, ButtonGroup, Table, Card, ListGroup, Modal, Alert} from 'react-bootstrap';

function Example(props) {
  const [lgShow, setLgShow] = useState(false);
  let tableBody;
  if (props.listApplicants.length > 0) {
    tableBody = props.listApplicants.map((applicant) => {
      var date = applicant.applieddate.split(" ")[0];
        return(
          <tr>
            <td>{applicant.firstname}</td>
            <td>{applicant.lastname}</td>
            <td>{applicant.emailid}</td>
            <td>{date}</td>
            <td>{applicant.jobstatus}</td>
          </tr>
        )
    });
  }
  return (
    <Auxillary>

      <Button variant="outline-info" onClick={() => setLgShow(true)}>View Aplicants For This Job</Button>
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            JOB APPLICANTS  <Badge variant="info">{props.listApplicants.length}</Badge>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Applied Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {tableBody}
          </tbody>
        </Table>
        </Modal.Body>
      </Modal>
      </Auxillary>

  );
}

class JobDescription extends Component{
  constructor(props){
  super(props);
  if(props.location.data !== undefined){
  this.state={
    userId:'',
    userName: '',
    userEmail: '',
    isHR: 1,
    jobId: this.props.location.data.jobData.jobid,
    jobInfo:[],
    appList:[],
    showNotification: false
  }}
  else {
  this.state={
    userId:'',
    userName: '',
    userEmail: '',
    isHR: 1,
    jobId: '',
    jobInfo:[],
    appList:[],
    showNotification: false
  }
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
          jobId: this.state.jobId
      }

      this.setState({
        jobInfo:[],
        appList:[],
        showNotification: false
    })

      axios.post("http://localhost:8888/jobapply/fetchJobDetails.php",dataSentToDB)
          .then(res => {
              console.log(res.data);
              this.setState({
                  jobInfo:res.data,
                  showNotification: false,
                  loading:false
              })
          })
          .catch(function (error) {
              console.log(error);
          })

      axios.post("http://localhost:8888/jobapply/fetchApplicantFromJobId.php",dataSentToDB)
          .then(res => {
              console.log(res.data);
              this.setState({
                  appList:res.data,
                  showNotification: false,
                  loading:false
              })
          })
          .catch(function (error) {
              console.log(error);
          })
    }
  }

  softDeleteJob = ()=>{
  
    const dataSentToDB = {
        jobId: this.state.jobId,
        userId: this.state.userId,
        jobStatus: this.state.jobInfo[0].isactive
    }
    
    axios.post("http://localhost:8888/jobapply/disablePostedJobs.php",dataSentToDB)
        .then(res => {
            console.log(res.data);
            this.setState({
                loading:false,
                showNotification: true
            })
        })
        .catch(function (error){
            console.log(error);
        })
}

    render() {
      var jobId = 'N/A';
      var jobTitle = 'N/A';
      var jobDesc = 'N/A';
      var jobReq = 'N/A';
      var jobType = 'N/A';
      var jobLocation = 'N/A';
      var jobPostedDate = 'N/A';
      var jobExpiryDate = 'N/A';
      var jobVisa = 'N/A';
      var jobNotify = "Deleted";
      var displayStatus = 'Delete';
      var deleteBtnVariant = "danger";

      if(this.state.jobInfo.length > 0){
        jobId = this.state.jobInfo[0].jobid;
        jobTitle = this.state.jobInfo[0].jobtitle;
        jobDesc = this.state.jobInfo[0].jobdescription;
        jobReq = this.state.jobInfo[0].jobrequirements;
        jobType = this.state.jobInfo[0].jobtype;
        jobLocation = this.state.jobInfo[0].joblocation;
        if (this.state.jobInfo[0].isactive == 1){
          displayStatus = "Delete";
          deleteBtnVariant = "danger";
          jobNotify = "Deleted! (Soft Delete) The job is removed from posted job lists. No candidate can apply for this job. Though admin can restore this job from Archieved Jobs";
        }
        else {
          displayStatus = "Restore this Deleted";
          deleteBtnVariant = "success";
          jobNotify = "Restored";
        }
        jobPostedDate = (this.state.jobInfo[0].posteddate).split(" ")[0];
        jobExpiryDate = (this.state.jobInfo[0].latestdate).split(" ")[0];
        jobVisa = this.state.jobInfo[0].visasponser;
      }

      var selectedClass = (this.state.showNotification)? classes.notify : classes.notifyDisabled;

        return (
          <Auxillary>
            <MainHeader userName={this.state.userName}
                            isHR={this.state.isHR}/>
            <Container fluid className={classes.formContainer}> 
              <Row>
                <Col sm={3}>
                <ButtonGroup className={classes.buttonTab} vertical>
                    <Example listApplicants={this.state.appList}/>
                    <Link className={classes.updateBtn} to={{pathname:'/editjob',data:this.state.jobInfo[0]}} >
                      <Button className={classes.updateBtn} variant="outline-info">
                        Update Job
                      </Button>
                    </Link>
                    <Button onClick={this.softDeleteJob} variant="outline-danger">{displayStatus} Job</Button>
                </ButtonGroup>
                <Alert className={selectedClass} variant={deleteBtnVariant}>
                    Job Id {jobId} has been {jobNotify}.
                  </Alert>
                </Col>
                <Col sm={8}>
                  <br></br>
                  <h4 className={classes.subHeading}> Job Details </h4>
                    <div className={classes.applicantsList}>
                    <Card className={classes.details}>
                      <ListGroup variant="flush">
                        <ListGroup.Item>
                          <Row>
                            <Col className={classes.fieldName} sm={5}>
                              Job Id:
                            </Col>
                            <Col sm={7}>
                              {jobId}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <Row>
                            <Col className={classes.fieldName} sm={5}>
                              Job Title:
                            </Col>
                            <Col sm={7}>
                              {jobTitle}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <Row>
                            <Col className={classes.fieldName} sm={5}>
                              Location:
                            </Col>
                            <Col sm={7}>
                              {jobLocation}  
                            </Col>
                          </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <Row>
                            <Col className={classes.fieldName} sm={5}>
                              Job Type:
                            </Col>
                            <Col sm={7}>
                              {jobType}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <Row>
                            <Col className={classes.fieldName} sm={5}>
                              Job Description:
                            </Col>
                            <Col sm={7}>
                              {jobDesc}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <Row>
                            <Col className={classes.fieldName} sm={5}>
                              Job Requirements:
                            </Col>
                            <Col sm={7}>
                              {jobReq}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <Row>
                            <Col className={classes.fieldName} sm={5}>
                              Posted Date:
                            </Col>
                            <Col sm={7}>
                              {jobPostedDate}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <Row>
                            <Col className={classes.fieldName} sm={5}>
                              Job Expiry Date:
                            </Col>
                            <Col sm={7}>
                              {jobExpiryDate}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <Row>
                            <Col className={classes.fieldName} sm={5}>
                              Sponser Visa for this Job:
                            </Col>
                            <Col sm={7}>
                              {jobVisa}  
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      </ListGroup>
                    </Card>
                    </div>
                </Col>
                <Col sm={1}>
                </Col>
              </Row>      
            </Container>
          </Auxillary>
        );
      }
}

export default JobDescription;