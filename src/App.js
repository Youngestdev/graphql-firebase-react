import React, { Component } from 'react';
import './App.css';
import { CREATE_TODO_MUTATION } from './graphql/Mutations';
import { GET_TODOS_QUERY } from './graphql/Queries';
import Mutation from './shared/components/Mutations';
import Query from './shared/components/Query'
// import firebaseClient from './services/firebase';

const TodoRecord = (todo, id) => (
  <tr className="table" key={id}>
    <td>{todo.todo}</td>
  </tr>
);

class App extends Component {
  state = {
    // todos: [],
    todo: '',
  }

  handleChange = e => {
    const { target: { value } } = e;

    this.setState({
      todo: value
    })
  }

  handleSubmit = mutation => {
    // firebaseClient.addTodo(todo)

    const todo = this.state.todo;

    mutation({
      variables: {
        todo
      }
    })

    this.setState({
      todo: ''
    });
  }

  componentWillUnmount() {
    this.setState({
      todo: ''
    })
  }

  render() {
    // const { todos, todo } = this.state;
    return (
      // <div className="App">
      //   <input type="text" value={todo} onChange={this.handleChange} />
      //   <button onClick={() => this.handleSubmit(todo)}>Add Todo</button>
      //   <table>
      //     <thead>
      //       <tr>
      //         <th> Todos </th>
      //       </tr>
      //     </thead>
      //     <tbody>
      //       { todos.map((todo, id) => (TodoRecord(todo, id))) }
      //     </tbody>
      //   </table>
      // </div>
      <div>
      <Mutation
        mutation={CREATE_TODO_MUTATION}
        query={GET_TODOS_QUERY}
        onCompleted={() => {
          this.setState({
            todo: ''
          });
        }}
      >
      {(createTodo) => (
        <div className="App">
          <header>
            Add New Todo
          </header>

          <input type="text" value={this.state.todo} onChange={this.handleChange} />
          <button onClick={() => {
            this.handleSubmit(createTodo);
            this.setState({
              todo: ''
            })           
          }}>
          Add Todo
          </button>
        </div>
      )}
      </Mutation>
      <Query query={GET_TODOS_QUERY} render={Todos} />
    </div>
    );
  }
}

class Todos extends Component {
  // componentDidMount()

  render() {
    // const { data: { getTodos: todos } } = this.props;
    const { data: {  getTodos: todos } } = this.props;
    return todos.map(({
      todo,
      id
    }) => (
      <div>
        <b>{todo}</b>
      </div>
    ))
  }
}

export default App;
