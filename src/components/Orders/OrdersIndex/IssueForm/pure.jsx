import React, { useState, useEffect} from 'react'
import ThumbCard from '../../cards/ThumbCard'
import Chat from '../../Chat/index.js'

const IssueForm = props => {
  const [state, setState] = useState({})
  const [loaded, setLoaded] = useState(false)
  const [itemCursor, setItemCursor] = useState(null)
  const [users, setUsers] = useState([])

  useEffect(() => {
    props.getOrder(order_id).then(res => {
      if(res.data.orders) {
        setState(res.data.orders)
        setUsers([...new Set(res.data.order.orderItems.map(e => e.userProduct.user))])
        setLoaded(true)
      } 
    })
  }, [props.order_id])

  if(loaded) 
    return (
      <div class="issue__form grid-5">
        <div className="col-1 flex--row">
            users.map(( user, i ) => {
              return (
                <ThumbCard
                    title={user.name}
                    subTitle={user.email}
                    onClick={() => setItemCursor(user.id)}
                    selected={itemCursor == user.id }
                />
              )
            })
        </div>
        <div className="col-4">
            <Chat>
        </div>
      </div>
    )
  else
    return (
      <div class="issue__form"></div>
    )
}

export default IssueForm
