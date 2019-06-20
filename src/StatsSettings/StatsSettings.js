import React, {Component} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PieChart from 'react-minimal-pie-chart';
import './StatsSettings.css';



var btnStyle = {
    width: '100%',
    backgroundColor: '#ebb5f0',
    borderColor: '#ebb5f0',
    color: '#faf8fa'
};

class StatsSettings extends Component {
  
  constructor(props){
    super(props);
    
    this.state = {
			budget: ''
		}
  }
  
  onBudgetSubmit = () => {
  	fetch('https://murmuring-ocean-40230.herokuapp.com/newBudget', {
  			method: 'put',
  			headers: {'Content-Type': 'application/json'},
  			body: JSON.stringify({
  				budget: this.state.budget,
  				username: this.props.username,
  				password: this.props.password,
  				spent: this.props.spent
  			})
  		}).then(response => response.json())
		.then(user => {
		    if(user){
				  this.props.changeBudget(this.state.budget.toString());
		    }
		})
    
  }  
  
  onBudgetChange = (event) => {
    
    this.setState({budget: event.target.value});
  }

  
    render() {
      var currentBudget = this.props.budget.toString();
      
      
      return (
        <div className="StatsSettings">
            <Container>
                <h1 className="title2 primary-size">Stats & Settings</h1>
                <hr />
                
                <Row className="text-center">
                    <Col>
                        <h2 className="secondary-size">Input New Budget</h2>
                        <p>Your current budget for this month is: <b>${currentBudget}</b></p>
                        
                        <div className="form1">
                            <Form>
                              <Form.Group>
                                <Form.Control type="number" placeholder="Enter new budget" onChange={this.onBudgetChange}/>
                              </Form.Group>
                            <Button style={btnStyle} className="btn1" onClick={this.onBudgetSubmit}>
                                SUBMIT NEW BUDGET
                            </Button>
                            </Form>
                        </div>
                    
                    </Col>
                    
                    <Col>
                        <PieChart
                          data={[
                            { title: 'Food', value: parseInt(this.props.food), color: '#E38627' },
                            { title: 'Clothing', value: parseInt(this.props.clothing), color: '#C13C37' },
                            { title: 'Entertainment', value: parseInt(this.props.entertainment), color: '#6A2135' },
                            { title: 'Personal', value: parseInt(this.props.personal), color: '#A3D9D3' },
                            { title: 'Other', value: parseInt(this.props.other), color: '#87779E' },
                          ]}
                          
                          label
                          labelStyle={{
                            fontSize: '0.3em',
                            fontFamily: 'Nunito',
                            fill: '#faf8fa'
                          }}
                        />
                    </Col>
                    
                </Row>
            </Container>
            
            
        </div>
      )
    }
}

export default StatsSettings;
