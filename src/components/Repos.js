import React,{useEffect,useState,useRef,useCallback} from 'react'
// import {  useQuery } from '@apollo/client';
// import { GET_MESSAGES } from "../data/query";
import styled from 'styled-components';
import {GetData} from '../data/Fetch'
// import {NEW_MESSAGE_SUBSCRIPTION} from '../data/query'
import {gql,useQuery } from '@apollo/client'
const Loader = styled.div`
    width: 100%;
    height: 70px;
    text-align: center;
`;
const NEW_MESSAGE_SUBSCRIPTION = gql`
subscription($discussionId: ID!) {
    message(discussionId: $discussionId) {
      id
      value
      
    }
  }
`;
export const handleOnCompleted = (data,setMyCursor) => {
    if (!data?.messages) return
    const lastIndex = data.messages.length -1;
    const lastMessage = data.messages[lastIndex];
    lastMessage && setMyCursor(lastMessage.id);
    console.log('data',data)
}

const Repos = ()=> {
    // const {data}= useQuery(facebookQuery);
    const [moreOffset, setOffset] = useState(5);

    const [myCursor,setMyCursor] = useState()

    const { 
        messages: messagesList,
        fetchMore,
        subscribeToMore
            } = GetData(moreOffset,setOffset,myCursor,setMyCursor);
        
    // ------>  defini le point d'entré pour charger le contenu en plus <------ //
    const loader = useRef(null);
    // ------>  charger le contenu suivant  <------ //
    const loadMore = useCallback((entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
            fetchMore({
                variables: {
                    cursor: myCursor ,
                    limit: 10,
                    offset:1
                    
                },
                updateQuery: (prev, { fetchMoreResult }) => {
                    console.log('prev',prev)
                    if (!fetchMoreResult) return prev;
                    handleOnCompleted(fetchMoreResult,setMyCursor);
                    return Object.assign({}, prev, {
                        messages: [...prev.messages, ...fetchMoreResult.messages]
                    });
                }
            })
//             .then(fetchMoreResult => {
//                 // Update variables.limit for the original query to include
//                 // the newly added feed items.
//       setOffset(moreOffset + fetchMoreResult?.data.messages.length);
      
//   })
            // fetchMore({
            //     variables: {
            //         offset: 1,
            //         limit: 10,
            //         cursor:myCursor,
            //     }
            // }).then(fetchMoreResult => {
            //               // Update variables.limit for the original query to include
            //               // the newly added feed items.
            //     setOffset(moreOffset + fetchMoreResult?.data.messages.length);
                
            // });
        }
    }, [messagesList,fetchMore]);
      // const questions = data?.questions
      // const formatedQuestions = questions && questions.map();

    // ------>  permet d'observer le viewport et de charger plus de contenu quand le loader affiche le bas de la page <------//
    useEffect(() => {
        if (!messagesList) return;
        const newRef = loader;
        const options = {
            root: null, // window by default
            rootMargin: '0px',
            threshold: 1
        };

        // --------->   Create observer  <----------- //
        const observer = new IntersectionObserver(loadMore, options);
        if (newRef && newRef.current) {
            observer.observe(newRef.current);
        }
        return () => observer.unobserve(newRef.current);
    },[loader, loadMore])

    // if (loading) return <h2>Loading...</h2>
    // if(error) return <h2> error </h2>

    
    // SUBSCRIPTION
    // useEffect(() => {
    //     subscribeToMore({
    //         document: NEW_MESSAGE_SUBSCRIPTION,
    //         variables: {
    //             discussionId: "ckl6q3gin13835awn9zwg81he",
                
    //         },
    //         updateQuery: (prev, { subscriptionData }) => {
    //             // if (!subscriptionData.data) return prev;
    //             console.log('prev', prev)
    //             console.log('subscriptionData', subscriptionData)
    //             const newMessage = subscriptionData.data.message;
    //             console.log('newMessage', newMessage)
                
                
     
    //       return Object.assign({}, prev, {
    //           messages: [newMessage, ...prev.messages],
    
    
    //         });
    //       }
    //     });
        
    // }, [])
    
    
    return (
        <div>
            {messagesList &&
                messagesList.map(message =>(
                    <div key={message.id}> 
                        <h1>{message.value}</h1>  
                        <p>{message.id}</p>
                    </div>
                ))
                
            }
            <Loader ref={loader} ></Loader>
        </div> 
    )
}

export default Repos
