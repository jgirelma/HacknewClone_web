import React, { useContext } from "react";
import { useLocation, Redirect } from "react-router-dom";
import AppContext from "../Contexts/AppContext";
import { Field, Formik, Form } from "formik";
import * as yup from "yup";
import { useNewPost } from "../api/post";

const validationSchema = yup.object({
  title: yup.string().min(1).required(),
  body: yup.string().min(1).required(),
});

export default function NewPost() {
  const location = useLocation();
  const { state } = useContext(AppContext);
  const { error, trigger, setParams } = useNewPost()

  if (!!state.user) {
    return (
      <div className="container mx-auto flex justify-center mt-8">
        <div className="w-full">
          <Formik
            initialValues={{ title: "", body: "" }}
            onSubmit={(data, actions) => {
              setParams(data)
              trigger()
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
                  label="Title"
                  errors={props.errors}
                  type="text"
                  name="title"
                  placeholder="Title"
                />
                <CustomField
                  className="h-64"
                  label="Body"
                  as="textarea"
                  errors={props.errors}
                  name="body"
                  type="textarea"
                  placeholder="Body"
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
                      Post
                    </button>
                  )}
                </div>
              </Form>
            )}
          </Formik>
          <p className="text-center text-gray-500 text-xs">
            &copy;2020 Acme Corp. All rights reserved.
          </p>
        </div>
      </div>
    );
  } else {
    return <Redirect to={{ pathname: "/login", state: { from: location } }} />;
  }
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
        as={props.as}
        placeholder={props.placeholder}
        className={`${
          !!props.errors[props.name] && "border-red-500"
        } shadow appearance-none border rounded w-full py-2 px-3 mb-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${props.className}`}
      />
      {!!props.errors[props.name] && (
        <p className="text-red-500 text-xs italic">
          {props.errors[props.name]}
        </p>
      )}
    </div>
  );
}
