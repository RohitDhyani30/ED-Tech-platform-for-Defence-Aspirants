import "../../style/PublicPages.css";

export default function EliteForces() {
  const forces = [
    {
      name: "Para SF",
      motto: "Men Apart",
      about: "Special Forces branch of Indian Army. Trained in airborne warfare, counter-terrorism, and unconventional operations.",
      specialties: ["Airborne Ops", "Counter-Terrorism", "Hostage Rescue", "Reconnaissance"]
    },
    {
      name: "MARCOS",
      motto: "The Few, The Fearless",
      about: "Marine Commandos of Indian Navy. Experts in maritime operations, amphibious warfare, and coastal security.",
      specialties: ["Maritime Ops", "Underwater Demolition", "Coastal Security", "Counter-Piracy"]
    },
    {
      name: "Garud Commando Force",
      motto: "Swift and Strikers",
      about: "Special Forces unit of Indian Air Force. Protects airbases and conducts special missions.",
      specialties: ["Airbase Security", "Combat Search", "Airfield Seizure", "Reconnaissance"]
    },
    {
      name: "National Security Guard (NSG)",
      motto: "Sarvatra Sarvottam Suraksha",
      about: "Elite counter-terrorism unit. Also known as 'Black Cats'. Specializes in urban counter-terrorism.",
      specialties: ["Counter-Terrorism", "Hostage Rescue", "VIP Security", "Bomb Disposal"]
    },
    {
      name: "Special Frontier Force (SFF)",
      motto: "Secret Warriors",
      about: "Paramilitary special forces. Conducts covert operations along Tibetan border.",
      specialties: ["Covert Ops", "Border Surveillance", "Mountain Warfare"]
    },
    {
      name: "COBRA",
      motto: "Swift and Fierce",
      about: "Commando Battalion for Resolute Action. CRPF's elite anti-Naxal force.",
      specialties: ["Jungle Warfare", "Anti-Naxal Ops", "Guerilla Tactics"]
    }
  ];

  return (
    <div className="public-page">
      <div className="page-header">
        <h1>Elite Forces</h1>
        <p>Discover India's most lethal special operations units</p>
      </div>

      <div className="content-section">
        <div className="elite-grid">
          {forces.map((force, index) => (
            <div key={index} className="elite-card">
              <div className="elite-header">
                <h3>{force.name}</h3>
                <div className="elite-motto">"{force.motto}"</div>
              </div>
              <div className="elite-content">
                <p>{force.about}</p>
                <h4>Specialties:</h4>
                <ul>
                  {force.specialties.map((skill, idx) => (
                    <li key={idx}>{skill}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="content-section">
        <h2>Selection & Training</h2>
        <div className="info-grid">
          <div className="info-card">
            <h3>Para SF Selection</h3>
            <p>90 days of hellish training at Parvat Ghatak School (The Bull's Pen). Less than 10% qualify.</p>
          </div>
          <div className="info-card">
            <h3>MARCOS Selection</h3>
            <p>One of toughest in world. 10-month course with 70% failure rate. Includes 'Hell Week'.</p>
          </div>
          <div className="info-card">
            <h3>Garud Training</h3>
            <p>70 weeks of rigorous training including para jumps, combat warfare, and commando skills.</p>
          </div>
          <div className="info-card">
            <h3>NSG Training</h3>
            <p>14-month intensive course. Specializes in urban close-quarter combat and black ops.</p>
          </div>
        </div>
      </div>
    </div>
  );
}