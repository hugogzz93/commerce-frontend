import React, { useState, useEffect, createRef } from 'react'

const Chat = props => {
  const [messages, setMessages] = useState([])
  const [value, setValue] = useState('')
  const socket = props.socket
  const issue = props.order.issues.find(i => i.status == 'open')

  const fromSelf = (msg) => msg.author.id == props.user.id
  const sendMsg = () => {
    if(issue)
      socket.emit('message', {author_id: props.user.id, body: value, issue_id: issue.id})
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
      }).then(res => {
        setMessages(res.data.order.createIssue.messages)
      })

  }
  const addMessage = msg => setMessages(messages.concat(msg))

  const scrollChat = () => {
    const chat = document.querySelector(`.chat__messages[chat-id="${issue.id}"]`)
    if(chat) chat.scrollTop = chat.scrollHeight
  }

  useEffect(() => {
    if(!issue) return
    props.getMessages({issue_id: issue.id})
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
  socket.on('msg_ack', msg => { setValue(''); addMessage(msg); scrollChat();  })
  socket.on('msg_fail', () => console.log('message failed to save'))

  return(
    <div className="chat__box">
      <div className="chat__form">
        <div className="chat__messages" chat-id={issue.id}>
          {msgDivs}
        </div>
        <input className="chat__prompt" type="text" value={value} onChange={e => setValue(e.target.value)}/>
        <div className="button" onClick={sendMsg}>{issue ? 'Send' : 'Open Issue'}</div>
      </div>
    </div>
  )
}

export default Chat
