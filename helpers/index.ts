import { signIn } from "next-auth/react";
import { LoginUserParams } from "../types";
import { InputErrors } from "../types/error";
import signup from "../pages/signup";
import { redirect } from "next/dist/server/api-utils";

export const getErrorMsg = (key: string, errors: InputErrors[]) => {
    if(errors.find(err => err.hasOwnProperty(key) !== undefined)) {
        const errorObj = errors.find(err => err.hasOwnProperty(key))
        return errorObj && errorObj[key]
    }
}

export const loginUser = async ({username, password} : LoginUserParams) => {
    const res = await signIn("credentials", {
        redirect: false,
        username,
        password
    })

    return res
}




    
   
