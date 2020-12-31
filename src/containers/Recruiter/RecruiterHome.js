import React, { Component } from 'react';
import Auxillary from '../../hoc/Auxillary';
import classes from './RecruiterHome.css';
import RecruiterJobsListings from './RecruiterJobsListings';
import Pagination from '../../components/Pagination';
import MainHeader from '../../components/MainHeader';
import JobHeader from '../../components/JobHeader';
import axios from 'axios';
import Loader from 'react-loader-spinner';
import {Container, Col, Row, Button, Form, FormControl, Card, Accordion} from 'react-bootstrap';

class RecruiterHome extends Component{
    state={
        userName: '',
        userId:'',
        userEmail: '',
        isHR: 1,
        jobsList:[],
        titlesList:[],
        locationsList:[],
        currentPage:1,
        jobsPerPage:5,
        searchText:"",
        active:1,
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
                selectedStatus:1,
                selectedType:"allTypes",
                sortBy:"jobid",
                searchText:'',
                userId:userData.userId
            }
        
            this.setState({
                titlesList:[],
                locationsList:[],
                jobsList:[],
                searchText: '',
                active: 1
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
        
            axios.post("http://localhost:8888/jobapply/populatePostedJobsWithAndWithoutFilter.php",dataSentToDB)
                .then(res => {
                    console.log(res.data);
                    this.setState({
                        jobsList:res.data,
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
        var typeFilter = document.getElementById("jobTypeDD");
        var sortingFilter = document.getElementById("sortByDD");
        var searchFilter = document.getElementById("searchText");
      
        var selectedStatus = statusFilter.value;
        var selectedTitle = titleFilter.value;
        var selectedLocation = locationFilter.value;
        var selectedVisa = visaFilter.value;
        var selectedType = typeFilter.value;
        var sortBy = sortingFilter.value;
        var searchText = searchFilter.value;
      
        const dataSentToDB = {
            selectedStatus:selectedStatus,
            selectedTitle:selectedTitle,
            selectedLocation:selectedLocation,
            selectedVisa:selectedVisa,
            selectedType:selectedType,
            sortBy:sortBy,
            searchText:searchText,
            userId:this.state.userId
        }
      
        console.log(dataSentToDB);
      
        axios.post("http://localhost:8888/jobapply/populatePostedJobsWithandWithoutFilter.php",dataSentToDB)
            .then(res => {
                console.log(res.data);
                this.setState({
                    jobsList:res.data,
                    loading:false
                })
                if(res.data[0]) {
                    this.setState({
                        active:res.data[0].isactive
                    })
                }
            })
            .catch(function (error){
                console.log(error);
            })
    }

    render(){

        const indexOfLastJob = this.state.currentPage * this.state.jobsPerPage;
        const indexOfFirstJob = indexOfLastJob - this.state.jobsPerPage;
        var currentJobs;
        if(this.state.jobsList.length>0){
            currentJobs = this.state.jobsList.slice(indexOfFirstJob, indexOfLastJob);
            var jobs = currentJobs.map((eachJob) => (<RecruiterJobsListings key={eachJob.jobid} jobData={eachJob}/>));
            var paging = (
                <Pagination
                    jobsPerPage={this.state.jobsPerPage}
                    totalJobs={this.state.jobsList.length}
                    paginate={this.paginate}
                    curNumber={this.state.currentPage}
                />);
        }
        else if(this.state.loading){
            jobs = <Loader type="ThreeDots" color="#2BAD60" height="100" width="100"/>
        }
        else{
            jobs = (<h4>No Jobs Posted</h4>);
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

        if(this.state.active == 1){
            var heading = "All Posted";
        } else {
            var heading = "Archieved";
        }
        return(
            <Auxillary>
                <MainHeader userName={this.state.userName}
                            isHR={this.state.isHR}/>
                <Container fluid className={classes.mainContainer}>
                    <Row>
                        <Col className={classes.searchContainer} sm={3}>
                            <Button  variant="outline-success"
                            onClick={this.filterHandler}>
                                Apply Filters</Button>
                        </Col>
                        <Col className={classes.searchContainer} sm={9}>
                            <Row>
                                <Col sm={9}>
                                    <Row>
                                        <Col sm={6}><h4 className={classes.subHeading}>List of {heading} Jobs</h4>
                                        </Col>
                                        <Col sm={6}>
                                            <Form className={classes.searchBox} inline>
                                                <FormControl type="text" id="searchText" placeholder="Search job title.." className={classes.searchInput} />
                                                <Button onClick={this.filterHandler} variant="outline-success">Search</Button>
                                            </Form>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col sm={3}>
                                <h5 className={classes.displayCount}>{this.state.jobsList.length} results</h5>
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
                            Job Type
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="2">
                            <Card.Body>
                                <Form.Control as="select" defaultValue="allTypes" name="Type" id="jobTypeDD">
                                    <option value="allTypes">All</option>
                                    <option value="Full-Time">Full-Time</option>
                                    <option value="Part-Time">Part-Time</option>
                                    <option value="Intern">Intern</option>
                                </Form.Control>
                            </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card>
                            <Accordion.Toggle className={classes.filterCard} as={Card.Header} eventKey="3">
                            Sponsorship Required
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="3">
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
                            <Accordion.Toggle className={classes.filterCard} as={Card.Header} eventKey="4">
                            Job Status
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="4">
                            <Card.Body>
                                <Form.Control as="select" defaultValue="1" name="jobStatus" id="jobStatusDD">
                                    <option value="1">Active Jobs</option>
                                    <option value="0">Archieved Jobs</option>
                                </Form.Control>
                            </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card>
                            <Accordion.Toggle className={classes.filterCard} as={Card.Header} eventKey="5">
                            Sort By
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="5">
                            <Card.Body>
                                <Form.Control as="select" defaultValue="jobid" name="sortBy" id="sortByDD">
                                    <option value="jobid"> Job Id </option>
                                    <option value="date"> Posted Date </option>
                                </Form.Control>
                            </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        </Accordion>
                        </Col>
                        <Col className={classes.jobContainer} sm={9}>
                        <JobHeader callFromRecruiter={true}/>
                        {jobs}
                        {paging}
                        </Col>
                    </Row>
                </Container>
            </Auxillary>
        );
    }
}

export default RecruiterHome;