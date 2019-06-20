import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../Login/LoginRegister.css';

var btnStyle = {
    width: '100%',
    backgroundColor: '#ebb5f0',
    borderColor: '#ebb5f0',
    color: '#faf8fa'
};



class Register extends Component {
  
  constructor(props){
    super(props);
    
    this.state = {
			signinUsername: '',
			signinPassword: '',
		}
  }
  
  onSubmitRegister = () => {
  		fetch('https://murmuring-ocean-40230.herokuapp.com/register', {
  			method: 'post',
  			headers: {'Content-Type': 'application/json'},
  			body: JSON.stringify({
  				username: this.state.signinUsername,
  				password: this.state.signinPassword
  			})
  		}).then(response => response.json())
		.then(user => {
		    if(user){
				  this.props.onRouteChange('budget');
				  this.props.loadUser(user[0]);
		    }
		})
  }  
  
  onUsernameChange = (event) => {
		this.setState({signinUsername: event.target.value});
	}
	onPasswordChange = (event) => {
		this.setState({signinPassword: event.target.value});
	}
  
  
  
    render() {
      return (
        <div className="Register">
            <h1 className="title primary-size">Register</h1>
            <div className="form1">
                <Form>
                  <Form.Group>
                    <Form.Control type="text" placeholder="Enter new username" onChange={this.onUsernameChange} />
                  </Form.Group>
                  <Form.Group controlId="formGroupPassword">
                    <Form.Control type="password" placeholder="Enter new password" onChange={this.onPasswordChange} />
                  </Form.Group>
                <Button onClick={this.onSubmitRegister} style={btnStyle}>
                    REGISTER
                </Button>
                </Form>
            </div>
        </div>
      )
    }
}

export default Register;
