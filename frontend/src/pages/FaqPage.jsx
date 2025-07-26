import React, { useState } from "react";

const faqs = [
  {
    question: "Is my journal private?",
    answer:
      "Absolutely. All entries are encrypted and only accessible by you. We do not store or share your personal reflections.",
  },
  {
    question: "Can I access my journal on multiple devices?",
    answer:
      "Yes! Simply log in with your account on any device to continue your journaling seamlessly.",
  },
  {
    question: "Is it free to use?",
    answer:
      "Yes, the core features of Mindful Journal are completely free to use. We may offer optional premium features in the future.",
  },
  {
    question: "How often should I journal?",
    answer:
      "We recommend writing daily, but you can journal as often as you like your pace, your space.",
  },
  {
    question: "Can I delete or edit an entry?",
    answer:
      "Yes. You have full control over your entries you can edit or delete them at any time.",
  },
];

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-blue-100 via-white to-blue-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-blue-800 mb-4">Frequently Asked Questions</h1>
        <p className="text-gray-600 text-lg">
          Find quick answers to common questions about your journaling experience.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-6">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-xl p-6 transition duration-200 hover:shadow-xl"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full text-left focus:outline-none"
            >
              <h3 className="text-xl font-semibold text-blue-700 flex justify-between items-center">
                {faq.question}
                <span className="text-2xl">{openIndex === index ? "−" : "+"}</span>
              </h3>
            </button>
            {openIndex === index && (
              <p className="mt-4 text-gray-700 text-base">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
