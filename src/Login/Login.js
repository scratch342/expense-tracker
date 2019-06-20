import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './LoginRegister.css';

var btnStyle = {
    width: '100%',
    backgroundColor: '#ebb5f0',
    borderColor: '#ebb5f0',
    color: '#faf8fa'
};


class Login extends Component {
  
  constructor(props){
    super(props);
    
    this.state = {
			signinUsername: '',
			signinPassword: '',
		}
  }
  
  onSubmitSignIn = () => {
  		fetch('https://murmuring-ocean-40230.herokuapp.com/signin', {
  			method: 'post',
  			headers: {'Content-Type': 'application/json'},
  			body: JSON.stringify({
  				username: this.state.signinUsername,
  				password: this.state.signinPassword
  			})
  		}).then(response => response.json())
		.then(user => {
		    if(user){
		      this.props.loadUser(user);
				  this.props.onRouteChange('budget');
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
        <div className="Login">
            <h1 className="title primary-size">Login</h1>
            <div className="form1">
                <Form>
                  <Form.Group>
                    <Form.Control type="text" placeholder="Enter username" autoFocus onChange={this.onUsernameChange} />
                  </Form.Group>
                  <Form.Group controlId="formGroupPassword">
                    <Form.Control type="password" placeholder="Enter password" onChange={this.onPasswordChange}/>
                  </Form.Group>
                  
                <Button onClick={this.onSubmitSignIn}  style={btnStyle}>
                    LOGIN
                </Button>
                </Form>
            </div>
        </div>
      );
    }
}

export default Login;
