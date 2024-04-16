import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useContext, useEffect } from "react"
import { BoardContext } from "./boardContext";

export default function Card({id,name}:{id:string , name:string}){
const params=useParams();
const router=useRouter();
const {openCard}=useContext(BoardContext);
useEffect(()=>{
    if(params.cardId && !openCard){
        const {boardId,cardId}=params
        router.push(`/boards/${boardId}`);
        router.push(`/boards/${boardId}/cards/${cardId}`)
    }
    if(!params.cardId && openCard){
        router.push(`/boards/${params.boardId}`)
    }
},[params.cardId])
return(
    <Link 
    href={`/boards/${params.boardId}/cards/${id}`}
    className="border block p-4 my-2 rounded-md">
    <span>{name}</span>
    </Link>
)
}