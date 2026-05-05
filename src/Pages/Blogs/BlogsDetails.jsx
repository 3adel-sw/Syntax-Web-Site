import { ArrowLeft, Calendar, Tag, Share2, Link } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import BlogCardImage from '../../assets/BlogsDetails.svg';
import CardBlog from '../../components/Ui/CardBlog';
import Subscribe from '../../components/Ui/Subscribe';
import Footer from '../../components/layout/Footer';


const blogs = [
  {
    id: 1,
    category: "UX Design",
    date: "19 Jan 2024",
    title: "The Psychology Behind UX Design",
    excerpt: "Understanding user behavior is key to creating effective designs. Dive into the psychology behind UX and ...",
    thumb: BlogCardImage,
    content: {
      introduction: `UX design is not just about creating visually appealing interfaces; it's a multidisciplinary field that combines aesthetics with a deep understanding of human behavior. The key to successful UX design lies in grasping the psychological principles that influence how users interact with digital products. By exploring the cognitive processes and emotional triggers that drive user actions, designers can create experiences that are both engaging and intuitive, leading to a higher level of user satisfaction and loyalty.`,
      conclusion: `Incorporating psychological insights into UX design is essential for creating products that resonate with users on a deeper level. When designers understand the mental and emotional processes behind user interactions, they can build experiences that are not only functional but also emotionally satisfying. This holistic approach to UX design ensures that users feel understood and valued, ultimately leading to a stronger connection between the user and the product.`,
      body: `Understanding user behavior requires a thorough exploration of various psychological theories. For instance, Maslow's Hierarchy of Needs helps designers identify what users are seeking at different stages of their interaction with a product, whether it's basic functionality, a sense of security, or self-fulfillment. Additionally, concepts like Cognitive Load and Hick's Law play crucial roles in shaping user experience. Cognitive Load refers to the amount of mental effort required to use an interface; by minimizing this, designers can make interactions more seamless. Hick's Law, which states that increasing the number of choices increases decision time, is essential for designing interfaces that are simple yet effective.`,
    },
  },
];

const BlogsDetails = () => {
        const navigate = useNavigate();
        const { id } = useParams();
        const blog = blogs.find(b => b.id === Number(id)) || blogs[0];

        const handleCopyLink = () => {
            navigator.clipboard.writeText(window.location.href);
        };

        return (
           <div className="min-h-screen flex items-center justify-center md:max-w-5xl lg:max-w-6xl mx-auto ">
      <div className="sm:max-w-5xl md:max-w-6xl w-[92%] lg:w-full text-center mx-1">

                    <div className=" sm:max-w-4xl md:max-w-5xl lg:w-full  mx-auto">
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
                        {blog.title}
                    </h1>

                    {/* Hero Image */}
                    <div className="rounded-2xl overflow-hidden mb-5 h-82 md:h-[28rem] bg-gray-900">
                        <img
                            src={blog.thumb}
                            alt={blog.title}
                            loading="eager"
                            fetchPriority="high"
                            className="w-full h-full object-cover" />
                    </div>

                    {/* Meta Bar */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center  py-3   mb-8 text-sm text-gray-500">
                        <div className="flex items-center justify-center gap-2.5 text-[14px]  border-gray-300 border rounded-lg px-3 py-2">
                            <Tag size={18} className="opacity-50 " />
                            <span>Category: <strong className="text-gray-700">{blog.category}</strong></span>
                        </div>
                       <div className="flex items-center justify-center gap-3.5 text-base   border-gray-300 border rounded-lg px-3 py-2">
                            <Calendar size={18} className="opacity-50" />
                            <span>Date: <strong className="text-gray-700">{blog.date}</strong></span>
                        </div>
                        <button className="flex items-center justify-center gap-3.5 text-base   border-gray-300 border rounded-lg px-3 py-2">
                            <Share2 size={18} />
                            Share
                        </button>
                        <button
                            onClick={handleCopyLink}
                            className="flex items-center justify-center gap-3.5 text-base   border-gray-300 border rounded-lg px-3 py-2 text-gray-500 hover:text-gray-800 transition-colors"
                        >
                            <Link size={18} />
                            Copy Link
                        </button>
                    </div>

                    {/* Article Body */}
                    <article className="space-y-6 text-[15px] leading-relaxed text-gray-600 text-left">
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-3">Introduction</h2>
                            <p className="text-[16px]">{blog.content.introduction}</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-3">Conclusion</h2>
                            <p className="text-[16px]">{blog.content.conclusion}</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-3">Content</h2>
                            <p className="text-[16px]">{blog.content.body}</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-3">Conclusion</h2>
                            <p className="text-[16px]">{blog.content.conclusion}</p>
                        </section>
                    </article>

                </div>
                </div>
            {/* Cards Related  */}
            <div className='md:my-22 sm:my-16 my-10 lg:my-24'>
              <div className=' space-y-5'>
                <h3 className='text-3xl text-left font-bold text-gray-800 leading-snug'>Related Blogs</h3>
                <CardBlog activeCategory="All Blogs" limit={3} />
              </div>
            </div>
            <Subscribe />
            <Footer />
            </div>
            </div>
        );
    }

export default BlogsDetails;