'use client'
import { useRouter } from "next/navigation"
import { useState } from "react"
import axios, {AxiosError} from "axios"
// import { InputErrors } from '../../types/error'
import { FormData } from "../../types"
interface Students{
  showModal: boolean
  setShowModal: (showModal: boolean) => void
}

const initialFormValues: FormData = {
  fullName: '', 
  email: '', 
  username: '', 
  password: '', 
  role: 'student',
  confirmPassword: ''
}

export const CreateStudentModal = ({
  showModal,
  setShowModal,
//   students
} : Students) => {
   
    const [form, setForm] = useState<FormData>(initialFormValues)
    const [submitError, setSubmitError] = useState<string>('');
    const router = useRouter()


    // const [validationErrors, setValidationErrors] = useState<InputErrors[]>([])
    const [loading, setLoading] = useState(false)
    // console.log(role)
    const validateData = (): boolean => {
        const err = []
        
        if (form.fullName?.length < 4) {
            err.push({ fullName: "Full name must be atleast 4 characters long" })
        }
        else if (form.fullName?.length > 30) {
            err.push({ fullName: "Full name should be less than 30 characters" })
        }
        else if (form.password?.length < 8) {
            err.push({ password: "Password should be atleast 8 characters long" })
        }
        else if (form.password !== form.confirmPassword) {
            err.push({ confirmPassword: "user id don't match" })
        }

        // setValidationErrors(err)

        if (err.length > 0) {
            return false
        }
        else {
            return true
        }
    }

    const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const isValid = validateData()

        if (isValid) {
            // sign up
            try {
                setLoading(true)
                const response = await fetch('/api/auth/signup', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(form),
                });

                if(response.ok){
                    console.log("Form Submitted Successfully")
                    setSubmitError('')
                    setForm(initialFormValues)
                }
                else{
                    const data = await response.json();
                    setSubmitError(data.error);
                    // console.log(data.error);
                }
            } catch (error) {
                console.error('An error occurred while submitting the form:', error);
                setSubmitError('An error ocurred while submitting the form');
            }

            setLoading(false)
        }
    }
 
    return (
        <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <div className="relative p-6 flex-auto">
            <div className="flex flex-col justify-evenly bg-white px-7">
             
              <form
                className="text-secondary-text"
                encType="multipart/form-data"
                onSubmit={handleSignup}
                >
                <div className="mb-4">
                    <h1 className="text-xl text-center mb-1 text-primary-text">
                    Add New Student
                    </h1>
                  
                </div>
                    <div className="mb-4">
                        <label htmlFor="firstName" className="text-sm text-gray-700 font-semibold">
                        Full Name
                        </label>
                        <input
                        name="fullName"
                        className="text-sm  block border-secondary-text-100  rounded border-2 border-solid w-full p-1"
                        value={form.fullName}
                        onChange={e => setForm({...form, fullName: e.target.value})}
                        required
                        />
                    </div>
                    
                    <div>
                    <div className="mb-4">
                        <label htmlFor="email" className="text-sm text-gray-700 font-semibold">
                        Email
                        </label>
                        <input
                        name="email"
                        className="text-s block border-secondary-text-100  rounded border-2 border-solid w-full p-1"
                        value={form.email}
                        onChange={e => setForm({...form, email: e.target.value})}
                        required
                        />
                        <div className="text-red-400 text-sm py-1">
                        
                        </div>
                    </div>
                    
                    <div className="mb-4">
                        <label htmlFor="username" className="text-sm text-gray-700 font-semibold">
                        Student ID
                        </label>
                        <input
                        name="username"
                        className="text-s block border-secondary-text-100  rounded border-2 border-solid w-full p-1"
                        value={form.username}
                        onChange={e => setForm({...form, username: e.target.value})}
                        required
                        />
                        <div className="text-red-400 text-sm py-1">
                        
                        </div>
                    </div>
                    <div className="flex gap-10">
                      <div className="mb-4">
                          <label htmlFor="password" className="text-sm text-gray-700 font-semibold">
                          Password
                          </label>
                          <input
                          name="password"
                          className="text-s block border-secondary-text-100  rounded border-2 border-solid w-full p-1"
                          value={form.password}
                          onChange={e => setForm({...form, password: e.target.value})}
                          required
                          />
                          <div className="text-red-400 text-sm py-1">
                          
                          </div>
                      </div>
                      <div className="mb-4">
                          <label htmlFor="confirmPassword" className="text-sm text-gray-700 font-semibold">
                          Confirm Password
                          </label>
                          <input
                          name="confirmPassword"
                          className="text-s block border-secondary-text-100  rounded border-2 border-solid w-full p-1"
                          value={form.confirmPassword}
                          onChange={e => setForm({...form, confirmPassword: e.target.value})}
                          required
                          />
                          <div className="text-red-400 text-sm py-1">
                          
                          </div>
                      </div>
                    </div>
                    </div>
                    
                    <div className="flex items-center justify-end gap-4 ">
                        {submitError && <p>{submitError}</p>}
                        <button
                        className="bg-blue-500 rounded text-white text-sm px-4 py-2 border-2 border-primary shadow hover:shadow-lg outline-none focus:outline-none"
                        type="submit"
                        >
                        Submit
                        </button>

                        <button
                        className="bg-red-500 font-bold px-4 py-2 text-sm border-2 rounded border-secondary-text "
                        type="button"
                        onClick={() => setShowModal(false)}
                        >
                        Cancel
                        </button>
                    </div>
                </form> 
            </div>
            
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
    )
}