const reducerTypes = {
  SET: "UPDATE_REDUCER",
  UPDATE: "UPDATE_FIELD",
  INIT: "INIT_REDUCER"
};

const formReducer = (state, { type, payload }) => {
  const stateHelper = {
    initialState: {},
    getUpdatedFields() {
      let changes = [];
      for (let key in this.initialState)
        if (this.initialState[key] != this.address[key]) {
          changes.push({ key, value: this.address[key] });
        }
      return changes;
    }
  };

  switch (type) {
    case reducerTypes.INIT:
      return { ...{ ...stateHelper, initialState: payload }, address: payload };
    case reducerTypes.SET:
      return { ...state, address: payload };
    case reducerTypes.UPDATE:
      return {
        ...state,
        address: { ...state.address, [payload.field]: payload.value }
      };
  }
};

export { reducerTypes, formReducer };
