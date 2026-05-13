import { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, Tag, Share2, Link, Loader2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import CardBlog from '../../components/Ui/CardBlog';
import Subscribe from '../../components/Ui/Subscribe';
import Footer from '../../components/layout/Footer';
import { getBlogById } from '../../services/blogs/blogsService';
import { useTranslation } from 'react-i18next';

const BlogsDetails = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const toStr = (value) => {
    if (typeof value === 'string') return value;
    if (typeof value === 'number') return value.toString();
    return '';
  };

  const formatDate = (value) => {
    const dateValue = toStr(value);
    if (!dateValue) return t('common.date');

    const date = new Date(dateValue);
    if (Number.isNaN(date.getTime())) return dateValue;

    return date.toLocaleDateString(i18n.language === 'ar' ? 'ar-EG' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await getBlogById(id);
        const blogResponse = res.data?.blog || res.data?.data || res.data;
        setBlog(blogResponse?.data || blogResponse);
        setRelatedBlogs(blogResponse?.related || []);
      } catch (err) {
        console.error(err);
        setError(t('messages.failedToLoadBlog'));
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id, t]);

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
    <div className="min-h-screen flex items-center justify-center text-gray-400 text-lg">{t('messages.blogNotFound')}</div>
  );

  const title = blog.name || blog.title || t('footer.blog');
  const image = blog.banner_image || blog.image || blog.thumb ;
  const date = formatDate(blog.date || blog.created_at || blog.published_at);
  const relatedData = relatedBlogs.length ? relatedBlogs : undefined;

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
            {t('blogs.backToBlogs')}
          </button>
          <div>
            {/* Title */}
            <h1 className="text-2xl text-left md:text-3xl font-bold text-gray-900 mb-5 leading-snug">
              {title}
            </h1>

            {/* Hero Image */}
            <div className="rounded-2xl overflow-hidden mb-5 h-82 md:h-[28rem] bg-gray-900">
              <img
                src={toStr(image)}
                alt={toStr(title)}
                loading="eager"
                fetchPriority="high"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Meta Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center py-3 mb-8 text-sm text-gray-500">
              <div className="flex items-center justify-center gap-2.5 text-[14px] border-gray-300 border rounded-lg px-3 py-2">
                <Tag size={18} className="opacity-50" />
                <span>{t('common.category')}: <strong className="text-gray-700">{blog.category?.name || toStr(blog.category) || t('common.category')}</strong></span>
              </div>
              <div className="flex items-center justify-center gap-3.5 text-base border-gray-300 border rounded-lg px-3 py-2">
                <Calendar size={18} className="opacity-50" />
                <span>{t('common.date')}: <strong className="text-gray-700">{date}</strong></span>
              </div>
              <button className="flex items-center justify-center gap-3.5 text-base border-gray-300 border rounded-lg px-3 py-2">
                <Share2 size={18} /> {t('common.share')}
              </button>
              <button
                onClick={handleCopyLink}
                className="flex items-center justify-center gap-3.5 text-base border-gray-300 border rounded-lg px-3 py-2 text-gray-500 hover:text-gray-800 transition-colors"
              >
                <Link size={18} /> {t('common.copyLink')}
              </button>
            </div>

            {/* Article Body */}
            <article className="prose prose-gray max-w-none text-left text-gray-600 prose-p:text-[16px] prose-p:leading-relaxed prose-headings:text-gray-900">
              {blog.content ? (
                typeof blog.content === 'string' ? (
                  <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                ) : (
                  <>
                    {blog.content.introduction && (
                      <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-3">{t('blogs.introduction')}</h2>
                        <p className="text-[16px]">{toStr(blog.content.introduction) || t('messages.noDescription')}</p>
                      </section>
                    )}
                    {blog.content.body && (
                      <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-3">{t('blogs.content')}</h2>
                        <p className="text-[16px]">{toStr(blog.content.body) || t('messages.noDescription')}</p>
                      </section>
                    )}
                    {blog.content.conclusion && (
                      <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-3">{t('blogs.conclusion')}</h2>
                        <p className="text-[16px]">{toStr(blog.content.conclusion) || t('messages.noDescription')}</p>
                      </section>
                    )}
                  </>
                )
              ) : (
                blog.description && (
                  <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">{t('blogs.description')}</h2>
                    <p className="text-[16px]">{toStr(blog.description) || t('messages.noDescription')}</p>
                  </section>
                )
              )}
            </article>
          </div>
        </div>

        {/* Related Blogs */}
        <div className='md:my-22 sm:my-16 my-10 lg:my-24'>
          <div className='space-y-5'>
            <h3 className='text-3xl text-left font-bold text-gray-800 leading-snug'>{t('blogs.relatedBlogs')}</h3>
            <CardBlog data={relatedData} activeCategory="All Blogs" limit={3} excludeId={blog.id} />
          </div>
        </div>
        <Subscribe />
        <Footer />
      </div>
    </div>
  );
};

export default BlogsDetails;
