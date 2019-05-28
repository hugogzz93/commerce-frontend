const reducerTypes = {
  SET: 'UPDATE_REDUCER',
  UPDATE: 'UPDATE_FIELD',
  INIT: 'INIT_REDUCER'
}

const formReducer = ( state, {type, payload}) => {
  const stateHelper = {
    initialState: {},
    getChangedFields() {
      let changes = []
      for(let key in this.initialState)
        if(this.initialState[key] != this[key]) {
          changes.push({key, value: this[key]});
        }
      return changes;
    }
  }

  switch(type) {
    case reducerTypes.INIT:
      return { ...{...stateHelper, initialState: payload}, ...payload}
    case reducerTypes.SET:
      return payload
    case reducerTypes.UPDATE:
      return { ...state, [ payload.field ]: payload.value}
  }
}

export {
  reducerTypes,
  formReducer
}
