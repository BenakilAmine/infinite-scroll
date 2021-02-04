import {gql} from "@apollo/client";


export const questionQuery = gql`
query($offset: Int, $limit: Int) {
  questions(id: "ckj16fywc4482pgyy4lfwacfe",offset: $offset, limit: $limit) {
          id
          value 
  }
}
`;