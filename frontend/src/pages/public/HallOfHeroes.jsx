import "../../style/PublicPages.css";

export default function HallOfHeroes() {
  const pvcWinners = [
    {
      name: "Major Somnath Sharma",
      rank: "Major",
      award: "Param Vir Chakra",
      year: "1947",
      detail: "First PVC recipient. Led his company against Pakistani raiders in Kashmir. Killed in action while inspiring his men."
    },
    {
      name: "Lance Naik Albert Ekka",
      rank: "Lance Naik",
      award: "Param Vir Chakra",
      year: "1971",
      detail: "Single-handedly destroyed enemy bunkers. Posthumously awarded for bravery in the Battle of Gangasagar."
    },
    {
      name: "Captain Vikram Batra",
      rank: "Captain",
      award: "Param Vir Chakra",
      year: "1999",
      detail: "Martyred during Kargil War. Code name: Sher Shah. Famous for 'Yeh Dil Maange More!'"
    },
    {
      name: "Lieutenant Manoj Pandey",
      rank: "Lieutenant",
      award: "Param Vir Chakra",
      year: "1999",
      detail: "Led from front and captured Jubar Top. Martyred during Kargil War."
    },
    {
      name: "Rifleman Sanjay Kumar",
      rank: "Rifleman",
      award: "Param Vir Chakra",
      year: "1999",
      detail: "Captured key Pakistani position despite being severely injured. Survived the Kargil War."
    },
    {
      name: "Grenadier Yogendra Singh Yadav",
      rank: "Grenadier",
      award: "Param Vir Chakra",
      year: "1999",
      detail: "Youngest PVC recipient at 19. Survived 16 bullets during Tiger Hill assault."
    },
    {
      name: "Subedar Major Bana Singh",
      rank: "Subedar Major",
      award: "Param Vir Chakra",
      year: "1987",
      detail: "Captured the highest battlefield post, renamed Bana Top in Siachen."
    },
    {
      name: "Company Havildar Major Piru Singh",
      rank: "Company Havildar Major",
      award: "Param Vir Chakra",
      year: "1948",
      detail: "Led his platoon to capture enemy positions in Naushera sector."
    }
  ];

  const mvcWinners = [
    { name: "Major General Ian Cardozo", rank: "Major General", year: "1971", detail: "Fought in Bangladesh war, amputated his own leg to prevent gangrene." },
    { name: "Brigadier Mohammad Usman", rank: "Brigadier", year: "1948", detail: "Highest-ranking officer martyred in 1948 war. Awarded Maha Vir Chakra." },
    { name: "Lieutenant General Sagat Singh", rank: "Lieutenant General", year: "1971", detail: "Led operations in Bangladesh, known for airborne assault tactics." },
    { name: "Wing Commander Rakesh Sharma", rank: "Wing Commander", year: "1984", detail: "First Indian in space. Not a gallantry award but cosmic achievement." }
  ];

  return (
    <div className="public-page">
      <div className="page-header">
        <h1>Hall of Heroes</h1>
        <p>Remembering the brave hearts who made the ultimate sacrifice</p>
      </div>

      <div className="content-section">
        <h2>Param Vir Chakra Awardees</h2>
        <p className="lead-text">Param Vir Chakra is India's highest military decoration, awarded for displaying supreme courage in the face of the enemy.</p>
        
        <div className="heroes-grid">
          {pvcWinners.map((hero, index) => (
            <div key={index} className="hero-card">
              <div className="hero-rank">{hero.rank}</div>
              <h3 className="hero-name">{hero.name}</h3>
              <div className="hero-award">⭐ {hero.award} • {hero.year}</div>
              <div className="hero-detail">{hero.detail}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="content-section">
        <h2>Maha Vir Chakra Recipients</h2>
        <p className="lead-text">Maha Vir Chakra is India's second-highest military decoration for acts of conspicuous gallantry.</p>
        
        <div className="info-grid">
          {mvcWinners.map((hero, index) => (
            <div key={index} className="info-card">
              <h3>{hero.name}</h3>
              <p><strong>{hero.rank}</strong> • {hero.year}</p>
              <p className="hero-detail">{hero.detail}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="content-section">
        <h2>Gallantry Awards Overview</h2>
        <div className="info-grid">
          <div className="info-card">
            <h3>Param Vir Chakra</h3>
            <p>Highest gallantry award. Awarded 21 times (including 14 posthumous).</p>
          </div>
          <div className="info-card">
            <h3>Maha Vir Chakra</h3>
            <p>Second-highest gallantry award. Over 200 recipients.</p>
          </div>
          <div className="info-card">
            <h3>Vir Chakra</h3>
            <p>Third-highest gallantry award. Over 1,300 recipients.</p>
          </div>
          <div className="info-card">
            <h3>Ashoka Chakra</h3>
            <p>Highest peacetime gallantry award. Equivalent to Param Vir Chakra.</p>
          </div>
        </div>
      </div>
    </div>
  );
}