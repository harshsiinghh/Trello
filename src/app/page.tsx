import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import LoginPage from "./components/views/loginView";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightLong } from "@fortawesome/free-solid-svg-icons";
import Boards from "./components/boards";

export default async function Home() {
  const session= await getServerSession(authOptions)
  if(!session){
    return(
      <div><LoginPage/></div>
    )
  }
  return (
    <div>
      <h1 className="text-4xl mb-4 ">Your Board : </h1>
      <Boards/>
      <div className="mt-4">
      <Link href={'/newBoard'}
      className="btn primary inline-flex gap-2 ">
        Create New Board <FontAwesomeIcon className="h-6" icon={faRightLong} />
      </Link>
      </div>
    </div>
  );
}




//2:09:57 / 8:57:33
