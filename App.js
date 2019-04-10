import React, { Component } from 'react';
import axios from 'axios';
import ListItems from './ListItems';
class App extends Component {
  constructor() {
    super();
    this.state = {
      newTodo : '',
      editing : false,
      editingIndex : null,
      todos : []
    };
    this.apiUrl = 'https://5cadaef001a0b80014dcda88.mockapi.io';
    this.handleChange = this.handleChange.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.alert = this.alert.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
    this.editTodo = this.editTodo.bind(this);

  }
  
  async componentDidMount() {
     const response = await axios.get(`${this.apiUrl}/todos`);
     this.setState({todos : response.data});
   }

  handleChange() {
    this.setState({ newTodo : event.target.value})
  }

  async addTodo () {
    const res = await axios.post(`${this.apiUrl}/todos`, {
      name: this.state.newTodo
    }); 
    const todos = this.state.todos;
    todos.push(res.data);
    this.setState({todos});  
    this.alert('Todo Added successfully.');
    this.state.newTodo = '';
  }

  async deleteTodo(index) {
    const todos = this.state.todos;
    const todo = todos[index];
    await axios.delete(`${this.apiUrl}/todos/${todo.id}`);
    delete todos[index];
    this.setState({todos});
    this.alert('Todo Deleted successfully.');
  }

  updateTodo(index) {
    const todo = this.state.todos[index]
    this.setState({
      editing : true,
      newTodo : todo.name,
      editingIndex : index
    });
  }

  async editTodo(){
    const todo = this.state.todos[this.state.editingIndex];
    const res = await axios.put(`${this.apiUrl}/todos/${todo.id}`,{
      name: this.state.newTodo
    });

    const todos = this.state.todos;
    todos[this.state.editingIndex] = res.data;
    this.setState({todos});
    this.state.editing = false;
    this.alert('Todo Updated successfully.');
  }

  alert(notification) {
    this.setState({notification});
    setTimeout(() => {
      this.state.notification = null;
    },200);
  }
  render() {
    return (
      <div className="container text-center p-4">
        {this.state.notification &&
          <div className="alert alert-success m-3">
            <p className="text-center">
              {this.state.notification}
            </p>
          </div>
        }  
        <h3>
          CRUD REACT 
        </h3>
        <input type="text" 
          className="form-control my-3"  
          onChange={() => this.handleChange(event)}
          value={this.state.newTodo} />
        <button className="btn btn-primary mb-3" 
          onClick={this.state.editing ? this.editTodo : this.addTodo}
          disabled={this.state.newTodo.length < 1}>
          {this.state.editing ? 'Update Todo' : 'Add Todo'}
        </button>
        {!this.state.editing && 
          <ul className="list-group">
            {this.state.todos.map((item,index) => {
              return <ListItems 
                key={item.id} 
                index={index} 
                item={item}
                updateTodo={() => this.updateTodo(index)}
                deleteTodo={() => this.deleteTodo(index)} />
            })}
        </ul>
        }
        
      </div>
    );
  }
}
export default App;