import React, {useState, useEffect} from 'react'
import ImageInput from '../../cards/ImageInput'
import Input from '../../Inputs/TextInput'
import TextArea from '../../Inputs/TextArea'
import FileManager from '../../../lib/FileManager'
import { useProductContext } from '../UserProducts/pure'

const UserProductItemForm = props => {
  const [state, dispatch] = useProductContext()
  const product = props.product || {}
  const [name, setName] = useState(product.name || '')
  const [price, setPrice] = useState(product.price || 0)
  const [desc, setDesc] = useState(product.description || 0)
  const [file, setFile] = useState(null)
  const [mutation, submitMsg] = props.product ? [ props.updateProduct, 'Update' ] : [props.createProduct, 'Create']
  useEffect(() => {
    setName(product.name)
    setPrice(product.price)
    setDesc(product.description)
  }, [props.product])

  const onSubmit = e => {

    const actionType = props.product ? 'updateProduct' : 'addProduct'

    mutation({
      input: {
        userId: props.user_id,
        categoryId: props.categoryId,
        price: parseFloat(price),
        name: name,
        image: file,
        ...props.product ? {id: props.product.id} : null
      }}
    ).then(product => dispatch({
      type: actionType,
      payload: {
        categoryId: props.categoryId,
        product: product
      }
    }))
  }


  return(
    <div id="product-form" className="grid-12 col-gap-15" key={product.id}>
      <div className="col-5">
        <ImageInput 
          {...{file, setFile, image: product.image ? FileManager.getFileUrl({fileName: product.image, user_id: product.user_id}) : null}}
          />
      </div>
        <div className="col-7 row-gap-10 grid-1">
          <Input
              label={'Name'}
              value={name}
              name={name}
              onChange={e => setName(e.target.value)}
          />
          <Input
              label={'Price'}
              value={price}
              price={price}
              onChange={e => setPrice(e.target.value)}
              type={'number'}
          />
          <TextArea
              label={'Description'}
              value={desc}
              price={price}
              onChange={e => setDesc(e.target.value)}
              minHeight='7em'
          />
        </div>
        <div className="button" onClick={onSubmit}>{submitMsg}</div>
    </div>
  )
}

export default UserProductItemForm
