import React, { useEffect, useState } from 'react'


function App(){
    var [title,setTitle] = useState("")
    var [discription,setDiscription] = useState("")
    var [data,setData] = useState([])
    
    var formData = {
        myTitle :   title,
        myDiscription : discription
    }
    async function sendData(){
        if(title.length == 0 && discription.length == 0){
            console.log("fill the title and description");
        }else{
        var result = await fetch("https://691da6f2d58e64bf0d36f818.mockapi.io/blog",{
            method : "post",
            headers : {
                "content-Type" : "application/json"
            },
            body : JSON.stringify(formData)
        })
        if(result.ok){
            console.log("blog created sucessfully");
            setTitle("")
            setDiscription("")
            fetchData()
        }else{
            console.log("failed to create the blog");
        }
    }
    }
    async function fetchData(){
        var myResult = await fetch("https://691da6f2d58e64bf0d36f818.mockapi.io/blog")
        var mydata = await myResult.json()
        setData(mydata)
    }
    useEffect(()=>{
        fetchData()
        console.log(data);
    },[])

    return(
        <div>
            <label htmlFor="">Enter Title</label>
            <input value={title} onChange={(e)=>{setTitle(e.target.value)}} type="text" />
            <label htmlFor="">Enter Discrption</label>
            <input value={discription} onChange={(e)=>{setDiscription(e.target.value)}} type="text" />
            <button onClick={sendData}>Add Blog</button>
            <div>
                {
                    data.map((item)=>{
                        return(
                            <div>
                                <h1>{item.myTitle}</h1>
                                <p>{item.myDiscription}</p>
                            </div>
                        )
                    })
                }
            </div>

        </div>
    )
}
export default App


