// import React, { useEffect, useState } from 'react'


// function App(){
//     var [title,setTitle] = useState("")
//     var [discription,setDiscription] = useState("")
//     var [data,setData] = useState([])
    
//     var formData = {
//         myTitle :   title,
//         myDiscription : discription
//     }
//     async function sendData(){
//         if(title.length == 0 && discription.length == 0){
//             console.log("fill the title and description");
//         }else{
//         var result = await fetch("https://691da6f2d58e64bf0d36f818.mockapi.io/blog",{
//             method : "post",
//             headers : {
//                 "content-Type" : "application/json"
//             },
//             body : JSON.stringify(formData)
//         })
//         if(result.ok){
//             console.log("blog created sucessfully");
//             setTitle("")
//             setDiscription("")
//             fetchData()
//         }else{
//             console.log("failed to create the blog");
//         }
//     }
//     }
//     async function fetchData(){
//         var myResult = await fetch("https://691da6f2d58e64bf0d36f818.mockapi.io/blog")
//         var mydata = await myResult.json()
//         setData(mydata)
//     }
//     useEffect(()=>{
//         fetchData()
//         console.log(data);
//     },[])

//     return(
//         <div>
//             <label htmlFor="">Enter Title</label>
//             <input value={title} onChange={(e)=>{setTitle(e.target.value)}} type="text" />
//             <label htmlFor="">Enter Discrption</label>
//             <input value={discription} onChange={(e)=>{setDiscription(e.target.value)}} type="text" />
//             <button onClick={sendData}>Add Blog</button>
//             <div>
//                 {
//                     data.map((item)=>{
//                         return(
//                             <div>
//                                 <h1>{item.myTitle}</h1>
//                                 <p>{item.myDiscription}</p>
//                             </div>
//                         )
//                     })
//                 }
//             </div>

//         </div>
//     )
// }
// export default App


// import React, { useEffect, useState } from 'react'
// import { toast } from 'react-toastify'
// function Home() {
//     var [title,setTitle] = useState("")
//     var [description,setDescription]=useState("")
//     var [data,setData]=useState([])

//     var formData={
//      myTitle:title,
//      myDescription:description
//     }
//     async function sendData() {
//         var formData={
//             myTitle:title,
//             myDescription:description
//         }
//         var result=await fetch("",{
//             method:"post",
//             headers:{
//                 "content-type":"application/json"
//             },body:
//             JSON.stringify(formData)
//         })
//         if(result.ok){
//         toast.success("blog added")
//         setTitle("")
//         setDescription("")
//         getData()
//         }else{
//             toast.error("failed")
//         }
        
        
//     }async function getData() {
//         var a=await fetch("")
//         var b=await a.json()
//         setData(b)
        
//     }useEffect(()=>{getData()},[])

//     async function deleteBlog(id) {
//         var result= await fetch(`/${id}`,{
//             method:"Delete"
//         })
//         if(result.ok){
//             toast.success("deleted")
//             getData()
//         }else{
//             toast.error("failed")
//         }
        
//     }
//     async function updateBlog(id) {
//         if(title.length==0 && description.length==0){
//             toast.error("fill the inputs")
//         }
//         var newData={
//             myTitle:title,
//             myDescription:description
//         }
//         var myResult=await fetch(`/${id}`,{
//             method:"update",
//             headers:{
//                 "content-Type":"application/json"
//             },body:JSON.stringify(newData)
//         })
//         if(myResult.ok){
//             toast.success("updated")
//             setTitle("")
//             setDescription("")
//             getData()
//         }else{
//             toast.error("failed")
//         }
        
//     }


//     return(
    
//     data.map((item)=>(
//         <div key={item.id}>
//             <h1>{}</h1>
//             <p>{}</p>
//             <div>
//                 <button onClick={()=>updateBlog(item.id)}>update</button>
//                 <button onClick={()=>deleteBlog(item.id)}>delete</button>
//             </div>
//         </div>
//     ))
    
    
//     )
// }
// export default Home

// import React, { useEffect, useState } from 'react'
// import { toast } from 'react-toastify'

// function Home() {
//     var [title, setTitle] = useState("")
//     var [description, setDescription] = useState("")
//     var [data, setData] = useState([])

//     const API = "https://691da6f2d58e64bf0d36f818.mockapi.io/blog"

//     async function sendData() {
//         var formData = {
//             myTitle: title,
//             myDescription: description
//         }

//         var result = await fetch(API, {
//             method: "POST",
//             headers: {
//                 "content-type": "application/json"
//             },
//             body: JSON.stringify(formData)
//         })

//         if (result.ok) {
//             toast.success("blog added")
//             setTitle("")
//             setDescription("")
//             getData()
//         } else {
//             toast.error("failed")
//         }
//     }

//     async function getData() {
//         var a = await fetch(API)
//         var b = await a.json()
//         setData(b)
//     }

//     useEffect(() => { getData() }, [])

//     async function deleteBlog(id) {
//         var result = await fetch(`${API}/${id}`, {
//             method: "DELETE"
//         })
//         if (result.ok) {
//             toast.success("deleted")
//             getData()
//         } else {
//             toast.error("failed")
//         }
//     }

//     async function updateBlog(id) {
//         if (title.length == 0 && description.length == 0) {
//             toast.error("fill the inputs")
//             return
//         }

//         var newData = {
//             myTitle: title,
//             myDescription: description
//         }

//         var myResult = await fetch(`${API}/${id}`, {
//             method: "PUT",   // FIXED
//             headers: {
//                 "content-Type": "application/json"
//             },
//             body: JSON.stringify(newData)
//         })

//         if (myResult.ok) {
//             toast.success("updated")
//             setTitle("")
//             setDescription("")
//             getData()
//         } else {
//             toast.error("failed")
//         }
//     }

//     return (
//         <>
//             {data.map((item) => (
//                 <div key={item.id}>
//                     <h1>{item.myTitle}</h1>
//                     <p>{item.myDescription}</p>
//                     <div>
//                         <button onClick={() => updateBlog(item.id)}>update</button>
//                         <button onClick={() => deleteBlog(item.id)}>delete</button>
//                     </div>
//                 </div>
//             ))}
//         </>
//     )
// }

// export default Home
