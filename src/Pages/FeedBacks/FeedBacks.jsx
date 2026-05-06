// FeedBacks.jsx
import { useState, useRef, useEffect } from "react";
import ReviewCard from "./ReviewCard";
import Footer from "../../Components/layout/Footer";
import feedbackImg from "../../../public/images/MaskGroup.webp";

const reviews = [
  { stars: 2, text: "I spearheaded a branding refresh project for our company, revamping our visual identity to better reflect our core values and mission. The rebranding effort garnered positive feedback from both internal stakeholders and customers, reinforcing our brand's position in the market.", name: "Luna Evergreen", role: "Marketing Manager" },
  { stars: 5, text: "I spearheaded a branding refresh project for our company, revamping our visual identity to better reflect our core values and mission. The rebranding effort garnered positive feedback from both internal stakeholders and customers, reinforcing our brand's position in the market.", name: "Adel Mahmoud", role: "Marketing Manager" },
  { stars: 4, text: "I spearheaded a branding refresh project for our company, revamping our visual identity to better reflect our core values and mission. The rebranding effort garnered positive feedback from both internal stakeholders and customers, reinforcing our brand's position in the market.", name: "Sayed Salem", role: "Marketing Manager" },
  { stars: 4, text: " The rebranding effort garnered positive feedback from both internal stakeholders and customers, reinforcing our brand's position in the market.", name: "Sayed Salem", role: "Marketing Manager" },
  { stars: 4, text: "I spearheaded a branding refresh project for our company, revamping our visual identity to better reflect our core values and mission. The rebranding effort garnered positive feedback from both internal stakeholders and customers, reinforcing our brand's position in the market.", name: "Sayed Salem", role: "Marketing Manager" },
  { stars: 4, text: "I spearheaded a branding refresh project for our company, revamping our ", name: "Sayed Salem", role: "Marketing Manager" },
  { stars: 4, text: "I spearheaded a branding refresh project for our company, revamping our visual identity to better reflect our core values and mission. The rebranding effort garnered positive feedback from both internal stakeholders and customers, reinforcing our brand's position in the market.", name: "Sayed Salem", role: "Marketing Manager" },
  { stars: 4, text: " reflect our core values and mission. The rebranding effort garnered positive feedback from both internal stakeholders and customers, reinforcing our brand's position in the market.", name: "Sayed Salem", role: "Marketing Manager" },
  { stars: 4, text: "stakeholders and customers, reinforcing our brand's position in the market.", name: "Sayed Salem", role: "Marketing Manager" },
];

const FeedBacks = () => {
  const NUM_COLS = 3;
  const columns = Array.from({ length: NUM_COLS }, (_, ci) =>
    reviews.filter((_, i) => i % NUM_COLS === ci)
  );

  // Slider State
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
    const boundedIndex = Math.max(0, Math.min(reviews.length - 1, slideIndex));
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
     <div className="min-h-screen home-page  flex items-center justify-center md:max-w-5xl lg:max-w-6xl mx-auto ">
      <div className="sm:max-w-5xl md:max-w-6xl w-[92%] lg:w-full text-center mx-1">
       
        {/* Header */}
        <div 
        data-aos="zoom-in"
        data-aos-delay="200"
        data-aos-duration="700"
        className="relative overflow-hidden text-left md:my-18 my12 rounded-2xl w-full h-[340px] bg-[#23286B]">
            <img src={feedbackImg} alt="" className="rounded-2xl w-full h-full object-cover" />
          <h1 
          data-aos="zoom-in"
          data-aos-delay="200"   
          data-aos-duration="700"
          className="absolute top-10 md:top-20 left-4 md:left-20 md:text-5xl text-3xl font-bold text-white ">
            Your Voice Shapes Better Experiences
          </h1>
          <p 
          data-aos="zoom-in"
          data-aos-delay="200"   
          data-aos-duration="700"
          className="absolute bottom-10 md:bottom-20 md:left-20 left-4 text-gray-500 md:text-2xl text-lg max-w-5xl ">
            We value your insights. Share your feedback to help us improve our courses, events, and community.
             We value your insights. Share your feedback to help us improve our courses, events, and community.
          </p>
        </div>

        {/* Mobile Slider */}
        <div className="md:hidden my-8">
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
              {reviews.map((review, index) => (
                <div key={index} className="min-w-full flex-shrink-1 px-2">
                  <ReviewCard review={review} colorIndex={index} />
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center gap-2 mt-4">
            {reviews.map((_, index) => (
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
        <div className="hidden md:grid px-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 mx-auto">
          {columns.map((col, ci) => (
            <div key={ci} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {col.map((review, ri) => (
                <ReviewCard
                  key={ri}
                  review={review}
                  colorIndex={reviews.indexOf(review)}
                />
              ))}
            </div>
          ))}
        </div>
          <Footer />
      </div>
    </div>
  );
};

export default FeedBacks;