import { useEffect, useState } from "react"
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import DescriptionIcon from '@mui/icons-material/Description';
import TitleIcon from '@mui/icons-material/Title';

function Form(){
    const[title, setTitle] = useState("")
    const[des, setDes] = useState("")
    const [search, setSearch] = useState("");
    const [notes, setNotes] = useState([]);

    // load notes from localStorage
    useEffect(()=>{
        const saveNotes = JSON.parse(localStorage.getItem("notes"))
        if(saveNotes){
            setNotes(saveNotes)
        }
    },[])

    // save notes from localStorage
    useEffect(()=>{
        localStorage.setItem("notes", JSON.stringify(notes))
    },[notes])

    // Add notes
    const addvalue = () => {
        if(!title ||!des){
            alert("Please required title and description")
            return
        }
        const newValue ={
            id:Date.now(),
            title,
            des,
        }

        setNotes([...notes, newValue])
        setTitle("")
        setDes("")
    }

    // search notes
    const filternotes = notes.filter((note)=>
        note.title.toLowerCase().includes(search.toLowerCase()) ||
        note.des.toLowerCase().includes(search.toLowerCase()),
    )

    // delete notes
    const deleteNote = (id) => {
        const updateNotes = notes.filter((note) => note.id!== id);
        setNotes(updateNotes);
    };

    return(
        <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-white to-purple-100 py-12">
            <div className="max-w-3xl mx-auto bg-white shadow-2xl rounded-3xl p-8">

                <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 flex items-center justify-center gap-3">
                    Notes App
                </h1>

                <div className="relative mb-5">
                    <TitleIcon className="absolute left-3 top-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Enter Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-4 pl-12 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                </div>

                <div className="relative mb-5">
                    <DescriptionIcon className="absolute left-3 top-4 text-gray-400" />
                    <textarea
                        placeholder="Enter Description"
                        value={des}
                        onChange={(e) => setDes(e.target.value)}
                        rows="5"
                        className="w-full p-4 pl-12 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                </div>

                <button
                    onClick={addvalue}
                    className="w-full bg-indigo-600 text-white py-4 rounded-xl font-semibold hover:bg-indigo-700 transition flex items-center justify-center gap-2"
                >
                    <NoteAddIcon />
                    Add Note
                </button>

                {/* Search */}
                <div className="mt-8 relative">
                    <SearchIcon className="absolute left-3 top-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search Notes..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full p-4 pl-12 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                </div>
            </div>

            {/* Notes List */}
            <div className="max-w-7xl mx-auto px-6 py-10">
                <h2 className="text-3xl font-bold text-gray-800 mb-8">
                    Your Notes
                </h2>

                {filternotes.length > 0? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filternotes.map((note) => (
                            <div
                                key={note.id}
                                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition duration-300 border border-gray-100"
                            >
                                <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                    {note.title}
                                </h3>

                               <p className="text-gray-600 mb-5 leading-relaxed break-words whitespace-pre-wrap">
                                    {note.des}
                                </p>

                                <button
                                    onClick={() => deleteNote(note.id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition flex items-center gap-2"
                                >
                                    <DeleteIcon className="text-lg" />
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <h2 className="text-2xl font-semibold text-gray-500">
                            No Notes Found 😔
                        </h2>
                    </div>
                )}
            </div>
        </div>
    )
}
export default Form