/* eslint-disable react-hooks/set-state-in-effect */

import { useNavigate } from 'react-router';
// import BlogCardImage from '../../assets/blogC.webp';
import {  useState, useEffect } from 'react';
import { LuLoaderCircle } from "react-icons/lu";
import { getAllBlogs } from '../../services/blogs/blogsService';




const toStr = (val) => {
  if (!val) return '';
  if (typeof val === 'object') return val?.name || val?.title || '';
  return val;
};



const BlogCard = ({ id, slug, category, date, title, excerpt, image, thumb }) => {
  const navigate = useNavigate();



  return (
    <div
       onClick={() => navigate(`/blogs-detail/${slug || id}`)}
      className="bg-white rounded-2xl border h-[27rem] border-gray-200 p-3 overflow-hidden hover:-translate-y-1 hover:shadow-xl cursor-pointer"
    >
      <div className="h-61 flex items-center rounded-2xl justify-center relative overflow-hidden">
        {(image || thumb) ? (
          <img
            loading="eager"
            fetchPriority="high"
            src={image || thumb}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}
      </div>

      <div className="px-2 py-4 text-left">
        <h3 className="text-[19px] font-bold text-gray-900 mb-2 leading-snug group-hover:text-primary transition-colors">
         {toStr(title)}
        </h3>
        <p className="text-[14px] text-gray-500 leading-relaxed mb-4 line-clamp-2">
          {toStr(excerpt) || 'No excerpt available.'}
        </p>
        <div className="flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <span className="text-gray-400 font-medium text-base">{toStr(category) || 'Category'}</span>
            <span className="w-1 h-1 bg-gray-300 rounded-full" />
            <span className="text-gray-400 font-medium text-base">{toStr(date) || 'Date'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const CardBlog = ({ activeCategory, limit, showButton, ButtonContent }) => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await getAllBlogs();
        setBlogs(res.data?.blogs || res.data?.data || []);
      } catch (err) {
        console.error(err);
        setError('Failed to load blogs');
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const categoryMap = {
    "UI Design": "UI Design",
    "UX Principles": "UX Design",
    "Soft skills": "Soft Skills",
    "Personal Branding": "Personal Branding",
    "Graphic Design": "Graphic Design",
  };

  const mappedCategory = categoryMap[activeCategory];
  const filteredBlogs = activeCategory === "All Blogs" || !activeCategory
    ? blogs
    : blogs.filter(blog => blog.category === mappedCategory);
    blogs.filter(blog => {
  const cat = blog.category?.name || blog.category;
  return cat === mappedCategory;
});

  const displayedBlogs = limit ? filteredBlogs.slice(0, limit) : filteredBlogs;



  if (loading) return (
    <div className="flex justify-center items-center h-48 mt-8">
      <LuLoaderCircle size={36} className="animate-spin text-primary" />
    </div>
  );

  if (error) return (
    <div className="text-center text-red-500 py-12 mt-8">{error}</div>
  );

  return (
    <>
      {/* Desktop Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-8">
       {displayedBlogs.map(blog => (
  <BlogCard
    key={blog.id}
    id={blog.id}
    slug={blog.slug}
    title={blog.name || blog.title}
    excerpt={blog.description}
    category={blog.category?.name || blog.category}  // ✅ object
    date={blog.date || blog.created_at || blog.published_at}  // ✅ multiple possible date fields
    image={blog.image || blog.banner_image}
    thumb={blog.thumb}
  />
))}
      </div>
      {showButton && limit && (
        <div className="mt-10">
          <button
            onClick={() => navigate('/blogs')}
            className="px-6 py-2.5 flex gap-2 mx-auto bg-primary text-white rounded-xl shadow-md hover:bg-primary/90 transition"
          >
            {ButtonContent || 'Show All Blogs'}
            <LuLoaderCircle size={22} />
          </button>
        </div>
      )}
    </>
  );
};

export default CardBlog;
