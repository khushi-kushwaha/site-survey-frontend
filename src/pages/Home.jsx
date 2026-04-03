import React from "react";
import { useNavigate } from "react-router-dom";

const milestoneData = [
  {
    title: "Milestone 1 · Core Setup & Foundations",
    weeks: "Weeks 1–2",
    items: [
      "Project setup, CI/CD, and branching strategy",
      "Spring Boot backend skeleton with MySQL",
      "JWT authentication, React + Tailwind scaffolding",
      "Organization and user management modules",
    ],
  },
  {
    title: "Milestone 2 · Floor Plan & Data Import",
    weeks: "Weeks 3–4",
    items: [
      "Floor plan upload from web and mobile",
      "File service integration with S3/MinIO",
      "Bulk CSV/XLSX import with validation",
      "Campus/building/floor hierarchy and import preview flow",
    ],
  },
  {
    title: "Milestone 3 · Labeling, Checklists & Data Capture",
    weeks: "Weeks 5–6",
    items: [
      "Canvas labeling for floor plan spaces",
      "Checklist template creation and response capture",
      "Offline-first sync in mobile flow",
      "Autosave, drafts, and attachment-enabled APIs",
    ],
  },
  {
    title: "Milestone 4 · Reporting, RF Integration & Finalization",
    weeks: "Weeks 7–8",
    items: [
      "PDF report generation and summary dashboards",
      "RF integrations (Vistumbler, Kismet, SPLAT!)",
      "Audit logs, role-based permissions, and E2E validation",
      "UAT, staging deployment, release notes",
    ],
  },
];

const captureDataPoints = [
  "Space availability for routers, cabinets, and antennas",
  "Power source readiness and backup constraints",
  "Cooling/heating conditions for hardware safety",
  "Accessibility for installation and maintenance",
  "Building and cable-routing layout",
  "Wi-Fi and radio signal strength zones",
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-blue-600 to-slate-900 text-white px-4 sm:px-8 md:px-16 py-6 md:py-8">
      <header className="flex justify-between items-center py-3">
        <h1 className="text-base sm:text-lg font-semibold tracking-wide">SITE SURVEY TOOL</h1>

        <div className="flex gap-3 sm:gap-6 text-xs sm:text-sm">
          <button
            className="border border-white/80 px-3 sm:px-4 py-1 rounded-full hover:bg-white hover:text-blue-700 transition"
            onClick={() => navigate("/register")}
          >
            Register
          </button>

          <button
            className="border border-white/80 px-3 sm:px-4 py-1 rounded-full hover:bg-white hover:text-blue-700 transition"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
      </header>

      <section className="grid md:grid-cols-2 gap-8 md:gap-12 items-center py-8 md:py-12">
        <div className="space-y-5 text-center md:text-left">
          <p className="text-xs uppercase tracking-[0.2em] text-blue-100">ISP Network Planning Platform</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            Planner&apos;s Notebook, Map, and Calculator in One Place
          </h2>
          <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
            This platform helps ISP field teams survey apartment complexes, office buildings,
            campuses, and public areas before network rollout. Capture key site data,
            validate readiness, and move from survey to deployment with fewer blind spots.
          </p>
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            <span className="text-xs sm:text-sm bg-white/15 rounded-full px-3 py-1">React + Tailwind</span>
            <span className="text-xs sm:text-sm bg-white/15 rounded-full px-3 py-1">Spring Boot + MySQL</span>
            <span className="text-xs sm:text-sm bg-white/15 rounded-full px-3 py-1">JWT Auth + API Integrations</span>
          </div>
        </div>

        <div className="w-full flex justify-center md:justify-end">
          <img
            src="https://thecssolutions.com/wp-content/uploads/2020/07/Support.png"
            alt="Site survey planning"
            className="w-[280px] sm:w-[340px] md:w-[430px] lg:w-[500px] max-w-full drop-shadow-2xl"
          />
        </div>
      </section>

      <section className="py-3">
        <h3 className="text-xl sm:text-2xl font-semibold mb-4">What the Survey Captures</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {captureDataPoints.map((point) => (
            <div key={point} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-sm">
              {point}
            </div>
          ))}
        </div>
      </section>

      <section className="py-8">
        <h3 className="text-xl sm:text-2xl font-semibold mb-4">8-Week Delivery Roadmap</h3>
        <div className="grid xl:grid-cols-2 gap-4">
          {milestoneData.map((milestone) => (
            <article key={milestone.title} className="rounded-2xl border border-white/20 bg-white/10 p-5">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <h4 className="font-semibold text-base sm:text-lg">{milestone.title}</h4>
                <span className="text-xs sm:text-sm px-2 py-1 rounded-full bg-white/20">{milestone.weeks}</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-sm text-blue-50">
                {milestone.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
