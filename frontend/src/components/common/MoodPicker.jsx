export default function MoodPicker({ mood, setMood }) {
  const moods = ['😊', '😢', '😡', '😨', '😌'];
  return (
    <div className="flex space-x-4">
      {moods.map((m) => (
        <button
          key={m}
          className={`text-3xl ${m === mood ? 'ring ring-blue-400' : ''}`}
          onClick={() => setMood(m)}
        >
          {m}
        </button>
      ))}
    </div>
  );
}