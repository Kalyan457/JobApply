import React, {Component} from 'react';
import Auxillary from '../hoc/Auxillary';
import classes from './AllListings.css';
import axios from 'axios';

class allListings extends Component{
       
    applyBtnHandler = (jobId) =>{        
        this.props.CallBack(true,jobId,"apply");
        //alert("You applied to the jobId: "+jobId);
        var userData = JSON.parse(sessionStorage.getItem('userData'));
        
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd;

        const dataSentToDB = {
            userId:userData.userId,
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

        axios.post("http://localhost:8888/jobapply/deleteSavedJobs.php",dataSentToDB)
            .then(res => {
                console.log(res.data);
            })
            .catch(function (error){
                console.log(error);
            })
    }

    saveBtnHandler = (jobId) =>{
        this.props.CallBack(true,jobId,"save");
        //alert("You saved the jobId: "+jobId);
        var userData = JSON.parse(sessionStorage.getItem('userData'));
        
        const dataSentToDB = {
            userId: userData.userId,
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
    
    removeBtnHandler = (jobId) =>{
        this.props.CallBack(true, jobId,"remove");
        //alert("You unsaved the jobId: "+jobId);
        var userData = JSON.parse(sessionStorage.getItem('userData'));
        
        const dataSentToDB = {
            userId: userData.userId,
            jobId:jobId,
        }

        axios.post("http://localhost:8888/jobapply/deleteSavedJobs.php",dataSentToDB)
            .then(res => {
                console.log(res.data);
            })
            .catch(function (error){
                console.log(error);
            })
    }

    render(){
        var requirementsArray = new Array();
        console.log(this.props.jobData);
        requirementsArray = this.props.jobData.jobrequirements.split(".");
        if(requirementsArray.length>1){
            requirementsArray.splice(-1,1);
        }
        console.log(requirementsArray);
        var requirementsOutput="<ul>";
        for (var i = 0; i < requirementsArray.length; i++) {
            requirementsOutput += "<li>"+ requirementsArray[i] + "</li>";
        }
        requirementsOutput+= "</ul>";
        var jobRequirements = <p style={{textAlign:"initial"}}   dangerouslySetInnerHTML={{__html: requirementsOutput}} />;
        
        var button1;
        var button2;
        if(this.props.candidateHome){
            var button1 = (
                <button 
                    className={this.props.jobData.isApplyDisabled ? classes.applyBtnDisabled : classes.applyBtn}
                    id={this.props.jobData.jobid+"apply"}
                    disabled = {this.props.jobData.isApplyDisabled}
                    onClick={this.applyBtnHandler.bind(this,this.props.jobData.jobid)}
                   >{this.props.jobData.isApplyDisabled ? "Applied" : "Apply"}</button> );
            var button2 = (
                <button 
                    className={this.props.jobData.isSaveDisabled ? classes.saveBtnDisabled : classes.saveBtn}
                    id={this.props.jobData.jobid+"save"}
                    disabled = {this.props.jobData.isSaveDisabled}
                    onClick={this.saveBtnHandler.bind(this,this.props.jobData.jobid)}
                    >{this.props.jobData.isSaveDisabled ? "Saved" : "Save"}</button> );
        }
        else if(this.props.savedApplications){
            console.log("here");
            console.log(this.props.jobData);
            var button1 = (
                <button 
                    className={this.props.jobData.isApplyDisabled ? classes.applyBtnDisabled : classes.applyBtn}
                    id={this.props.jobData.jobid+"apply"}
                    disabled={this.props.jobData.isApplyDisabled}
                    onClick={this.applyBtnHandler.bind(this,this.props.jobData.jobid)}
                    >{this.props.jobData.isApplyDisabled ? "Applied" : "Apply"}</button>  );
            var button2 = (
                <button 
                    className={this.props.jobData.isSaveDisabled ? classes.removeBtnDisabled : classes.removeBtn}
                    id={this.props.jobData.jobid}
                    disabled={this.props.jobData.isSaveDisabled}
                    onClick={this.removeBtnHandler.bind(this,this.props.jobData.jobid)}
                    >Remove</button> );
        }
        else if(this.props.trackApplications){
            console.log(this.props);
            var button1 = (
                <label className={classes.jobStatus}>{this.props.jobData.jobstatus}</label>
            );
        }
        
        return(
            <Auxillary>
                <div className={classes.jobsList}>
                    <div className={classes.jobId}>
                        <div className={classes.jobDetMob}>
                            <p className={classes.pTags}>Job Id</p>
                        </div>
                        <div>
                            <p className={classes.pTags}>{this.props.jobData.jobid}</p>
                        </div>
                    </div>
                    <div className={classes.jobCompany}>
                        <div className={classes.jobDetMob}>
                            <p>Company</p>
                        </div>
                        <div>
                            <p className={classes.pTags}>{this.props.jobData.companyname}</p>
                        </div>
                    </div>
                    <div className={classes.jobTitle}>
                        <div className={classes.jobDetMob}>
                            <p>Title</p>
                        </div>
                        <div>
                            <p className={classes.pTags}>{this.props.jobData.jobtitle}</p>
                        </div>
                    </div>
                    <div className={classes.jobLocation}>
                        <div className={classes.jobDetMob}>
                            <p>Location</p>
                        </div>
                        <div>
                            <p className={classes.pTags}>{this.props.jobData.joblocation}</p>
                        </div>
                    </div>
                    <div className={classes.jobRequirements}>
                        <div className={classes.jobDetMob}>
                            <p>Requirements</p>
                        </div>
                        {jobRequirements}
                    </div>
                    <div className={classes.postedDate}>
                        <div className={classes.jobDetMob}>
                            <p>Posted On</p>
                        </div>
                        <div>
                            <p className={classes.pTags}>{this.props.jobData.posteddate}</p> 
                        </div>
                    </div>
                    <div className={classes.jobVisa}>
                        <div className={classes.jobDetMob}>
                            <p>Sponsor Visa</p>
                        </div>
                        <div>
                            <p className={classes.pTags}>{this.props.jobData.visasponser}</p>
                        </div>
                    </div>
                </div>
                {button1}
                {button2}
            </Auxillary>
        );
    }
}

export default allListings;