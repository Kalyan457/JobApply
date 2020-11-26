import React, {Component} from 'react';
import Auxillary from '../hoc/Auxillary';
// import SavedJobsListings from './SavedJobsListings';
import AllListings from './AllListings';
import Pagination from '../components/Pagination';
import JobHeader from '../components/JobHeader';
import Menu from '../components/Menu';
import axios from 'axios';
import classes from './SavedApplications.css';
import Loader from 'react-loader-spinner';

class SavedApplications extends Component{
    state={
        /*savedJobs:[
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
        ],*/
        savedJobs :[],
        currentPage:1,
        jobsPerPage:2,
        loading:true
    }

    paginate = (pageNumber) =>{
        this.setState({
            currentPage:pageNumber
        })
    } 

    componentDidMount = () =>{
        const dataSentToDB = {
           userId:1
        }
        axios.post("http://localhost:8888/jobapply/populateSavedJobs.php",dataSentToDB)
            .then(res => {
                console.log(res.data);
                this.setState({
                    savedJobs:res.data,
                    loading:false
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    callBackToSavedJobsListings = (btnId,whichBtn) =>{
        var allJobs = this.state.savedJobs;
        if(whichBtn==="apply"){
            for(var i=0;i<allJobs.length;i++){
                if(allJobs[i].jobId===btnId){
                    allJobs[i].isApplyDisabled = true;
                    break;
                }
            }
            this.setState({
                savedJobs : allJobs
            })
        }
        else{
            // should include a db call to remove saved jobs from table for this user
            for(var k=0;k<allJobs.length;k++){
                if(allJobs[k].jobId===btnId){
                    allJobs.splice(k,1);
                    break;
                }
            }
            this.setState({
                savedJobs : allJobs
            })
        }   
    }



    render(){
        const indexOfLastJob = this.state.currentPage * this.state.jobsPerPage;
        const indexOfFirstJob = indexOfLastJob - this.state.jobsPerPage;
        var currentJobs;
        if(this.state.savedJobs.length>0){
            currentJobs = this.state.savedJobs.slice(indexOfFirstJob, indexOfLastJob);
            //var jobs = currentJobs.map((eachJob) =>(<SavedJobsListings key={eachJob.jobId} jobData={eachJob} CallBack = {this.callBackToSavedJobsListings}/>))
            var jobs = currentJobs.map((eachJob) =>(<AllListings key={eachJob.jobId} jobData={eachJob} CallBack = {this.callBackToSavedJobsListings} savedApplications = {true}/>))
            var paging = (
                <Pagination
                    jobsPerPage={this.state.jobsPerPage}
                    totalJobs={this.state.savedJobs.length}
                    paginate={this.paginate}
                    curNumber = {this.state.currentPage}
                />
            )
        }
        else if(this.state.loading){
            jobs = <Loader type="ThreeDots" color="#2BAD60" height="100" width="100" className={classes.loader}/>
        }
        else{
            jobs = (<h1 className={classes.noJobs}>No Jobs Saved</h1>);
        }
        return(
            <Auxillary>
                <Menu />
                <JobHeader noFilterSearch={true}/>
                {jobs}
                {paging}
            </Auxillary>
        );
    }
}

export default SavedApplications;