import React, { useContext, useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import AppContext from "../Contexts/AppContext";
import { useHistory, Link, useLocation } from "react-router-dom";
import { LoginPost } from "../api/Auth";

const validationSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export default function Login() {
  const { state, dispatch } = useContext(AppContext);
  const history = useHistory();
  const [error, setError] = useState("");

  //Uses 'from' to know where to redirect user after login
  const location = useLocation();
  const { from }: any = location.state || { from: "/" };

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
    <div className="font-mono container mx-auto flex justify-center my-8">
      <div className="w-full max-w-xs">
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={async (data, actions) => {
            LoginPost(data)
              .then((res) => {
                dispatch({ type: "login", payload: { user: res.data.user } });
                history.push(from);
              })
              .catch((err) => {
                setError(err.response.data.message);
                actions.setSubmitting(false);
              });
          }}
          validationSchema={validationSchema}
        >
          {(props) => (
            <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              {!!error && (
                <p className="mb-6 flex justify-center text-red-500 text-xs italic">
                  {error}
                </p>
              )}
              <CustomField
                label="Email"
                errors={props.errors}
                type="email"
                name="email"
                placeholder="Email"
              />
              <CustomField
                label="Password"
                errors={props.errors}
                name="password"
                type="password"
                placeholder="******************"
              />
              <div className="flex items-center justify-center">
                {props.isSubmitting ? (
                  <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed">
                    Button
                  </button>
                ) : (
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Sign In
                  </button>
                )}
              </div>
            </Form>
          )}
        </Formik>
        <div className="flex justify-center">
          <Link
            to={{ pathname: "/register", state: { from: from } }}
            className="text-sm"
          >
            Click here to register
          </Link>
        </div>
      </div>
    </div>
  );
}

function CustomField(props: any) {
  return (
    <div className="mb-6">
      <label className="block text-gray-700 font-bold mb-2">
        {props.label}
      </label>
      <Field
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        className={`${
          !!props.errors[props.name] && "border-red-500"
        } shadow appearance-none border rounded w-full py-2 px-3 mb-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
      />
      {!!props.errors[props.name] && (
        <p className="text-red-500 text-xs italic">
          {props.errors[props.name]}
        </p>
      )}
    </div>
  );
}
