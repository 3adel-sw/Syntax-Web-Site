import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Clock, BookOpen } from 'lucide-react';
import { LuLoaderCircle } from "react-icons/lu";
import { getAllCourses } from '../../services/courses/coursesService';
import { useTranslation } from 'react-i18next';

// ── Course Card
const CourseCard = ({ course, navigate }) => {
  const courseId = course.id || course._id || course.slug;
  
  const toStr = (val) => {
    if (!val) return '';
    if (typeof val === 'object') return val?.name || val?.title || '';
    return val;
  };

  return (
    <div
     onClick={() => navigate(`/courses-detail/${courseId}`)}
     className="bg-white rounded-2xl border h-fil border-gray-200 p-2 overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-300 cursor-pointer"
  >
      <div className="h-68 flex items-center rounded-2xl justify-center relative overflow-hidden bg-gray-100">
      
        {course.image || course.img ? (
          <img
            loading="lazy"
            src={course.image || course.img}
            className="w-full h-full object-cover"
            alt={toStr(course.title || course.name || course.course_name)}
          />
        ) : (
          <div className="w-full h-full bg-gray-200 rounded-2xl" />
        )}
      </div>

      <div className="p-4 text-start">
       <span className="inline-block bg-[#EDEEF9] text-primary text-[11px] font-semibold tracking-wider px-3 py-1 rounded-md mb-3">
          {toStr(course.tag) || toStr(course.category) || toStr(course.type)}
        </span>
        <h3 className="text-[19px] font-bold text-gray-900 mb-2 leading-snug">
          
  {toStr(course.title || course.name || course.course_name || course.slug || course.course_title || "No title")}
</h3>
         <div className="flex items-center gap-3 text-sm my-4 text-gray-500">
        <span className="flex items-center gap-1">
            <BookOpen size={18} />
            {toStr(course.level)}
          </span>
          <span className="w-1 h-1 bg-gray-300 rounded-full" />
        <span className="flex items-center gap-1">
            <Clock size={18} />
           {toStr(course.duration) || toStr(course.hours)}
          </span>
        </div>
      </div>
    </div>
  );
};

// ── Main Component ───────────────────────────────────────
const CardCourses = ({ data, activeCategory, activeCategoryName, limit, showButton, ButtonContent }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const normalizeArray = (input) => {
    if (Array.isArray(input)) return input;
    if (input && typeof input === 'object') {
      return input.courses || input.data?.courses || input.data || input.latest_courses || [];
    }
    return [];
  };

  const [courses, setCourses]   = useState(normalizeArray(data));
  const [loading, setLoading]   = useState(!data);
  const [error, setError]       = useState(null);

  // ── Fetch all courses once (only if no data prop) ──
  useEffect(() => {
    if (data) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCourses(normalizeArray(data));
      setLoading(false);
      return;
    }
    const fetchCourses = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await getAllCourses();
        setCourses(res?.courses ?? res?.data?.courses ?? []);
      } catch (err) {
        setError(t('messages.failedToLoad'));
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [data, t]);

  // ── Client-side filter by category ID or name ──
  const isAll = activeCategory === null || activeCategory === undefined || activeCategory === 'All Courses';
  const filteredCourses = isAll
    ? courses
    : courses.filter(course => {
        // Try matching by numeric category ID
        const catId = course.category?.id ?? course.category_id;
        if (catId !== null && catId !== undefined) {
          if (Number(catId) === Number(activeCategory)) return true;
        }
        // Fallback: match by category name (string)
        const catName = typeof course.category === 'string'
          ? course.category
          : course.category?.name || course.category_name;
        return catName && activeCategoryName && catName.toLowerCase() === activeCategoryName.toLowerCase();
      });

  const displayedCourses = limit ? filteredCourses.slice(0, limit) : filteredCourses;

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
    <div className="text-center text-gray-400 py-12">{t('common.notFound')}</div>
  );

  return (
    <>
      <div className="md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-8">
        {displayedCourses.map((course, index) => (
  <CourseCard 
    key={course.slug || index} 
    course={course} 
    navigate={navigate} 
  />
))}
      </div>

      {showButton && limit && (
        <div className="mt-10">
          <button
            onClick={() => navigate('/courses')}
            className="px-6 py-2.5 flex gap-2 mx-auto bg-primary text-white rounded-xl shadow-md hover:bg-primary/90 transition"
          >
            {ButtonContent || t('courses.showAllCourses')}
            <LuLoaderCircle size={22} />
          </button>
        </div>
      )}

    </>
  );
};

export default CardCourses;
