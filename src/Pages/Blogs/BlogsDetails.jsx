import { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, Tag, Share2, Link, Loader2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import BlogCardImage from '../../assets/BlogsDetails.svg';
import CardBlog from '../../components/Ui/CardBlog';
import Subscribe from '../../components/Ui/Subscribe';
import Footer from '../../components/layout/Footer';
import { getBlogById } from '../../services/blogs/blogsService';

const BlogsDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    const toStr = (value) => {
    if (typeof value === 'string') return value;
    if (typeof value === 'number') return value.toString();
    return '';
  };



  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await getBlogById(id);
        setBlog(res.data?.blog || res.data?.data || res.data);
      } catch (err) {
        console.log('Error:', err.response?.status, err.response?.data)
        console.error(err);
        setError('Failed to load blog');
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 size={48} className="animate-spin text-primary" />
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center text-red-500 text-lg">{error}</div>
  );

  if (!blog) return (
    <div className="min-h-screen flex items-center justify-center text-gray-400 text-lg">Blog not found.</div>
  );
            console.log('All blog keys:', Object.keys(blog));
        console.log('Blog:', blog.created_at, blog.published_at, blog.date);

  return (
    <div className="min-h-screen flex items-center justify-center md:max-w-5xl lg:max-w-6xl mx-auto ">
      <div className="sm:max-w-5xl md:max-w-6xl w-[92%] lg:w-full text-center mx-1">
        <div className="sm:max-w-4xl md:max-w-5xl lg:w-full mx-auto">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 mb-6 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Blogs
          </button>
          <div>
            {/* Title */}
            <h1 className="text-2xl text-left md:text-3xl font-bold text-gray-900 mb-5 leading-snug">
              {blog.name || blog.title}
            </h1>

            {/* Hero Image */}
            <div className="rounded-2xl overflow-hidden mb-5 h-82 md:h-[28rem] bg-gray-900">
              <img
                src={toStr(blog.image || blog.thumb || BlogCardImage)}
                alt={toStr(blog.title) || 'Blog'}
                loading="eager"
                fetchPriority="high"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Meta Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center py-3 mb-8 text-sm text-gray-500">
              <div className="flex items-center justify-center gap-2.5 text-[14px] border-gray-300 border rounded-lg px-3 py-2">
                <Tag size={18} className="opacity-50" />
                <span>Category: <strong className="text-gray-700">{blog.category?.name || toStr(blog.category) || 'Category'}</strong></span>
              </div>
              <div className="flex items-center justify-center gap-3.5 text-base border-gray-300 border rounded-lg px-3 py-2">
                <Calendar size={18} className="opacity-50" />
                <span>Date: <strong className="text-gray-700">{blog.date || blog.created_at || blog.published_at || 'Date'}</strong></span>
              </div>
              <button className="flex items-center justify-center gap-3.5 text-base border-gray-300 border rounded-lg px-3 py-2">
                <Share2 size={18} /> Share
              </button>
              <button
                onClick={handleCopyLink}
                className="flex items-center justify-center gap-3.5 text-base border-gray-300 border rounded-lg px-3 py-2 text-gray-500 hover:text-gray-800 transition-colors"
              >
                <Link size={18} /> Copy Link
              </button>
            </div>

            {/* Article Body */}
            <article className="space-y-6 text-[15px] leading-relaxed text-gray-600 text-left"
            
            >
              {blog.content ? (
                typeof blog.content === 'string' ? (
                  <p className="text-[16px]">{toStr(blog.content)}</p>
                ) : (
                  <>
                    {blog.content.introduction && (
                      <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-3">Introduction</h2>
                        <p className="text-[16px]">{toStr(blog.content.introduction) || 'No introduction available.'}</p>
                      </section>
                    )}
                    {blog.content.body && (
                      <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-3">Content</h2>
                        <p className="text-[16px]">{toStr(blog.content.body) || 'No content available.'}</p>
                      </section>
                    )}
                    {blog.content.conclusion && (
                      <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-3">Conclusion</h2>
                        <p className="text-[16px]">{toStr(blog.content.conclusion) || 'No conclusion available.'}</p>
                      </section>
                    )}
                  </>
                )
              ) : (
                blog.description && (
                  <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">Description</h2>
                    <p className="text-[16px]">{toStr(blog.description) || 'No description available.'}</p>
                  </section>
                )
              )}
            </article>
          </div>
        </div>

        {/* Related Blogs */}
        <div className='md:my-22 sm:my-16 my-10 lg:my-24'>
          <div className='space-y-5'>
            <h3 className='text-3xl text-left font-bold text-gray-800 leading-snug'>Related Blogs</h3>
            <CardBlog activeCategory="All Blogs" limit={3} />
          </div>
        </div>
        <Subscribe />
        <Footer />
      </div>
    </div>
  );
};

export default BlogsDetails;