import React, { Component } from 'react';
import Auxillary from '../../hoc/Auxillary';
import classes from './CandidateHome.css';
import AllListings from '../../components/AllListings';
import Pagination from '../../components/Pagination';
import JobHeader from '../../components/JobHeader';
import MainHeader from "../../components/MainHeader";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Loader from 'react-loader-spinner';
import {Redirect} from 'react-router-dom';


class CandidateHome extends Component{
    state={
        jobsAvailable:[],
        currentPage:1,
        jobsPerPage:3,
        loading:true,
        userName:'',
        userId:'',
        isHR: 0
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
                if(allJobs[i].jobid===btnId){
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
                if(allJobs[k].jobid===btnId){
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
            userId:this.state.userId,
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
                ...this.state,
                userName:userData.firstname,
                userId:userData.userId,
                isHR:userData.isHR
            })
            const dataSentToDB = {
                selectedCompany:"allCompanies",
                selectedTitle:"allTitles",
                selectedLocation:"allLocations",
                selectedVisa:"allVisa", 
                userId:userData.userId,
                searchText:""
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
                .catch(function (error) {
                    console.log(error);
                })

        }
    }

    clearFilterHanlder = () =>{
        var companyFilter = document.getElementById("jobCompanyDD");
        var titleFilter = document.getElementById("jobTitleDD");
        var locationFilter = document.getElementById("jobLocationDD");
        var visaFilter = document.getElementById("jobVisaDD");
        var searchText = document.getElementById("searchTxtBox");

        companyFilter.value="allCompanies";
        titleFilter.value="allTitles";
        locationFilter.value="allLocations";
        visaFilter.value="allVisa";
        searchText.value="";
    }

    render(){
        // console.log(this.state);
        const indexOfLastJob = this.state.currentPage * this.state.jobsPerPage;
        const indexOfFirstJob = indexOfLastJob - this.state.jobsPerPage;
        var currentJobs;
        if(this.state.jobsAvailable.length>0){
            currentJobs = this.state.jobsAvailable.slice(indexOfFirstJob, indexOfLastJob);
            var jobs = currentJobs.map((eachJob) => (<AllListings key={eachJob.jobid} jobData={eachJob} CallBack = {this.callBackToJobsListings} candidateHome = {true}/>));
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
        console.log(this.state.isHR);
        return(
            <Auxillary>
                <MainHeader userName={this.state.userName}
                            isHR={this.state.isHR}/>

                <div className={classes.searchContainer}>
                    <input className={classes.inputFields} id = "searchTxtBox" placeholder="Search..."/>
                    <div className={classes.searchIcon} onClick={this.filterHanlder}>
                        <FontAwesomeIcon icon={faSearch} size="1x"/>
                    </div>
                </div>

                <div className={classes.filterContainer}>
                    <div>
                        <select name="jobCompany" id="jobCompanyDD" className={classes.dropdown}>
                            <option value="allCompanies">Company</option>
                            <option value="Apple">Apple</option>
                            <option value="Amazon">Amazon</option>
                            <option value="Facebook">Facebook</option>
                            <option value="Google">Google</option>
                            <option value="Oracle">Oracle</option>
                        </select>
                    </div>
                    <div>
                        <select name="jobTitle" id="jobTitleDD" className={classes.dropdown}>
                            <option value="allTitles">Title</option>
                            <option value="Software Developer">Software Developer</option>
                            <option value="FrontEnd Engineer">FrontEnd Developer</option>
                            <option value="BackEnd Engineer">BackEnd Developer</option>
                            <option value="ML Engineer">Machine Learning</option>
                            <option value="Data Science Engineer">Data Science</option>
                            <option value="Business Analytics">Business Analyst</option>
                        </select>
                    </div>
                    <div>
                        <select name="jobLocation" id="jobLocationDD" className={classes.dropdown}>
                            <option value="allLocations">Location</option>
                            <option value="Seattle">Seattle</option>
                            <option value="California">California</option>
                            <option value="Dallas">Dallas</option>
                            <option value="New York">New York</option>
                            <option value="Washington">Washington</option>
                        </select>
                    </div>
                    <div>
                        <select name="Visa" id="jobVisaDD" className={classes.dropdown}>
                            <option value="allVisa">Visa Sponsorship</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                    <div>
                        <button 
                            className={classes.applyFilterBtn}
                            onClick={this.filterHanlder}
                            >Apply Filters</button>
                    </div>
                    <div>
                        <button 
                            className={classes.clearFilterBtn}
                            onClick={this.clearFilterHanlder}
                            >Clear Filters</button>
                    </div>
                </div>
                
                <JobHeader />
                {jobs}
                {paging}
            </Auxillary>
        );
    }
}

export default CandidateHome;