import "../../style/PublicPages.css";
import { Link } from "react-router-dom";

export default function StudyHub() {
  return (
    <div className="public-page-wrapper">
      {/* Hero Background Section */}
      <section className="public-hero">
        <div className="hero-overlay"></div>
        <div className="public-hero-content">
          <h1>Study Hub</h1>
          <p>Your gateway to NDA, CDS, and AFCAT examination preparation</p>
          <div className="public-hero-nav">
            <Link to="/" className="hero-nav-link">Home</Link>
            <span className="hero-nav-sep">/</span>
            <span className="hero-nav-current">Study Hub</span>
          </div>
        </div>
      </section>

      <div className="public-page">
        <div className="content-section">
          <h2>NDA (National Defence Academy)</h2>
          <div className="info-grid">
            <div className="info-card">
              <h3>Exam Pattern</h3>
              <ul>
                <li>Mathematics: 300 marks (2.5 hours)</li>
                <li>GAT: 600 marks (2.5 hours)</li>
                <li>Total: 900 marks</li>
                <li>SSB Interview: 900 marks</li>
              </ul>
            </div>
            <div className="info-card">
              <h3>Eligibility</h3>
              <ul>
                <li>Age: 16.5 to 19.5 years</li>
                <li>Qualification: 10+2 or equivalent</li>
                <li>Marital Status: Unmarried</li>
                <li>Nationality: Indian</li>
              </ul>
            </div>
            <div className="info-card">
              <h3>Subjects Covered</h3>
              <ul>
                <li>Mathematics: Algebra, Calculus, Trigonometry</li>
                <li>GAT: English, General Knowledge, Science</li>
                <li>Current Affairs, History, Geography</li>
                <li>Physics, Chemistry, Biology basics</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="content-section">
          <h2>CDS (Combined Defence Services)</h2>
          <div className="info-grid">
            <div className="info-card">
              <h3>Exam Pattern</h3>
              <ul>
                <li>English: 100 marks (2 hours)</li>
                <li>General Knowledge: 100 marks (2 hours)</li>
                <li>Elementary Mathematics: 100 marks (2 hours)</li>
                <li>Total: 300 marks for IMA/OTA</li>
              </ul>
            </div>
            <div className="info-card">
              <h3>Eligibility</h3>
              <ul>
                <li>Age: 19 to 25 years (varies by academy)</li>
                <li>Qualification: Graduation</li>
                <li>For IMA: Degree from recognized university</li>
                <li>For OTA: Degree or equivalent</li>
              </ul>
            </div>
            <div className="info-card">
              <h3>Academies</h3>
              <ul>
                <li>IMA - Dehradun (Army)</li>
                <li>INA - Ezhimala (Navy)</li>
                <li>AFA - Dundigal (Air Force)</li>
                <li>OTA - Chennai & Gaya</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="content-section">
          <h2>AFCAT (Air Force Common Admission Test)</h2>
          <div className="info-grid">
            <div className="info-card">
              <h3>Exam Pattern</h3>
              <ul>
                <li>General Awareness: 20 marks</li>
                <li>Verbal Ability: 40 marks</li>
                <li>Numerical Ability: 20 marks</li>
                <li>Reasoning: 20 marks</li>
                <li>Military Aptitude: 20 marks</li>
              </ul>
            </div>
            <div className="info-card">
              <h3>Eligibility</h3>
              <ul>
                <li>Age: 20 to 26 years (Flying Branch)</li>
                <li>Age: 20 to 26 years (Technical Branch)</li>
                <li>Age: 20 to 26 years (Ground Duty)</li>
                <li>Graduation with minimum 60% marks</li>
              </ul>
            </div>
            <div className="info-card">
              <h3>Branches</h3>
              <ul>
                <li>Flying Branch (Pilot)</li>
                <li>Technical Branch (Engg)</li>
                <li>Ground Duty (Admin, Logistics, Accounts)</li>
                <li>Meteorology Branch</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="content-section">
          <h2>Preparation Tips</h2>
          <div className="tips-grid">
            <div className="tip-card"><span className="tip-number">01</span><h3>Understand the Syllabus</h3><p>Download official syllabus from UPSC website and focus on key topics. Create a study plan covering all subjects.</p></div>
            <div className="tip-card"><span className="tip-number">02</span><h3>Solve Previous Year Papers</h3><p>PYQs help understand exam pattern and difficulty level. Solve at least 10 years of papers before attempting mock tests.</p></div>
            <div className="tip-card"><span className="tip-number">03</span><h3>Regular Mock Tests</h3><p>Time management is crucial. Take weekly mock tests and analyze your weak areas.</p></div>
            <div className="tip-card"><span className="tip-number">04</span><h3>Physical Fitness</h3><p>Start preparing for SSB physical tests early. Regular running, push-ups, and sit-ups are essential.</p></div>
            <div className="tip-card"><span className="tip-number">05</span><h3>Current Affairs</h3><p>Read newspapers daily. Focus on defence news, national security, and international relations.</p></div>
            <div className="tip-card"><span className="tip-number">06</span><h3>SSB Preparation</h3><p>Develop officer-like qualities (OLQs). Practice group discussions, lecturette, and personal interview.</p></div>
          </div>
        </div>

        <div className="content-section">
          <h2>Recommended Books</h2>
          <div className="books-list">
            <div className="book-item"><span>📘</span><div><strong>Pathfinder for NDA & NA Entrance Examination</strong><p>Arihant Publications</p></div></div>
            <div className="book-item"><span>📘</span><div><strong>Mathematics for NDA/NA</strong><p>R.S. Aggarwal</p></div></div>
            <div className="book-item"><span>📘</span><div><strong>CDS Combined Defence Services Guide</strong><p>Kiran Prakashan</p></div></div>
            <div className="book-item"><span>📘</span><div><strong>Lucent's General Knowledge</strong><p>Lucent Publication</p></div></div>
          </div>
        </div>
      </div>
    </div>
  );
}