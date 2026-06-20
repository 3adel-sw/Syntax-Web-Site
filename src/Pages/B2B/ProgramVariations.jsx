
import { useEffect, useRef, useState} from "react";
import program from "../../../public/images/program.webp";
import { getB2bPrograms } from "../../services/b2b/b2bService";
import { useTranslation } from "react-i18next";









const ProgramVariations = () => {
  const { t } = useTranslation();
 
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

 
  const itemRefs = useRef([]);
  const rightRef = useRef(null);


  useEffect(() => {
    getB2bPrograms()
      .then((res) => setPrograms(res.data.b2b_programs || []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    // intersection observer
  }, []);

 
  if (loading) return null;
  return (
    <>
      <section className="pv-section">
        <div className="flex flex-col lg:flex-row  justify-center  items-center gap-6 md:gap-10 sm:gap-8 lg:gap-12 ">
          {/* Left */}
          <div className="pv-left">
            <h2 className="pv-heading ">{t("b2b.programVariations")}</h2>

          {programs.map((p, i) => (
  <div
    key={p.id}
    className="pv-item"
    ref={(el) => (itemRefs.current[i] = el)}
    style={{ flexDirection: i % 2 !== 0 ? "row-reverse" : "row" }}
  >
    <span className="pv-num">{String(i + 1).padStart(2, "0")}</span>
    <div className="pv-card">
      <div className="pv-icon-wrap p-2  overflow-hidden">
        <img loading="lazy" src={p.image} alt={p.title} className="w-18 h-12 object-contain" />
      </div>
      <div>
        <p className="pv-card-title md:text-lg text-sm">{p.title}</p>
        <p className="pv-card-sub md:text-sm text-xs">{p.description}</p>
      </div>
    </div>
  </div>
))}
          </div>
          {/* Right — Photo collage */}
          <div className="pv-right" ref={rightRef}>
        <img 
        loading="lazy"
        src={program} className="w-full h-full object-cover" alt={t("b2b.uxDesignCoursesAlt")} />
          </div>
        </div>
      </section>
    </>
  );
}

export default ProgramVariations
