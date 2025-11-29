import PresentationSlide from '../components/PresentationSlide';

function PersonalExperiences() {
  const experiences = [
    { title: "Alzheimer's Walk", desc: "Supporting community causes" },
    { title: "NASCAR Race", desc: "Team building at the track" },
    { title: "Summer Party", desc: "Annual celebration" },
    { title: "Test Center", desc: "Learning machinery up close" },
    { title: "Rooftop Lunches", desc: "Breaks with colleagues" },
    { title: "Monthly Meetups", desc: "Thursday gatherings" }
  ];

  const eventImages = [
    "/images/exp/Image (4).jpg",
    "/images/exp/unnamed.jpg",
    "/images/exp/unnamed (1).jpg",
    "/images/exp/image.png",
    "/images/exp/image (3).jpg",
    "/images/exp/Screenshot 2025-10-07 163516.png"
  ];

  return (
    <PresentationSlide>
      <div className="slide-header">
        <h1>Life at Van Dyk</h1>
        <h2>Beyond the Code - Personal Experiences & Company Culture</h2>
      </div>

      <div className="journey-box" style={{ padding: '15px', margin: '15px 0' }}>
        <h4 style={{ color: 'white', marginBottom: '10px' }}>My Internship Experience</h4>
        <p style={{ color: 'white', fontSize: '1em' }}>
          My time at Van Dyk wasn't just about coding. It was about being part of a family-owned company that values its people. From charity walks to team outings, I fully immersed myself in the culture.
        </p>
      </div>

      <div className="image-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px', margin: '15px 0' }}>
        {eventImages.map((src, index) => (
          <div key={index} style={{ position: 'relative' }}>
            <img 
              src={src} 
              alt={`Van Dyk Event ${index + 1}`}
              className="grid-image"
              style={{ height: '150px', objectFit: 'cover' }}
            />
          </div>
        ))}
      </div>

      <div className="two-column" style={{ margin: '15px 0', gap: '20px' }}>
        <div className="tech-list" style={{ margin: 0, padding: '15px' }}>
          <h4 style={{ margin: '5px 0' }}>Events & Activities</h4>
          <ul style={{ fontSize: '0.9em' }}>
            {experiences.map((exp, index) => (
              <li key={index}><strong>{exp.title}:</strong> {exp.desc}</li>
            ))}
          </ul>
        </div>

        <div className="impact-box" style={{ margin: 0, padding: '15px' }}>
          <h4 style={{ margin: '5px 0' }}>Cultural Impact</h4>
          <ul style={{ fontSize: '0.9em' }}>
            <li>Built strong relationships with colleagues</li>
            <li>Understood business from people perspective</li>
            <li>Integrated into the team culture</li>
            <li>Experienced American corporate life</li>
          </ul>
        </div>
      </div>
    </PresentationSlide>
  );
}

export default PersonalExperiences;
