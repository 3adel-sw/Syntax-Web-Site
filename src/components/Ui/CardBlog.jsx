import { ArrowUpRight } from 'lucide-react';
import  Video  from '../../assets/12345.mp4';
import  Test  from '../../assets/test.jpg';
import { useRef, useState } from 'react';


const blogs = [
  {
    id: 1,
    category: "UX Design",
    date: "26 May 2024",
    title: "The Psychology Behind UX Design",
    excerpt: "Understanding user behavior is key to creating effective designs. Dive into the psychology behind UX and ...",
    video: Video, 
    thumb: null, 
  },
  {
    id: 2,
    category: "UX Design",
    date: "26 May 2024",
    title: "The Psychology Behind UX Design",
    excerpt: "Understanding user behavior is key to creating effective designs. Dive into the psychology behind UX and ...",
    video: null,
    thumb: Test,
  },
  {
    id: 3,
    category: "UX Design",
    date: "26 May 2024",
    title: "The Psychology Behind UX Design",
    excerpt: "Understanding user behavior is key to creating effective designs. Dive into the psychology behind UX and ...",
    video: null,
    thumb: null,
  },
];

const BlogCard = ({ category, date, title, excerpt, video, thumb }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleCardClick = () => {
    if (video && videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 cursor-pointer group"
    >
      <div className="relative h-48 bg-gray-900 overflow-hidden rounded-xl m-2">
        {video ? (
          <video
            ref={videoRef}
            src={video}
            className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
            muted
            loop
            onMouseEnter={e => e.target.play()}
            onMouseLeave={e => { e.target.pause(); e.target.currentTime = 0; }}
          />
        ) : thumb ? (
          <img
            src={thumb}
            alt={title}
            className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gray-800 flex items-center justify-center">
            <div className="text-gray-600 text-4xl">▶</div>
          </div>
        )}

        {/* Play/Pause overlay */}
        {(video || thumb) && (
          <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isPlaying ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'}`}>
            <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
              {isPlaying ? (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect x="3" y="2" width="4" height="12" fill="#111827" />
                  <rect x="9" y="2" width="4" height="12" fill="#111827" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <polygon points="4,2 14,8 4,14" fill="#111827" />
                </svg>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Body — نفس الكود */}
      <div className="p-4 text-left">
        <h3 className="text-[15px] font-bold text-gray-900 mb-2 leading-snug group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-2">
          {excerpt}
        </p>
        <div className="flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <span className="text-gray-600 font-medium">{category}</span>
            <span className="w-1 h-1 bg-gray-300 rounded-full" />
            <span>{date}</span>
          </div>
          <div className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-colors">
            <ArrowUpRight size={13} className="text-gray-400 group-hover:text-white transition-colors" />
          </div>
        </div>
      </div>
    </div>
  );
};
const CardBlog = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-8">
      {blogs.map(blog => (
        <BlogCard key={blog.id} {...blog} />
      ))}
    </div>
  );
};

export default CardBlog;