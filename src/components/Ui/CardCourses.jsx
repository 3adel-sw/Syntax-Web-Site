import { Clock, BookOpen } from 'lucide-react';

const courses = [
  {
    id: 1,
    tag: "UX DESIGN",
    title: "UX/UI Design Master Course",
    level: "Beginner",
    duration: "20 sessions",
    bg: "bg-indigo-50",
    video: null, // ضع رابط الفيديو هنا
  },
  {
    id: 2,
    tag: "UX DESIGN",
    title: "UX Design Foundation",
    level: "Beginner",
    duration: "15 hours",
    bg: "bg-green-50",
    video: null,
  },
  {
    id: 3,
    tag: "UX DESIGN",
    title: "UX Design Foundation",
    level: "Beginner",
    duration: "15 hours",
    bg: "bg-orange-50",
    video: null,
  },
];

const CourseCard = ({ course }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-300 cursor-pointer">
      
      {/* Thumbnail / Video */}
      <div className={`${course.bg} h-44 flex items-center justify-center relative overflow-hidden`}>
        {course.video ? (
          <>
            <video
              src={course.video}
              className="w-full h-full object-cover"
              muted
              onMouseEnter={e => e.target.play()}
              onMouseLeave={e => { e.target.pause(); e.target.currentTime = 0; }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-11 h-11 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <polygon points="4,2 14,8 4,14" fill="#4a6cf7" />
                </svg>
              </div>
            </div>
          </>
        ) : (
          // Placeholder   
          <div className="w-11 h-11 bg-white/80 rounded-full flex items-center justify-center shadow-md">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <polygon points="4,2 14,8 4,14" fill="#4a6cf7" />
            </svg>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-4 text-left">
        <span className="inline-block bg-indigo-50 text-indigo-600 text-[10px] font-semibold tracking-wider px-3 py-1 rounded-full mb-3">
          {course.tag}
        </span>
        <h3 className="text-[15px] font-bold text-gray-900 mb-2 leading-snug">
          {course.title}
        </h3>
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <BookOpen size={11} />
            {course.level}
          </span>
          <span className="w-1 h-1 bg-gray-300 rounded-full" />
          <span className="flex items-center gap-1">
            <Clock size={11} />
            {course.duration}
          </span>
        </div>
      </div>
    </div>
  );
};

const CardCourses = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-8">
      {courses.map(course => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
};

export default CardCourses;