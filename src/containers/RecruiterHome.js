import React, { Component } from 'react';
import Auxillary from '../hoc/Auxillary';
import classes from './RecruiterHome.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import RecruiterJobsListings from './RecruiterJobsListings';
import Pagination from '../components/Pagination';
import JobHeader from '../components/JobHeader';
import axios from 'axios';
import Loader from 'react-loader-spinner';

class RecruiterHome extends Component{

    state={
        jobsPosted:[],
        currentPage:1,
        jobsPerPage:3,
        loading:true
    }

    paginate = (pageNumber) =>{
        this.setState({
            currentPage:pageNumber
        })
    }

    filterHanlder = ()=>{
        var titleFilter = document.getElementById("jobTitleDD");
        var locationFilter = document.getElementById("jobLocationDD");
        var visaFilter = document.getElementById("jobVisaDD");

        var selectedTitle = titleFilter.value;
        var selectedLocation = locationFilter.value;
        var selectedVisa = visaFilter.value;
        var searchText = document.getElementById("searchTxtBox").value;

        const dataSentToDB = {
            selectedTitle:selectedTitle,
            selectedLocation:selectedLocation,
            selectedVisa:selectedVisa, 
            userId:1,
            searchText:searchText
        }

        console.log(dataSentToDB);

        axios.post("http://localhost:8888/jobapply/populatePostedJobsWithandWithoutFilter.php",dataSentToDB)
            .then(res => {
                console.log(res.data);
                this.setState({
                    jobsPosted:res.data,
                    loading:false
                })
            })
            .catch(function (error){
                console.log(error);
            })
    }


    componentDidMount = () =>{
        const dataSentToDB = {
            selectedTitle:"allTitles",
            selectedLocation:"allLocations",
            selectedVisa:"allVisa", 
            userId:1,
            searchText:"dummy"
        }
        
        axios.post("http://localhost:8888/jobapply/populatePostedJobsWithandWithoutFilter.php",dataSentToDB)
            .then(res => {
                console.log(res.data);
                this.setState({
                    jobsPosted:res.data,
                    loading:false
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    callBackToRecruiterJobsListings = (btnId,whichBtn) =>{
        var allJobs = this.state.jobsPosted;
        if(whichBtn==="remove"){
            for(var i=0;i<allJobs.length;i++){
                if(allJobs[i].jobId===btnId){
                    allJobs[i].isActive = '0';
                    break;
                }
            }
            this.setState({
                jobsPosted : allJobs,
                loading:false
            })
        }
    }

    render(){
        const indexOfLastJob = this.state.currentPage * this.state.jobsPerPage;
        const indexOfFirstJob = indexOfLastJob - this.state.jobsPerPage;
        var currentJobs;
        if(this.state.jobsPosted.length>0){
            currentJobs = this.state.jobsPosted.slice(indexOfFirstJob, indexOfLastJob);
            var jobs = currentJobs.map((eachJob) => (<RecruiterJobsListings key={eachJob.jobId} jobData={eachJob} CallBack = {this.callBackToRecruiterJobsListings}/>))
            var paging = (
                <Pagination 
                    jobsPerPage={this.state.jobsPerPage} 
                    totalJobs={this.state.jobsPosted.length} 
                    paginate={this.paginate} 
                    curNumber={this.state.currentPage} />);
        }
        else if(this.state.loading){
            jobs = <Loader type="ThreeDots" color="#2BAD60" height="100" width="100" className={classes.loader}/>
        }
        else{
            jobs = (<h1 className={classes.noJobs}>No Jobs Posted</h1>);
        }
        return(
            <Auxillary>

                <div className={classes.searchContainer}>
                    <input className={classes.inputFields} placeholder="Search..."/>
                    <div className={classes.searchIcon}>
                        <FontAwesomeIcon icon={faSearch} size="1x"/>
                    </div>
                </div>

                <div className={classes.filterContainer}>
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

                <div className={classes.jobsContainer}>
                    <div className={classes.jobId}>
                        <h3 className={classes.headers}>ID</h3>
                    </div>
                    <div className={classes.jobLocation}>
                        <h3 className={classes.headers}>Location</h3>
                    </div>
                    <div className={classes.jobTitle}>
                        <h3 className={classes.headers}>Title</h3>
                    </div>
                    <div className={classes.jobRequirements}>
                        <h3 className={classes.headers}>Requirements</h3>
                    </div>
                    <div className={classes.jobVisa}>
                        <h3 className={classes.headers}>Visa</h3>
                    </div>
                </div>
                {jobs}
                {paging}
            </Auxillary>
        );
    }
}

export default RecruiterHome;