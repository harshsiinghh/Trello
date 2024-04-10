
import Board from "@/app/components/board"
import BoardPage from "@/app/boards/[boardId]/page"

type PageProps={
    params:{
    boardId:string,
    cardId:string
}}

export default function cardPage({params}:PageProps){
    return(
        <BoardPage params={params}/>
    )
}