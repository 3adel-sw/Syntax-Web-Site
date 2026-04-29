/* eslint-disable react-hooks/set-state-in-effect */
import { ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router';
// import  Video  from '../../assets/12345.mp4';
//import  Test  from '../../assets/test.jpg';
import  BlogCardImage  from '../../assets/blogC.jpg';
import { useRef, useState, useEffect } from 'react';


const blogs = [
  {
    id: 1,
    category: "UX Design",
    date: "26 May 2024",
    title: "The Psychology Behind UX Design",
    excerpt: "Understanding user behavior is key to creating effective designs. Dive into the psychology behind UX and ...",
    thumb: BlogCardImage,
  },
  {
    id: 2,
    category: "UI Design",
    date: "26 May 2024",
    title: "The Psychology Behind UX Design",
    excerpt: "Understanding user behavior is key to creating effective designs. Dive into the psychology behind UX and ...",
    thumb: BlogCardImage,
  },
  {
    id: 3,
    category: "Soft Skills",
    date: "26 May 2024",
    title: "The Psychology Behind UX Design",
    excerpt: "Understanding user behavior is key to creating effective designs. Dive into the psychology behind UX and ...",
    thumb: BlogCardImage,
  },
  {
    id: 4,
    category: "Personal Branding",
    date: "26 May 2024",
    title: "The Psychology Behind UX Design",
    excerpt: "Understanding user behavior is key to creating effective designs. Dive into the psychology behind UX and ...",
    thumb: BlogCardImage,
  },
  {
    id: 5,
    category: "Graphic Design",
    date: "26 May 2024",
    title: "The Psychology Behind UX Design",
    excerpt: "Understanding user behavior is key to creating effective designs. Dive into the psychology behind UX and ...",
    thumb: BlogCardImage,
  },
];

const BlogCard = ({ id, category, date, title, excerpt, thumb }) => {
  const navigate = useNavigate();



  const handleCardClick = () => {
    navigate(`/blogs/${id}`);
    // if (thumb) {
    //   const blogUrl = `/blogs/${id}`;

    //   window.open(blogUrl, '_blank'); // Open in new tab
    // }
  };

  return (
    <div
      onClick={handleCardClick}
     className="bg-white rounded-2xl border  h-[26rem] border-gray-200 p-3  overflow-hidden hover:-translate-y-1 hover:shadow-xl  cursor-pointer"
      >
      <div className="h-62 flex items-center rounded-2xl justify-center relative overflow-hidden">
        { thumb ? (
          <img
            src={thumb}
            alt={title}
            className="w-full h-full object-cover  group-hover:scale-105 transition-transform "
          />
        ) : (
          <div className="w-full h-full bg-gray-800 flex items-center justify-center">
            <div className="text-gray-600 text-4xl">▶</div>
          </div>
        )}

        {/*Pause overlay */}
        {( thumb) && (
          <div className={`absolute inset-0 flex items-center justify-center  duration-300 `}>
            <div className=" rounded-full flex items-center justify-center shadow-lg">
             
            </div>
          </div>
        )}
      </div>

      {/* Body   */}
      <div className="p-4 text-left">
        <h3 className="text-[19px] font-bold text-gray-900 mb-2 leading-snug group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-[14px]  text-gray-500 leading-relaxed mb-4 line-clamp-2">
          {excerpt}
        </p>
        <div className="flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <span className="text-gray-400 font-medium text-base">{category}</span>
            <span className="w-1 h-1 bg-gray-300 rounded-full" />
            <span className="text-gray-400 font-medium text-base">{date}</span>
          </div>
          <div className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-colors">
            <ArrowUpRight size={13} className="text-gray-400 group-hover:text-white transition-colors" />
          </div>
        </div>
      </div>
    </div>
  );
};
const CardBlog = ({ activeCategory, limit, showButton, ButtonContent }) => {
  const navigate = useNavigate();
  const categoryMap = {
    "UI Design": "UI Design",
    "UX Principles": "UX Design",
    "Soft skills": "Soft Skills",
    "Personal Branding": "Personal Branding",
    "Graphic Design": "Graphic Design",
  };

  const mappedCategory = categoryMap[activeCategory];
  const filteredBlogs = activeCategory === "All Blogs"
    ? blogs
    : blogs.filter(blog => blog.category === mappedCategory);

  const displayedBlogs = limit ? filteredBlogs.slice(0, limit) : filteredBlogs;

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
    const boundedIndex = Math.max(0, Math.min(displayedBlogs.length - 1, slideIndex));
    setCurrentSlide(boundedIndex);
    translateXRef.current = -boundedIndex * 100;
    setTranslateX(-boundedIndex * 100);
  };

  useEffect(() => {
    if (!isDragging) {
      translateXRef.current = -currentSlide * 100;
      setTranslateX(-currentSlide * 100);
    }
  }, [currentSlide, isDragging]);

  return (
    <>
      {/* Mobile Slider */}
      <div className="md:hidden mt-8">
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
            {displayedBlogs.map((blog) => (
              <div key={blog.id} className="min-w-full flex-shrink-1 px-2">
                <BlogCard {...blog} />
              </div>
            ))}
          </div>
        </div>

    
      </div>

      {/* Desktop Grid */}
      <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-8">
        {displayedBlogs.map(blog => (
          <BlogCard key={blog.id} {...blog} />
        ))}
      </div>
      {showButton && limit && filteredBlogs.length > limit && (
        <div className="mt-10">
          <button
            onClick={() => navigate('/blogs')}
            className="px-6 py-2.5 flex gap-2 mx-auto bg-primary text-white rounded-xl shadow-md hover:bg-primary/90 transition"
          >
            {ButtonContent || 'Show All Blogs'}
            <svg className="animate-spin" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12a9 9 0 11-6.219-8.56" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
};

export default CardBlog;