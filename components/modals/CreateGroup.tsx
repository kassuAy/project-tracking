import React from 'react'
import * as Yup from 'yup'
// import Yup from 'yup'
import { ErrorMessage, Field, Form, Formik } from 'formik'

interface CreateGroupModalProps {
    showModal: boolean
    setShowModal: (showModal: boolean) => void
}
function CreateGroupModal({
    showModal,
    setShowModal
}: CreateGroupModalProps) {
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <Formik
              initialValues={{ name: '' }}
              validationSchema={Yup.object({
                name: Yup.string().required('Group name is required.'),
              })}
              onSubmit={async (values) => {
                // await createGroup(values)
              }}
            >
              <div className="relative p-6 flex-auto">
                <div className="flex flex-col justify-evenly bg-white px-7">
                  <Form className="text-secondary-text">
                    <div className="flex justify-center mb-6"></div>
                    <div className="mb-4">
                      <h1 className="text-xl text-center mb-1 text-gray-700 text-primary-text">
                        Add New Group
                      </h1>
                      <p className="text-center text-gray-700">
                        Please add all the neccessary information
                      </p>
                    </div>

                    <div className="mb-4">
                      <label htmlFor="name" className="text-sm text-gray-700">
                        Group Name
                      </label>

                      <Field
                        name="name"
                        className="text-sm block border-secondary-text-100  rounded border-2 border-solid w-full p-1"
                      />
                      <div className="text-red-400 text-sm py-1">
                        <ErrorMessage name="name" />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="name" className="text-sm text-gray-700">
                        Group Members
                      </label>

                      <Field name="studentName"
                      className="text-sm block border-secondary-text-100 rounded border-2 border-solid w-full p-1"
                      />

                      <div className="text-red-400 text-sm py-1">
                        <ErrorMessage name="name" />
                      </div>
                    </div>
                    <div className="flex items-center justify-end gap-4 ">
                      <button
                        className="bg-blue-700 rounded text-white text-sm px-4 py-2 border-2 border-gray shadow hover:shadow-lg outline-none focus:outline-none"
                        type="submit"
                      >
                        Submit
                      </button>

                      <button
                        className="background-transparent bg-red-700 font-bold px-4 py-2 text-sm border-2 rounded border-gray-text "
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </Form>
                </div>
              </div>
            </Formik>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  )
}

export default CreateGroupModal