import React, {Component} from 'react';
import Auxillary from '../../hoc/Auxillary';
import classes from './RecruiterJobsListings.css';
import {Link} from 'react-router-dom';

class RecruiterJobsListings extends Component{
      
    state = {
        jobData: this.props.jobData
    }

    render(){
        var jobStatus = (this.state.jobData.isactive==1) ? "Active" : "Archieved";
        return(
            <Auxillary>
                <Link className={classes.jobDetailsLink} to={{pathname:'/jobdescription',data:this.state}} >
                <div className={classes.jobsList}>
                    <div className={classes.jobId}>
                        <div className={classes.jobDetMob}>
                            <p className={classes.pTags}>Job Id</p>
                        </div>
                        <div>
                            <p className={classes.pTags}>{this.state.jobData.jobid}</p>
                        </div>
                    </div>
                    <div className={classes.jobCompany}>
                        <div className={classes.jobDetMob}>
                            <p>Job Status</p>
                        </div>
                        <div>
                            <p className={classes.pTags}>{jobStatus}</p>
                        </div>
                    </div>
                    <div className={classes.jobTitle}>
                        <div className={classes.jobDetMob}>
                            <p>Title</p>
                        </div>
                        <div>
                            <p className={classes.pTags}>{this.state.jobData.jobtitle}</p>
                        </div>
                    </div>
                    <div className={classes.jobLocation}>
                        <div className={classes.jobDetMob}>
                            <p>Location</p>
                        </div>
                        <div>
                            <p className={classes.pTags}>{this.state.jobData.joblocation}</p>
                        </div>
                    </div>
                    <div className={classes.jobType}>
                        <div className={classes.jobDetMob}>
                            <p>Type</p>
                        </div>
                        <div>
                            <p className={classes.pTags}>{this.state.jobData.jobtype}</p> 
                        </div>
                    </div>
                    <div className={classes.postedDate}>
                        <div className={classes.jobDetMob}>
                            <p>Posted On</p>
                        </div>
                        <div>
                            <p className={classes.pTags}>{this.state.jobData.posteddate}</p> 
                        </div>
                    </div>
                    <div className={classes.jobVisa}>
                        <div className={classes.jobDetMob}>
                            <p>Sponsor Visa</p>
                        </div>
                        <div>
                            <p className={classes.pTags}>{this.state.jobData.visasponser}</p>
                        </div>
                    </div>
                </div>
                </Link>
            </Auxillary>
        );
    }
}

export default RecruiterJobsListings;