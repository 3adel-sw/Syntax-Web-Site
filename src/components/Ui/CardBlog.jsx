import { ArrowUpRight } from 'lucide-react';

const blogs = [
  {
    id: 1,
    category: "UX Design",
    date: "26 May 2024",
    title: "The Psychology Behind UX Design",
    excerpt: "Understanding user behavior is key to creating effective designs. Dive into the psychology behind UX and ...",
    video: null, // ضع رابط الفيديو هنا
    thumb: null, // أو صورة thumbnail
  },
  {
    id: 2,
    category: "UX Design",
    date: "26 May 2024",
    title: "The Psychology Behind UX Design",
    excerpt: "Understanding user behavior is key to creating effective designs. Dive into the psychology behind UX and ...",
    video: null,
    thumb: null,
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
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 cursor-pointer group">

      {/* Thumbnail / Video */}
      <div className="relative h-48 bg-gray-900 overflow-hidden rounded-xl m-2">
        {video ? (
          <>
            <video
              src={video}
              className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
              muted
              loop
              onMouseEnter={e => e.target.play()}
              onMouseLeave={e => { e.target.pause(); e.target.currentTime = 0; }}
            />
          </>
        ) : thumb ? (
          <img
            src={thumb}
            alt={title}
            className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          /* Placeholder dark thumbnail زي الصورة */
          <div className="w-full h-full bg-gray-800 flex items-center justify-center">
            <div className="text-gray-600 text-4xl">▶</div>
          </div>
        )}

        {/* Play icon overlay */}
        {(video || thumb) && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <polygon points="4,2 14,8 4,14" fill="#111827" />
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* Body */}
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