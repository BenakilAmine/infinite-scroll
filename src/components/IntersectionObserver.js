import React, { useState, useEffect, useCallback, useRef } from 'react';
// import axios from 'axios';
import {  useQuery } from '@apollo/client';
import { questionQuery } from "../data/query";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState(["hello"]);
  
  const page = useRef(1)
  const { data, fetchMore } = useQuery(questionQuery, {
    variables: {
        // type: "PUBLIC",
        offset: 0,
        limit: 5
    },
    // onCompleted: (data) => {
    //     setOffset(data.questions.length) 
    // }, 
});    



  const handleInitial = useCallback(async page => {
      const newMessage = await fetchMore(page);
      const { status, data } = newMessage;
      console.log(data)
      if (status === 200) setMessages(messages => [...data.data.questions, ...messages]);
      
    },
    [fetchMore]
  );

  console.log(messages);
  
  const loadMore = () => {
    page.current++;
    handleInitial(page);
};
  useEffect(() => {
      handleInitial(page);
    }, [handleInitial]);
    
    console.log(messages)
  return (
      <div className="appStyle">

      {messages && (
        <ul >
          {messages.map((message, id) => (
            <li key={id} >
              <p>{message.questions}</p>
            </li>
          ))}
        </ul>
      )}

      {loading && <li>Loading ...</li>}

      <div className="buttonContainer">
        <button className="buttonStyle" onClick={loadMore}>Load More</button>
      </div>
    </div>
  )
}