import { useEffect, useRef } from "react";
import playground from "../../../public/images/playground.svg";
import program from "../../../public/images/program.webp";


const programs = [
  {
    num: "01",
    icon: (
      <img
      loading="lazy"
        src={playground}
        alt="Icon"
        className="w-9 h-9 object-cover"
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
      loading="lazy"
        src={playground}
        alt="Icon"
         className="w-9 h-9 object-cover"
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
      loading="lazy"
        src={playground}
        alt="Icon"
         className="w-9 h-9 object-cover"
      />
    ),
    title: "UX Consulting Services",
    subtitle: "Transform ideas into user satisfaction.",
    reverse: false,
  },
];





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
        <div className="flex flex-col lg:flex-row  justify-center  items-center gap-6 md:gap-10 sm:gap-8 lg:gap-12 ">
          {/* Left */}
          <div className="pv-left">
            <h2 className="pv-heading ">Program Variations</h2>

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
                    <p className="pv-card-title md:text-lg text-sm">{p.title}</p>
                    <p className="pv-card-sub md:text-sm text-xs">{p.subtitle}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Right — Photo collage */}
          <div className="pv-right" ref={rightRef}>
        <img 
        loading="lazy"
        src={program} className="w-full h-full object-cover" alt="UX design courses" />
          </div>
        </div>
      </section>
    </>
  );
}

export default ProgramVariations
