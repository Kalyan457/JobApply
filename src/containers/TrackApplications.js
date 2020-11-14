import React, {Component} from 'react';
import Auxillary from '../hoc/Auxillary';
import TrackJobsListings from './TrackJobsListings';
import Pagination from '../components/Pagination';
import JobHeader from '../components/JobHeader';
import Menu from '../components/Menu';
import axios from 'axios';

class TrackApplications extends Component{
    state={
        appliedJobs :[],
        currentPage:1,
        jobsPerPage:2,

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
                    appliedJobs:res.data
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
            var codeIs = currentJobs.map((eachJob) =>(<TrackJobsListings key={eachJob.jobId} jobData={eachJob} />))
        }
        return(
            <Auxillary>
                <Menu />
                <JobHeader noFilterSearch={true}/>
                {codeIs}
                <Pagination
                    jobsPerPage={this.state.jobsPerPage}
                    totalJobs={this.state.appliedJobs.length}
                    paginate={this.paginate}
                    curNumber = {this.state.currentPage}
                />
            </Auxillary>
        );
    }
}

export default TrackApplications;