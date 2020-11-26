import React, { Component } from 'react';
import Auxillary from '../hoc/Auxillary';
import classes from './CandidateHome.css';
// import JobsListings from './JobsListings';
import AllListings from './AllListings';
import Pagination from '../components/Pagination';
import JobHeader from '../components/JobHeader';
import Menu from '../components/Menu';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Loader from 'react-loader-spinner';

class CandidateHome extends Component{
    state={
        // jobsAvailable:[
        //     {
        //         jobId:1001,
        //         jobCompany:'Amazon',
        //         jobTitle:'Software Developer',
        //         jobRequirements:"Requirements 1",
        //         jobVisa:'Yes'
        //     },
        //     {
        //         jobId:1002,
        //         jobCompany:'Facebook',
        //         jobTitle:'Machine Learning',
        //         jobRequirements:"Requirements 2",
        //         jobVisa:'Yes'
        //     },
        //     {
        //         jobId:1003,
        //         jobCompany:'Google',
        //         jobTitle:'Database Engineer',
        //         jobRequirements:"Requirements 3",
        //         jobVisa:'Yes'
        //     },
        //     {
        //         jobId:1004,
        //         jobCompany:'Netflix',
        //         jobTitle:'Content Creator',
        //         jobRequirements:"Requirements 4",
        //         jobVisa:'Yes'
        //     },
        //     {
        //         jobId:1005,
        //         jobCompany:'TCS',
        //         jobTitle:'Systems Engineer',
        //         jobRequirements:"Requirements 5",
        //         jobVisa:'Yes'
        //     },
        //     {
        //         jobId:1006,
        //         jobCompany:'Citadel',
        //         jobTitle:'Machine Learning',
        //         jobRequirements:"Requirements 6",
        //         jobVisa:'Yes'
        //     },
        //     {
        //         jobId:1007,
        //         jobCompany:'Oracle',
        //         jobTitle:'Data Engineer',
        //         jobRequirements:"Requirements 7",
        //         jobVisa:'Yes'
        //     },
        //     {
        //         jobId:1008,
        //         jobCompany:'IBM',
        //         jobTitle:'Database Designer',
        //         jobRequirements:"Requirements 8",
        //         jobVisa:'Yes'
        //     },
        // ],
        jobsAvailable:[],
        currentPage:1,
        jobsPerPage:3,
        loading:true
    }

    paginate = (pageNumber) =>{
        this.setState({
            currentPage:pageNumber
        })
    } 

    callBackToJobsListings = (disabledBtn,btnId,whichBtn) =>{
        var allJobs = this.state.jobsAvailable;
        if(whichBtn==="apply"){
            for(var i=0;i<allJobs.length;i++){
                if(allJobs[i].jobId===btnId){
                    allJobs[i].isApplyDisabled = true;
                    break;
                }
            }
            this.setState({
                jobsAvailable : allJobs
            })
        }
        else{
            for(var k=0;k<allJobs.length;k++){
                if(allJobs[k].jobId===btnId){
                    allJobs[k].isSaveDisabled = true;
                    break;
                }
            }
            this.setState({
                jobsAvailable : allJobs
            })
        }   
    }

    filterHanlder = ()=>{
        var companyFilter = document.getElementById("jobCompanyDD");
        var titleFilter = document.getElementById("jobTitleDD");
        var locationFilter = document.getElementById("jobLocationDD");
        var visaFilter = document.getElementById("jobVisaDD");

        var selectedCompany = companyFilter.value;
        var selectedTitle = titleFilter.value;
        var selectedLocation = locationFilter.value;
        var selectedVisa = visaFilter.value;
        var searchText = document.getElementById("searchTxtBox").value;

        const dataSentToDB = {
            selectedCompany:selectedCompany,
            selectedTitle:selectedTitle,
            selectedLocation:selectedLocation,
            selectedVisa:selectedVisa, 
            userId:1,
            searchText:searchText
        }

        console.log(dataSentToDB);

        axios.post("http://localhost:8888/jobapply/populateJobsWithandWithoutFilter.php",dataSentToDB)
            .then(res => {
                console.log(res.data);
                this.setState({
                    jobsAvailable:res.data,
                    loading:false
                })
            })
            .catch(function (error){
                console.log(error);
            })
    }

    componentDidMount = () =>{
        
        const dataSentToDB = {
            selectedCompany:"allCompanies",
            selectedTitle:"allTitles",
            selectedLocation:"allLocations",
            selectedVisa:"allVisa", 
            userId:1,
            searchText:"dummy"
        }
        
        axios.post("http://localhost:8888/jobapply/populateJobsWithandWithoutFilter.php",dataSentToDB)
            .then(res => {
                console.log(res.data);
                this.setState({
                    jobsAvailable:res.data,
                    loading:false
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    searchHandler = () =>{
        var searchText = document.getElementById("searchTxtBox").value;
        console.log(searchText);
    }

    render(){
        const indexOfLastJob = this.state.currentPage * this.state.jobsPerPage;
        const indexOfFirstJob = indexOfLastJob - this.state.jobsPerPage;
        var currentJobs;
        if(this.state.jobsAvailable.length>0){
            currentJobs = this.state.jobsAvailable.slice(indexOfFirstJob, indexOfLastJob);
            // var jobs = currentJobs.map((eachJob) => (<JobsListings key={eachJob.jobId} jobData={eachJob} CallBack = {this.callBackToJobsListings}/>));
            var jobs = currentJobs.map((eachJob) => (<AllListings key={eachJob.jobId} jobData={eachJob} CallBack = {this.callBackToJobsListings} candidateHome = {true}/>));
            var paging = (
                <Pagination
                    jobsPerPage={this.state.jobsPerPage}
                    totalJobs={this.state.jobsAvailable.length}
                    paginate={this.paginate}
                    curNumber={this.state.currentPage}
                />);
        }
        else if(this.state.loading){
            jobs = <Loader type="ThreeDots" color="#2BAD60" height="100" width="100" className={classes.loader}/>
        }
        else{
            jobs = (<h1 className={classes.noJobs}>No Jobs Available</h1>);
        }
        return(
            <Auxillary>
                <Menu />

                <div className={classes.searchContainer}>
                    <input className={classes.inputFields} id = "searchTxtBox" placeholder="Search..."/>
                    <div className={classes.searchIcon} onClick={this.searchHandler}>
                        <FontAwesomeIcon icon={faSearch} size="1x"/>
                    </div>
                </div>

                <div className={classes.filterContainer}>
                    <div>
                        <select name="jobCompany" id="jobCompanyDD" className={classes.dropdown}>
                            <option value="allCompanies">Company</option>
                            <option value="amazon">Amazon</option>
                            <option value="facebook">Facebook</option>
                            <option value="google">Google</option>
                            <option value="netflix">Netflix</option>
                        </select>
                    </div>
                    <div>
                        <select name="jobTitle" id="jobTitleDD" className={classes.dropdown}>
                            <option value="allTitles">Title</option>
                            <option value="software Developer">Software Developer</option>
                            <option value="Machine Learning">Machine Learning</option>
                            <option value="Data Science">Data Science</option>
                            <option value="Business Analytics">Business Analytics</option>
                        </select>
                    </div>
                    <div>
                        <select name="jobLocation" id="jobLocationDD" className={classes.dropdown}>
                            <option value="allLocations">Location</option>
                            <option value="seattle">Seattle</option>
                            <option value="california">California</option>
                            <option value="Texas">Texas</option>
                            <option value="NewYork">New York</option>
                        </select>
                    </div>
                    <div>
                        <select name="Visa" id="jobVisaDD" className={classes.dropdown}>
                            <option value="allVisa">Visa Sponsorship</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                    <div>
                        <button 
                            className={classes.applyFilterBtn}
                            onClick={this.filterHanlder}
                            >Apply Filters</button>
                    </div>
                </div>
                
                <JobHeader />

                {/* { currentJobs.map((eachJob) => (<JobsListings key={eachJob.jobId} jobData={eachJob} CallBack = {this.callBackToJobsListings}/>))}
                
                <Pagination
                    jobsPerPage={this.state.jobsPerPage}
                    totalJobs={this.state.jobsAvailable.length}
                    paginate={this.paginate}
                    curNumber={this.state.currentPage}
                /> */}

                {jobs}
                {paging}
            </Auxillary>
        );
    }
}

export default CandidateHome;