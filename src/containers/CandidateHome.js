import React, { Component } from 'react';
import Auxillary from '../hoc/Auxillary';
import classes from './CandidateHome.css';
import JobsListings from './JobsListings';
import Pagination from '../components/Pagination';

class CandidateHome extends Component{
    state={
        jobsAvailable:[
            {
                jobId:1001,
                jobCompany:'Amazon',
                jobTitle:'Software Developer',
                jobRequirements:"Requirements 1",
                jobVisa:'Yes'
            },
            {
                jobId:1002,
                jobCompany:'Facebook',
                jobTitle:'Machine Learning',
                jobRequirements:"Requirements 2",
                jobVisa:'Yes'
            },
            {
                jobId:1003,
                jobCompany:'Google',
                jobTitle:'Database Engineer',
                jobRequirements:"Requirements 3",
                jobVisa:'Yes'
            },
            {
                jobId:1004,
                jobCompany:'Netflix',
                jobTitle:'Content Creator',
                jobRequirements:"Requirements 4",
                jobVisa:'Yes'
            },
            {
                jobId:1005,
                jobCompany:'TCS',
                jobTitle:'Systems Engineer',
                jobRequirements:"Requirements 5",
                jobVisa:'Yes'
            },
            {
                jobId:1006,
                jobCompany:'Citadel',
                jobTitle:'Machine Learning',
                jobRequirements:"Requirements 6",
                jobVisa:'Yes'
            },
            {
                jobId:1007,
                jobCompany:'Oracle',
                jobTitle:'Data Engineer',
                jobRequirements:"Requirements 7",
                jobVisa:'Yes'
            },
            {
                jobId:1008,
                jobCompany:'IBM',
                jobTitle:'Database Designer',
                jobRequirements:"Requirements 8",
                jobVisa:'Yes'
            },
        ],
        currentPage:1,
        jobsPerPage:2,

    }

    paginate = (pageNumber) =>{
        this.setState({
            currentPage:pageNumber
        })
    } 

    render(){
        const indexOfLastJob = this.state.currentPage * this.state.jobsPerPage;
        const indexOfFirstJob = indexOfLastJob - this.state.jobsPerPage;
        const currentJobs = this.state.jobsAvailable.slice(indexOfFirstJob, indexOfLastJob);
        return(
            <Auxillary>
                <div className={classes.searchContainer}>
                    <input type="text" className={classes.inputFields}/>
                    <button>Search</button>
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
                        <button className={classes.applyFilterBtn}>Apply Filters</button>
                    </div>
                </div>
                <div className={classes.jobsContainer}>
                    <div className={classes.jobId}>
                        <h3>Job ID</h3>
                    </div>
                    <div className={classes.jobCompany}>
                        <h3>Company</h3>
                    </div>
                    <div className={classes.jobTitle}>
                        <h3>Job Title</h3>
                    </div>
                    <div className={classes.jobRequirements}>
                        <h3>Job Requirements</h3>
                    </div>
                    <div className={classes.jobVisa}>
                        <h3>Visa</h3>
                    </div>
                </div>
                {/* Looping through the jobslistings in state*/}
                {/* { this.state.jobsAvailable.map((eachJob) => (<JobsListings key={eachJob.jobId} jobData={eachJob} />))} */}
                {/* <JobsListings jobData = {this.state.jobsAvailable}/> */}
                <JobsListings jobData = {currentJobs}/>
                <Pagination
                    jobsPerPage={this.state.jobsPerPage}
                    totalJobs={this.state.jobsAvailable.length}
                    paginate={this.paginate}
                />
            </Auxillary>
        );
    }
}

export default CandidateHome;