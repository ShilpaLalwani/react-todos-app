import React ,{ Component } from 'react';
 
class ListItems extends Component{
  constructor(props){
    super(props);
  }
  render () {
    return <li className="list-group-item" >
    <button className="btn btn-primary mr-3" onClick={this.props.updateTodo}>U</button> 
    {this.props.item.name}
    <button className="btn btn-danger ml-3" onClick={this.props.deleteTodo}>X</button>
    </li>
  }
}
export default ListItems;