import { useEffect, useState } from "react";
import NoteAdd from "@mui/icons-material/NoteAdd";
import Search from "@mui/icons-material/Search";
import Delete from "@mui/icons-material/Delete";
import Description from "@mui/icons-material/Description";
import Title from "@mui/icons-material/Title";
import Edit from "@mui/icons-material/Edit";

function Form() {
  const [title, setTitle] = useState("");
  const [des, setDes] = useState("");
  const [search, setSearch] = useState("");
  const [notes, setNotes] = useState([]);
  const [editId, setEditId] = useState(null);

  // Load notes from localStorage
  useEffect(() => {
    const saveNotes = JSON.parse(localStorage.getItem("notes"));

    if (saveNotes) {
      setNotes(saveNotes);
    }
  }, []);

  // Save notes to localStorage
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  // Add & Update Note
  const addvalue = () => {
    if (!title || !des) {
      alert("Please enter title and description");
      return;
    }

    if (editId) {
      const updatedNotes = notes.map((note) =>
        note.id === editId
          ? {
              ...note,
              title,
              des,
            }
          : note
      );

      setNotes(updatedNotes);
      setEditId(null);
    } else {
      const newValue = {
        id: Date.now(),
        title,
        des,
      };

      setNotes([...notes, newValue]);
    }

    setTitle("");
    setDes("");
  };

  // Search Notes
  const filternotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.des.toLowerCase().includes(search.toLowerCase())
  );

  // Delete Note
  const deleteNote = (id) => {
    const updateNotes = notes.filter((note) => note.id !== id);
    setNotes(updateNotes);

    if (editId === id) {
      setEditId(null);
      setTitle("");
      setDes("");
    }
  };

  // Edit Note
  const editNote = (note) => {
    setTitle(note.title);
    setDes(note.des);
    setEditId(note.id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-white to-purple-100 py-12">
      <div className="max-w-3xl mx-auto bg-white shadow-2xl rounded-3xl p-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Notes App
        </h1>

        {/* Title */}
        <div className="relative mb-5">
          <Title className="absolute left-3 top-4 text-gray-400" />
          <input
            type="text"
            placeholder="Enter Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-4 pl-12 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* Description */}
        <div className="relative mb-5">
          <Description className="absolute left-3 top-4 text-gray-400" />
          <textarea
            placeholder="Enter Description"
            value={des}
            onChange={(e) => setDes(e.target.value)}
            rows="5"
            className="w-full p-4 pl-12 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
          />
        </div>

        {/* Add / Update Button */}
        <button
          onClick={addvalue}
          className="w-full bg-indigo-600 text-white py-4 rounded-xl font-semibold hover:bg-indigo-700 transition flex items-center justify-center gap-2"
        >
          <NoteAdd />
          {editId ? "Update Note" : "Add Note"}
        </button>

        {/* Search */}
        <div className="mt-8 relative">
          <Search className="absolute left-3 top-4 text-gray-400" />
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

        {filternotes.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filternotes.map((note) => (
              <div
                key={note.id}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition duration-300 border border-gray-100 flex flex-col"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-3 break-words">
                  {note.title}
                </h3>

                <p className="text-gray-600 mb-5 leading-relaxed break-words whitespace-pre-wrap flex-grow">
                  {note.des}
                </p>

                <div className="flex gap-3 mt-auto">
                  <button
                    onClick={() => editNote(note)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition flex items-center gap-2"
                  >
                    <Edit />
                    Edit
                  </button>

                  <button
                    onClick={() => deleteNote(note.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition flex items-center gap-2"
                  >
                    <Delete />
                    Delete
                  </button>
                </div>
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
  );
}

export default Form;