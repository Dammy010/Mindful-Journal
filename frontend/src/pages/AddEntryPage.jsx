import { useState } from 'react';
import MoodPicker from '../components/common/MoodPicker';
import axios from '../utils/axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export default function AddEntryPage() {
  const [mood, setMood] = useState('');
  const [thoughts, setThoughts] = useState('');
  const [tags, setTags] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!mood || !thoughts.trim()) {
      toast.error('Mood and thoughts are required.');
      return;
    }

    try {
      await axios.post('/entries', {
        mood,
        thoughts,
        tags: tags
          .split(',')
          .map(tag => tag.trim())
          .filter(Boolean),
      });
      toast.success('Journal entry saved!');
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      toast.error('Failed to save entry.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto bg-white p-6 shadow-lg rounded-lg space-y-6"
      >
        <h2 className="text-3xl font-bold text-blue-800 text-center">New Journal Entry</h2>
        <button
          type="button"
          onClick={() => navigate(-1)} 
          className="text-sm text-blue-600 hover:underline"
        >
          &larr; Back
        </button>

        <MoodPicker mood={mood} setMood={setMood} />

        <textarea
          className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows="6"
          placeholder="What are you thinking or feeling today?"
          value={thoughts}
          onChange={e => setThoughts(e.target.value)}
        />

        <input
          type="text"
          placeholder="Tags (comma separated)"
          className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={tags}
          onChange={e => setTags(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
        >
          Save Entry
        </button>
      </form>
    </div>
  );
}
