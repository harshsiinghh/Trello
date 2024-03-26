'use client';
import { useState } from "react";
import Column from "./column"
import NewColumnForm from "./forms/newColumnForm"
 
const defaultColumns=[
     {columnId:"col1" , name:"TODO" , index:0},
     {columnId:"col2" , name:"in-progess" , index:1},
     {columnId:"col3" , name:"Done" , index:2},
     ];

export type cardTypes={
    name:string,
    id:string,
    index:number
    columnId:string
};

const defaultCards=[
    {id:'asdf' , name:'task 1' , index:0 , columnId:'col1'},
    {id:'asdz' , name:'task 2' , index:1 , columnId:'col1'},
    {id:'asdu' , name:'task 5' , index:3 , columnId:'col2'},
    {id:'asdx' , name:'task 3' , index:2 , columnId:'col3'},
    ];   

export default function Board(){
    const[cards,setCards]=useState(defaultCards);
    const[columns,setColumns]=useState(defaultColumns);
    return(
        <div className="flex gap-4 ">
            {columns.map(column=>(
                <Column {...column} 
                key={column.columnId}
                setCards={setCards}
                cards={cards.sort((a,b)=>a.index-b.index).filter(c=> c.columnId===column.columnId)}/>
            ))}
            <NewColumnForm/>
        </div>
    )
}