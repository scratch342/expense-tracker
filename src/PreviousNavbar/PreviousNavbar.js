import React, {Component} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './Navbar.css';



class PreviousNavbar extends Component {
  
  onSubmitSignInOne = () => {
    this.props.onRouteChange('login');
  }  
  

  onSubmitSignInTwo = () => {
    this.props.onRouteChange('register');
  }  
  
    render() {
      return (
        <div className="PreviousNavbar">
            <Navbar className="nav-custom" expand="lg">
              <Navbar.Brand href="#home"><span className="makeWhite">ExpenseTracker</span></Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto move">
                    <Nav.Link><span onClick={this.onSubmitSignInOne} className="makeWhite">Login</span></Nav.Link>
                    <Nav.Link><span onClick={this.onSubmitSignInTwo} className="makeWhite">Register</span></Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
        </div>
      );
    }
}

export default PreviousNavbar;
