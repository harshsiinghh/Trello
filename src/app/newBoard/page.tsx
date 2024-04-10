'use client'

import { redirect } from "next/navigation";
import { createBoard } from "../actions/boardActions";

export default function newBoardPage(){
async function handleNewBoardSubmit(formdata:FormData){
    const boardName=formdata.get('name')?.toString() || "";
    const {id}:any=await createBoard(boardName as string);
    redirect(`/boards/${id}`)
}
    
    return(
        <div>
            <form action={handleNewBoardSubmit} className="max-w-xs block">
                <h1 className="text-2xl mb-2">Create New Board</h1>
                <input type="text" name='name' placeholder="Enter Board Name"/>
                <button type="submit" className="mt-2 w-full"> Create </button>
            </form>
        </div>
    )
}