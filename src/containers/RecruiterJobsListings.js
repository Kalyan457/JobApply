import React,{Component} from 'react';
import classes from './RecruiterJobsListings.css';
import Auxillary from '../hoc/Auxillary';
import axios from 'axios';

class RecruiterJobsListings extends Component{

    viewApplicantsBtnHandler = (jobId) =>{
        // should include a db call to populate all applicants for this jobid
        // should be done in viewApplicants page
    }

    removeBtnHandler = (jobId) =>{
        this.props.CallBack(jobId,"remove");
        alert("You removed the jobId: "+jobId);
        
        const dataSentToDB = {
            userId:'1',
            jobId:jobId,
        }

        axios.post("http://localhost:8888/jobapply/disablePostedJobs.php",dataSentToDB)
            .then(res => {
                console.log(res.data);
            })
            .catch(function (error){
                console.log(error);
            })
    }

    render(){
        return(
            <Auxillary>
                <div className={classes.jobsList}>
                    <div className={classes.jobId}>
                        <div className={classes.jobDetMob}>
                            <p>Job Id</p>
                        </div>
                        <div>
                            <p>{this.props.jobData.jobId}</p>
                        </div>
                    </div>
                    <div className={classes.jobLocation}>
                        <div className={classes.jobDetMob}>
                            <p>Location</p>
                        </div>
                        <div>
                            <p>{this.props.jobData.jobLocation}</p>
                        </div>
                    </div>
                    <div className={classes.jobTitle}>
                        <div className={classes.jobDetMob}>
                            <p>Title</p>
                        </div>
                        <div>
                            <p>{this.props.jobData.jobTitle}</p>
                        </div>
                    </div>
                    <div className={classes.jobRequirements}>
                        <div className={classes.jobDetMob}>
                            <p>Requirements</p>
                        </div>
                        <div>
                            <p>{this.props.jobData.jobRequirements}</p> 
                        </div>
                    </div>
                    <div className={classes.jobVisa}>
                        <div className={classes.jobDetMob}>
                            <p>Visa</p>
                        </div>
                        <div>
                            <p>{this.props.jobData.jobVisa}</p>
                        </div>
                    </div>
                </div>
                <button 
                    className={this.props.jobData.isActive == '1' ? classes.viewApplicantsBtn : classes.viewApplicantsBtnDisabled}
                    id={this.props.jobData.jobId}
                    onClick={this.viewApplicantsBtnHandler.bind(this,this.props.jobData.jobId)}
                   >View Applicants</button>                            
                <button 
                    className={this.props.jobData.isActive == '1' ? classes.removeBtn : classes.removeBtnDisabled}
                    id={this.props.jobData.jobId}
                    onClick={this.removeBtnHandler.bind(this,this.props.jobData.jobId)}
                    >{this.props.jobData.isActive == '1' ? "Remove" : "Removed"}</button>
            </Auxillary>
        );
    }
}
export default RecruiterJobsListings;