import { useEffect, useState } from "react"

function Form(){
    const[title, setTitle] = useState("")
    const[des, setDes] = useState("")
    const [search, setSearch] = useState("");
    const [notes, setNotes] = useState([]);

// Add notes
    const addvalue = () => {
        if(!title || !des){
            alert("Please required title and description")
            return
        }
        // object create karna
        const newValue ={
            id:Date.now(),
            title,
            des,
        }

    setNotes([...notes, newValue])
    console.log(newValue);

    // input empty
    setTitle("")
    setDes("")
    }

    // load notes from localStroge
    useEffect(()=>{
        const saveNotes = JSON.parse(localStorage.getItem("notes"))
        if(saveNotes){
            setNotes(saveNotes)
        }
    },[])

    // save notes from localStroge
    useEffect(()=>{
        localStorage.setItem("notes", JSON.stringify(notes))
    },[])

    // search notes
    const filternotes = notes.filter((note)=>
        note.title.toLowerCase().includes(search.toLowerCase()) ||
        note.des.toLowerCase().includes(search.toLowerCase()),
    )

    // delete notes
    const deleteNote = (id) => {
        const updateNotes = notes.filter((note) => note.id !== id);
        setNotes(updateNotes);
    };

    return(
        <div>
            <div className="bg-gray-100 min-w-100 mx-20 my-20 m-auto rounded-2xl">
                <div className="text-center py-15">
                    <input 
                    className="w-full p-4 mb-5 rounded-xl border"
                    type="text"
                    name="title"
                    placeholder="title"
                    value={title}
                    onChange={(e)=> setTitle(e.target.value)}
                    />

                    <textarea 
                    className="w-full  p-4  rounded-xl mb-5 border"
                    type="text"
                    name="des"
                    placeholder="description"
                    value={des}
                    onChange={(e)=> setDes(e.target.value)}
                    >
                    </textarea>

                    <button
                    className="w-full border p-3  rounded-xl hover:bg-gray-300"
                    onClick={addvalue}
                    >Add</button>
                </div>
            </div>
            {/* searchbar */}
                <div className="mt-10">
                    <input 
                    className="border p-3 w-100"
                    type="text" 
                    placeholder="Searchbar"
                    value={search}
                    onChange={(e)=> setSearch(e.target.value)}
                    />
                </div>
        {/* Notes List */}
            <div>
                {filternotes.length > 0 ? (
                    filternotes.map((note)=> (
                        <div key={note.id}>
                            <h1>{note.title}</h1>
                            <p>{note.des}</p>
                            <button
                            onClick={() => deleteNote(note.id)}
                            >
                                DELETE
                            </button>
                        </div>
                    ))
                ):(
                <h2>No Notes Found{" "}</h2>
                )}
            </div>
        </div>
    )
}
export default Form