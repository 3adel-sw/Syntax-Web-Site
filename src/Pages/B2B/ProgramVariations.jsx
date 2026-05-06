import { useEffect, useRef } from "react";
import playground from "../../../public/images/playground.svg";

const programs = [
  {
    num: "01",
    icon: (
      <img
        src={playground}
        alt="Icon"
        className="w-full h-full object-cover"
      />
    ),
    title: "Full-day UX workshops",
    subtitle: "User-centered design process training.",
    reverse: false,
  },
  {
    num: "02",
    icon: (
      <img
        src={playground}
        alt="Icon"
        className="w-full h-full object-cover"
      />
    ),
    title: "In-depth Training Courses",
    subtitle: "Comprehensive UX skills development.",
    reverse: true,
  },
  {
    num: "03",
    icon: (
      <img
        src={playground}
        alt="Icon"
        className="w-full h-full object-cover"
      />
    ),
    title: "UX Consulting Services",
    subtitle: "Transform ideas into user satisfaction.",
    reverse: false,
  },
];

const avatarColors = [
  { bg: "#DBEAFE", color: "#1E40AF" },
  { bg: "#D1FAE5", color: "#065F46" },
  { bg: "#EDE9FE", color: "#5B21B6" },
];

const avatarInitials = ["A", "B", "C"];



const  ProgramVariations = () => {
  const itemRefs = useRef([]);
  const rightRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15 }
    );

    itemRefs.current.forEach((el, i) => {
      if (el) {
        el.style.transitionDelay = `${i * 0.1}s`;
        observer.observe(el);
      }
    });

    if (rightRef.current) observer.observe(rightRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section className="pv-section">
        <div className="pv-container">
          {/* Left */}
          <div className="pv-left">
            <h2 className="pv-heading">Program Variations</h2>

            {programs.map((p, i) => (
              <div
                key={i}
                className="pv-item"
                ref={(el) => (itemRefs.current[i] = el)}
                style={{ flexDirection: p.reverse ? "row-reverse" : "row" }}
              >
                <span className="pv-num">{p.num}</span>
                <div className="pv-card">
                  <div className="pv-icon-wrap">{p.icon}</div>
                  <div>
                    <p className="pv-card-title">{p.title}</p>
                    <p className="pv-card-sub">{p.subtitle}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right — Photo collage */}
          <div className="pv-right" ref={rightRef}>
            {/* Tall left photo */}
            <div className="pv-photo" style={{ background: "linear-gradient(145deg, #BFDBFE, #93C5FD)" }}>
              <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.2" strokeLinecap="round">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
              </svg>
            </div>

            {/* Right column */}
            <div className="pv-col">
              <div className="pv-photo-sm" style={{ background: "linear-gradient(145deg, #A7F3D0, #6EE7B7)" }}>
                <div className="pv-photo-placeholder">
                  <sv   g width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.2" strokeLinecap="round">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                  </sv>
                </div>
              </div>

              <div className="pv-photo-lg" style={{ background: "linear-gradient(145deg, #DDD6FE, #C4B5FD)" }}>
                <div className="pv-photo-placeholder">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.2" strokeLinecap="round">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                  </svg>
                </div>

                {/* Badge */}
                <div className="pv-badge">
                  <div className="pv-avatars">
                    {avatarInitials.map((init, i) => (
                      <div
                        key={i}
                        className="pv-avatar"
                        style={{ background: avatarColors[i].bg, color: avatarColors[i].color }}
                      >
                        {init}
                      </div>
                    ))}
                  </div>
                  <div className="pv-badge-text">
                    <span className="pv-badge-count">10K+ </span>
                    <span className="pv-badge-label">Attendees</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ProgramVariations
