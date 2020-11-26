import React, {Component} from 'react';
import Auxillary from '../hoc/Auxillary';
import AllListings from './AllListings';
import Pagination from '../components/Pagination';
import JobHeader from '../components/JobHeader';
import Menu from '../components/Menu';
import axios from 'axios';
import classes from './TrackApplications.css';
import Loader from 'react-loader-spinner';

class TrackApplications extends Component{
    state={
        appliedJobs :[],
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
        axios.post("http://localhost:8888/jobapply/trackApplications.php",dataSentToDB)
            .then(res => {
                console.log(res.data);
                this.setState({
                    appliedJobs:res.data,
                    loading:false
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    render(){
        const indexOfLastJob = this.state.currentPage * this.state.jobsPerPage;
        const indexOfFirstJob = indexOfLastJob - this.state.jobsPerPage;
        var currentJobs;
        if(this.state.appliedJobs.length>0){
            currentJobs = this.state.appliedJobs.slice(indexOfFirstJob, indexOfLastJob);
            // var jobs = currentJobs.map((eachJob) =>(<TrackJobsListings key={eachJob.jobId} jobData={eachJob} />));
            var jobs = currentJobs.map((eachJob) =>(<AllListings key={eachJob.jobId} jobData={eachJob} trackApplications = {true} />));
            var paging = (
                <Pagination
                    jobsPerPage={this.state.jobsPerPage}
                    totalJobs={this.state.appliedJobs.length}
                    paginate={this.paginate}
                    curNumber = {this.state.currentPage}
                />
            );
        }
        else if(this.state.loading){
            jobs = <Loader type="ThreeDots" color="#2BAD60" height="100" width="100" className={classes.loader}/>
        }
        else{
            jobs = (<h1 className={classes.noJobs}>No jobs posted</h1>);
        }
        return(
            <Auxillary>
                <Menu />
                <JobHeader noFilterSearch={true} />
                {jobs}
                {paging}
            </Auxillary>
        );
    }
}

export default TrackApplications;