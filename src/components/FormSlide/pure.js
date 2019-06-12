import React from "react";
import { useReducer, useEffect } from "react";
import Input from "../Inputs/TextInput";
import TextArea from "../Inputs/TextArea";
import { Mutation } from "react-apollo";
import { UPDATE_USER } from "../../constants/queries.js";
import iziToast from "izitoast";

const FormSlide = props => {
  const [formState, dispatch] = useReducer(
    props.formReducer,
    props.initialFormState
  );

  const updatesAreValid = () => {
    return true;
  };

  const handleFieldChange = e => {
    dispatch({
      type: "UPDATE_FIELD",
      payload: {
        field: e.target.name,
        value: e.target.value
      }
    });
  };

  const onSubmit = () => {
    const { password_confirmation, ...input } = formState.fields;
    if (updatesAreValid()) props.submitUpdates({ id: props.id, input });
  };

  useEffect(() => {
    dispatch({
      type: "UPDATE_REDUCER",
      payload: props.initialFormState
    });
  }, [props.initialFormState]);

  return (
    <Mutation
      mutation={UPDATE_USER}
      onCompleted={() => {
        iziToast.success({ title: "Changes Saved" });
      }}
    >
      {(updateUser, { data, loading, error }) => {
        return (
          <form
            className="grid-12 col-gap-10 row-gap-20 container--50"
            onSubmit={e => {
              e.preventDefault();
              const { email, password, name } = formState.fields;
              if (updatesAreValid())
                updateUser({
                  variables: {
                    input: { email, password, name },
                    id: props.id
                  }
                });
            }}
          >
            <Input
              label={"Name"}
              className={"col-6"}
              value={formState.fields.name}
              name={"name"}
              onChange={handleFieldChange}
            />
            <Input
              label={"Email"}
              className={"col-6"}
              value={formState.fields.email}
              name={"email"}
              onChange={handleFieldChange}
            />
            <Input
              label={"Password"}
              type={"password"}
              className={"col-6"}
              value={formState.fields.password}
              name={"password"}
              onChange={handleFieldChange}
            />
            <Input
              label={"Password Confirmation"}
              type={"password"}
              className={"col-6"}
              value={formState.fields.password_confirmation}
              name={"password_confirmation"}
              onChange={handleFieldChange}
              errors={formState.errors.password_confirmation}
            />
            {/* <Input */}
            {/*   label={"Telephone"} */}
            {/*   className={"col-6"} */}
            {/*   value={formState.fields.phone} */}
            {/*   name={"phone"} */}
            {/*   onChange={handleFieldChange} */}
            {/* /> */}
            {/* <Input */}
            {/*   label={"Country"} */}
            {/*   className={"col-3"} */}
            {/*   value={formState.fields.country} */}
            {/*   name={"country"} */}
            {/*   onChange={handleFieldChange} */}
            {/* /> */}
            {/* <Input */}
            {/*   label={"City"} */}
            {/*   className={"col-3"} */}
            {/*   value={formState.fields.city} */}
            {/*   name={"city"} */}
            {/*   onChange={handleFieldChange} */}
            {/* /> */}
            {/* <Input */}
            {/*   label={"ZipCode"} */}
            {/*   className={"col-3"} */}
            {/*   value={formState.fields.zipcode} */}
            {/*   name={"zipcode"} */}
            {/*   onChange={handleFieldChange} */}
            {/* /> */}
            {/* <Input */}
            {/*   label={"Street"} */}
            {/*   className={"col-3"} */}
            {/*   value={formState.fields.street} */}
            {/*   name={"street"} */}
            {/*   onChange={handleFieldChange} */}
            {/* /> */}
            {/* <Input */}
            {/*   label={"Street 2"} */}
            {/*   className={"col-3"} */}
            {/*   value={formState.fields.street_2} */}
            {/*   name={"street_2"} */}
            {/*   onChange={handleFieldChange} */}
            {/* /> */}
            {/* <Input */}
            {/*   label={"Street Number"} */}
            {/*   className={"col-3"} */}
            {/*   value={formState.fields.street_number} */}
            {/*   name={"street_number"} */}
            {/*   onChange={handleFieldChange} */}
            {/* /> */}
            {/* <TextArea */}
            {/*   label={"Description"} */}
            {/*   className={"col-12"} */}
            {/*   value={formState.fields.description} */}
            {/*   name={"description"} */}
            {/*   onChange={handleFieldChange} */}
            {/*   minHeight="15em" */}
            {/* /> */}
            <button
              className="button col-3"
              disabled={!updatesAreValid()}
              type="submit"
            >
              Submit
            </button>
          </form>
        );
      }}
    </Mutation>
  );
};

export default FormSlide;
