import React, { useState } from "react";
import noteContext from "./Notecontext";

const NoteState = (props) => {
    const host = "http://localhost:5000"
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial);

    //fetch all notes
    const getNotes=async()=>{
        const response=await fetch(`${host}/api/notes/fetchallnotes`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'auth-token':localStorage.getItem('token')
            },
        });
        const json=await response.json();
        
        setNotes(json);
    }
    //add a note
    const addNote =async (title, description, tag,color) => {
          const response=await fetch(`${host}/api/notes/addnote/`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'auth-token':localStorage.getItem('token')
            },
            body:JSON.stringify({title,description,tag,color})
        });
        const note=await response.json();
        setNotes(notes.concat(note))
    }
    //delete a note
    const deleteNote = async(id) => {
        const response=await fetch(`${host}/api/notes/deletenote/${id}`,{
            method:'DELETE',
            headers:{
                'Content-Type':'application/json',
                'auth-token':localStorage.getItem('token')
            },
            
        });
        const json= response.json();
        console.log(json)
        
        const newNotes = notes.filter((note) => { return note._id !== id });
        setNotes(newNotes);
    }
    //update a note
    const editNote =async (id, title, description, tag,color) => {
        const response=await fetch(`${host}/api/notes/updatenote/${id}`,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json',
                'auth-token':localStorage.getItem('token')
            },
            body:JSON.stringify({title,description,tag,color})
        });
        const json=await response.json();
        console.log(json);
        let newNotes=JSON.parse(JSON.stringify(notes))
       //frontend client
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index]
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                newNotes[index].color = color;
                break;
            }
        }
         setNotes(newNotes);

    }

    //toggleNote
    const togglePin = async (id) => {
  const response = await fetch(`${host}/api/notes/togglepin/${id}`, {
    method: "PUT",
    headers: {
      "auth-token": localStorage.getItem("token")
    }
  });
  const updatedNote = await response.json();
  setNotes(notes.map(n => n._id === id ? updatedNote : n));
};


    return (
        <noteContext.Provider value={{ notes, addNote, deleteNote, editNote,getNotes,togglePin }}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState