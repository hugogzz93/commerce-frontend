import React, { useState, useEffect, createRef } from 'react'
import autosize from 'autosize'

const Chat = props => {
  const [order, setOrder] = useState(null)
  const [issue, setIssue] = useState(null)
  const [messages, setMessages] = useState([])
  const [value, setValue] = useState('')
  const [room, setRoom] = useState(null)
  const socket = props.socket

  useEffect(() => {
    autosize(document.querySelector(`.chat__prompt[order-id="${props.orderId}"]`))
    return () => autosize.destroy(document.querySelector(`.chat__prompt[order-id="${props.orderId}"]`))
  }, [])

  useEffect(() => {
    if(order) {
      if(issue) {
        socket.emit('join', calcRoomName())
        console.log('trying to join room')
      }
    } else
      props.getOrder({id: props.orderId}).then(res => {
        try {
          const order = res.data.orders[0]
          setOrder(order)
          setIssue(order.issues[0])
          setMessages(order.issues[0].messages)
          scrollChat()
        } catch(err) {
          console.error(`Chat couldn't load order ${props.orderId}`, err)
        }
      })
  }, [props.orderId, order, issue])

  useEffect(() => {
    const handleKeys = e => {
      if(e.target != document.querySelector(`.chat__prompt[order-id="${props.orderId}"]`)) return
      if(e.shiftKey) return
      switch(e.which) {
        case 13: sendMsg()
      }
    }

    window.addEventListener('keydown', handleKeys )
    return () => window.removeEventListener('keydown', handleKeys)
  })


  const sendMsg = () => {
    if(issue)
      socket.emit('message', {author_id: props.user.id, body: value, issue_id: issue.id, room })
    else
      props.openIssue({
        order_id: props.orderId,
        issueInput: {
          creator_id: order.client.id,
          attendee_id: order.vendor.id,
          messages: [{
            author_id: order.client.id,
            body: value
          }]
        }
      }).then(res => updateMessages(res.data.order.createIssue.messages))
  }

  const fromSelf = (msg) => msg.author.id == props.user.id
  const addMessage = msg => setMessages(messages.concat(msg))
  const updateLastSeenMsg = msg => socket.emit('msg_seen', {user_id: props.user.id, issue_id: issue.id, issue_message_id: msg.id})
  const updateMessages = (messages) => {
    setMessages(messages)
    if(messages.length)
      updateLastSeenMsg(messages[messages.length - 1])
  }


  const scrollChat = () => {
    const chat = document.querySelector(`.chat__messages[chat-id="${props.orderId}"]`)
    if(chat) chat.scrollTop = chat.scrollHeight
  }

  const calcRoomName = () => `issue:${issue.id}`

  socket.on('message', msg => addMessage(msg))
  socket.on('msg_ack', msg => { setValue(''); addMessage(msg); scrollChat();  })
  socket.on('msg_fail', (err, input) => {console.log('message failed to save')})
  socket.on('room_joined', room =>{console.log(`joined room ${room}`); setRoom(room)})

  const msgDivs = messages.map(msg => (
    <div className={`chat__bubble ${fromSelf(msg) ? 'msg--self' : ''}`} key={msg.id}>
        {msg.body}
    </div>
  ))

  return(
    <div className="shadow--1 flex--col">
      <div className="chat__messages" chat-id={props.orderId}>
        {msgDivs}
      </div>
      <div className="chat__inputs flex--row" style={{ flexWrap: 'nowrap', alignItems: 'center' }}>
        <textarea className="chat__prompt" order-id={props.orderId} type="text" value={value} onChange={e => setValue(e.target.value)}></textarea>
        <div className="chat__buttons">
          <div className="icon--button btn--circular button">
            <i className="fas fa-paper-plane" onClick={sendMsg}></i>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat
