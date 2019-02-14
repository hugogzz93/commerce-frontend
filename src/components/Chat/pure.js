import React, { useState, useEffect, createRef } from 'react'

const Chat = props => {
  const [messages, setMessages] = useState([])
  const [value, setValue] = useState('')
  const socket = props.socket

  const fromSelf = (msg) => msg.author.id == props.user.id
  const sendMsg = (e) => {
    socket.emit('message', {author_id: props.user.id, body: value, issue_id: props.issue_id})
  }
  const addMessage = msg => setMessages(messages.concat(msg))

  const scrollChat = () => {
    const chat = document.querySelector(`.chat__messages[chat-id="${props.issue_id}"]`)
    if(chat) chat.scrollTop = chat.scrollHeight
  }

  useEffect(() => {
    props.getMessages({issue_id: props.issue_id})
    .then(res => {
      if(res.data && res.data.issues.length)
        setMessages(res.data.issues[0].messages)
      scrollChat()
    })
  }, [])

  const msgDivs = messages.map(msg => (
    <div className={`chat__bubble ${fromSelf(msg) ? 'msg--self' : ''}`} key={msg.id}>
        {msg.body}
    </div>
  ))

  socket.on('message', msg => addMessage(msg))
  socket.on('msg_ack', msg => { addMessage(msg); scrollChat() })
  socket.on('msg_fail', () => console.log('message failed to save'))

  return(
    <div className="chat__box">
      <div className="chat__form">
        <div className="chat__messages" chat-id={props.issue_id}>
          {msgDivs}
        </div>
        <input className="chat__prompt" type="text" value={value} onChange={e => setValue(e.target.value)}/>
        <div className="button" onClick={sendMsg}>Send</div>
      </div>
    </div>
  )
}

export default Chat
