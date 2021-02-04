import logo from './logo.svg';
import './App.css';
import React from 'react';
// import {Query, useQuery} from '@apollo/client'
import Repos from './components/Repos'
// import { trendingRepoGQLQuery } from "./data/query";
// import moment from "moment";
import {  useQuery } from '@apollo/client';
import { facebookQuery } from "./data/query";



const App = () => {
  // const {data} = useQuery(trendingRepoGQLQuery)
    // const date = new moment(new Date()).subtract(1,"weeks");
    // const formattedDate = date.format("YYYY-MM-DD");
    // const query = `created:>${formattedDate} sort:stars-desc`;
    
      // const {
      //   data,
      //   loading,
      //   fetchMore,
      // } = useQuery(facebookQuery);
    
      // if (loading) return <h1>Loading...</h1>;

    
      
    return (
      <Repos
      // entries={nodes}
      // onLoadMore={() => fetchMore({
      //   variables: {
      //     offset: 10,
      //       limit: 20
      //   },
      // })}
      />
    );
}

export default App;
