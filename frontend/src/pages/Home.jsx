import "../style/Home.css";
import { Link } from "react-router-dom";
function Home() {
  return (
    <div id="home">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo-block">
          <div className="logo-text">
            <span className="logo-main">BRAVEHEARTS</span>
            <span className="logo-sub">THE INDIAN DEFENSE SERVICES</span>
          </div>
        </div>
        <ul className="nav-links">
          <li><a href="#">Missions</a></li>
          <li><a href="#">Our Heroes</a></li>
          <li><a href="#">Elite Forces</a></li>
          <li><a href="#">War History</a></li>
          <li><a href="#">Study Hub</a></li>
          
        </ul>
        <div className="nav-actions">
          <Link to="/login">
            <button className="btn-login">
              Login
            </button>
          </Link>
          <Link to="/register">
            <button className="btn-signin">
              Register
            </button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg-grid"></div>
        <div className="hero-overlay"></div>

        <div className="hero-content">
          <div className="badge-row">
            <span className="badge-line"></span>
            <span className="badge">बलिदान परमो धर्मः</span>
            <span className="badge-line"></span>
          </div>

          <h1 className="hero-title">
            <span className="title-line-1">Earn</span>
            <span className="title-line-2">
              <em>YOUR</em>
            </span>
            <span className="title-line-3">Uniform.</span>
          </h1>

          <p className="hero-sub">
            This platform accumulates crucial resources to prepare for <strong>NDA · SSB · CDS</strong> aspirants
            and defence enthusiasts. <br></br>Study. Serve. Sacrifice.
          </p>

          <div className="hero-cta">
            <button className="cta">Explore History of Armed Forces</button>
          </div>

        </div>

        <div className="hero-image">
        <img src="/7av-7av-FFJPVyhCutQ-unsplash.jpg" alt="soldier" />        
        </div>
      </section>

      {/* Mission Cards */}
      <section className="section-cards">
        <div className="section-header">
          <h2>Choose Your <span>Mission</span></h2>
        </div>

        <div className="cards-grid">
          <div className="card card-study">
            <h3>Study Hub</h3>
            <p>NDA, CDS & AFCAT prep with structured modules and mock tests.</p>
            <a href="#" className="card-link">Enter →</a>
          </div>

          <div className="card card-ssb">
            <h3>SSB Battleground</h3>
            <p>Psychology tests, GTO tasks, personal interviews — master every SSB stage.</p>
            <a href="#" className="card-link">Enter →</a>
          </div>

          <div className="card card-history">
            <h3>War Chronicles</h3>
            <p>Relive India's glorious military history — wars, operations, and turning points.</p>
            <a href="#" className="card-link">Enter →</a>
          </div>

          <div className="card card-heroes">
            <h3>Hall of Heroes</h3>
            <p>Tributes to Param Vir Chakra & Maha Vir Chakra awardees — the immortal ones.</p>
            <a href="#" className="card-link">Enter →</a>
          </div>

          <div className="card card-forces">
            <h3>Elite Forces</h3>
            <p>PARA SF, MARCOS, Garud — discover India's most lethal special operations units.</p>
            <a href="#" className="card-link">Enter →</a>
          </div>

          <div className="card card-current">
            <h3>Defence Intel</h3>
            <p>Current affairs, defence acquisitions, strategic updates — stay mission-ready.</p>
            <a href="#" className="card-link">Enter →</a>
          </div>
        </div>
      </section>

      {/* Quote Banner */}
      <section className="quote-banner">
        <div className="quote-inner">
          <span className="quote-mark">"</span>
          <blockquote>
            What is the next thing you need for leadership? It is the ability to make up your mind to make a decision and accept full responsibility for that decision.
          </blockquote>
          <cite>— Field Marshal Sam Manekshaw </cite>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p className="footer-motto">Service Before Self</p>
        <p className="footer-copy">© 2026 Jai Hind</p>
      </footer>
    </div>
  );
}

export default Home;  