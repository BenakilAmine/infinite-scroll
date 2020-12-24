import logo from './logo.svg';
import './App.css';
import React,{Component} from 'react';
import {Query} from 'react-apollo'
import Repos from './components/Repos'
import { trendingRepoGQLQuery } from "./data/Query";
import moment from "moment";



class App extends Component {
  render() {
    const date = new moment(new Date()).subtract(1,"weeks");
    const formattedDate = date.format("YYYY-MM-DD");
    const query = `created:>${formattedDate} sort:stars-desc`;
    return (
      <div>
        <h1>Last Week Trending Repo</h1>
        
        <Query
        notifyOnNetworkStatusChange={true}
        query={trendingRepoGQLQuery}
        variables={{query}}
        >
                    {({ data, loading, error, fetchMore }) => {
            if (error) return <p>{error.message}</p>;
            console.log(data)
            const search = data.search;
            return (
              <Repos
                loading={loading}
                entries={search}
                onLoadMore={() =>
                  fetchMore({
                    variables: {
                      query,
                      cursor: search.pageInfo.endCursor
                    },
                    updateQuery: (prevResult, { fetchMoreResult }) => {
                      const newEdges = fetchMoreResult.search.edges;
                      const pageInfo = fetchMoreResult.search.pageInfo;
                      return newEdges.length
                        ? {
                            search: {
                              __typename: prevResult.search.__typename,
                              edges: [...prevResult.search.edges, ...newEdges],
                              pageInfo
                            }
                          }
                        : prevResult;
                    }
                  })
                }
              />
            );
            
          }}
          

        </Query>
        
      </div>
    );
  }
}

export default App;
