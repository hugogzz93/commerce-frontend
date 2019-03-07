import React, {useState, useEffect} from 'react'
import {createProductAction} from '../../../models/Products'
import Input from '../../Inputs/TextInput'
import TextArea from '../../Inputs/TextArea'
import { connect } from 'react-redux'

const ProductForm = props => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [active, setActive] = useState(false)

  useEffect(() => {
    if(props.onActiveChange) props.onActiveChange(active)
  }, [active])

  const createProduct = () => {
    setName('')
    setDescription('')
    setActive(false)
    props.createProduct({input: {name, description}})
  }

  if(active)
    return (
      <div class="grid-5 row-gap-5">
        <div className="col-5">
          <Input
            label={'Name'}
            value={name}
            name={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div className="col-5">
          <TextArea
            label={'Description'}
            value={description}
            name={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>
        <div className="col-3"></div>
        <div className="button col-1 btn--danger" onClick={() => setActive(false)}>Cancel</div>
        <div className="button col-1" onClick={createProduct}>Create</div>
      </div> 
    )
  else
    return <div class="card card--clickable" onClick={() => setActive(true)}>Create Category</div>
}

const mapDispatchToProps = dispatch => ({
  createProduct: e => dispatch(createProductAction(e))
})

export default connect(
  () => ({}),
  mapDispatchToProps
)(ProductForm)
