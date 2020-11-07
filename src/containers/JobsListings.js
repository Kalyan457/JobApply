import React, {Component} from 'react';
import Auxillary from '../hoc/Auxillary';
import classes from './JobsListings.css';

class jobsListings extends Component{



    applyBtnHandler = (jobId) =>{
        console.log(jobId);
        alert("You applied to job: "+jobId);
    }

    saveBtnHandler = (jobId) =>{
        console.log(jobId);
    }

    render(){
        return(
            <Auxillary>
                { this.props.jobData.map((eachJob) => (
                    <div className={classes.jobsList} key={eachJob.jobId}>
                        <div className={classes.jobId}>
                            <div className={classes.jobDetMob}>
                                <p>Job Id</p>
                            </div>
                            <div>
                                <p>{eachJob.jobId}</p>
                            </div>
                        </div>
                        <div className={classes.jobCompany}>
                            <div className={classes.jobDetMob}>
                                <p>Company</p>
                            </div>
                            <div>
                                <p>{eachJob.jobCompany}</p>
                            </div>
                        </div>
                        <div className={classes.jobTitle}>
                            <div className={classes.jobDetMob}>
                                <p>Title</p>
                            </div>
                            <div>
                                <p>{eachJob.jobTitle}</p>
                            </div>
                        </div>
                        <div className={classes.jobRequirements}>
                            <div className={classes.jobDetMob}>
                                <p>Requirements</p>
                            </div>
                            <div>
                                <p>{eachJob.jobRequirements}</p> 
                            </div>
                        </div>
                        <div className={classes.jobVisa}>
                            <div className={classes.jobDetMob}>
                                <p>Visa</p>
                            </div>
                            <div>
                                <p>{eachJob.jobVisa}</p>
                            </div>
                        </div>
                        <div className={classes.jobApply}>
                            <button 
                                className={classes.applyBtn}
                                id={eachJob.jobId}
                                onClick={e => this.applyBtnHandler(e.target.id)}
                                >Apply</button>
                        </div>
                        <div className={classes.jobSave}>
                            <button 
                                className={classes.saveBtn}
                                id={eachJob.jobId}
                                onClick={e => this.saveBtnHandler(e.target.id)}
                                >Save</button>
                        </div>
                    </div>
                ))}
            </Auxillary>
        );
    }
}

export default jobsListings;