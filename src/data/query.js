import {gql} from "@apollo/client";


// export const GET_MESSAGES = gql`
// query($offset: Int, $limit: Int) {
//   messages(id: "ckl6q3gin13835awn9zwg81he",offset: $offset, limit: $limit) {
//           id
//           value 
//   }
// }
// `;
export const GET_MESSAGES = gql`
query($discussionId: ID!,$limit: Int,$offset: Int,$cursor: String){
    messages(id: $discussionId, limit: $limit,offset: $offset, cursor: $cursor){
        id
        createdAt
        updatedAt
        value
        likes
        fromModerator
        fieldValues {
          id
          value
          field {
            id
            isDisplayKey
            formLabel {
              type
            }
          }
        }
        answers {
          id
          value
          likes
          createdAt
          updatedAt
          fromModerator
          fieldValues {
            id
            value
            field {
              id
              isDisplayKey
              formLabel {
                type
              }
            }
          }
        }
      }
  }
`;

export const NEW_MESSAGE_SUBSCRIPTION = gql`
subscription($discussionId: ID!) {
    message(discussionId: $discussionId) {
      id
      value
      
    }
  }
`;