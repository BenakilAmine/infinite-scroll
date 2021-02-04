import React,{useEffect,useState,useRef,useCallback} from 'react'
// import {  useQuery } from '@apollo/client';
// import { questionQuery } from "../data/query";
import styled from 'styled-components';
import {GetData} from '../data/Fetch'
const Loader = styled.div`
    width: 100%;
    height: 70px;
    text-align: center;
`;

const Repos = ()=> {
    // const {data}= useQuery(facebookQuery);
    const [moreOffset, setOffset] = useState(10);
    const { 
        questions: mesData,
        fetchMore } = GetData(moreOffset,setOffset);
    // ------>  defini le point d'entré pour charger le contenu en plus <------ //
    const loader = useRef(null);
    // ------>  charger le contenu suivant  <------ //
    const loadMore = useCallback((entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
            fetchMore({
                variables: {
                    offset: moreOffset,
                    limit: 10
                }
            }).then(fetchMoreResult => {
                          // Update variables.limit for the original query to include
                          // the newly added feed items.
                setOffset(moreOffset + fetchMoreResult.mesData?.length);
            });
        }
    }, [mesData,fetchMore]);
    console.log(mesData)
      // const questions = data?.questions
      // const formatedQuestions = questions && questions.map();

    // ------>  permet d'observer le viewport et de charger plus de contenu quand le loader affiche le bas de la page <------//
    useEffect(() => {
        if (!mesData) return;
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

    
    return (
        <ul>
            {mesData &&
                mesData.map(question =>(
                    <li key={question.id}> 
                        <h1>{question.value}</h1>  
                        
                        <h3>
                            <p>{question.id}</p>
                        </h3>
                    </li>
                ))
                
            }
            <Loader ref={loader}></Loader>
        </ul> 
    )
}

export default Repos
