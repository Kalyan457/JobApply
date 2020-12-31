import React, {Component} from 'react';
import Auxillary from '../../hoc/Auxillary';
import AllListings from '../../components/AllListings';
import Pagination from '../../components/Pagination';
import JobHeader from '../../components/JobHeader';
import MainHeader from '../../components/MainHeader';
import axios from 'axios';
import classes from './TrackApplications.css';
import Loader from 'react-loader-spinner';

class TrackApplications extends Component{
    state={
        userName: '',
        userId:'',
        isHR: 0,
        appliedJobs :[],
        currentPage:1,
        jobsPerPage:3,
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
        else if(sessionStorage.getItem('userData').isHR==1){
            this.props.history.push('/recruiterhome');
        }
        else{
            var userData = JSON.parse(sessionStorage.getItem('userData'));
            this.setState({
                // ...this.state,
                userName:userData.firstname,
                userId:userData.userId,
                isHR:userData.isHR
            })
            const dataSentToDB = {
               userId:userData.userId
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
    }

    render(){
        console.log(this.state.appliedJobs);
        const indexOfLastJob = this.state.currentPage * this.state.jobsPerPage;
        const indexOfFirstJob = indexOfLastJob - this.state.jobsPerPage;
        var currentJobs;
        if(this.state.appliedJobs.length>0){
            currentJobs = this.state.appliedJobs.slice(indexOfFirstJob, indexOfLastJob);
            var jobs = currentJobs.map((eachJob) =>(<AllListings key={eachJob.jobid} jobData={eachJob} trackApplications = {true} />));
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
            jobs = (<h4 className={classes.noJobs}>No Jobs Applied</h4>);
        }
        return(
            <Auxillary>
                <MainHeader userName={this.state.userName}/>
                <h4 className={classes.subHeading}>List of Applied Jobs</h4>
                <JobHeader noFilterSearch={true} />
                {jobs}
                {paging}
            </Auxillary>
        );
    }
}

export default TrackApplications;