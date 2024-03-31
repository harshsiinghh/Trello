'use client'

import {Columns, useMutation, useStorage } from "../liveblocks.config"
import Column from "@/app/components/column";
import NewColumnForm from "./forms/newColumnForm"
import uniqid from "uniqid"
import { ReactSortable } from "react-sortablejs";
import {default as BoardColumn} from "@/app/components/column"
import { LiveList, LiveObject, shallow } from "@liveblocks/client";

export default function Columns(){
    const columns=useStorage(root=>root.columns.map(c=>({...c})) ,shallow);
    
    const updateColumns=useMutation(({storage},columns:LiveObject<Columns>[] )=>{
        storage.set('columns',new LiveList(columns));
    },[])
    
    function setColumnOrder(sortedColumns:Columns[]){
        const newColumns:LiveObject<Columns>[]=[];
        sortedColumns.forEach((sortedColumns, newIndex)=>{
            const newSortedColumns={...sortedColumns};
            newSortedColumns.index=newIndex;
            newColumns.push(new LiveObject(newSortedColumns));
        })
    updateColumns(newColumns)
    }

    
    
    if(!columns){
        return;
    }       



    return(
    <div className="flex gap-4 ">
        <ReactSortable 
        group={'board-column'}
        list={columns}
        ghostClass='opacity-40' 
        className="flex gap-4"
        setList={setColumnOrder}>
        {columns?.length>0 && columns.map(column=>(
            <BoardColumn
            key={column.id}
            columnId={column.id }
            {...column}
            /> 
        ))}
    </ReactSortable>
    <NewColumnForm/>
    </div>
    )
}



