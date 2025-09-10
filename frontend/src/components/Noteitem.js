import React, { useContext } from 'react'
import noteContext from '../context/notes/Notecontext'

const getContrastYIQ = (hexcolor) => {
    const hex = (hexcolor || "#ffffff").replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return (yiq >= 128) ? 'black' : 'white';
}

const Noteitem = (props) => {
    const { deleteNote, togglePin } = useContext(noteContext);
    const { note, updateNote } = props;
    return (
        <div className='col-md-3'>
            <div className="card my-3" style={{ backgroundColor: note.color || '#ffffff', color: getContrastYIQ(note.color) }}>
                <div className="card-body">
                    <div className='d-flex align-items-center'>
                        <h5 className="card-title">{note.title}</h5>
                        <i className="fa-solid fa-trash mx-2" onClick={() => {
                            deleteNote(note._id); props.showAlert("Deleted Successfully", "success");
                        }}></i>
                        <i className="fa-solid fa-pen-to-square mx-2 " 
                            onClick={() => { updateNote(note) }} ></i>
                        <i className={`fa-solid fa-thumbtack mx-2 ${note.pin ? "text-warning" : ""}`}
                            style={{ cursor: "pointer" }}
                            onClick={() => togglePin(note._id)}>
                        </i>

                    </div>
                    <p className="card-text ">{note.description}</p>
                    {/* <p className="card-text"><strong>{note.tag}</strong></p> */}
                    <div className='mt-2'>
                        <small className='text-muted' style={{ color: getContrastYIQ(note.color) === 'white' ? '#eaeaea' : '#555' }}>Tags: {note.tag}</small>
                    </div>
                    <div className='mt-1'>
                        <small style={{ color: getContrastYIQ(note.color) }}>{new Date(note.date).toLocaleString()}</small>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Noteitem

