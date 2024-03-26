'use client';

import { signIn } from "next-auth/react";

export default function LoginPage() {
    return(
    <div className="w-full pt-8 text-center ">
        <button type="button" 
        className="primary"
        onClick={()=>{signIn("Google")}}
        >
            Login</button>
        </div>
    );
}