import { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, Tag, Loader2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import CardBlog from '../../components/Ui/CardBlog';
import Subscribe from '../../components/Ui/Subscribe';
import Footer from '../../components/layout/Footer';
import { getBlogById } from '../../services/blogs/blogsService';
import { useTranslation } from 'react-i18next';
import { FaRegCopy } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { CiShare2 } from "react-icons/ci";

import { X } from 'lucide-react';


const BlogsDetails = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const handleShare = (platform) => {
    const url = encodeURIComponent(window.location.href);
    const links = {
      twitter: `https://twitter.com/intent/tweet?url=${url}`,
      instagram: `https://www.instagram.com/`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    };
  window.open(links[platform], '_blank');
  setShowShareMenu(false);
};
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

  const [linkCopied, setLinkCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
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
            <h1 className="text-2xl text-start md:text-3xl font-bold text-gray-900 mb-5 leading-snug">
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
               <button
                         onClick={() => setShowShareMenu((prev) => !prev)}
                         className="flex items-center justify-center gap-1 md:gap-2 lg:text-sm md:text-xs text-[9px] text-gray-600  cursor-pointer border border-gray-200 rounded-lg md:px-12 px-4 py-2.5 hover:bg-gray-200"
                       >
                         <CiShare2 /> {t('common.share')}
                       </button>
             <button onClick={handleCopyLink} className="flex items-center justify-center gap-1 md:gap-2 lg:text-sm md:text-xs text-[9px] text-gray-600  cursor-pointer border border-gray-200 rounded-lg md:px-12 px-4 py-2.5 hover:bg-gray-200">
                        {linkCopied ? <FaCheck size={14} className="text-green-600" /> : <FaRegCopy />} {linkCopied ? t('common.copied') || 'Copied!' : t('common.copyLink')}
                      </button>
            </div>

            {/* Article Body */}
            <article className="prose prose-gray max-w-none text-start text-gray-600 prose-p:text-[16px] prose-p:leading-relaxed prose-headings:text-gray-900">
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
            <h3 className='text-3xl text-start font-bold text-gray-800 leading-snug'>{t('blogs.relatedBlogs')}</h3>
            <CardBlog data={relatedData} activeCategory="All Blogs" limit={3} excludeId={blog.id} />
          </div>
        </div>
        <Subscribe />
        <Footer />
        {showShareMenu && (
          <>
           
            <div
              className="fixed inset-0 z-40"
              onClick={() => setShowShareMenu(false)}
            />
        
            <div className="absolute z-50 fixed flex items-center justify-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border border-gray-200 rounded-2xl shadow-lg p-2 md:flex-row flex-col gap-1 w-fit md:p-8 max-w-[90%] h-fit">
              
              
              <button
                onClick={() => setShowShareMenu(false)}
                className="absolute top-0 right-0 p-2 text-gray-400 hover:text-red-600 cursor-pointer"
              >
                <X size={16} />
              </button>
        
              <button
                onClick={() => handleShare('twitter')}
                className="flex items-center mt-2 gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 text-sm text-gray-700"
              >
                <FaXTwitter size={16} /> {t('common.x')}
              </button>
              <button
                onClick={() => handleShare('instagram')}
                className="flex items-center mt-2 gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 text-sm text-gray-700"
              >
                <FaInstagram size={16} /> {t('common.instagram')}
              </button>
              <button
                onClick={() => handleShare('linkedin')}
                className="flex items-center mt-2 gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 text-sm text-gray-700"
              >
                <FaLinkedin size={16} /> {t('common.linkedin')}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BlogsDetails;
