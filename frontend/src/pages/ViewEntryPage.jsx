import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../utils/axios';

export default function ViewEntryPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [entry, setEntry] = useState(null);

  useEffect(() => {
    axios.get(`/entries/${id}`).then(res => setEntry(res.data));
  }, [id]);

  if (!entry) return <p className="text-center mt-10 text-gray-500">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
      <button
        onClick={() => navigate(-1)}
        className="text-sm text-blue-600 hover:underline mb-4"
      >
        ← Back
      </button>

      <div className="flex items-center gap-3 mb-2">
        <div className="text-4xl">{entry.mood}</div>
        <span className="text-sm text-gray-500">
          {new Date(entry.createdAt).toLocaleString()}
        </span>
      </div>

      <p className="mt-4 text-gray-800 text-lg leading-relaxed whitespace-pre-wrap">
        {entry.thoughts}
      </p>

      {entry.tags?.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {entry.tags.map((tag, i) => (
            <span
              key={i}
              className="bg-blue-100 text-blue-700 px-3 py-1 text-sm rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
