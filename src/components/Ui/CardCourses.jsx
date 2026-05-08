import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { Clock, BookOpen } from 'lucide-react';
import { LuLoaderCircle } from "react-icons/lu";
import { getAllCourses, getCoursesByCategory } from '../../services/courses/coursesService';

// ── Course Card ──────────────────────────────────────────
const CourseCard = ({ course, navigate }) => (
  <div
    onClick={() => navigate(`/courses-detail/${course.id}`)}
    className="bg-white rounded-2xl border h-[26rem] border-gray-200 p-2 overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-300 cursor-pointer"
  >
    <div className="h-68 flex items-center rounded-2xl justify-center relative overflow-hidden bg-gray-100">
      {course.image || course.img ? (
        <img
          loading="eager"
          src={course.image || course.img}
          className="w-full h-full object-cover"
          alt={course.title}
        />
      ) : (
        <div className="w-full h-full bg-gray-200 rounded-2xl" />
      )}
    </div>

    <div className="p-4 text-left">
      <span className="inline-block bg-[#EDEEF9] text-primary text-[11px] font-semibold tracking-wider px-3 py-1 rounded-md mb-3">
        {course.tag || course.category || course.type}
      </span>
      <h3 className="text-[19px] font-bold text-gray-900 mb-2 leading-snug">
        {course.title}
      </h3>
      <div className="flex items-center gap-3 text-sm my-4 text-gray-500">
        <span className="flex items-center gap-1">
          <BookOpen size={18} />
          {course.level}
        </span>
        <span className="w-1 h-1 bg-gray-300 rounded-full" />
        <span className="flex items-center gap-1">
          <Clock size={18} />
          {course.duration}
        </span>
      </div>
    </div>
  </div>
);

// ── Main Component ───────────────────────────────────────
const CardCourses = ({ activeCategory, limit, showButton, ButtonContent }) => {
  const navigate = useNavigate();

  const [courses, setCourses]   = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  // ── Fetch from API ──
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        setError(null);

        let res;
        if (activeCategory && activeCategory !== 'All Courses') {
          res = await getCoursesByCategory(activeCategory);
        } else {
          res = await getAllCourses();
        }

        // الـ API بيرجع { status, SNum, msg, courses: [...] }
        setCourses(res.data?.courses || []);
      } catch (err) {
        setError('Failed to load courses');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [activeCategory]); // بيتعمل re-fetch لما الـ tab يتغير

  const displayedCourses = limit ? courses.slice(0, limit) : courses;

  // ── Loading ──
  if (loading) return (
    <div className="flex justify-center items-center h-48">
      <LuLoaderCircle size={36} className="animate-spin text-primary" />
    </div>
  );

  // ── Error ──
  if (error) return (
    <div className="text-center text-red-500 py-12">{error}</div>
  );

  // ── Empty ──
  if (displayedCourses.length === 0) return (
    <div className="text-center text-gray-400 py-12">No courses found.</div>
  );

  return (
    <>
      {/* Desktop Grid */}
      <div className="md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-8">
        {displayedCourses.map(course => (
          <CourseCard key={course.id} course={course} navigate={navigate} />
        ))}
      </div>

      {showButton && limit && courses.length > limit && (
        <div className="mt-10">
          <button
            onClick={() => navigate('/courses')}
            className="px-6 py-2.5 flex gap-2 mx-auto bg-primary text-white rounded-xl shadow-md hover:bg-primary/90 transition"
          >
            {ButtonContent || 'Show All Courses'}
            <LuLoaderCircle size={22} />
          </button>
        </div>
      )}
    </>
  );
};

export default CardCourses;