import React, {Component} from 'react';
import Auxillary from '../../hoc/Auxillary';
import AllListings from '../../components/AllListings';
import Pagination from '../../components/Pagination';
import JobHeader from '../../components/JobHeader';
import axios from 'axios';
import classes from './SavedApplications.css';
import Loader from 'react-loader-spinner';
import MainHeader from '../../components/MainHeader';

class SavedApplications extends Component{
    state={
        userName: '',
        userId:'',
        isHR: 0,
        savedJobs :[],
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
                ...this.state,
                userName:userData.firstname,
                userId:userData.userId,
                isHR:userData.isHR
            })
    
            const dataSentToDB = {
               userId:userData.userId
            }
    
            console.log(dataSentToDB);
    
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
    }

    callBackToSavedJobsListings = (disabledBtn,btnId,whichBtn) =>{
        var allJobs = this.state.savedJobs;
        if(whichBtn==="apply"){
            for(var i=0;i<allJobs.length;i++){
                if(allJobs[i].jobid===btnId){
                    allJobs[i].isApplyDisabled = true;
                    break;
                }
            }
            this.setState({
                savedJobs : allJobs
            })
        }
        else{
            for(var k=0;k<allJobs.length;k++){
                if(allJobs[k].jobid===btnId){
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
            var jobs = currentJobs.map((eachJob) =>(<AllListings key={eachJob.jobid} jobData={eachJob} CallBack = {this.callBackToSavedJobsListings} savedApplications = {true}/>))
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
                <MainHeader userName={this.state.userName}/>
                <h4 className={classes.subHeading}>Your Favourite Jobs are here</h4>
                <JobHeader noFilterSearch={true}/>
                {jobs}
                {paging}
            </Auxillary>
        );
    }
}

export default SavedApplications;