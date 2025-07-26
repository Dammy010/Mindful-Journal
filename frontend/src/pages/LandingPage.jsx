import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LandingPage() {
  const { user } = useAuth(); 

  return (
    <div className="text-center bg-gradient-to-b from-blue-100 to-white">
      <section className="py-20 px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-800 mb-4">
          Welcome to Mindful Journal
        </h1>
        <p className="text-gray-700 max-w-2xl mx-auto text-lg mb-6">
          Your private, calming space to reflect, track your moods, and cultivate daily self-awareness.
        </p>

        <Link
          to={user ? "/dashboard" : "/signup"}
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-medium shadow-md hover:bg-blue-700 transition"
        >
          {user ? "Go to Dashboard" : "Get Started"}
        </Link>
      </section>

      <section className="bg-white py-16 px-6">
        <h2 className="text-3xl font-bold text-blue-700 mb-10">How It Works</h2>
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            {
              title: "1. Sign Up",
              description: "Create your free account securely and start journaling right away."
            },
            {
              title: "2. Reflect & Write",
              description: "Log daily thoughts, moods, and reflections in a calming space."
            },
            {
              title: "3. Gain Insight",
              description: "Track patterns, emotions, and mental clarity over time."
            }
          ].map((step, index) => (
            <div key={index} className="p-6 bg-blue-50 rounded-xl shadow">
              <h3 className="text-xl font-semibold text-blue-800 mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-blue-50 py-16 px-6">
        <h2 className="text-3xl font-bold text-blue-700 mb-10">What Users Say</h2>
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 text-left">
          {[
            {
              quote: "Mindful Journal has helped me stay grounded and reflect during tough days. It's like a digital safe space.",
              author: "— Sarah A."
            },
            {
              quote: "I love the mood tracking! It's insightful to see how my emotional patterns evolve.",
              author: "— James R."
            },
            {
              quote: "Simple, elegant, and private. Exactly what I needed to keep journaling consistently.",
              author: "— Maria T."
            }
          ].map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow">
              <p className="text-gray-700 italic">"{testimonial.quote}"</p>
              <p className="mt-4 text-sm font-semibold text-blue-800">{testimonial.author}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
