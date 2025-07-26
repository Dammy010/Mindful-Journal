import React from 'react';
import { Link } from 'react-router-dom';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 via-white to-blue-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow-2xl rounded-2xl p-10 space-y-8">
        <h1 className="text-5xl font-extrabold text-blue-800 text-center leading-snug">
          About <span className="text-blue-600">Your Journal</span>
        </h1>

        <p className="text-gray-700 text-lg leading-relaxed text-center">
          Welcome to your safe space. The <span className="font-semibold text-blue-600">Mental Health Journal</span> is your companion in building emotional clarity, mindfulness, and resilience one entry at a time.
        </p>

        <div>
          <h2 className="text-xl font-semibold text-blue-700 mb-2">Why Journal?</h2>
          <ul className="list-disc pl-6 text-gray-700 text-lg space-y-2">
            <li>Reduce stress and anxiety</li>
            <li>Improve self-awareness and emotional clarity</li>
            <li>Track personal growth over time</li>
            <li>Build gratitude and mindfulness</li>
          </ul>
        </div>

        <p className="text-gray-700 text-lg leading-relaxed">
          Whether you're joyful, anxious, or overwhelmed this journal is your private sanctuary. Your entries are <span className="font-semibold">fully private</span>, securely stored, and accessible only to you.
        </p>

        <div className="text-center pt-4">
          <Link
            to="/add"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-full transition duration-200 shadow-md"
          >
            Start Journaling
          </Link>
        </div>
      </div>
    </div>
  );
}
