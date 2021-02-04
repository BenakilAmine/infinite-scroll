import { questionQuery } from "../data/query";
import { useQuery} from "@apollo/client";
// query 


export const GetData = (moreOffset,setOffset) => {
    const { loading, data,error, fetchMore } = useQuery(questionQuery, {
        variables: {
            // type: "PUBLIC",
            offset: 0,
            limit: moreOffset
        },
        onCompleted: (data) => {
            setOffset(data.questions.length) 
        }, 
        pollInterval: 2000,
    });
    if (error) {
        throw new Error(error);
    }
    const availableData = data && data.questions;
  return {
    questions: availableData,
    loading,
    fetchMore
  };
    
}