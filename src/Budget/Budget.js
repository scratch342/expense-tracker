import React, {Component} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import './Budget.css';




var btnStyle = {
    width: '100%',
    backgroundColor: '#ebb5f0',
    borderColor: '#ebb5f0',
    color: '#faf8fa'
};


class Budget extends Component {
  
  constructor(props){
    super(props);
    
    this.state = {
			name: '',
			price: '',
			category: 'Food',
		}
  }
  
  
  
  onSubmitExpense = () => {
    
    
    if((parseInt(this.props.budget) - parseInt(this.props.spent)) - parseInt(this.state.price) < 0){
      alert("This action can't be done. You'll exceed your budget limit! Please reset your budget in the Stats & Settings Page.")
    }else{
      var tbody = document.querySelector('tbody');
      var tr = document.createElement('tr');
      var name = document.createElement('td');
      var price = document.createElement('td');
      var category = document.createElement('td');
      
      name.innerText = this.state.name;
      price.innerText = this.state.price.toString();
      category.innerText = this.state.category;
      
      tbody.appendChild(tr);
      
      
      tr.appendChild(name);
      tr.appendChild(price);
      tr.appendChild(category);
      
      this.props.addExpense(this.state.name, this.state.price, this.state.category)
   
    }
  }  
  
  onNameChange = (event) => {
    this.setState({name: event.target.value});
  }

  onPriceChange = (event) => {
    this.setState({price: event.target.value});
  }
  
  onSelectChange = (event) => {
    if(event.target.value == "Food" || 
    event.target.value == "Clothing" ||
    event.target.value == "Entertainment" ||
    event.target.value == "Personal" ||
    event.target.value == "Other"){
      this.setState({category: event.target.value});
    }
  }
  
  makeTR = () => {
    
    var tbody = document.querySelector('tbody');
    
    for(var i = 0; i < this.props.expenses.length; i++){
      let tr = document.createElement('tr');
      let name = document.createElement('td');
      let price = document.createElement('td');
      let category = document.createElement('td');
      
      name.innerText = this.props.expenses[i].name;
      price.innerText = this.props.expenses[i].price.toString();
      category.innerText = this.props.expenses[i].category.toString();
      
      tbody.appendChild(tr);
    
      tr.appendChild(name);
      tr.appendChild(price);
      tr.appendChild(category);
      
      
    }
  }
  
  componentDidMount(){
    this.makeTR()
  }

  
    render() {
 
      var budgetLeft = (
      parseInt(this.props.budget) - parseInt(this.props.spent))
      .toString();
      
      
      
      return (
        <div className="Budget">
            <Container>
                <h1 className="title2 primary-size">Budget</h1>
                <hr />
                
                <Row className="text-center">
                    <Col>
                    <h2 className="secondary-size">Input Expense</h2>
                    
                    
                    <div className="form1">
                        <Form>
                          <Form.Group>
                            <Form.Control type="text" placeholder="Enter name of expense"  onChange={this.onNameChange}/>
                          </Form.Group>
                          <Form.Group >
                            <Form.Control type="number" placeholder="Enter price of expense"  onChange={this.onPriceChange}/>
                          </Form.Group>
                          <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label>Select category of expense</Form.Label>
                            <Form.Control as="select" onChange={this.onSelectChange}>
                              <option value="Food">Food</option>
                              <option value="Clothing">Clothing</option>
                              <option value="Entertainment">Entertainment</option>
                              <option value="Personal">Personal</option>
                              <option value="Other">Other</option>
                            </Form.Control>
                          </Form.Group>
                        <Button  onClick={this.onSubmitExpense} style={btnStyle}>
                            SUBMIT EXPENSE
                        </Button>
                        </Form>
                    </div>
                    
                    </Col>
                    
                    
                    <Col>
                    
                    <h2 className="secondary-size">YOU HAVE <br /> <br /> <b>${budgetLeft}</b> <br /> <br />LEFT.</h2>
                    <br />
                    
                    </Col>
                </Row>
                <br />
                <br />
                <br />
                <br />
                <br />
                <hr />

                
                <h2 className="secondary-size title2">Past Expenses</h2>
                <Table bordered>
                  <thead>
                    <tr className="tr1">
                      <th className="headings">Name</th>
                      <th className="headings">Price ($)</th>
                      <th className="headings">Category</th>
                    </tr>
                  </thead>
                  <tbody>

                    
                  </tbody>
                </Table>
                
            </Container>
            
        </div>
      )
      
     
    }
}

export default Budget;
