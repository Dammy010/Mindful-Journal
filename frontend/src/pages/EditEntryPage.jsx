import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import MoodPicker from '../components/common/MoodPicker';
import { toast } from 'react-hot-toast';

export default function EditEntryPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [entry, setEntry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEntry = async () => {
      try {
        const res = await axios.get(`/entries/${id}`);
        setEntry(res.data);
      } catch (err) {
        toast.error('Failed to load entry.');
      } finally {
        setLoading(false);
      }
    };
    fetchEntry();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/entries/${id}`, {
        mood: entry.mood,
        thoughts: entry.thoughts,
        tags: entry.tags,
      });
      toast.success('Entry updated successfully!');
      navigate('/dashboard');
    } catch (err) {
      toast.error('Update failed.');
    }
  };

  const handleChange = (field, value) => {
    setEntry(prev => ({ ...prev, [field]: value }));
  };

  if (loading) return <p className="text-center mt-10">Loading entry...</p>;
  if (!entry) return <p className="text-center text-red-500 mt-10">Entry not found.</p>;

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10 space-y-4"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-blue-800">Edit Journal Entry</h2>
        <button
          type="button"
          onClick={() => navigate(-1)} 
          className="text-sm text-blue-600 hover:underline"
        >
          &larr; Back
        </button>
      </div>

      <MoodPicker mood={entry.mood} setMood={(m) => handleChange('mood', m)} />

      <textarea
        className="w-full border p-2 rounded"
        rows="6"
        placeholder="Update your thoughts..."
        value={entry.thoughts}
        onChange={(e) => handleChange('thoughts', e.target.value)}
      />

      <input
        type="text"
        placeholder="Tags (comma separated)"
        className="w-full p-2 border rounded"
        value={entry.tags.join(', ')}
        onChange={(e) =>
          handleChange(
            'tags',
            e.target.value
              .split(',')
              .map(tag => tag.trim())
              .filter(Boolean)
          )
        }
      />

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
}
