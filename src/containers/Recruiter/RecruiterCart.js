import React, { Component, useEffect, useState } from 'react';
import Auxillary from '../../hoc/Auxillary';
import classes from './RecruiterCart.css';
import MainHeader from "../../components/MainHeader";
import axios from 'axios';
import {Container, Col, Row, Button,Badge, ButtonGroup, Table, Card, ListGroup, Modal, Alert} from 'react-bootstrap';

function Example(props) {
  const [lgShow, setLgShow] = useState(false);
  let tableBody;
  if (props.orderInfo.length > 0) {
    tableBody = props.orderInfo.map((order) => {
      var date = order.orderdate.split(" ")[0];
        return(
          <tr>
            <td>{order.orderid}</td>
            <td>{order.jobid}</td>
            <td>{date}</td>
            <td>{props.name}</td>
          </tr>
        )
    });
  }
  return (
    <Auxillary>

      <Button className={classes.buttonTab} variant="outline-info" onClick={() => setLgShow(true)}>
        View Past Job Orders
      </Button>
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            PAST ORDERS  <Badge variant="info">{props.orderInfo.length}</Badge>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Job ID</th>
              <th>Order Placed On</th>
              <th>Placed By</th>
            </tr>
          </thead>
          <tbody>
            {tableBody}
          </tbody>
        </Table>
        </Modal.Body>
      </Modal>
      </Auxillary>
  );
}

class RecruiterCart extends Component{
  constructor(props){
  super(props);
  this.state={
    userId:'',
    userName: '',
    userEmail: '',
    isHR: 1,
    jobId: '',
    orderInfo:[],
    showNotification: false
  }
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
          userId: userData.userId
      }

      axios.post("http://localhost:8888/jobapply/fetchOrderInfo.php",dataSentToDB)
          .then(res => {
              console.log(res.data);
              this.setState({
                  orderInfo:res.data,
                  showNotification: false,
                  loading:false
              })
          })
          .catch(function (error) {
              console.log(error);
          })
    }
  }

  postJob = () => {
    var data = JSON.parse(sessionStorage.getItem('cartData'));
    var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd;

    const dataSentToDB = {
      userId: this.state.userId,
      jobTitle: data.jobTitle,
      jobType: data.jobType,
      jobDesc: data.jobDesc,
      jobLocation: data.jobLocation,
		  jobReq: data.jobReq,
		  postedDate: today,
		  latestDate: data.expiryDate,
		  isActive: 1,
		  visa: data.visa
    }

    console.log(dataSentToDB);
    axios.post("http://localhost:8888/jobapply/addNewJob.php",dataSentToDB)
      .then(res => {
          console.log(res.data);
          if(res.data=="True") {
            this.setState({
              showNotification: true
            })

            axios.post("http://localhost:8888/jobapply/addNewOrder.php",dataSentToDB)
            .then(res => {
              console.log(res.data);
          })
          .catch(function (error) {
              console.log(error);
          })

            sessionStorage.removeItem('cartData');
            setTimeout(function(){
              window.location.reload(1);
            }, 3000);
        }
      })
      .catch(function (error) {
          console.log(error);
      })
    
  }

  removeFromCart = () => {
    if(sessionStorage.getItem('cartData')) {

      alert("Your job item has been removed from the cart.");
      sessionStorage.removeItem('cartData');
      setTimeout(function(){
        window.location.reload(1);
      }, 3000);
    }
            
  }

    render() {
      var pageContent;
      var cartItem = 0;
      
      if (!sessionStorage.getItem('cartData')) {
        pageContent = (
          <h3>You don't have any item in your cart! Go to 'Post a New Job' to add a job.</h3>
        );
        cartItem = 0;
      } else {
        var data = JSON.parse(sessionStorage.getItem('cartData'));
        cartItem = sessionStorage.getItem('cartData')[0].length;
        var amount = cartItem * 50.00;
        var selectedClass = (this.state.showNotification)? classes.notify : classes.notifyDisabled;
        pageContent = (
          <Auxillary>
          <h3>You are one step away from posting your job:</h3>
          <br/>
          <h4 className={classes.subHeading}> Review Your Job </h4>
            <div className={classes.applicantsList}>
              <Card className={classes.details}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col className={classes.fieldName} sm={5}>
                        Job Title:
                      </Col>
                      <Col sm={7}>
                        {data.jobTitle}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col className={classes.fieldName} sm={5}>
                        Location:
                      </Col>
                      <Col sm={7}>
                        {data.jobLocation}  
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col className={classes.fieldName} sm={5}>
                        Job Type:
                      </Col>
                      <Col sm={7}>
                        {data.jobType}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col className={classes.fieldName} sm={5}>
                        Job Expiry Date:
                      </Col>
                      <Col sm={7}>
                        {data.expiryDate}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col className={classes.fieldName} sm={5}>
                        Sponser Visa for this Job:
                      </Col>
                      <Col sm={7}>
                        {data.visa}  
                      </Col>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
              </div>
              <Alert className={selectedClass} variant="success">
                Order Placed: Your Job is now successfully posted!
              </Alert>
              <h4 className={classes.subHeading}> Pay and Post Your Job </h4>
              <div className={classes.applicantsList}>
              <Card className={classes.details}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col className={classes.fieldName} sm={5}>
                        Number of item:
                      </Col>
                      <Col sm={7}>
                        {cartItem}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col className={classes.fieldName} sm={5}>
                        Total amount:
                      </Col>
                      <Col sm={7}>
                        ${amount} 
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  
                  <ListGroup.Item>
                    <Row>
                      <Col className={classes.fieldName} sm={5}>
                        
                      </Col>
                      <Col sm={7}>
                      <Button onClick={this.postJob} variant="success" type="submit">
                        Post Job
                      </Button>  
                      </Col>
                      </Row>
                      <Button onClick={this.removeFromCart} variant="danger" type="submit">
                        Remove from Cart
                      </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
              </div>
          </Auxillary>
        );
        }

        return (
          <Auxillary>
            <MainHeader userName={this.state.userName}
                            isHR={this.state.isHR}/>
            <Container fluid className={classes.formContainer}> 
              <Row>
                <Col sm={3}>
                <Example orderInfo={this.state.orderInfo} name={this.state.userName}/>
                </Col>
                <Col sm={8}>
                  <br></br>
                  <h4 className={classes.subHeading}> My Cart <Badge variant="success">{cartItem}</Badge> </h4>
                    {pageContent}
                </Col>
                <Col sm={1}>
                </Col>
              </Row>      
            </Container>
          </Auxillary>
        );
      }
}

export default RecruiterCart;