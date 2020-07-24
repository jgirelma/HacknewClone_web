import React, { useContext, useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import AppContext from "../Contexts/AppContext";
import { useHistory, useLocation } from "react-router-dom";
import { RegisterPost } from '../api/Auth'

const validationSchema = yup.object({
  firstname: yup.string().required(),
  lastname: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Passwords don't match")
    .required("Confirm Password is required"),
});

export default function Register() {
  const { state, dispatch } = useContext(AppContext);
  const history = useHistory();
  const [error, setError] = useState("");

  const location = useLocation()
  const { from } : any = location.state || { from : '/' }

  //Checks if user is already logged in
  useEffect(() => {
    if (!!state.user) {
        setError("Alreay Logged In... Redirecting");
        setTimeout(() => {
          history.push(from);
        }, 1000);
      }
  }, []);

  return (
    <Formik
      initialValues={{
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        passwordConfirmation: "",
      }}
      onSubmit={(data, actions) => {
        RegisterPost(data)
          .then((res) => {
            dispatch({type: 'login', payload : { user : res.data.user}})
            history.push(from)
          })
          .catch((err) => {
            setError(err.response.data.message)
            actions.setSubmitting(false)
          })
      }}
      validationSchema={validationSchema}
    >
      {(props) => (
        <Form className="container mx-auto bg-white rounded w-full max-w-lg p-8 mt-8 font-mono text-gray-900">
          {!!error && (
            <p className="flex justify-center mb-6 text-red-500 text-xs italic">
              {error}
            </p>
          )}
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <CustomField
                type="text"
                name="firstname"
                label={'First Name'}
                placeholder="Jane"
                errors={props.errors}
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <CustomField
                name="lastname"
                label="Last Name"
                type="text"
                errors={props.errors}
                placeholder="Doe"
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <CustomField
                errors={props.errors}
                name="email"
                type="email"
                label="Email"
                placeholder="Email"
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <CustomField
                label="Password"
                errors={props.errors}
                name="password"
                type="password"
                placeholder="******************"
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <CustomField
                label="Password Confirmation"
                errors={props.errors}
                name="passwordConfirmation"
                type="password"
                placeholder="******************"
              />
            </div>
          </div>
          <div className="flex items-center justify-center">
            {props.isSubmitting ? (
              <button className="bg-blue-500 text-white font-bold py-1 px-4 rounded opacity-50 cursor-not-allowed">
                Button
              </button>
            ) : (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Sign Up
              </button>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
}

function CustomField(props: any) {
  return (
    <>
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
        {props.label}
      </label>
      <Field
        className={`${
          !!props.errors[props.name] && "border-red-500"
        } appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
      />
      {!!props.errors[props.name] && (
        <p className="text-red-500 text-xs italic">{props.errors[props.name]}</p>
      )}
    </>
  );
}
