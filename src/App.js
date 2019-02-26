import React, { Component } from 'react'

// Import GraphQL helpers
import { graphql, compose } from 'react-apollo'
import ALL_CHATS_QUERY from './AllChatsQuery'
import CREATE_CHAT_MUTATION from './NewChatMutation'
import Chatbox from './components/Chatbox'

// App component styles
import './App.css'

class App extends Component {
  state = {
    from: 'anonymous',
    content: ''
  }
  componentDidMount() {
    // Get username form prompt
    // when page loads
    const from = window.prompt('username')
    from && this.setState({ from })
  }
  _createChat = async e => {
    if (e.key === 'Enter') {
      const { content, from } = this.state
      await this.props.createChatMutation({
        variables: { content, from }
      })
      this.setState({ content: '' })
    }
  }
  render() {
    const allChats = this.props.allChatsQuery.allChats || []
    return (
      <div className="">
        <div className="container">
          <h2>Chats</h2>
          {allChats.map(message => (
            <Chatbox key={message.id} message={message} />
          ))}

          {/* Message content input */}
          <input
            value={this.state.content}
            onChange={e => this.setState({ content: e.target.value })}
            type="text"
            placeholder="Start typing"
            onKeyPress={this._createChat}
          />
        </div>
      </div>
    )
  }
}

export default compose(
  graphql(ALL_CHATS_QUERY, { name: 'allChatsQuery' }),
  graphql(CREATE_CHAT_MUTATION, { name: 'createChatMutation' })
)(App)
