import React, { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { AxiosError } from 'axios'
import { BsPerson } from 'react-icons/bs'
import { AiOutlineUnlock } from 'react-icons/ai'
import { loginUser } from '../../helpers'
import AppLogoTitle from '../AppLogoTitle'
import Button from '../Button'
import User from '../../models/user'
import axios from 'axios'
import jwtDecode from 'jwt-decode'

import {
    Container,
    Form,
    FormTitle,
    InfoText,
    InfoTextContainer,
    Link
} from './FormElements'
import InputFeild from './InputFeild'
import { ErrorText } from './InputFeildElements'

const LoginForm = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [submitError, setSubmitError] = useState("")
    const [user, setUser] = useState(null);
    const router = useRouter()
    const pathName = usePathname()

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value)
    }

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        try {
            const response = await axios.post('/api/auth/login', { username, password });
            const { token } = response.data;

            // Decode the token to get user information
            const decodedToken: { userId: string; role: string } = jwtDecode(token);
            const { userId, role } = decodedToken;

            switch (role) {
                case 'student':
                  // Redirect to the student page
                  window.location.href = '/students/formGroup';
                  break;
                case 'coordinator':
                  // Redirect to the coordinator page
                  window.location.href = '/coordinator/dashboard';
                  break;
                case 'examiner':
                  // Redirect to the examiner page
                  window.location.href = '/examiner/dashboard';
                  break;
                case 'advisor':
                  // Redirect to the advisor page
                  window.location.href = '/advisor/dashboard';
                  break;
                case 'guest':
                  // Redirect to the guest page
                  window.location.href = '/';
                  break;
                default:
                  // Redirect to a default page or show an error message
                  break;
              }
            // setLoading(true)

            // const loginRes = await loginUser({ username, password })

            // if (loginRes && !loginRes.ok) {
            //     setSubmitError(loginRes.error || "")
            // }
            // else {
            //     router.push("/coordinator/dashboard")
            //     // fetch(`/api/fetchApis/users?username=${username}`)
            //     // .then((response) => response.json())
            //     // .then((data) => setUser(data))
            //     // .catch((error) => console.error('Failed to fetch user:', error));
            //     // console.log(user)
            //     // if(user.role === "student"){
            //     //     router.push("/students/formGroup")
            //     // }
            //     // else if(user.role === "coordinator"){
            //     //     router.push("/coordinator/dashboard")
            //     // }
            //     // else if(user.role === "examiner"){
            //     //     router.push("/examiner/dashboard")
            //     // }
            //     // else if(user.role === "advisor"){
            //     //     router.push("/advisor/dashboard")
            //     // }
            //     // else if(user.role === "guest"){
            //     //     router.push("/")
            //     // }
            // }
        } catch (error) {
            console.error('Login error:', error);
            // if (error instanceof AxiosError) {
            //     const errorMsg = error.response?.data?.error
            //     setSubmitError(errorMsg)
            // }
        }

        setLoading(false)
    }

    return (
        <Container>
            
            {/* <AppLogoTitle /> */}
            <Form onSubmit={handleLogin} className="space-y-6 ">
                <FormTitle> Login </FormTitle>

                <InputFeild
                    placeholder='Username'
                    type='text'
                    icon={<BsPerson />}
                    value={username}
                    onChange={handleUsernameChange}
                    required
                />

                <InputFeild
                    placeholder='password'
                    type='password'
                    icon={<AiOutlineUnlock />}
                    value={password}
                    onChange={handlePasswordChange}
                    required
                />

                <Link href="/forgot-password">
                    Forgot Password?
                </Link>

                <Button
                    type='submit'
                    title='Login'
                    disabled={loading}
                />

                {
                    submitError &&
                    <ErrorText>
                        {submitError}
                    </ErrorText>
                }

                <InfoTextContainer>
                    <InfoText>
                        New User?
                    </InfoText>

                    <Link href='/signup'>
                        Create an Account
                    </Link>
                </InfoTextContainer>
            </Form>
            
        </Container>
    )
}

export default LoginForm