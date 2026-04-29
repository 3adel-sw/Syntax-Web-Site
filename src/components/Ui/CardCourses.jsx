  import { useState, useRef, useEffect } from 'react';
  import { useNavigate } from 'react-router';
  import { Clock, BookOpen } from 'lucide-react';
  import Video from '../../assets/12345.mp4';
  // import CardCouses from '../../assets/CourseCard.svg';

  const courses = [
    {
      id: 1,
      tag: "UX DESIGN",
      title: "UX/UI Design Master Course",
      level: "Beginner",
      duration: "20 sessions",
      video: Video,
    },
    {
      id: 2,
      tag: "ONLINE WORKSHOP",
      title: "Advanced UX Workshop",
      level: "Intermediate",
      duration: "10 hours",
      bg: "#F8F8F8", 
      video: Video,
    },
    {
      id: 3,
      tag: "OFFLINE MEETUP",
      title: "Design Community Meetup",
      level: "All Levels",
      duration: "3 hours",
    bg: "#F8F8F8", 
      video: Video,
    },
    {
      id: 4,
      tag: "MEGA EVENT",
      title: "Annual Design Summit",
      level: "All Levels",
      duration: "2 days",
     bg: "#F8F8F8", 
      video: Video,
    },
    {
      id: 5,
      tag: "UX DESIGN",
      title: "UI Design Fundamentals",
      level: "Beginner",
      duration: "15 hours",
      bg: "#F8F8F8", 
      video: Video,
    },
    {
      id: 6,
      tag: "ONLINE WORKSHOP",
      title: "Figma Masterclass",
      level: "Intermediate",
      duration: "8 hours",
      bg: "#F8F8F8", 
      video: Video,
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
        className="bg-white rounded-3xl border  h-[26rem] border-gray-200 p-2  overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-300 cursor-pointer"
      >
        {/* Thumbnail / Video */}
        <div className={`${course.bg} h-68 flex items-center rounded-3xl justify-center relative overflow-hidden`}>
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
        
          <span className="inline-block bg-[#EDEEF9] text-primary text-[11px] font-semibold tracking-wider px-3 py-1 rounded-md mb-3">
            {course.tag}
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

    const [currentSlide, setCurrentSlide] = useState(0);
    const [translateX, setTranslateX] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const touchStartRef = useRef(0);
    const translateXRef = useRef(0);
    const containerRef = useRef(null);

    const handleTouchStart = (e) => {
      touchStartRef.current = e.touches[0].clientX;
      setIsDragging(true);
      translateXRef.current = -currentSlide * 100;
      setTranslateX(-currentSlide * 100);
    };

    const handleTouchMove = (e) => {
      if (!isDragging) return;
      const currentTouch = e.touches[0].clientX;
      const diff = currentTouch - touchStartRef.current;
      const containerWidth = containerRef.current?.offsetWidth || 300;
      const diffPercent = (diff / containerWidth) * 100;
      const newX = translateXRef.current + diffPercent;
      translateXRef.current = newX;
      setTranslateX(newX);
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
      const slideIndex = Math.round(-translateXRef.current / 100);
      const boundedIndex = Math.max(0, Math.min(displayedCourses.length - 1, slideIndex));
      setCurrentSlide(boundedIndex);
      translateXRef.current = -boundedIndex * 100;
      setTranslateX(-boundedIndex * 100);
    };

    useEffect(() => {
      if (!isDragging) {
        translateXRef.current = -currentSlide * 100;
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setTranslateX(-currentSlide * 100);
      }
    }, [currentSlide, isDragging]);

    return (
      <>
        {/* Mobile Slider */}
        <div className="md:hidden mt-8 my-8">
          <div
            ref={containerRef}
            className="overflow-hidden rounded-lg"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex"
              style={{
                transform: `translateX(${translateX}%)`,
                transition: isDragging ? 'none' : 'transform 0.3s ease-in-out'
              }}
            >
              {displayedCourses.map((course) => (
                <div key={course.id} className="min-w-full flex-shrink-1 px-2">
                  <CourseCard course={course} navigate={navigate} />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-4">
            {displayedCourses.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentSlide ? 'bg-primary w-6' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-8">
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