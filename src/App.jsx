// import React, { useEffect, useState } from 'react'
// import './App.css'
// import {ToastContainer,toast}from 'react-toastify'

// function App() {
//   var [title,setTitle] = useState("")
//   var [description,setDescription] =useState("")
//   var [data,setData]=useState([])

//   var formData={
//     myTitle: title,
//     myDescription:description
//   }

//   async function sendData() {
//       var formData={
//     myTitle: title,
//     myDescription:description
//   }

//       var result= await fetch("https://691da6f2d58e64bf0d36f818.mockapi.io/blog",{
//         method:"post",
//         headers:{
//           "content-Type":"application/json"
//         },body:
//         JSON.stringify(formData)
//       })
//       if(result.ok){
//         toast.success("blog created successfully");
//         setTitle("")
//         setDescription("")
//         getData()
//       }else{
//       toast.error("failed to create the blog");
        
//       }
    
    
//   }
//   async function getData() {
//     var a=await fetch("https://691da6f2d58e64bf0d36f818.mockapi.io/blog")
//     var b=await await a.json()
//     setData(b)
    
//   }
//   useEffect(()=>{getData()},[])
//   async function deleteBlog(id) {
//     var result = await fetch(`https://691da6f2d58e64bf0d36f818.mockapi.io/blog/${id}`,{
//       method:"DELETE"
//     })
//     if(result.ok){
//       toast.success("Blog deleted")
//       getData()
//     }
//   }
//   async function updateBlog(id) {
//     if (title.length==0 && description.length ==0) {
//       toast.error("Fill the inputs")
//       return;
//     }
   
//     var newData={
//       myTitle:title,
//       myDescription:description
//     }
//     var myResult= await fetch(`https://691da6f2d58e64bf0d36f818.mockapi.io/blog/${id}`,{
//       method:"PUT",
//       headers:{
//             "content-Type":"application/json"
//       },body:
//       JSON.stringify(newData)
//     })
//     if(myResult.ok){
//       toast.success("Blog updated")
//       setTitle("")
//       setDescription("")
//       getData()
//     }else{
//       toast.error("failed to update blog")
//     }
//   }
//   return(
// <div className='home-container'>
//   <ToastContainer/>
//   <div className='form-box'>
//     <h2>Create Blog</h2>
//     <label htmlFor="">Enter Title</label>
//     <input value={title} onChange={(e)=>{setTitle(e.target.value)}} type="text" />
//     <label htmlFor="">Enter Description</label>
//     <input value={description} onChange={(e)=>{setDescription(e.target.value)}} type="text" />
//     <button onClick={sendData} className='add-btn'>Add Blog</button>
//   </div>
//   <div className='blog-list'>
// {
//   data.map((item)=>(
//     <div key={item.id}className='blog-card'>
//       <h1>{item.myTitle}</h1>
//       <p>{item.myDescription}</p>

//       <div className='btn-row'>
//        <button onClick={()=>updateBlog(item.id)}className='update-btn' >update</button>
//        <button onClick={()=>deleteBlog(item.id)}className='delete-btn'>delete</button>
//       </div>
//     </div>
//   ))
// }
//   </div>
// </div>
//   )
// }
// export default App

import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaPencilAlt } from "react-icons/fa";
import'./App.css'

function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // Updated API endpoint
  const API = "https://693436f64090fe3bf01f4f33.mockapi.io/blog";

  // Create blog (draft or published)
  async function sendData(publishNow = false) {
    if (title.trim().length === 0 && description.trim().length === 0) {
      toast.error("Please add a title or description.");
      return false;
    }

    const payload = {
      myTitle: title,
      myDescription: description,
      status: publishNow ? "published" : "draft",
    };

    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success(publishNow ? "Added successfully 🎉" : "Draft saved");
        setTitle("");
        setDescription("");
        getData();
        return true;
      } else {
        toast.error("Failed to save (status: " + res.status + ")");
        return false;
      }
    } catch {
      toast.error("Network error");
      return false;
    }
  }

  // Fetch all blogs
  async function getData() {
    try {
      const res = await fetch(API);
      if (!res.ok) {
        toast.error("Failed to fetch blogs (status: " + res.status + ")");
        return;
      }
      const blogs = await res.json();
      blogs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setData(blogs);
    } catch {
      toast.error("Network error");
    }
  }

  useEffect(() => {
    getData();
  }, []);

  // Delete blog
  async function deleteBlog(id) {
    try {
      const res = await fetch(`${API}/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Blog deleted");
        if (editingId === id) {
          setEditingId(null);
          setTitle("");
          setDescription("");
        }
        getData();
      } else toast.error("Failed to delete");
    } catch {
      toast.error("Network error");
    }
  }

  // Update blog (preserve status)
  async function updateBlog(id) {
    if (title.trim().length === 0 && description.trim().length === 0) {
      toast.error("Fill the inputs");
      return;
    }

    const original = data.find((item) => item.id === id);
    const payload = {
      myTitle: title,
      myDescription: description,
      status: original?.status || "draft",
    };

    try {
      const res = await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success("Blog updated");
        setTitle("");
        setDescription("");
        setEditingId(null);
        getData();
      } else toast.error("Failed to update");
    } catch {
      toast.error("Network error");
    }
  }

  // Publish a blog
  async function publishBlog(id) {
    const blog = data.find((item) => item.id === id);
    if (!blog) return toast.error("Blog not found");

    const payload = { ...blog, status: "published" };

    try {
      const res = await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success("Published ✅");
        if (editingId === id) {
          setEditingId(null);
          setTitle("");
          setDescription("");
        }
        getData();
      } else toast.error("Failed to publish");
    } catch {
      toast.error("Network error");
    }
  }

  // Edit button click
  function handleEditClick(item) {
    setTitle(item.myTitle || "");
    setDescription(item.myDescription || "");
    setEditingId(item.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Top "Add" button logic
  async function handleTopPublish() {
    if (editingId) {
      await publishBlog(editingId);
    } else {
      const success = await sendData(true);
      if (!success) return;
    }
    setEditingId(null);
  }

  // Save draft button
  async function handleSave() {
    if (editingId) await updateBlog(editingId);
    else await sendData(false);
  }

  return (
    <div className="editor-container">
      <ToastContainer />
      <div className="top-bar">
        <h2 className="medium-logo">BLOG-APP</h2>
        <div className="top-actions">
          <span className={`editing-pill ${editingId ? "" : "draft-pill"}`}>
            {editingId ? "Editing" : "Draft"}
          </span>
          <button onClick={handleTopPublish} className="publish-btn">
            Add
          </button>
        </div>
      </div>

      <div className="editor-box">
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Tell your story..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="editor-actions">
          <button onClick={handleSave}>
            {editingId ? "Update draft" : "Save draft"}
          </button>
          {editingId && (
            <button onClick={() => publishBlog(editingId)}>Publish this</button>
          )}
        </div>
      </div>

       <h2 className="your-blogs-title" >  Your Blogs</h2>


      <div className="blog-list">
        {data.map((item) => (
          <div key={item.id} className="blog-card">
            <FaPencilAlt onClick={() => handleEditClick(item)} title="Edit" />
            <h1>
              {item.myTitle || <span>Untitled</span>}
              <span>{item.status || "draft"}</span>
            </h1>
            <p>{item.myDescription}</p>
            <div className="btn-row">
              <button onClick={() => handleEditClick(item)}>Edit</button>
              <button onClick={() => deleteBlog(item.id)}>Delete</button>
              <button onClick={() => publishBlog(item.id)}>Publish</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
