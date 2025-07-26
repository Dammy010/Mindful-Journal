import { useEffect, useState } from "react";
import axios from "../utils/axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Eye, Pencil } from "lucide-react";

export default function DashboardPage() {
  const [entries, setEntries] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();

  const fetchEntries = async () => {
    try {
      const res = await axios.get("/entries");
      setEntries(res.data);
    } catch (err) {
      toast.error("Failed to load journal entries.");
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const confirmDelete = (id) => setDeleteId(id);

  const handleDelete = async () => {
    try {
      await axios.delete(`/entries/${deleteId}`);
      setEntries(entries.filter((entry) => entry._id !== deleteId));
      toast.success("Entry deleted!");
    } catch (err) {
      toast.error("Failed to delete entry.");
    } finally {
      setDeleteId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white px-4 py-10">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl p-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <h2 className="text-4xl font-bold text-blue-800 tracking-tight">
            📝 Your Journal
          </h2>
          <Link
            to="/add"
            className="bg-blue-600 text-white font-semibold px-5 py-2.5 rounded-full shadow hover:bg-blue-700 transition"
          >
            + New Entry
          </Link>
        </div>

        {entries.length === 0 ? (
          <p className="text-center text-gray-500 italic text-lg mt-10">
            No entries yet. Start your journaling journey 🌱
          </p>
        ) : (
          <div className="space-y-5">
            {entries.map((entry) => (
              <motion.div
                key={entry._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow hover:shadow-lg transition"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="flex items-center gap-2 text-lg font-semibold">
                      <span className="text-2xl">{entry.mood}</span>
                      <span className="text-gray-600 text-sm">
                        {new Date(entry.createdAt).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-3 text-sm">
                    <button
                      onClick={() => navigate(`/entry/${entry._id}`)}
                      className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                    >
                      <Eye className="w-4 h-4" /> View
                    </button>
                    <button
                      onClick={() => navigate(`/edit/${entry._id}`)}
                      className="text-yellow-500 hover:text-yellow-600 flex items-center gap-1"
                    >
                      <Pencil className="w-4 h-4" /> Edit
                    </button>
                    <button
                      onClick={() => confirmDelete(entry._id)}
                      className="text-red-500 hover:text-red-600 flex items-center gap-1"
                    >
                      <Trash2 className="w-4 h-4" /> Delete
                    </button>
                  </div>
                </div>
                <p className="text-gray-800 line-clamp-3 leading-relaxed">{entry.thoughts}</p>
                {entry.tags?.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {entry.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {deleteId && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md text-center"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                Are you sure?
              </h3>
              <p className="text-gray-600 mb-6 text-sm">
                This journal entry will be permanently deleted.
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setDeleteId(null)}
                  className="px-5 py-2 bg-gray-200 hover:bg-gray-300 rounded-full font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full font-medium"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
