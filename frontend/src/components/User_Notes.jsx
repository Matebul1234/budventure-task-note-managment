import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import { Dialog } from 'primereact/dialog';
const API_URL = import.meta.env.VITE_API_URL;
import '../assets/login.css';
import axios from 'axios';

const User_Notes = () => {
    // const api = process.env.REACT_APP_API_URL;
    const [loginuser, setLoignUser] = useState();
    const navigate = useNavigate();
    const [visible, setVisible] = useState(false);
    const [editvisible, seteditVisible] = useState(false);
    const [currentNoteId, setCurrentNoteId] = useState(null);
    const [token, setToken] = useState();
    const [Notes, setNotes] = useState([]);
    const [notesInfo, setNotesInfo] = useState({
        title: '',
        content: '',
        category: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNotesInfo((prevNotesInfo) => ({
            ...prevNotesInfo,
            [name]: value, // Update the specific field in notesInfo
        }));
    };

    const addnoteopen = (e) => {
        e.preventDefault();
        setNotesInfo({
            title: '',
            content: '',
            category: ''
        })
        setVisible(true);
    }


    const formSubmit = async (e) => {
        e.preventDefault();
        const { title, content, category } = notesInfo;

        if (!title || !content || !category) {
            toast.error("Title & category are required!");
            return;
        }

        try {
            const response = await axios.post(
                `${API_URL}/note/add-note`,
                notesInfo,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const { success, message, error } = response.data;
            if (success) {
                toast.success("Note added successfully");
                getAllNotes();
                setVisible(false);
            } else if (error) {
                toast.error(error?.details?.[0]?.message || "Something went wrong");
            } else {
                toast.error(message || "Note not added");
            }
        } catch (error) {
            console.error("Add note error:", error);
            toast.error(error?.response?.data?.message || "Something went wrong");
        }
    };


    // get all notes
    const getAllNotes = async () => {
        try {
            const response = await axios.get(`${API_URL}/note/all-notes`, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const { success, data, message } = response.data;
            if (success) {
                setNotes(data);
            } else {
                toast.error(message || "Failed to fetch notes");
            }
        } catch (error) {
            console.error("Get notes error:", error);
            toast.error(error?.response?.data?.message || "Something went wrong while fetching notes");
        }
    };


    const deleteNote = async (id) => {
        if (!window.confirm("Are you sure you want to delete this note?")) return;

        try {
            const response = await axios.delete(`${API_URL}/note/delete-note/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const { success, message } = response.data;
            if (success) {
                toast.success("Note deleted successfully!");
                getAllNotes();
            } else {
                toast.error(message || "Failed to delete note");
            }
        } catch (error) {
            console.error("Delete note error:", error);
            toast.error(error?.response?.data?.message || "Something went wrong while deleting the note");
        }
    };


    // Handle Edit
    const editNote = (note) => {
        console.log(note, "edit data");
        setCurrentNoteId(note._id);
        seteditVisible(true);
        setNotesInfo({
            title: note.title,
            content: note.content,
            category: note.category
        })
        // toast.info(`Edit Note: ${id}`);
    };

    const editUserNotes = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(
                `${API_URL}/note/update-note/${currentNoteId}`,
                notesInfo,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const { success, message } = response.data;
            if (success) {
                toast.success("Note updated successfully");
                getAllNotes();
                seteditVisible(false);
            } else {
                toast.error(message || "Failed to update note");
            }
        } catch (error) {
            console.error("Update note error:", error);
            toast.error(error?.response?.data?.message || "Something went wrong while updating the note");
        }
    };

    useEffect(() => {
        setLoignUser(localStorage.getItem('loggedInUser'));
        setToken(localStorage.getItem('token'));
        // get all notes
        getAllNotes();

    }, [])

    const logoutuser = () => {
        localStorage.removeItem('loggedInUser');
        localStorage.removeItem('token');
        toast.warn('user logout successfully');
        setTimeout(() => {
            navigate('/login');
        }, 1000)
    }


    return (
        <>
            <div className="container-fluid d-flex flex-column flex-sm-row justify-content-between align-items-center py-3 text-center text-sm-start">
                {/* Left-aligned text */}
                <Link className="navbar-brand fw-bold fs-4" to="/notes">
                    Welcome to <span className="d-block d-sm-inline">Budventure Technology:</span> <br className="d-sm-none" />
                    <span className="text-primary">{loginuser || 'Matty'}</span>
                </Link>
            </div>

            <div className="d-flex p-3">
                <button className="btn btn-md bg-primary text-light" onClick={addnoteopen}>Add Notes</button>
            </div>
            {/* dialog box for open add notes form  */}

            <div className="card flex justify-content-center">
                <Dialog header="Add Notes " visible={visible} maximizable style={{ width: '50vw' }} onHide={() => { if (!visible) return; setVisible(false); }} >
                    <div className="login-form w-100">
                        <form onSubmit={formSubmit} w-50>
                            <div className="form-group">
                                <label htmlFor="title">Title*</label>
                                <input type="text" className="form-control" placeholder="Enter Titel" name='title' value={notesInfo.title} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="category">Category*</label>
                                <select
                                    className="form-control"
                                    name="category"
                                    value={notesInfo.category}
                                    onChange={handleChange}
                                >
                                    <option value="" disabled>Select category</option>
                                    <option value="Work">Work</option>
                                    <option value="Personal">Personal</option>
                                    <option value="Study">Study</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="content">Content</label>
                                <textarea type="text" className="form-control" placeholder="Enter content.. " name='content' value={notesInfo.content} onChange={handleChange} />
                            </div>


                            <input type="submit" className="btn btn-primary btn-block btn-lg w-100" value="Submit" />
                        </form>

                    </div>
                </Dialog>
            </div>
            {/* Editable data */}
            <div className="card flex justify-content-center">
                <Dialog header="Edit Notes " visible={editvisible} maximizable style={{ width: '50vw' }} onHide={() => { if (!editvisible) return; seteditVisible(false); }} >
                    <div className="login-form w-100">
                        <form onSubmit={editUserNotes} w-50>
                            <div className="form-group">
                                <label htmlFor="titel">Title*</label>
                                <input type="text" className="form-control" placeholder="Enter Titel" name='title' value={notesInfo.title} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="caterory">Category*</label>
                                <select
                                    className="form-control"
                                    name="category"
                                    value={notesInfo.category}
                                    onChange={handleChange}
                                >
                                    <option value="" disabled>Select category</option>
                                    <option value="Work">Work</option>
                                    <option value="Personal">Personal</option>
                                    <option value="Study">Study</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="content">Content</label>
                                <textarea type="text" className="form-control" placeholder="Enter content.. " name='content' value={notesInfo.content} onChange={handleChange} />
                            </div>


                            <input type="submit" className="btn btn-primary btn-block btn-lg w-100" value="Update" />
                        </form>

                    </div>
                </Dialog>
            </div>

            {/* table */}
            <div className="container mt-2">
                <h3 className="mb-2">Notes List</h3>
                <div className="table-responsive">
                    <table className="table table-striped table-bordered">
                        <thead className="table-dark">
                            <tr>
                                <th>S.No</th>
                                <th>Title</th>
                                <th>Category</th>
                                <th>Content</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Notes && Notes.length > 0 ? (
                                Notes.map((note, index) => (
                                    <tr key={note._id}>
                                        <td>{index + 1}</td>
                                        <td>{note.title}</td>
                                        <td>{note.category}</td>
                                        <td>{note.content}</td>
                                        <td>
                                            <button
                                                className="btn btn-warning btn-sm me-2"
                                                onClick={() => editNote(note)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => deleteNote(note._id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center">
                                        No Notes found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="toastdiv">
                <ToastContainer />
            </div>
        </>
    )
}

export default User_Notes