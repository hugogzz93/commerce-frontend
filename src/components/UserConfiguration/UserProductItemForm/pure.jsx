import React, {useState} from 'react'
import ImageInput from '../../cards/ImageInput'
import Input from '../../Inputs/TextInput'
import TextArea from '../../Inputs/TextArea'

const UserProductItemForm = props => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [desc, setDesc] = useState('')
  const [file, setFile] = useState(null)

  return(
    <div className="up__item-form grid-12 col-gap-15">
      <div className="col-5">
        <ImageInput {...{file, setFile}}/>
      </div>
        <div className="col-7 ">
          <Input
              label={'Name'}
              value={name}
              name={name}
              onChange={e => setName(e.target.value)}
          />
          <div className="div" style={{ marginBottom: '10px' }}/>
          <Input
              label={'Price'}
              value={price}
              price={price}
              onChange={e => setPrice(e.target.value)}
              type={'number'}
          />
          <div className="div" style={{ marginBottom: '10px' }}/>
          <TextArea
              label={'Description'}
              value={desc}
              price={price}
              onChange={e => setDesc(e.target.value)}
          />
        </div>
        <div className="button" onClick={e => props.createProductItem({
          user_id: props.user_id,
          product_id: props.product_id,
          price: parseFloat(price),
          name: name,
          image: file
        }) }>Submit</div>
    </div>
  )
}

export default UserProductItemForm
