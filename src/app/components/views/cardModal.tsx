'use client'

import { useParams, useRouter } from "next/navigation";
import { FormEvent, useContext, useEffect, useState } from "react";
import { BoardContext, BoardContextProps } from "../boardContext";
import { Cards, useMutation, useStorage } from "@/app/liveblocks.config";
import { shallow } from "@liveblocks/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faSave, faTrash } from "@fortawesome/free-solid-svg-icons";
import Confirmation from "../DeleteWithConfirmation";
import CancelButton from "../cancelButton";

export default function CardModal(){
    const router=useRouter();
    const params=useParams();
    const {setOpenCard} = useContext<BoardContextProps>(BoardContext);
    const [editMode,setEditMode]=useState(false);


    const card=useStorage(root=>{
        return root.cards.find(c=>c.id===params.cardId)
    },shallow)

    useEffect(()=>{
        if(params.cardId && setOpenCard){
            setOpenCard(params.cardId.toString())
        }
    },[params])

    function handleBackDropClick(){
        router.back()
    }

    const updateCard=useMutation(({storage},cardId,updateData)=>{
        const cards=storage.get('cards').map(c=>c.toObject())
        const index=cards.findIndex(c=>c.id===cardId);
        const card=storage.get('cards').get(index)
        for(let updateKey in updateData){
            card?.set(updateKey as keyof Cards ,updateData[updateKey]);
        }
    },[])

    function handleNameChangeSubmit(ev:FormEvent){
        ev.preventDefault();
        const input =(ev.target as HTMLFormElement).querySelector('input');
        if(input){
            const newName=input.value;
            updateCard(params.cardId , {name:newName})
            setEditMode(false);
        }
    }

    const deleteCard=useMutation(({storage},id)=>{
        const cards= storage.get("cards")
        const cardIndex=cards.findIndex(c=>c.toObject().id===id)
        cards.delete(cardIndex);
        },[])

    function handleDelete(){
        deleteCard(params.cardId);
        if(setOpenCard){
            setOpenCard(null)
        }
        router.back();
    }

    return(
        <div className="fixed inset-0 bg-black/70" onClick={handleBackDropClick}>
            <div className="bg-white p-4 mt-8 max-w-xs mx-auto rounded-md" 
            onClick={ev=>ev.stopPropagation()}>
            {!editMode && (
            <div className="justify-between flex">
            <h4>{card?.name}</h4>
            <button className="text-gray-400"
                    onClick={()=>{setEditMode(true)}}>
                <FontAwesomeIcon icon={faEllipsis}/>
            </button>
            </div>
            )}
            {editMode && (
                <div >
                    <form onSubmit={handleNameChangeSubmit}>
                        <input type="text" defaultValue={card?.name} className="mb-2"/>
                        <button type="submit" className="w-full flex gap-1 justify-center items-center">
                        <FontAwesomeIcon icon={faSave}/>
                        SAVE
                        </button>
                    </form>
                    <div className="mt-4">
                    <Confirmation onDelete={()=>handleDelete()}/>
                    <CancelButton onClick={()=>setEditMode(false)}/>
                    </div>
                </div>
            )}


            </div>
        </div>
    )
}

///5:39:46 / 8:57:33