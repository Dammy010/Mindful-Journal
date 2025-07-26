import { Link } from 'react-router-dom';

export default function EntryCard({ entry }) {
  return (
    <Link to={`/entry/${entry._id}`} className="block bg-white shadow rounded p-4 hover:shadow-lg transition">
      <div className="text-xl">{entry.mood}</div>
      <p className="text-sm text-gray-500">{new Date(entry.createdAt).toLocaleString()}</p>
      <p className="mt-2 text-gray-700 line-clamp-2">{entry.thoughts}</p>
      {entry.tags?.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {entry.tags.map((tag, i) => (
            <span key={i} className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded">#{tag}</span>
          ))}
        </div>
      )}
    </Link>
  );
}