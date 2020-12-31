import React, { Component } from 'react';
import Auxillary from '../../hoc/Auxillary';
import classes from './ViewApplicantProfile.css';
import MainHeader from "../../components/MainHeader";
import axios from 'axios';
import {Container, Col, Row, Tab, Card, ListGroup, Nav} from 'react-bootstrap';

class ViewApplicantProfile extends Component{

  state={
    applicantId: this.props.location.data,
    userId:'',
    userName: '',
    userEmail: '',
    isHR: 1,
    applicantInfo:[],
    bachelorsInfo:[],
    mastersInfo:[],
    workInfo:[],
    linkedIn:[],
    github:[]
  }

  componentDidMount = () =>{
       
    if(!sessionStorage.getItem('userData')){
      this.props.history.push('/');
    }
    else if(JSON.parse(sessionStorage.getItem('userData')).isHR==0){
        this.props.history.push('/candidatehome');
    }
    else{
        var userData = JSON.parse(sessionStorage.getItem('userData'));
        console.log(userData);
        this.setState({
          ...this.state,
          userName:(userData.firstname).concat(" ").concat(userData.lastname),
          userId:userData.userId,
          userEmail:userData.emailid,
          isHR:userData.isHR
        })
        
      const dataSentToDB = {
          userId: this.state.applicantId
      }

      this.setState({
        applicantInfo:[],
        bachelorsInfo:[],
        mastersInfo:[],
        workInfo:[],
        linkedIn:[],
        github:[]
    })

      axios.post("http://localhost:8888/jobapply/fetchApplicantInfo.php",dataSentToDB)
          .then(res => {
              console.log(res.data);
              this.setState({
                  applicantInfo:res.data,
                  loading:false
              })
          })
          .catch(function (error) {
              console.log(error);
          })

      axios.post("http://localhost:8888/jobapply/fetchWorkexInfo.php",dataSentToDB)
          .then(res => {
              console.log(res.data);
              this.setState({
                  workInfo:res.data,
                  loading:false
              })
          })
          .catch(function (error) {
              console.log(error);
          })

      axios.post("http://localhost:8888/jobapply/fetchBachelorsDegreeInfo.php",dataSentToDB)
          .then(res => {
              console.log(res.data);
              this.setState({
                  bachelorsInfo:res.data,
                  loading:false
              })
          })
          .catch(function (error) {
              console.log(error);
          })

      axios.post("http://localhost:8888/jobapply/fetchMastersDegreeInfo.php",dataSentToDB)
          .then(res => {
              console.log(res.data);
              this.setState({
                  mastersInfo:res.data,
                  loading:false
              })
          })
          .catch(function (error) {
              console.log(error);
          })

      axios.post("http://localhost:8888/jobapply/fetchLinkedInLink.php",dataSentToDB)
          .then(res => {
              console.log(res.data);
              this.setState({
                  linkedIn:res.data,
                  loading:false
              })
          })
          .catch(function (error) {
              console.log(error);
          })

      axios.post("http://localhost:8888/jobapply/fetchGithubLink.php",dataSentToDB)
          .then(res => {
              console.log(res.data);
              this.setState({
                  github:res.data,
                  loading:false
              })
          })
          .catch(function (error) {
              console.log(error);
          })
    }
  }

    render() {
      var name = 'N/A';
      var email = 'N/A';
      var gender = 'N/A';
      var dob = 'N/A';
      var address = 'N/A';
      var phone = 'N/A';
      var visa = 'N/A';
      var veteran = 'N/A';
      var race = 'N/A';
      var hispanic = 'N/A';
      var degreeTypeB = 'N/A';
      var universityB = 'N/A';
      var majorB = 'N/A';
      var cgpaB = 'N/A';
      var attendedFromB = 'N/A';
      var gradDateB = 'N/A';
      var degreeTypeM = 'N/A';
      var universityM = 'N/A';
      var majorM = 'N/A';
      var cgpaM = 'N/A';
      var attendedFromM = 'N/A';
      var gradDateM = 'N/A';
      var workexCompanyName = 'N/A';
      var workexDesc = 'N/A';
      var workedFrom = 'N/A';
      var workedTill = 'N/A';
      var linkedInLink = "N/A";
      var githubLink = "N/A";

      if(this.state.applicantInfo.length > 0){
        name = this.state.applicantInfo[0].firstname + " " + this.state.applicantInfo[0].lastname;
        email = this.state.applicantInfo[0].emailid;
        gender = this.state.applicantInfo[0].gender;
        dob = (this.state.applicantInfo[0].dob).split(" ")[0];
        address = this.state.applicantInfo[0].address;
        phone = this.state.applicantInfo[0].phone;
        visa =this.state.applicantInfo[0].requirevisa;
        veteran = this.state.applicantInfo[0].protectedveteran;
        race = this.state.applicantInfo[0].race;
        hispanic = this.state.applicantInfo[0].hispaniclatino;
      }

      if(this.state.workInfo.length > 0) {
        workexCompanyName = this.state.workInfo[0].workexcompanyname;
        workexDesc = this.state.workInfo[0].workexdescription;
        workedFrom = (this.state.workInfo[0].workedfrom).split(" ")[0];
        workedTill = (this.state.workInfo[0].workedto).split(" ")[0];
      }

      if(this.state.linkedIn.length > 0) {
        linkedInLink = this.state.linkedIn[0].link;
      }

      if(this.state.github.length > 0) {
        githubLink = this.state.github[0].link;
      }

      if(this.state.bachelorsInfo.length > 0) {
        degreeTypeB = this.state.bachelorsInfo[0].degreetype;
        universityB = this.state.bachelorsInfo[0].university;
        majorB = this.state.bachelorsInfo[0].major;
        cgpaB = this.state.bachelorsInfo[0].cgpa;
        attendedFromB = (this.state.bachelorsInfo[0].attendedfrom).split(" ")[0];
        gradDateB = (this.state.bachelorsInfo[0].graduationdate).split(" ")[0];
      }

      if(this.state.mastersInfo.length > 0) {
        degreeTypeM = this.state.mastersInfo[0].degreetype;
        universityM = this.state.mastersInfo[0].university;
        majorM = this.state.mastersInfo[0].major;
        cgpaM = this.state.mastersInfo[0].cgpa;
        attendedFromM = (this.state.mastersInfo[0].attendedfrom).split(" ")[0];
        gradDateM = (this.state.mastersInfo[0].graduationdate).split(" ")[0];
      }

        return (
          <Auxillary>
            <MainHeader userName={this.state.userName}
                            isHR={this.state.isHR}/>
            <Container fluid className={classes.formContainer}> 
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
              <Row>
                <Col sm={3}>
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <Nav.Link className={classes.sideBar} eventKey="first">Personal Information</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="second">Academic Information</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="third">Work Experience</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="fourth">Contact Details</Nav.Link>
                  </Nav.Item>
                </Nav>
                </Col>
                <Col sm={8}>
                  <br></br>
                  <h4 className={classes.subHeading}> Applicant's Profile </h4>
                  <Tab.Content>
                    <Tab.Pane eventKey="first">
                    <div className={classes.applicantsList}>
                    <Card className={classes.details}>
                      <ListGroup variant="flush">
                        <ListGroup.Item>
                          <Row>
                            <Col className={classes.fieldName} sm={5}>
                              Full Name:
                            </Col>
                            <Col sm={7}>
                              {name}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <Row>
                            <Col className={classes.fieldName} sm={5}>
                              Date of Birth:
                            </Col>
                            <Col sm={7}>
                              {dob}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <Row>
                            <Col className={classes.fieldName} sm={5}>
                              Gender:
                            </Col>
                            <Col sm={7}>
                              {gender}  
                            </Col>
                          </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <Row>
                            <Col className={classes.fieldName} sm={5}>
                              Race:
                            </Col>
                            <Col sm={7}>
                              {race}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <Row>
                            <Col className={classes.fieldName} sm={5}>
                              Hispanic/Latino:
                            </Col>
                            <Col sm={7}>
                              {hispanic}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <Row>
                            <Col className={classes.fieldName} sm={5}>
                              Veteran Status:
                            </Col>
                            <Col sm={7}>
                              {veteran}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <Row>
                            <Col className={classes.fieldName} sm={5}>
                              Visa Required:
                            </Col>
                            <Col sm={7}>
                              {visa}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <Row>
                            <Col className={classes.fieldName} sm={5}>
                              Address:
                            </Col>
                            <Col sm={7}>
                              {address}  
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      </ListGroup>
                    </Card>
                    </div>
                    </Tab.Pane>

                    <Tab.Pane eventKey="second">
                    <div className={classes.applicantsList}>
                    <Card className={classes.details}>
                      <ListGroup variant="flush">
                        <ListGroup.Item>
                          <Row>
                            <Col className={classes.fieldName} sm={5}>
                              Degree:
                            </Col>
                            <Col sm={7}>
                              {degreeTypeB}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <Row>
                            <Col className={classes.fieldName} sm={5}>
                              Univerity Name:
                            </Col>
                            <Col sm={7}>
                              {universityB}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <Row>
                            <Col className={classes.fieldName} sm={5}>
                              Major:
                            </Col>
                            <Col sm={7}>
                              {majorB}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <Row>
                            <Col className={classes.fieldName} sm={5}>
                              CGA:
                            </Col>
                            <Col sm={7}>
                              {cgpaB}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <Row>
                            <Col className={classes.fieldName} sm={5}>
                              Attended From:
                            </Col>
                            <Col sm={7}>
                              {attendedFromB}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <Row>
                            <Col className={classes.fieldName} sm={5}>
                              Graduation Date:
                            </Col>
                            <Col sm={7}>
                              {gradDateB}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      </ListGroup>
                    </Card>
                    </div>

                    <div className={classes.applicantsList}>
                    <Card className={classes.details}>
                      <ListGroup variant="flush">
                        <ListGroup.Item>
                          <Row>
                            <Col className={classes.fieldName} sm={5}>
                              Degree:
                            </Col>
                            <Col sm={7}>
                              {degreeTypeM}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <Row>
                            <Col className={classes.fieldName} sm={5}>
                              Univerity Name:
                            </Col>
                            <Col sm={7}>
                              {universityM}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <Row>
                            <Col className={classes.fieldName} sm={5}>
                              Major:
                            </Col>
                            <Col sm={7}>
                              {majorM}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <Row>
                            <Col className={classes.fieldName} sm={5}>
                              CGA:
                            </Col>
                            <Col sm={7}>
                              {cgpaM}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <Row>
                            <Col className={classes.fieldName} sm={5}>
                              Attended From:
                            </Col>
                            <Col sm={7}>
                              {attendedFromM}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <Row>
                            <Col className={classes.fieldName} sm={5}>
                              Graduation Date:
                            </Col>
                            <Col sm={7}>
                              {gradDateM}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      </ListGroup>
                    </Card>
                    </div>
                    </Tab.Pane>

                    <Tab.Pane eventKey="third">
                    <div className={classes.applicantsList}>
                    <Card className={classes.details}>
                      <ListGroup variant="flush">
                        <ListGroup.Item>
                          <Row>
                            <Col className={classes.fieldName} sm={5}>
                              Company Name:
                            </Col>
                            <Col sm={7}>
                              {workexCompanyName}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <Row>
                            <Col className={classes.fieldName} sm={5}>
                              Work Description:
                            </Col>
                            <Col sm={7}>
                              {workexDesc}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <Row>
                            <Col className={classes.fieldName} sm={5}>
                              Worked From:
                            </Col>
                            <Col sm={7}>
                              {workedFrom}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <Row>
                            <Col className={classes.fieldName} sm={5}>
                              Worked Till:
                            </Col>
                            <Col sm={7}>
                              {workedTill}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      </ListGroup>
                    </Card>
                    </div>
                    </Tab.Pane>

                    <Tab.Pane eventKey="fourth">
                    <div className={classes.applicantsList}>
                    <Card className={classes.details}>
                      <ListGroup variant="flush">
                        <ListGroup.Item>
                          <Row>
                            <Col className={classes.fieldName} sm={5}>
                              Phone:
                            </Col>
                            <Col sm={7}>
                              {phone}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <Row>
                            <Col className={classes.fieldName} sm={5}>
                              Email:
                            </Col>
                            <Col sm={7}>
                              {email}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <Row>
                            <Col className={classes.fieldName} sm={5}>
                              LinkedIn:
                            </Col>
                            <Col sm={7}>
                              {linkedInLink}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <Row>
                            <Col className={classes.fieldName} sm={5}>
                              Github:
                            </Col>
                            <Col sm={7}>
                              {githubLink}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      </ListGroup>
                    </Card>
                    </div>
                    </Tab.Pane>

                  </Tab.Content>
                </Col>
                <Col sm={1}>
                </Col>
              </Row>    
              </Tab.Container>     
            </Container>
          </Auxillary>
        );
      }
}

export default ViewApplicantProfile;
