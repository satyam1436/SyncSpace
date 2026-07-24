import { useState } from "react";
import "./FAQSection.css";

function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Is SyncSpace free for teams?",
      answer:
        "SyncSpace offers a free tier for small teams getting started, with paid plans available for larger organizations needing advanced features and higher usage limits.",
    },
    {
      question: "How does conflict resolution work?",
      answer:
        "SyncSpace uses CRDTs (Conflict-free Replicated Data Types) powered by Yjs, which mathematically merge simultaneous edits from multiple users without ever losing data or creating conflicts.",
    },
    {
      question: "Do I need to install any software?",
      answer:
        "No installation is required. SyncSpace runs entirely in your browser — just open a room link and start collaborating instantly.",
    },
    {
      question: "How are collaborative sessions secured?",
      answer:
        "Every session runs in a fully isolated, private room. Access is controlled through secure links, and all activity is logged for auditability.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section">
      <h2 className="faq-heading">Frequently Asked Questions</h2>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div className="faq-item" key={index}>
            <button className="faq-question" onClick={() => toggleFAQ(index)}>
              {faq.question}
              <span className={`faq-chevron ${openIndex === index ? "open" : ""}`}>
                ▼
              </span>
            </button>
            <div className={`faq-answer ${openIndex === index ? "open" : ""}`}>
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FAQSection;