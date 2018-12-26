// import gql from 'graphql-tag';

import gql from 'graphql-tag';

// For now, I'll have only CREATE
// While I figure out how to do shii around firebase.

export const CREATE_TODO_MUTATION = gql`
  mutation newTodo (
    $todo: String
  ) {
    createTodo (
      todo: $todo
    ) {
      todo
    }
  }
`;
