import { getServerSession } from "next-auth";
import Board from "./components/board";
import { authOptions } from "@/lib/authOptions";
import LoginPage from "./components/views/loginView";

export default async function Home() {
  const session= await getServerSession(authOptions)
  if(!session){
    return(
      <div><LoginPage/></div>
    )
  }
  return (
    <div>
      <h1 className="text-4xl">Your Board : </h1>
      <ul>Boards Go Here</ul>
    </div>
  );
}
