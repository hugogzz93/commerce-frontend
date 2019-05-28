import React, {useState, useEffect} from 'react'
import ImageInput from '../../cards/ImageInput'
import Input from '../../Inputs/TextInput'
import TextArea from '../../Inputs/TextArea'
import { useProductContext } from '../UserProducts/pure'
import Spinner from '../../Spinner.jsx'
import RPC from '../../../lib/RPC.js'

const UserProductItemForm = props => {
  const [state, dispatch] = useProductContext()
  const [name, setName] = useState(null)
  const [price, setPrice] = useState(null)
  const [desc, setDesc] = useState(null)
  const [image, setImage] = useState(null)
  const [file, setFile] = useState(null)
  const [formDisabled, setDisabledForm] = useState(false)
  const formIsUpdating = !!props.product

  useEffect(() => updateFields(props.product || {}), [props])

  const updateFields = product => {
    setName(product.name || null)
    setPrice(product.price || null)
    setDesc(product.description || null)
    setImage(product.image || null)
    setFile(null)
  }

  const onSubmit = () => {
    setDisabledForm(false)
    updateFields({})
    props.onSubmit()
  }

  const submit = e => {
    setDisabledForm(true)

    const variables = {
    input: {
        userId: props.user_id,
        categoryId: props.category.id,
        ...price ? {price: parseFloat(price)} : null,
        ...name ? {name} : null,
        ...file ? {image: file} : null,
      }
    }

    const actionType = formIsUpdating ? 'updateProduct' : 'addProduct'
    const mutation = formIsUpdating ? props.updateProduct : props.createProduct
    if(formIsUpdating) variables.id = props.product.id

    mutation(variables).then(RPC.handleResponseStatus({
        ensure: onSubmit,
        successFn: product => {
          dispatch({
            type: actionType,
            payload: {
              categoryId: props.category.id,
              product: product
            }
          })
        }
    }))
  }


  return(
    <div className="card fade-in no--padding">
      <div id="product-form" className="grid-12 col-gap-15 card--no-bg" >
      <div className="t--strong col-12">{props.category.name}</div>
        <div className="col-5">
          <ImageInput 
            {...{ file, setFile, image }}
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
          <div className="button" disabled={formDisabled} onClick={submit}>{formIsUpdating ? 'Update' : 'Create'}</div>
          { formIsUpdating && <div className="button btn--danger" disabled={formDisabled} onClick={onSubmit}>Cancel</div> }
          
      </div>
      {formDisabled && <div className="progress-bar"></div>}
    </div>
  )
}

export default UserProductItemForm
