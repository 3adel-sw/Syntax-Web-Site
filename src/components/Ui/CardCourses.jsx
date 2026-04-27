  import { useState, useRef } from 'react';
  import { useNavigate } from 'react-router';
  import { Clock, BookOpen } from 'lucide-react';
  import Video from '../../assets/12345.mp4';

  const courses = [
    {
      id: 1,
      tag: "UX DESIGN",
      title: "UX/UI Design Master Course",
      level: "Beginner",
      duration: "20 sessions",
      bg: "bg-indigo-50",
      video: Video,
    },
    {
      id: 2,
      tag: "ONLINE WORKSHOP",
      title: "Advanced UX Workshop",
      level: "Intermediate",
      duration: "10 hours",
      bg: "bg-green-50",
      video: null,
    },
    {
      id: 3,
      tag: "OFFLINE MEETUP",
      title: "Design Community Meetup",
      level: "All Levels",
      duration: "3 hours",
      bg: "bg-orange-50",
      video: null,
    },
    {
      id: 4,
      tag: "MEGA EVENT",
      title: "Annual Design Summit",
      level: "All Levels",
      duration: "2 days",
      bg: "bg-purple-50",
      video: null,
    },
    {
      id: 5,
      tag: "UX DESIGN",
      title: "UI Design Fundamentals",
      level: "Beginner",
      duration: "15 hours",
      bg: "bg-blue-50",
      video: null,
    },
    {
      id: 6,
      tag: "ONLINE WORKSHOP",
      title: "Figma Masterclass",
      level: "Intermediate",
      duration: "8 hours",
      bg: "bg-teal-50",
      video: null,
    },
  ];

  const CourseCard = ({ course, navigate }) => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const handleClick = () => {
      if (course.video && videoRef.current) {
        if (isPlaying) {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
          setIsPlaying(false);
        } else {
          videoRef.current.play();
          setIsPlaying(true);
        }
      } else {
        navigate(`/courses/${course.id}`);
      }
    };

    return (
      <div
        onClick={handleClick} 
        className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-300 cursor-pointer"
      >
        {/* Thumbnail / Video */}
        <div className={`${course.bg} h-44 flex items-center justify-center relative overflow-hidden`}>
          {course.video ? (
            <>
              <video
                ref={videoRef}
                src={course.video}
                className="w-full h-full object-cover"
                muted
                loop
                onMouseEnter={e => e.target.play()}
                onMouseLeave={e => { e.target.pause(); e.target.currentTime = 0; setIsPlaying(false); }}
              />
              {/* Play / Pause overlay */}
              <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isPlaying ? 'opacity-0' : 'opacity-100'}`}>
                <div className="w-11 h-11 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <polygon points="4,2 14,8 4,14" fill="#4a6cf7" />
                  </svg>
                </div>
              </div>
            </>
          ) : (
            <div className="w-11 h-11 bg-white/80 rounded-full flex items-center justify-center shadow-md">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <polygon points="4,2 14,8 4,14" fill="#4a6cf7" />
              </svg>
            </div>
          )}
        </div>

        {/* Body */}
       <div 
       
       className="p-4 text-left">
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

  const CardCourses = ({ activeCategory, limit, showButton, ButtonContent }) => {
    const navigate = useNavigate();
    const categoryMap = {
      "Online Workshop": "ONLINE WORKSHOP",
      "Offline Meetup": "OFFLINE MEETUP",
      "Mega Event": "MEGA EVENT",
    };

    const mappedCategory = categoryMap[activeCategory];
    const filteredCourses = activeCategory === "All Events" || !activeCategory
      ? courses
      : courses.filter(course => course.tag === mappedCategory);

    const displayedCourses = limit ? filteredCourses.slice(0, limit) : filteredCourses;

    return (
      <>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-8">
          {displayedCourses.map(course => (
            <CourseCard key={course.id} course={course} navigate={navigate} />
          ))}
        </div>
        {showButton && limit && filteredCourses.length > limit && (
          <div className="mt-10">
            <button
              onClick={() => navigate('/courses')}
              className="px-6 py-2.5 flex gap-2 mx-auto bg-primary text-white rounded-xl shadow-md hover:bg-primary/90 transition"
            >
              {ButtonContent || 'Show All Courses'}
              <svg className="animate-spin" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12a9 9 0 11-6.219-8.56" />
              </svg>
            </button>
          </div>
        )}
      </>
    );
  };

  export default CardCourses;