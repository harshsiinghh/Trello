import { authOptions } from "@/lib/authOptions"
import { getServerSession } from "next-auth"
import LogOut from "./logoutButton";
import LoginButton from "./loginButton";

export default async function Header(){
    const session = await getServerSession(authOptions);
    return(
        <header className="bg-gray-300 p-4 px-8">
         <div className="flex justify-between items-center">
         <a href="" className="logo">Trello</a>
         <div>
        {session && (
        <> Hello, {session?.user?.name} 
        <LogOut/>
        </>
        )}
        {!session && (<>NOT LOGGED IN
        <LoginButton/>
        </>)}
         </div>
         </div>
        </header>
    )
}