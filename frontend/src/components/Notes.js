import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/Notecontext'
import Noteitem from './Noteitem'
import AddNote from './AddNote'
import { useNavigate } from 'react-router-dom'

const Notes = (props) => {
    const { notes, getNotes, editNote } = useContext(noteContext);
    const [search, setSearch] = useState("")
    const navigate = useNavigate()
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes();
        } else {
            navigate("/login");
        }

    }, []);

     
    const ref = useRef(null);
    const refClose = useRef(null);
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "", ecolor: "#ffffff" });

    const updateNote = (currentNode) => {
        ref.current.click();
        setNote({
            id: currentNode._id, etitle: currentNode.title, edescription: currentNode.description,
            etag: currentNode.tag, ecolor: currentNode.color || "#ffffff"
        })

    }

    const handleClick = (e) => {
        document.activeElement.blur();
        refClose.current.click();
        editNote(note.id, note.etitle, note.edescription, note.etag,note.ecolor);
        props.showAlert("Updated Successfully", "success");

    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <>
            <AddNote showAlert={props.showAlert} />

            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle"
                                        name='etitle' aria-describedby="emailHelp" value={note.etitle} onChange={onChange} minLength={5} required />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription"
                                        name='edescription' value={note.edescription} onChange={onChange} minLength={5} required />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag"
                                        name='etag' value={note.etag} onChange={onChange} />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="ecolor" className="form-label">Choose Color</label>
                                    <input
                                        type="color"
                                        id="ecolor"
                                        className="form-control form-control-color"
                                        name="ecolor"
                                        value={note.ecolor}
                                        onChange={onChange}
                                    />
                                </div>
                            </form>

                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length < 5 || note.edescription.length < 5} type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className='container my-3'>
                <div className='row'>
                    <h2>Your Notes</h2>
                    <input
                        type="text"
                        className="form-control w-50"
                        placeholder="Search notes..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <div className="container">
                        {notes.length === 0 && 'No notes to display'}
                    </div>
                    {notes
                        .filter(note =>
                            note.title.toLowerCase().includes(search.toLowerCase()) ||
                            note.description.toLowerCase().includes(search.toLowerCase()) ||
                            note.tag.toLowerCase().includes(search.toLowerCase())
                        )


                        .map((note) => {
                            return <Noteitem showAlert={props.showAlert} updateNote={updateNote} key={note._id} note={note} />;
                        })}
                </div>
            </div>
        </>
    )
}

export default Notes
