import React, { Component } from 'react';
import './App.css';
import firebaseClient from './services/firebase';

const TodoRecord = (todo, id) => (
  <tr className="table" key={id}>
    <td>{todo.item}</td>
  </tr>
);

class App extends Component {
  state = {
    todos: [],
    todo: '',
  }

  handleChange = e => {
    const { target: { value } } = e;

    this.setState({
      todo: value
    })
  }

  handleSubmit = async todo => {
    await firebaseClient.addTodo(todo)
  }

  componentDidMount() {
    firebaseClient.setTodoListener((querySnapshot) => {
      const todos = [];
      querySnapshot.forEach((todo) => {
        todos.push(todo.data());
      });
      this.setState({
        todos
      });
    });
  }
  render() {
    const { todos, todo } = this.state;
    return (
      <div className="App">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header> */}
        <input type="text" value={todo} onChange={this.handleChange} />
        <button onClick={() => this.handleSubmit(todo)}>Add Todo</button>
        <table>
          <thead>
            <tr>
              <th> Todos </th>
            </tr>
          </thead>
          <tbody>
            { todos.map((todo, id) => (TodoRecord(todo, id))) }
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
