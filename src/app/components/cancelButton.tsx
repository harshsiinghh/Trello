import { faClose } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function CancelButton({onClick}:{onClick:()=>void}){
    return(
        <button onClick={onClick} className="flex w-full mt-2 p-2 justify-center uppercase text-sm text-gray-400 items-center gap-2">
                <FontAwesomeIcon icon={faClose}
                />
        Cancel Edit</button>
    )
}