import React, { Component } from 'react';
import PreviousNavbar from './PreviousNavbar/PreviousNavbar';
import Login from './Login/Login';
import Register from './Register/Register';
import HomeNavbar from './HomeNavbar/HomeNavbar';
import Budget from './Budget/Budget';
import StatsSettings from './StatsSettings/StatsSettings';
import './App.css';


class App extends Component {
  
  constructor(){
    super();
    
    this.state = {
      route: 'login',
      isSignedIn: false,
      user: {
        username: '',
        password: '',
  			budget: '',
  			spent: '',
  			expenses: [],
  			food: '',
  			clothing: '',
  			personal: '',
  			entertainment: '',
  			other: ''
      }
    }
  }
  
  onRouteChange = (routeGotten) => {
    if (routeGotten === 'login' || routeGotten === 'register'){
      this.setState({isSignedIn : false});
    } else if(routeGotten === 'budget' || routeGotten === 'stats'){
      this.setState({isSignedIn: true});
    }
    
    this.setState({route: routeGotten});
    
    
  }
  
  addExpense = (data1, data2, data3) => {

    if((parseInt(this.state.user.budget) - parseInt(this.state.user.spent)) - parseInt(data2) < 0){
      console.log('exceeded');
    }else{
    
      this.setState({user: {
        username: this.state.user.username,
        password: this.state.user.password,
        budget: this.state.user.budget,
        spent: (parseInt(this.state.user.spent) + parseInt(data2)).toString(),
        expenses: this.state.user.expenses.concat({name: data1, price: data2.toString(), category: data3.toString()}),
        food: data3 == 'Food' ? (parseInt(this.state.user.food) + 1).toString() : this.state.user.food,
        clothing: data3 == 'Clothing' ? (parseInt(this.state.user.clothing) + 1).toString() : this.state.user.clothing,
        personal: data3 == 'Personal' ? (parseInt(this.state.user.personal) + 1).toString() : this.state.user.personal,
        entertainment: data3 == 'Entertainment' ? (parseInt(this.state.user.entertainment) + 1).toString() : this.state.user.entertainment,
        other: data3 == 'Other' ? (parseInt(this.state.user.other) + 1).toString() : this.state.user.other
      }}, () => {
        
      	fetch('https://murmuring-ocean-40230.herokuapp.com/newExpense', {
      			method: 'post',
      			headers: {'Content-Type': 'application/json'},
      			body: JSON.stringify({
      				name: data1,
      				price: data2,
      				category: data3,
      				food: this.state.user.food,
      				clothing: this.state.user.clothing,
      				personal: this.state.user.personal,
      				entertainment: this.state.user.entertainment,
      				other: this.state.user.other,
      				spent: this.state.user.spent,
      				username: this.state.user.username,
      				password: this.state.user.password,
      				expenses: this.state.user.expenses
      			})
      		}).then(response => response.json())
    		.then(user => {

    		    if(user){
    				  console.log('worked');
    		    }
    		})
    		
      });
    
    }
  }
  
  loadUser = (newUser) => {
    this.setState({user: {
      username: newUser.username,
      password: newUser.password,
      budget: newUser.budget,
      spent: newUser.spent,
      expenses: newUser.expenses,
      food: newUser.food,
      clothing: newUser.clothing,
      personal: newUser.personal,
      entertainment: newUser.entertainment,
      other: newUser.other
      
    }}) 
    
  }
  
  changeBudget = (newBudget) => {
    this.setState({user: {
      username: this.state.user.username,
      password: this.state.user.password,
      budget: newBudget,
      spent: '0',
      expenses: [],
      food: this.state.user.food,
      clothing: this.state.user.clothing,
      personal: this.state.user.personal,
      entertainment: this.state.user.entertainment,
      other: this.state.user.other,
    }}); 
    
  }

  
  render(){
    const { route, isSignedIn } = this.state;
    
    return (
      <div className="App">
      
        {
          isSignedIn == false ?
          <div>
            <PreviousNavbar onRouteChange={this.onRouteChange}/>
            
            {(
              route === 'login' ?
              <Login onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
              : <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} /> )}
 
          </div>
          : 
          
          <div>
          <HomeNavbar onRouteChange={this.onRouteChange}/>
          {(
            route === 'budget' ?
            <Budget addExpense={this.addExpense}
            budget={this.state.user.budget}
            expenses={this.state.user.expenses}
            username={this.state.user.username}
            password={this.state.user.password}
            spent={this.state.user.spent}
            
            />
            :
            <StatsSettings food={this.state.user.food}
            clothing={this.state.user.clothing}
            personal={this.state.user.personal}
            entertainment={this.state.user.entertainment}
            other={this.state.user.other}
            budget={this.state.user.budget}
            changeBudget={this.changeBudget}
            username={this.state.user.username}
            password={this.state.user.password}
            spent={this.state.user.spent}
            />
          )}
          </div>
        }

        
        
        
        
        
        
        
        
        
        <script src="https://unpkg.com/react/umd/react.production.js"  />
        
        <script
          src="https://unpkg.com/react-dom/umd/react-dom.production.js"
          
        />
        
        <script
          src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js"
          
        />
        
        <script>var Alert = ReactBootstrap.Alert;</script>
        
      </div>
    )
  }
}

export default App;
