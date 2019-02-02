import React, {useState, useEffect} from 'react'
import ImageInput from '../../cards/ImageInput'
import Input from '../../Inputs/TextInput'
import TextArea from '../../Inputs/TextArea'
import FileManager from '../../../lib/FileManager'

const UserProductItemForm = props => {
  const userProduct = props.userProduct || {}
  const [name, setName] = useState(userProduct.name || '')
  const [price, setPrice] = useState(userProduct.price || 0)
  const [desc, setDesc] = useState(userProduct.description || 0)
  const [file, setFile] = useState(null)
  const [mutation, submitMsg] = props.userProduct ? [ props.updateProductItem, 'Update' ] : [props.createProductItem, 'Create']
  useEffect(() => {
    setName(userProduct.name)
    setPrice(userProduct.price)
    setDesc(userProduct.description)
  }, [props.userProduct])

  return(
    <div className="up__item-form grid-12 col-gap-15" key={userProduct.id}>
      <div className="col-5">
        <ImageInput 
          {...{file, setFile, image: userProduct.image ? FileManager.getFileUrl({fileName: userProduct.image, user_id: userProduct.user_id}) : null}}
          />
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
        <div className="button" onClick={e => mutation({
          user_id: props.user_id,
          product_id: props.product_id,
          id: props.userProduct.id,
          price: parseFloat(price),
          name: name,
          image: file
        })}>{submitMsg}</div>
    </div>
  )
}

export default UserProductItemForm
