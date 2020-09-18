import React, { useState,useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import {v4 as uuid } from "uuid";
import 'bootstrap/dist/css/bootstrap.min.css';
var Autoarraysort = require("sorted-array");


const random =()=>{
  
  var arr = [];
  while(arr.length < 10){
      var r = Math.floor(Math.random() * 10) + 1;
      if(arr.indexOf(r) === -1) arr.push(r);
     
  }
  return arr;
}
const sort =(array)=>{
  
 
  var arrayCopy = new Autoarraysort(array)
  arrayCopy=arrayCopy.array
 

  
  return arrayCopy;
}
let array=random();

const itemsFromBackend1 = [
  { id: uuid(), content: array[0]},
  { id: uuid(), content:array[1]},
  { id: uuid(), content: array[2]},
  { id: uuid(), content: array[3]},
  { id: uuid(), content: array[4]},
  { id: uuid(), content: array[5]},
  { id: uuid(), content: array[6]},
  { id: uuid(), content: array[7]},
  { id: uuid(), content: array[8]},
  { id: uuid(), content: array[9]},
];


const columnsFromBackend ={
  [uuid()]: {
    name: "",
    items: itemsFromBackend1
  },
  
};

const onDragEnd = (result, columns, setColumns) => {

  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems
      }
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems
      }
    });
  }

 
  
};
var nameID;

function drawText(){
  if(document.getElementsByClassName("orderList")[0].innerText==1&&document.getElementsByClassName("orderList")[1].innerText==2 &&document.getElementsByClassName("orderList")[2].innerText==3 &&document.getElementsByClassName("orderList")[3].innerText==4 &&document.getElementsByClassName("orderList")[4].innerText==5 &&document.getElementsByClassName("orderList")[5].innerText==6 &&document.getElementsByClassName("orderList")[6].innerText==7 &&document.getElementsByClassName("orderList")[7].innerText==8 &&document.getElementsByClassName("orderList")[8].innerText==9 &&document.getElementsByClassName("orderList")[9].innerText==10 )
              {
            alert("Welcome to Geeks Hub")
              window.clearInterval(nameID)}
              
  }

function App() {
  useEffect(() =>{
    nameID=window.setInterval(drawText, 2000);
  
  },[])  
  const [openClose, setopenClose] = useState(false);
  const [itemsFromBackend,setItemsFromsBackend] = useState(itemsFromBackend1);
  const [check,setCheck] = useState(false);

  const [columns, setColumns] = useState(columnsFromBackend);
  const sortHandler = () =>{
    let arraySorted = sort(array);
    let i = 0;
      let arrayAutoSort = itemsFromBackend;
      arrayAutoSort.map((itemA) =>{
        itemA.content = arraySorted[i]
        i++;
        
      })
setItemsFromsBackend(arrayAutoSort)
setCheck(true);
  }
  return (
    <div style={{paddingTop:"20px"}}>
      <div style={{display:"flex",justifyContent:"center"}}>
     <button className="sorting" style={{padding:"8px 40px 8px 40px"}} onClick={sortHandler}>SORT ME</button>
     </div>
    {openClose ?
<div class="modal" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p>Modal body text goes here.</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary">Save changes</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
  : ""} 
    <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
      <DragDropContext
        onDragEnd={result => onDragEnd(result, columns, setColumns)}
      >
        
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
              key={columnId}
            >
              <h2>{column.name}</h2>
              <div style={{ margin: 8 }}>
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver
                            ? "lightblue"
                            : "lightgrey",
                          padding: 4,
                          width: 250,
                          minHeight: 500
                        }}
                      >
                        {column.items.map((item, index) => {
                          return (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                  className="orderList"
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      userSelect: "none",
                                      padding: 16,
                                      margin: "0 0 8px 0",
                                      minHeight: "50px",
                                      backgroundColor: snapshot.isDragging
                                        ? "#263B4A"
                                        : "#456C86",
                                      color: "white",
                                      ...provided.draggableProps.style
                        
                                    }}
                                    
                                  >
                                    
                                    {item.content}
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            </div>
          );
        })}
      {/* <button onClick={()=>random} >CLICK</button> */}
      </DragDropContext>
      </div>
     
    </div>
  );
}

export default App;
