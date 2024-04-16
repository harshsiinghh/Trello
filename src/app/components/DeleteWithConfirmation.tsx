import { faArrowLeft, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"

type Props={
    onDelete:()=>void
}


export default function Confirmation({onDelete}:Props){
    const [wannaDelete,setWannaDelete]=useState(false);

    if(wannaDelete){
        return(
            <div>
                <h4 className=" text-center mb-2">Are you sure?</h4>
            <div className="grid grid-cols-2 gap-2">
                <div>
                <button 
                className="btn w-full grow flex items-center justify-center gap-2"
                onClick={()=>{setWannaDelete(false)}}>
                <FontAwesomeIcon icon={faArrowLeft}/>
                No</button>
                </div>
                <div>
                <button 
                onClick={onDelete}
                className="grow w-full btn red flex items-center justify-center gap-2">
                <FontAwesomeIcon icon={faTrash}/>
                Yes,Delete
                </button>        
                </div>

            </div>
            </div>
        )
    }

return(
    <button 
    className="rounded-md bg-red-500 text-white p-2 w-full justify-center items-center flex gap-1"
    onClick={()=>{setWannaDelete(true)}}>
    <FontAwesomeIcon icon={faTrash}/>  
    Delete
    </button>
)
}

//6:29:11 / 8:57:33