'use client'


import { signIn } from "next-auth/react";

export default function LoginButton(){
    return(
        <button onClick={()=>signIn('google')}
        className="bg-blue-600 ml-3 py-2 px-4 rounded-md text-white"> 
        LOG IN
        </button>
    )
}