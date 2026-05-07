import { useState, useEffect } from "react";
import { FaArrowLeft ,FaArrowRight } from "react-icons/fa6";

import profilepictureMeet from "../../../public/images/profilepictureMeet.webp"
// Mock Data For API
const teamMembers = [
  { id: 1, name: "Adel Taher", role: "Lead Product Designer", image: profilepictureMeet },
  { id: 2, name: "Ayman Taher", role: "Lead Product Designer", image: profilepictureMeet },
  { id: 3, name: "Mohamed Taher", role: "Lead Product Designer", image: profilepictureMeet },
  { id: 4, name: "Khaled Taher", role: "Lead Product Designer", image: profilepictureMeet },
  { id: 5, name: "Ali Taher", role: "Lead Product Designer", image: profilepictureMeet },
  { id: 6, name: "Ahmed Taher", role: "Lead Product Designer", image: profilepictureMeet },
  { id: 7, name: "Hossam Taher", role: "Lead Product Designer", image: profilepictureMeet },
  { id: 8, name: "Omar Taher", role: "Lead Product Designer", image: profilepictureMeet },
  { id: 9, name: "Ayman Taher", role: "Lead Product Designer", image: profilepictureMeet },
  { id: 10, name: "Ayman ", role: "Lead Product Designer", image: profilepictureMeet },
];

const getVisibleCount = () => {
  const w = window.innerWidth;
  if (w < 640) return 1;        // mobile
  if (w < 768) return 2;        // sm
  if (w < 1024) return 3;       // md
  if (w < 1280) return 4;       // lg
  if (w < 1500) return 5;       // xl
  return 5;                     // xxl
};



const MeetTeam = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(getVisibleCount);

  useEffect(() => {
    const handleResize = () => {
      setVisibleCount(getVisibleCount());
      setStartIndex(0); 
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

   const canPrev = startIndex > 0;
  const canNext = startIndex + visibleCount < teamMembers.length;

  const handlePrev = () => { if (canPrev) setStartIndex((i) => i - 1); };
  const handleNext = () => { if (canNext) setStartIndex((i) => i + 1); };

  const visibleMembers = teamMembers.slice(startIndex, startIndex + visibleCount);


//    useEffect(() => {
//     const fetchTeam = async () => {
//       try {
//         const res = await fetch("https://your-api.com/api/team");
//         const data = await res.json();
//         setTeamMembers(data); // عدّل حسب شكل الـ response
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchTeam();
//   }, []);






  return (
    <section className="w-full my-12 md:my-25 ">
      {/* Gradient Card */}
      <div
        className="rounded-3xl p-6 sm:p-10 md:p-16  flex flex-col items-center gap-8"
        style={{
          background: "linear-gradient(182deg, #EFE0F7 1.4%, rgba(241, 242, 242, 0.44) 54.02%, #D4EBFC 98.85%)",
        }}
      >
        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl md:text-5xl font-semibold text-gray-900 mb-4">
            Meet the Team behinds Syntax
          </h2>
          <p className="text-base  text-gray-500">
            Seamlessly collaborate with your team members like never before.
          </p>
        </div>

        {/* Cards Row */}
        <div className="flex gap-4 overflow-hidden w-full justify-center">
          {visibleMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-2xl md:min-w-[200px] md:max-w-[220px] sm:min-w-[240px] sm:max-w-[270px] min-w-[320px] max-w-[340px] p-3 flex flex-col items-center gap-2 shadow-sm  "
              
            >
              {/* Photo */}
              <div className="w-full md:w-[176px] h-full md:h-[222px] aspect-square rounded-xl overflow-hidden ">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.parentNode.style.background = "#c8d8e8";
                  }}
                />
              </div>
              {/* Info */}
              <div className="text-center">
                <p className="text-xl md:text-lg font-bold text-gray-900">{member.name}</p>
                <p className="text-sm md:text-xs text-gray-400">{member.role}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <div className="flex gap-3">
          <button
            onClick={handlePrev}
            disabled={!canPrev}
            className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all
              ${canPrev
                ? "border-gray-400 text-gray-700 hover:bg-white hover:shadow"
                : "border-gray-300 text-gray-300 cursor-not-allowed"
              }`}
          >
            <FaArrowLeft size={18} />
          </button>
          <button
            onClick={handleNext}
            disabled={!canNext}
            className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all
              ${canNext
                ? "border-gray-400 text-gray-700 hover:bg-white hover:shadow"
                : "border-gray-300 text-gray-300 cursor-not-allowed"
              }`}
          >
            <FaArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default MeetTeam;