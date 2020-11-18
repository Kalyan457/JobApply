import React, {Component} from 'react';
import Auxillary from '../hoc/Auxillary';
import classes from './JobsListings.css';
import axios from 'axios';

class jobsListings extends Component{
       
    applyBtnHandler = (jobId) =>{        
        this.props.CallBack(true,jobId,"apply");
        alert("You applied to the jobId: "+jobId);
        
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd;

        const dataSentToDB = {
            userId:'1',
            jobId:jobId,
            appliedDate: today
        }

        axios.post("http://localhost:8888/jobapply/insertAppliedJobs.php",dataSentToDB)
            .then(res => {
                console.log(res.data);
            })
            .catch(function (error){
                console.log(error);
            })
    }

    saveBtnHandler = (jobId) =>{
        this.props.CallBack(true,jobId,"save");
        alert("You saved the jobId: "+jobId);
        
        const dataSentToDB = {
            userId:'1',
            jobId:jobId,
        }
        console.log(dataSentToDB);
        axios.post("http://localhost:8888/jobapply/insertSavedJobs.php",dataSentToDB)
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
                    <div className={classes.jobCompany}>
                        <div className={classes.jobDetMob}>
                            <p>Company</p>
                        </div>
                        <div>
                            <p>{this.props.jobData.jobCompany}</p>
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
                    className={this.props.jobData.isApplyDisabled ? classes.applyBtnDisabled : classes.applyBtn}
                    id={this.props.jobData.jobId+"apply"}
                    onClick={this.applyBtnHandler.bind(this,this.props.jobData.jobId)}
                   >{this.props.jobData.isApplyDisabled ? "Applied" : "Apply"}</button>                            
                <button 
                    className={this.props.jobData.isSaveDisabled ? classes.saveBtnDisabled : classes.saveBtn}
                    id={this.props.jobData.jobId+"save"}
                    onClick={this.saveBtnHandler.bind(this,this.props.jobData.jobId)}
                    >{this.props.jobData.isSaveDisabled ? "Saved" : "Save"}</button>
            </Auxillary>
        );
    }
}

export default jobsListings;