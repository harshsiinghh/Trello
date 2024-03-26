'use client';

import { signOut } from "next-auth/react";

export default function LogOut(){
    return(
        <button onClick={()=>signOut()}
        className="bg-blue-600 ml-3 py-2 px-4 rounded-md text-white"> 
        LogOut 
        </button>
    )
}