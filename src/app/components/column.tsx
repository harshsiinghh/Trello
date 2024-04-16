import { ReactSortable } from "react-sortablejs";
import { Cards, useMutation, useStorage } from "../liveblocks.config";
import { shallow } from "@liveblocks/client";
import NewCardForm from "./forms/newCardForm";
import { FormEvent, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faEllipsis, faSave, faTrash } from "@fortawesome/free-solid-svg-icons";
import Card from "./card";
import CancelButton from "./cancelButton";
type columnProps={
    columnId:string
    name:string;
}   

export default function Column({columnId ,name}: columnProps){

    const [renameMode,setRenameMode]=useState(false);

    const columnsCards= useStorage<Cards[]>(root=>{
        return root.cards
        .filter(card=>card.columnId===columnId)
        .map(c=>({...c})).sort((a,b)=>a.index-b.index)
    },shallow)

const updateCards= useMutation(({storage} ,index, updateData )=>{
    const card=storage.get('cards').get(index);
    if(card){
        for(let key in updateData){
            card?.set(key as keyof Cards,updateData[key])
        }
    }
},[])

const updateColumn = useMutation(({storage},id,newName)=>{
const columns=storage.get('columns');
columns.find(c=>c.toObject().id===id)?.set('name',newName)
},[])

const setTaskOrderForColumns =useMutation(({storage}, sortedCards:Cards[] , newColumnid )=>{
    const idOfSortedCards=sortedCards.map(c=>c.id.toString());
    const allCards:Cards[]=[...storage.get('cards').map(c=>c.toObject())]
    idOfSortedCards.forEach((sortedCardId , colIndex)=>{
        const cardStorageIndex=allCards.findIndex(c=>c.id.toString()===sortedCardId)
        updateCards(cardStorageIndex,{
            columnId:newColumnid,
            index:colIndex
        })
    })
},[])

function handleRename(ev:FormEvent){
ev.preventDefault();
const input=(ev.target as HTMLFormElement).querySelector('input');
if(input){
    const newColumnName=input.value;
    updateColumn(columnId,newColumnName);
    setRenameMode(false);
}
}

const deleteColumn=useMutation(({storage},columnId)=>{
const columns= storage.get("columns")
const columnIndex=columns.findIndex(c=>c.toObject().id===columnId)
columns.delete(columnIndex);
},[])

    return(
        <div className="w-48 shadow-sm bg-white rounded-md p-2">
            {!renameMode && (
            <div className="flex justify-between mx-2">
            <h3 onClick={()=>setRenameMode(true)}>{name} </h3>
            <button className="text-gray-300 "><FontAwesomeIcon icon={faEllipsis}/></button>
            </div>
            )}
            {renameMode && (
                <div>
                Edit Name
                <form onSubmit={handleRename}>
                <input type="text" className="mb-2" defaultValue={name} />
                <button type="submit" className="w-full items-center flex gap-2 justify-center ">
                <FontAwesomeIcon icon={faSave}/>
                Save</button>
                </form>
                <button 
                onClick={()=>deleteColumn(columnId)}
                className="mt-2 w-full text-white bg-red-500 p-2 items-center justify-center rounded-md flex gap-2">
                <FontAwesomeIcon icon={faTrash}/>
                Delete</button>
                <CancelButton onClick={()=>setRenameMode(false)}/>
                </div>
                 
            )}
            {!renameMode && columnsCards && (
            <>
            <ReactSortable 
            list={columnsCards} 
            setList={items=>setTaskOrderForColumns( items,columnId )}
            group="cards"
            className="min-h-12"
            ghostClass="opacity-40"
            >
            {columnsCards.map(card=>(
                <Card id={card.id} name={card.name}/>
            ))}
            </ReactSortable>
            </>
            )}
            {!renameMode && (
                <NewCardForm columnId={columnId}/>
            )}
        </div>
    )
}