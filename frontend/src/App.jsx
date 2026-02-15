import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    profilePic: "",
    skills: "",
    linkedin: "",
    github: "",
    education: [],
    certifications: []
  });

  // Fetch profile
  useEffect(() => {
    fetch("https://gidy-profile-backend.onrender.com/api/profile")
      .then(res => res.json())
      .then(data => {
        if (data) {
          setProfile(data);
          setFormData({
            name: data.name || "",
            bio: data.bio || "",
            profilePic: data.profilePic || "",
            skills: data.skills?.join(", ") || "",
            linkedin: data.socialLinks?.linkedin || "",
            github: data.socialLinks?.github || "",
            education: data.education || [],
            certifications: data.certifications || []
          });
        }
      })
      .catch(err => console.error("Error fetching profile:", err));
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Save profile (PUT request) — updated version
  const handleSave = async () => {
    try {
      const res = await fetch("https://gidy-profile-backend.onrender.com/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
const handleSave = async () => {
  try {

    const res = await fetch("https://gidy-profile-backend.onrender.com/api/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: formData.name,
        bio: formData.bio,
        profilePic: formData.profilePic,
        skills: formData.skills.split(",").map(skill => skill.trim()),
        socialLinks: {
          linkedin: formData.linkedin,
          github: formData.github
        },
        education: formData.education,
        certifications: formData.certifications
      })
    });

    const updated = await res.json();

    console.log("Updated:", updated);

    setProfile(updated);

    setEditMode(false);

  } catch (error) {

    console.error("Save failed:", error);

  }
};


  if (!profile && !editMode) return <div className="loading">Loading...</div>;

  return (
    <div className={darkMode ? "container dark" : "container"}>

      {/* Top Actions */}
      <div className="top-actions">
        <button onClick={() => setDarkMode(!darkMode)} className="toggle-btn">
          {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      {/* HEADER */}
      <div className="card header-card">
        <div className="header-left">
          <img
            src={profile.profilePic || "https://i.pravatar.cc/150?img=12"}
            alt={`${profile.name}'s profile`}
            className="profile-pic"
          />
        </div>

        <div className="header-center">
          {editMode ? (
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="name-input"
            />
          ) : (
            <h2 className="name">
              {profile.name}
              <span className="tag"> (Final-Year Student)</span>
            </h2>
          )}

          {editMode ? (
            <input
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="bio-input"
            />
          ) : (
            <p className="bio">{profile.bio}</p>
          )}

          <p className="email">naimullahshaik666@gmail.com</p>
          <button className="resume-btn">⬇ Download Resume</button>

          {/* Inline Save / Edit Profile button */}
          {editMode ? (
            <button onClick={handleSave}>Save</button>
          ) : (
            <button onClick={() => setEditMode(true)}>Edit Profile</button>
          )}
        </div>

        <div className="header-right">
          <div className="stats-card">
            <div className="stats-row">
              <div>
                <div className="stats-label">League</div>
                <div className="stats-value">Bronze</div>
              </div>
              <div>
                <div className="stats-label">Rank</div>
                <div className="stats-value">24</div>
              </div>
              <div>
                <div className="stats-label">Points</div>
                <div className="stats-value">100</div>
              </div>
            </div>
            <div className="rewards">View My Rewards →</div>
          </div>
        </div>
      </div>

      {/* CAREER */}
      <div className="card career-card">
        <div className="career-text">
          <h3>Tell us where you want to go</h3>
          <p>
            Add your career goals and what inspires you. This helps tailor
            recommendations and opportunities.
          </p>
        </div>
        <button className="career-btn">✨ Add your career goals</button>
      </div>

      {/* GRID */}
      <div className="grid">
        <div className="grid-left">
          <div className="card completion-card">
            <h3>Profile Completed</h3>
            <p>Mission complete! Profile at 100%</p>
          </div>

          <div className="card skills-card">
            <h3>Skills</h3>
            <div className="skills">
              {profile.skills?.map((skill, index) => (
                <span key={index} className="skill">{skill}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid-right">
          <div className="card experience-card">
            <h3>Experience</h3>
            <p>Fresher</p>
            <p>N/A</p>
          </div>

          <div className="card education-card">
            <h3>Education</h3>
            {profile.education?.map((edu, index) => (
              <div key={index} className="edu-item">
                <div className="edu-degree">{edu.degree}</div>
                <div className="edu-college">{edu.college}</div>
                <div className="edu-duration">{edu.duration}</div>
              </div>
            ))}
          </div>

          <div className="card certification-card">
            <h3>Certifications</h3>
            {profile.certifications?.map((cert, index) => (
              <div key={index} className="cert-item">
                <div className="cert-title">{cert.title}</div>
                <div className="cert-provider">{cert.provider}</div>
                <div className="cert-date">{cert.date}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Edit Mode Form */}
      {editMode && (
        <div className="card edit-form">
          <h3>Edit Profile</h3>
          <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
          <input name="bio" placeholder="Bio" value={formData.bio} onChange={handleChange} />
          <input name="profilePic" placeholder="Profile Pic URL" value={formData.profilePic} onChange={handleChange} />
          <input name="skills" placeholder="Skills (comma separated)" value={formData.skills} onChange={handleChange} />
          <input name="linkedin" placeholder="LinkedIn URL" value={formData.linkedin} onChange={handleChange} />
          <input name="github" placeholder="GitHub URL" value={formData.github} onChange={handleChange} />
          <button onClick={handleSave}>Save</button>
        </div>
      )}

    </div>
  );
}

export default App;
