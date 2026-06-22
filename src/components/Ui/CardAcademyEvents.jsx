/* eslint-disable no-unused-vars */
import { Mic, Users, Mail } from 'lucide-react';

import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';

import { getAllProducts } from '../../services/home/homeService';
import { getOurNumbers } from '../../services/about/aboutService';
import { useTranslation } from 'react-i18next';

const iconMap = {
  Mic: <Mic className='text-white text-center bg-primary rounded-full w-11 h-11 p-3' />,
  Users: <Users className='text-white text-center bg-primary rounded-full w-11 h-11 p-3' />,
  Mail: <Mail className='text-white text-center bg-primary rounded-full w-11 h-11 p-3' />,
};


const CardAcademyEvents = () => {
  const { t, i18n } = useTranslation();
const isRTL = i18n.language === 'ar';
  const [allProducts, setAllProducts] = useState([]);
  const [ourNumbers, setOurNumbers] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const goToLink = (link) => {
    if (!link) return;

    const cleanLink = link.trim();
    if (cleanLink.startsWith('http')) {
      // eslint-disable-next-line react-hooks/immutability
      window.location.href = cleanLink;
      return;
    }

    navigate(cleanLink);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [productsRes, numbersRes] = await Promise.all([
          getAllProducts(),
          getOurNumbers(),
        ]);
        setAllProducts(productsRes.data?.products || []);
        setOurNumbers(numbersRes.data?.our_numbers || []);
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  
  const imageProducts = allProducts.filter(p => p.image);

  
  const iconProducts = allProducts.filter(p => p.icon && !p.image);

  
  const bigCards = imageProducts.length > 0
    ? imageProducts.slice(0, 2).map(p => ({
        image: p.image,
        title: p.title,
        description: p.description,
        link: p.link || (p.slug === 'our-academy' ? '/courses' : '/events'),
      }))
    : [
        { title: t('common.notFound'), description: t('common.notFound'), link: '/courses' },
        { title: t('common.notFound'), description: t('common.notFound'), link: '/events' },
      ];

  //  Fallback 
  const slides = iconProducts.length > 0
    ? iconProducts.slice(0, 3).map((p, i) => ({
        icon: <img src={p.icon} alt={p.title} className="w-7 h-7 object-contain test-white" />,
        title: p.title,
        description: p.description,
        link: p.link,
      }))
    : [
        { icon: iconMap.Mic, title: t('common.notFound'), description: t('common.notFound') },
        { icon: iconMap.Users, title: t('footer.community'), description: t('common.notFound') },
        { icon: iconMap.Mail, title: t('footer.newsletter'), description: t('common.notFound') },
      ];

  const numbersList = ourNumbers.map(n => ({
    img: n.image,
    label: n.title || n.label || n.name,
    // student: n.number ? t('home.studentsCount', { number: n.number }) : t('home.studentsCount', { number: 0 }),
    student: n.number,
  }));


  const sliderRef = useRef(null);
  const mobileSliderRef = useRef(null);

useEffect(() => {
  const el = sliderRef.current;
  if (!el) return;
  const half = el.scrollWidth / 2;
  el.style.setProperty('--slider-width', `${half}px`);
}, [numbersList]);

  const [mobileSlideWidth, setMobileSlideWidth] = useState(0);

  useEffect(() => {
    const el = mobileSliderRef.current;
    if (!el) return;
    const measure = () => setMobileSlideWidth(el.offsetWidth);
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  return (
    <div className='md:my-10 my-12'>

      {/*  - Our Academy & Meetups & Events */}
      <div className="my-12 grid grid-cols-1 md:mx-0 mx-2 md:grid-cols-2 gap-6">
        {bigCards.map((card, i) => (
          <div key={i} onClick={() => goToLink(card.link)}
            className="bg-white pb-12 cursor-pointer rounded-2xl h-[30rem] md:h-[28rem] border overflow-hidden hover:shadow-sm border-gray-300">
            <div className="w-full h-80 bg-gray-300 mb-2">
              <img loading="lazy" src={card.image}
                className='w-full h-full object-cover' alt={card.title} />
            </div>
            <div className="px-4 pb-4 ">
              <h2 className="text-2xl text-start font-semibold mb-2">{card.title}</h2>
              <p className="text-gray-600 mb-2 text-start">{card.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/*  Desktop Grid - Slides  */}
      <div className="my-12 hidden md:grid grid-cols-1 sm:grid-cols-2 md:mx-0 mx-2 md:grid-cols-3 gap-6">
        {slides.map((slide, i) => (
          <div
          key={i}
          onClick={() => goToLink(slide.link)}
          
          className="bg-white cursor-pointer rounded-2xl h-54 py-6 px-4 border overflow-hidden hover:shadow-sm border-gray-300 relative">
           <div className='flex items-center justify-center border p-1 border-gray-400 w-17 h-17 rounded-full  left-4 absolute '>

            <span className="flex items-center justify-center w-14 h-14  text-sm border border-primary bg-primary text-white rounded-full">
              {slide.icon}
            </span>
           </div>
            <div className="max-2xl text-end relative mb-4 mt-4 flex items-start justify-end flex-col">
              <h3  
              className="text-lg cursor-pointer text-start font-semibold mb-2 mt-16 px-4">{slide.title}</h3>
              <p className="text-gray-600 text-start px-4 max-w-2xl">{slide.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/*  Mobile Slider */}
      <div className="my-12 md:hidden mx-2">
        <div className="relative">
          <div ref={mobileSliderRef} className="overflow-hidden rounded-2xl">
            <div className="flex" style={{ transform: `translateX(${(isRTL ? 1 : -1) * currentSlide * (mobileSlideWidth || 300)}px)`, transition: 'transform 0.3s ease-in-out' }}>
              {slides.map((slide, index) => (
                <div key={index} onClick={() => goToLink(slide.link)} className="min-w-full cursor-pointer bg-white py-6 px-4 border shadow border-gray-300 rounded-2xl relative">
                  <div className='flex items-center justify-center border p-1 border-gray-400 w-17 h-17 rounded-full  left-4 absolute '>
                  <span className="absolute flex items-center justify-center w-14 h-14  text-sm border border-primary bg-primary text-white rounded-full">
                    {slide.icon}
                  </span>
                  </div >
                  <div className="text-end relative mb-4 mt-4 flex items-start justify-end flex-col">
                    <h3
                    className="text-lg  text-start font-semibold mb-2 mt-16 px-4">{slide.title}</h3>
                    <p className="text-gray-600 text-start px-4 max-w-2xl">{slide.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center gap-2 mt-4">
            {slides.map((_, index) => (
              <button key={index} onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${index === currentSlide ? 'bg-primary w-6' : 'bg-gray-300'}`}
              />
            ))}
          </div>
        </div>
      </div>

    {/* Our Numbers - Auto Slider */}
<div 
  className="md:my-20 sm:my-12 my-14 relative overflow-hidden"
  style={{
    maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
    WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
    willChange: 'transform',
    transform: 'translateZ(0)',
  }}
>
<div
  ref={sliderRef}
  className="flex gap-3 md:gap-4"
  style={{ 
    width: 'max-content',
    animation: `${isRTL ? 'scrollRight' : 'scrollLeft'} 18s linear infinite` 
  }}
  onMouseEnter={e => e.currentTarget.style.animationPlayState = 'paused'}
  onMouseLeave={e => e.currentTarget.style.animationPlayState = 'running'}
>
    {[...numbersList, ...numbersList].map((item, index) => (
      <div
        key={index}
        className="bg-[#F6F7FB] rounded-2xl py-3 md:py-4 px-3 md:px-4 flex-shrink-0 w-52"
      >
        <div className="flex flex-row items-center gap-2">
          <img src={item.img} className="bg-[#EDEFF9] rounded-full w-10 h-10 md:w-14 md:h-14 shrink-0" alt="" />
          <div>
            <h3 className="text-sm md:text-base text-start font-semibold text-gray-900">{item.label}</h3>
            {/* <p className="text-xs md:text-sm text-start font-medium text-gray-500">{item.student}</p> */}
           <p className="text-xs md:text-sm text-start font-medium text-gray-500">+ {item.student}</p>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

    </div>
  );
};

export default CardAcademyEvents;
