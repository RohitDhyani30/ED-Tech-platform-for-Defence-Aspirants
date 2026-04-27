import "../../style/PublicPages.css";

export default function DefenceIntel() {
  const news = [
    {
      date: "March 2024",
      title: "INS Imphal Commissioned",
      summary: "Indian Navy's latest stealth guided-missile destroyer INS Imphal commissioned at Naval Dockyard, Mumbai."
    },
    {
      date: "February 2024",
      title: "Tejas MK2 First Flight",
      summary: "India's advanced light combat aircraft Tejas MK2 completed its maiden flight successfully."
    },
    {
      date: "January 2024",
      title: "Dhanush Missile Test",
      summary: "Indian Army successfully test-fired indigenously developed Dhanush ballistic missile."
    },
    {
      date: "December 2023",
      title: "Indian Navy's INS Vikrant Full Operational",
      summary: "India's first indigenous aircraft carrier INS Vikrant achieves complete operational capability."
    },
    {
      date: "November 2023",
      title: "S-400 Air Defense System",
      summary: "India deploys fifth squadron of S-400 air defense system along China border."
    }
  ];

  const acquisitions = [
    "Rafale Marine jets for INS Vikrant",
    "31 MQ-9B Predator drones from US",
    "6 P-8I Neptune aircraft for Navy",
    "70,000 SIG 716 assault rifles",
    "K-9 Vajra howitzers",
    "Arjun MK-1A main battle tanks"
  ];

  return (
    <div className="public-page">
      <div className="page-header">
        <h1>Defence Intel</h1>
        <p>Latest defence news, acquisitions, and strategic updates</p>
      </div>

      <div className="content-section">
        <div className="news-grid">
          {news.map((item, index) => (
            <div key={index} className="news-card">
              <div className="news-date">{item.date}</div>
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="content-section">
        <h2>Recent Acquisitions</h2>
        <div className="info-grid">
          <div className="info-card">
            <ul>
              {acquisitions.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="content-section">
        <h2>Strategic Developments</h2>
        <div className="info-grid">
          <div className="info-card">
            <h3>Defence Budget 2024</h3>
            <p>India allocated ₹6.21 lakh crore (9% increase) for defence spending. Focus on border infrastructure and indigenous manufacturing.</p>
          </div>
          <div className="info-card">
            <h3>Make in India</h3>
            <p>Positive Indigenisation List expanded to 4,700 items banned for import. HAL, BEL, DRDO leading indigenous development.</p>
          </div>
          <div className="info-card">
            <h3>Border Infrastructure</h3>
            <p>77 new roads and 5 tunnels approved along China border. 14 new airfields being upgraded in northeastern states.</p>
          </div>
          <div className="info-card">
            <h3>Joint Exercises</h3>
            <p>India participated in Malabar 2024, Vajra Prahar, and Milan exercises with US, Japan, Australia, France.</p>
          </div>
        </div>
      </div>
    </div>
  );
}