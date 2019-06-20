import React, {Component} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import '../PreviousNavbar/Navbar.css';


class HomeNavbar extends Component {
  
  constructor(props){
    super(props);
  }
  
  onSubmitSignInOne = () => {
    this.props.onRouteChange('budget');
  }  
  
  onSubmitSignInTwo = () => {
    this.props.onRouteChange('stats');
  }  
  onSubmitSignInThree = () => {
    this.props.onRouteChange('login');
  }  
  
    render() {
      return (
        <div className="HomeNavbar">
            <Navbar className="nav-custom" expand="lg">
              <Navbar.Brand href="#home"><span className="makeWhite">ExpenseTracker</span></Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto move">
                    <Nav.Link ><span onClick={this.onSubmitSignInOne} className="makeWhite">Budget</span></Nav.Link>
                    <Nav.Link ><span onClick={this.onSubmitSignInTwo} className="makeWhite">Stats & Settings</span></Nav.Link>
                    <Nav.Link ><span onClick={this.onSubmitSignInThree} className="makeWhite">Logout</span></Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
        </div>
      );
    }
}

export default HomeNavbar;
