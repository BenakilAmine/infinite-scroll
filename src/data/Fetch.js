
import { useState } from "react";
import { GET_MESSAGES } from "../data/query";
import { useQuery} from "@apollo/client";
import {handleOnCompleted} from "../components/Repos"
// query 


export const GetData = (moreOffset,setOffset,myCursor,setMyCursor) => {
    // const [cursor,setCursor] = useState()
    const { loading, data,error, fetchMore,subscribeToMore } = useQuery(GET_MESSAGES, {
        variables: {
            // type: "PUBLIC",
            discussionId:"ckl6q3gin13835awn9zwg81he",
            limit: 5,
            cursor: myCursor
        },
        onCompleted: (data) => {
            setOffset(data?.messages.length) 
            handleOnCompleted(data,setMyCursor);
        },
        // fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
    });
    // const handleOnCompleted = (data,setMyCursor) => {
    //     if (!data?.messages) return
    //     const lastIndex = data.messages.length -1;
    //     const lastMessage = data.messages[lastIndex];
    //     lastMessage && setMyCursor(lastMessage.id);
    //     console.log('data',data)
    // }
    if (error) {
        throw new Error(error);
    }
    const availableData = data && data.messages;
  return {
    messages: availableData,
    loading,
    fetchMore,
    subscribeToMore
  };
    
}