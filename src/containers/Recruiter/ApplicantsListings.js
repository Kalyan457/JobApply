import React,{Component} from 'react';
import classes from './ApplicantsListings.css';
import Auxillary from '../../hoc/Auxillary';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

class ApplicantsListings extends Component{

    state={
        applicantData: this.props.applicantData,
        applicantId: this.props.applicantData.applicantid
    }

    render(){
        var date = this.state.applicantData.applieddate.split(' ')[0];
        return(
            <Auxillary>
                <div className={classes.applicantsList}>
                    <div className={classes.jobId}>
                        <div className={classes.jobDetMob}>
                            <p className={classes.pTags}>Job Id</p>
                        </div>
                        <div>
                            <p className={classes.pTags}>{this.state.applicantData.jobid}</p>
                        </div>
                    </div>
                    <div className={classes.applicantsName}>
                        <div className={classes.jobDetMob}>
                            <p className={classes.pTags}>Name</p>
                        </div>
                        <div>
                            <p className={classes.pTags}>{this.state.applicantData.firstname} {this.props.applicantData.lastname}</p>
                        </div>
                    </div>
                    <div className={classes.jobTitle}>
                        <div className={classes.jobDetMob}>
                            <p className={classes.pTags}>Title</p>
                        </div>
                        <div>
                            <p className={classes.pTags}>{this.state.applicantData.jobtitle}</p>
                        </div>
                    </div>
                    <div className={classes.appliedDate}>
                        <div className={classes.jobDetMob}>
                            <p className={classes.pTags}>Applied Date</p>
                        </div>
                        <div>
                            <p className={classes.pTags}>{date}</p>
                        </div>
                    </div>
                    <div className={classes.jobLocation}>
                        <div className={classes.jobDetMob}>
                            <p className={classes.pTags}>Location</p>
                        </div>
                        <div>
                            <p className={classes.pTags}>{this.state.applicantData.joblocation}</p> 
                        </div>
                    </div>
                    <div className={classes.jobVisa}>
                        <div className={classes.jobDetMob}>
                            <p className={classes.pTags}>Visa</p>
                        </div>
                        <div>
                            <p className={classes.pTags}>{this.state.applicantData.requirevisa}</p>
                        </div>
                    </div>
                    <div className={classes.jobStatus}>
                        <div className={classes.jobDetMob}>
                            <p className={classes.pTags}>Job Status</p>
                        </div>
                        <div>
                            <p className={classes.pTags}>{this.state.applicantData.jobstatus}</p>
                        </div>
                    </div>
                    <div className={classes.jobStatus}>
                        <div>
                        <Link to={{pathname:'/viewapplicantprofile',data:this.state.applicantId}} >
                            <Button className={classes.profileBtn}>
                                View Profile
                            </Button>
                        </Link>
                        </div>
                    </div>
                    </div>
            </Auxillary>
        );
    }
}
export default ApplicantsListings;