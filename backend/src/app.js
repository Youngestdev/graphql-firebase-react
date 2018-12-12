import firebaseClient from './firebase';

const express = require('express');
const cors = require('cors');
const graphQLExpress = require('express-graphql');
const { makeExecutableSchema } = require('graphql-tools');


const typeDefs = [`
  type Todo {
    id: String
    todo: String
  }

  type Query {
    getTodos: [Todo]
  }

  # Semi-Empty for now.
  type Mutation{
    createTodo (
      todo: String
    ) : Todo
  }

  schema {
    query: Query
    mutation: Mutation
  }
`];

// const returnTodos = () => await firebaseClient.setTodoListener((querySnapshot) => {
//   const todos = [];
//   querySnapshot.forEach((todo) => {
//     todos.push(todo.data());
//   });
//   // This is crazy kinda.
//   return todos
// })

const test = [];

firebaseClient.setTodoListener((querySnapshot) => {
  const todos = [];
  querySnapshot.forEach((todo) => {
    // Work on incorporating the id into data.
    console.log(todo.id, '=>', todo.data());
    todos.push(todo.data());
  });
  todos.map((todo) => test.push(todo));
});


const resolvers = {
  Query: {
    getTodos: () => test
  },
  Mutation: {
    createTodo: (_m, args) => firebaseClient.addTodo(args)
  }
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

const app = express();

app.use(cors());

app.use('/graphiql', graphQLExpress({
  schema,
  pretty: true,
  graphiql: true
}));

app.listen(1337)

console.log("Boof...");