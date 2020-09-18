import React,{useEffect, useState} from 'react'
import './style.css'
import JsonData from '../jsonData/json.json';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';

export default()=>{


  const [data ,setData]=useState()
  const [alldata, setAlldata]=useState("")
  
  useEffect(()=>{
    setData(JsonData);
  },[])

  const Search=(value)=>{  
    if(value === "Search"){
      let data=JsonData.filter((item)=>{
        return(
          item.age==value ||  item.name.toLowerCase().indexOf(value.toLowerCase()) !== -1|| item.company.toLowerCase().indexOf(value.toLowerCase()) !== -1
          ||   item.email.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||  item._id.toLowerCase().indexOf(value.toLowerCase()) !== -1
        )
      })
      setData(data);
    }
    if(value === "male"){
      let data=JsonData.filter((item)=>{
           return(
                item.gender.toLowerCase().indexOf(value.toLowerCase()) ===0
              )
     })
     setData(data);
     console.log(data)
   }
    if(value === "female"){
    let data=JsonData.filter((item)=>{
         return(
              item.gender.toLowerCase().indexOf(value.toLowerCase()) !== -1
            )
   })
   setData(data);
 }
   else{
    let data = JsonData.filter((item) =>{
      return(
          item.name.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||  item.company.toLowerCase().indexOf(value.toLowerCase()) !== -1 || 
          item._id.toLowerCase().indexOf(value.toLowerCase()) !== -1 || item.email.toLowerCase().indexOf(value.toLowerCase()) !== -1
          ||  item.age==value 
      
        )
  })

  setData(data);
  if(value === "gender"){
  let data=JsonData.filter((item)=>{
     return(
          item.gender.toLowerCase().indexOf(value.toLowerCase()) 
        )
  })
  setData(data);
  }

}


}  
  return(
      <div>
        <div style={{display:"flex"}}>
        <div style={{display:"flex"}}>
        <h1 style={{color:"black"}}>Name</h1>
  <input  onChange={event=>Search(event.target.value)} style={{padding:"10px" , margin:"10px" ,}} placeholder="Search"/>
  </div>
  <div>
    <select onChange={(event)=>Search(event.target.value)} style={{marginTop:"11px" ,padding:"11px"}}>
      <option value="gender">Gender</option>
      <option value="male">Male</option>
      <option value="female">Female</option>
    </select>
  </div>
  </div>
    <Table striped bordered hover variant="dark">
     
  <thead>
    <tr>
      <th>Sr.No</th>
      <th>First Name</th>                                                  
      <th>Gender</th>
      <th>Age</th>
      <th>Email</th>
      <th>Company</th>
    </tr>
  </thead>
  <tbody>
    {data && data.map((item)=>
    <tr>
      <td>{item._id}</td>
    <td>{item.name}</td>
    <td>{item.gender}</td>
    <td>{item.age}</td>
    <td>{item.email}</td>
    <td>{item.company}</td>
    </tr>
    )}
  </tbody>
</Table>
{/* <Spinner animation="border" role="status">
  <span className="sr-only">Loading...</span>
</Spinner> */}
      </div>

    );
}