import gql from 'graphql-tag'

const ALL_CHATS_QUERY = gql`
  query AllChatsQuery {
    allChats {
      id
      createdAt
      from
      content
    }
  }
`

export default ALL_CHATS_QUERY
