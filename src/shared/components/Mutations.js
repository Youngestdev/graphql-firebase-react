import React, { Component } from 'react';
import { Mutation as _Mutation } from 'react-apollo';

class Mutation extends Component {
  render() {
    const {
      mutation,
      query,
      children,
      onCompleted
    } = this.props;

    return (
      <_Mutation
        mutation={mutation}
        update={(cache, { data }) => {
          // Get mutation and query name.
          const {
            def: [{ name: { value: mutationName }}]
          } = mutation;
          const {
            def: [{ name: { value: queryName }}]
          } = query;

          const cachedData = cache.readQuery({ query });

          // Getting current data
          const currentData = data[mutationName];

          // Initializing our updated data
          let updatedData = [];

          // lower case mutation name.. Hmm
          const mutationNameLC  = mutationName.toLowerCase

          if (mutationNameLC.includes('create') || mutationNameLC.includes('add')) {
            // Create or add action injects the current value in the array
            updatedData = [currentData, ...cachedData[queryName]];
          }

          cache.writeQuery({
            query,
            data: {
              [queryName]: updatedData
            }
          });
        }}
        onCompleted={onCompleted}
      >
        {children}
      </_Mutation>
    )
  }
}

export default Mutation;