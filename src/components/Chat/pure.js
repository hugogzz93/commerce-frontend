import React, { useState, useEffect, createRef } from 'react'
import autosize from 'autosize'

const Chat = props => {
  const [messages, setMessages] = useState([])
  const [value, setValue] = useState('')
  const socket = props.socket
  const issue = props.order.issues.find(i => i.status == 'open')
  const room = issue ? `issue:${issue.id}` : null

  const updateMessages = (messages) => {
    setMessages(messages)
    if(messages.length)
      updateLastSeenMsg(messages[messages.length - 1])
  }

  const fromSelf = (msg) => msg.author.id == props.user.id
  const sendMsg = () => {
    if(issue)
      socket.emit('message', {author_id: props.user.id, body: value, issue_id: issue.id, room })
    else
      props.openIssue({
        order_id: props.order.id,
        issueInput: {
          creator_id: props.user.id,
          attendee_id: props.order.vendor.id,
          messages: [{
            author_id: props.user.id,
            body: value
          }]
        }
      }).then(res => updateMessages(res.data.order.createIssue.messages))
  }

  const addMessage = msg => setMessages(messages.concat(msg))
  const updateLastSeenMsg = msg => socket.emit('msg_seen', {user_id: props.user.id, issue_id: issue.id, issue_message_id: msg.id})

  const scrollChat = () => {
    const chat = document.querySelector(`.chat__messages[chat-id="${props.order.id}"]`)
    if(chat) chat.scrollTop = chat.scrollHeight
  }

  useEffect(() => {
    if(issue && issue.id) {
      socket.emit('join', room)
      props.getMessages({issue_id: issue.id})
      .then(res => {
        if(res.data && res.data.issues.length)
          updateMessages(res.data.issues[0].messages)
        scrollChat()
      })
    }
  }, [issue])

  useEffect(() => {
    const handleKeys = e => {

      if(e.target != document.querySelector(`.chat__prompt[order-id="${props.order.id}"]`)) return
      if(e.shiftKey) return
      switch(e.which) {
        case 13: sendMsg()
      }
    }

    window.addEventListener('keydown', handleKeys )
    return () => window.removeEventListener('keydown', handleKeys)
  })

  useEffect(() => {
    autosize(document.querySelector(`.chat__prompt[order-id="${props.order.id}"]`))
  }, [])

  const msgDivs = messages.map(msg => (
    <div className={`chat__bubble ${fromSelf(msg) ? 'msg--self' : ''}`} key={msg.id}>
        {msg.body}
    </div>
  ))

  socket.on('message', msg => addMessage(msg))
  socket.on('msg_ack', msg => { setValue(''); addMessage(msg); scrollChat();  })
  socket.on('msg_fail', (err, input) => {console.log('message failed to save')})

  return(
    <div className="shadow--1 flex--col">
      <div className="chat__messages" chat-id={props.order.id}>
        {msgDivs}
      </div>
      <div className="chat__inputs flex--row" style={{ flexWrap: 'nowrap', alignItems: 'center' }}>
        <textarea className="chat__prompt" order-id={props.order.id} type="text" value={value} onChange={e => setValue(e.target.value)}></textarea>
        <div className="chat__buttons">
          <div className="icon--button btn--circular button">
            <i class="fas fa-paper-plane" onClick={sendMsg}></i>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat
