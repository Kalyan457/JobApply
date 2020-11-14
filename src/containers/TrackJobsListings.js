import React, {Component} from 'react';
import Auxillary from '../hoc/Auxillary';
import classes from './TrackJobsListings.css';

class TrackJobsListings extends Component{
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
                    <div className={classes.jobCompany}>
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
                <label className={classes.jobStatus}>{this.props.jobData.jobStatus}</label>
            </Auxillary>
        );
    }
}

export default TrackJobsListings;