import "./Testimonials.css";

function Testimonials() {
  const testimonials = [
    {
      avatar: "👩‍💻",
      name: "Priya Sharma",
      title: "CTO, Nimbus Systems",
      quote:
        "SyncSpace completely changed how our distributed team runs technical interviews. No more juggling five different tabs.",
    },
    {
      avatar: "👨‍💻",
      name: "Marcus Chen",
      title: "Lead Engineer, Vertex Labs",
      quote:
        "The CRDT-based sync is genuinely impressive. Our engineers can co-edit code without ever worrying about overwriting each others work.",
    },
    {
      avatar: "👩‍🔧",
      name: "Elena Rodriguez",
      title: "Engineering Manager, Northwind",
      quote:
        "Session replay alone has saved us hours during retrospectives. It has become a core part of our engineering culture.",
    },
  ];

  return (
    <section className="testimonials-section">
      <h2 className="testimonials-heading">What Engineering Leaders Say</h2>
      <div className="testimonials-grid">
        {testimonials.map((item, index) => {
          return (
            <div className="testimonial-card" key={index}>
              <div className="testimonial-avatar">{item.avatar}</div>
              <p className="testimonial-quote">{item.quote}</p>
              <div className="testimonial-name">{item.name}</div>
              <div className="testimonial-title">{item.title}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Testimonials;