// This is kinda a helper file / component.

import React, { Component } from 'react';
import { Query as ApolloQuery } from 'react-apollo';

class Query extends Component {
  render() {
    const {
      query,
      render: Component
    } = this.props;

    return (
      <ApolloQuery query={query}>
        {({ loading, error, data }) => {
          if (loading) {
            return <p>Loading data...</p>;
          }
          if (error) {
            return <p>Query Error: {JSON.stringify(error, 0, React.ReactText)}</p>
          }

          return <Component data={data || false} />
        }}
      </ApolloQuery>
    );
  }
}

export default Query;