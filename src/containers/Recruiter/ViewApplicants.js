import React, { Component } from 'react';
import Auxillary from '../../hoc/Auxillary';
import classes from './ViewApplicants.css';
import MainHeader from "../../components/MainHeader";
import axios from 'axios';
import ApplicantsListings from './ApplicantsListings';
import ApplicantHeader from '../../components/ApplicantHeader';
import Pagination from '../../components/Pagination';
import Loader from 'react-loader-spinner';
import {Container, Col, Row, Button, Form, Card, Accordion} from 'react-bootstrap';

class ViewApplicants extends Component{
  state={
    userId:'',
    userName: '',
    userEmail: '',
    isHR: 1,
    applicantsList:[],
    titlesList:[],
    locationsList:[],
    currentPage:1,
    applicantsPerPage:5,
    loading:true
  } 

  paginate = (pageNumber) =>{
    this.setState({
        currentPage:pageNumber
    })
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
            selectedTitle:"allTitles",
            selectedLocation:"allLocations",
            selectedVisa:"allVisa",
            selectedStatus:"Under Review",
            sortBy:"name",
            userId:userData.userId
        }

      this.setState({
        titlesList:[],
        locationsList:[],
        applicantsList:[]
      })

      axios.post("http://localhost:8888/jobapply/fetchJobTitles.php",dataSentToDB)
          .then(res => {
              console.log(res.data);
              this.setState({
                  titlesList:res.data,
                  loading:false
              })
          })
          .catch(function (error) {
              console.log(error);
          })        

      axios.post("http://localhost:8888/jobapply/fetchJobLocations.php",dataSentToDB)
          .then(res => {
              console.log(res.data);
              this.setState({
                  locationsList:res.data,
                  loading:false
              })
          })
          .catch(function (error) {
              console.log(error);
          }) 

      axios.post("http://localhost:8888/jobapply/populateApplicantsWithAndWithoutFilter.php",dataSentToDB)
          .then(res => {
              console.log(res.data);
              this.setState({
                  applicantsList:res.data,
                  loading:false
              })
          })
          .catch(function (error) {
              console.log(error);
          })
    }
}

filterHandler = ()=>{
  var statusFilter = document.getElementById("jobStatusDD");
  var titleFilter = document.getElementById("jobTitleDD");
  var locationFilter = document.getElementById("jobLocationDD");
  var visaFilter = document.getElementById("jobVisaDD");
  var sortingFilter = document.getElementById("sortByDD");

  var selectedStatus = statusFilter.value;
  var selectedTitle = titleFilter.value;
  var selectedLocation = locationFilter.value;
  var selectedVisa = visaFilter.value;
  var sortBy = sortingFilter.value;

  const dataSentToDB = {
      selectedStatus:selectedStatus,
      selectedTitle:selectedTitle,
      selectedLocation:selectedLocation,
      selectedVisa:selectedVisa, 
      sortBy:sortBy,
      userId:this.state.userId
  }

  console.log(dataSentToDB);

  axios.post("http://localhost:8888/jobapply/populateApplicantsWithandWithoutFilter.php",dataSentToDB)
      .then(res => {
          console.log(res.data);
          this.setState({
              applicantsList:res.data,
              loading:false
          })
      })
      .catch(function (error){
          console.log(error);
      })
}

  render() {

    const indexOfLastApplicant = this.state.currentPage * this.state.applicantsPerPage;
    const indexOfFirstApplicant = indexOfLastApplicant - this.state.applicantsPerPage;
    var currentApplicants;
    if(this.state.applicantsList.length>0){
        currentApplicants = this.state.applicantsList.slice(indexOfFirstApplicant, indexOfLastApplicant);
        var applicants = currentApplicants.map((eachApplicant) => (<ApplicantsListings key={eachApplicant.jobid+eachApplicant.firstname+eachApplicant.lastname} applicantData={eachApplicant}/>));
        var paging = (
            <Pagination
                jobsPerPage={this.state.applicantsPerPage}
                totalJobs={this.state.applicantsList.length}
                paginate={this.paginate}
                curNumber={this.state.currentPage}
            />);
    }
    else if(this.state.loading){
        applicants = <Loader type="ThreeDots" color="#2BAD60" height="100" width="100"/>
    }
    else{
        applicants = (<h4>No Applicants Available</h4>);
    }
    let titleDD, locDD;
    if (this.state.titlesList.length > 0) {
      titleDD = this.state.titlesList.map((title) => {
        return(
          <option value={title.jobtitle}>{title.jobtitle}</option>
        )
      });
    }

    if (this.state.locationsList.length > 0) {
      locDD = this.state.locationsList.map((loc) => {
        return(
          <option value={loc.joblocation}>{loc.joblocation}</option>
        )
      });
    }

    return (
      <Auxillary>
        <MainHeader userName={this.state.userName}
                    isHR={this.state.isHR}/>
        <Container fluid className={classes.mainContainer}>
            <Row>
                <Col className={classes.searchContainer} sm={3}>
                    <Button className={classes.applyFilterBtn} variant="outline-success"
                    onClick={this.filterHandler}>
                        Apply Filters</Button>
                </Col>
                <Col className={classes.searchContainer} sm={9}>
                  <Row>
                    <Col sm={9}>
                      <h4 className={classes.subHeading}>List of All the Applicants</h4>
                    </Col>
                    <Col sm={3}>
                      <h5 className={classes.displayCount}>{this.state.applicantsList.length} results</h5>
                    </Col>
                  </Row>
                </Col>
            </Row>
            <Row>
                <Col className={classes.filterContainer} sm={3}>
                <Accordion defaultActiveKey="0">
                <Card>
                    <Accordion.Toggle className={classes.filterCard} as={Card.Header} eventKey="0">
                    Job Title
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                    <Card.Body>
                    <Form.Control as="select" defaultValue="allTitles" name="jobTitle" id="jobTitleDD">
                      <option value="allTitles"> All Job Titles </option>
                      {titleDD}
                    </Form.Control>
                    </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Accordion.Toggle className={classes.filterCard} as={Card.Header} eventKey="1">
                    Job Location
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="1">
                    <Card.Body>
                        <Form.Control as="select" defaultValue="allLocations" name="jobLocation" id="jobLocationDD">
                          <option value="allLocations">All Locations</option>
                          {locDD}
                        </Form.Control>
                    </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Accordion.Toggle className={classes.filterCard} as={Card.Header} eventKey="2">
                    Sponsorship Required
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="2">
                    <Card.Body>
                        <Form.Control as="select" defaultValue="allVisa" name="Visa" id="jobVisaDD">
                            <option value="allVisa">All</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </Form.Control>
                    </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Accordion.Toggle className={classes.filterCard} as={Card.Header} eventKey="3">
                    Applicant's Status
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="3">
                    <Card.Body>
                    <Form.Control as="select" defaultValue="Under Review" name="jobStatus" id="jobStatusDD">
                            <option value="Under Review">Under Review</option>
                            <option value="Accepted">Accepted</option>
                            <option value="Rejected">Rejected</option>
                        </Form.Control>
                    </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Accordion.Toggle className={classes.filterCard} as={Card.Header} eventKey="4">
                    Sort By
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="4">
                    <Card.Body>
                    <Form.Control as="select" defaultValue="name" name="sortBy" id="sortByDD">
                      <option value="name"> Applicant's Name </option>
                      <option value="jobid"> Job Id </option>
                      <option value="date"> Applied Date </option>
                    </Form.Control>
                    </Card.Body>
                    </Accordion.Collapse>
                </Card>
                </Accordion>
                </Col>
                <Col className={classes.jobContainer} sm={9}>
                  <ApplicantHeader/>
                  {applicants}
                  {paging}
                </Col>
            </Row>
        </Container>
      </Auxillary>
    );
  }
}

export default ViewApplicants;