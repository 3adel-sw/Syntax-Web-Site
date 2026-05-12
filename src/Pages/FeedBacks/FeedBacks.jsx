import { useState, useRef, useEffect } from "react";
import ReviewCard from "./ReviewCard";
import Footer from "../../Components/layout/Footer";
import feedbackImg from "../../../public/images/MaskGroup.webp";
import { getAllTestimonials } from "../../services/home/homeService"; 

const SkeletonCard = () => (
  <div className="rounded-2xl bg-[#F2F4F7] p-5 flex flex-col gap-4 animate-pulse">
    <div className="space-y-2">
      <div className="h-4 bg-gray-300 rounded w-24" />
      <div className="h-3 bg-gray-300 rounded w-full" />
      <div className="h-3 bg-gray-300 rounded w-5/6" />
      <div className="h-3 bg-gray-300 rounded w-4/6" />
    </div>
    <div className="flex items-center gap-2">
      <div className="w-11 h-11 rounded-full bg-gray-300" />
      <div className="space-y-1.5">
        <div className="h-3 bg-gray-300 rounded w-20" />
        <div className="h-2.5 bg-gray-300 rounded w-14" />
      </div>
    </div>
  </div>
);

const FeedBacks = () => {
  const NUM_COLS = 3;

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const res = await getAllTestimonials();
        setReviews(res.data.testimonials || []);
      } catch (err) {
        setError("  Error fetching reviews. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const columns = Array.from({ length: NUM_COLS }, (_, ci) =>
    reviews.filter((_, i) => i % NUM_COLS === ci)
  );

  const chunkSize = 3;
  const reviewGroups = [];
  for (let i = 0; i < reviews.length; i += chunkSize) {
    reviewGroups.push(reviews.slice(i, i + chunkSize));
  }

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
    const diff = e.touches[0].clientX - touchStartRef.current;
    const containerWidth = containerRef.current?.offsetWidth || 300;
    const newX = translateXRef.current + (diff / containerWidth) * 100;
    translateXRef.current = newX;
    setTranslateX(newX);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    const slideIndex = Math.round(-translateXRef.current / 100);
    const bounded = Math.max(0, Math.min(reviewGroups.length - 1, slideIndex));
    setCurrentSlide(bounded);
    translateXRef.current = -bounded * 100;
    setTranslateX(-bounded * 100);
  };

  useEffect(() => {
    if (!isDragging) {
      translateXRef.current = -currentSlide * 100;
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTranslateX(-currentSlide * 100);
    }
  }, [currentSlide, isDragging]);

  return (
    <div className="min-h-screen home-page flex items-center justify-center md:max-w-5xl lg:max-w-6xl mx-auto">
      <div className="sm:max-w-5xl md:max-w-6xl w-[92%] lg:w-full text-center mx-1">

        {/* Header */}
        <div
          data-aos="zoom-in" data-aos-delay="200" data-aos-duration="700"
          className="relative overflow-hidden text-left md:my-18 my-14 rounded-2xl w-full h-[340px] bg-[#23286B]"
        >
          <img src={feedbackImg} alt="" className="rounded-2xl w-full h-full object-cover" />
          <h1 className="absolute top-10 md:top-20 left-4 md:left-20 md:text-5xl text-3xl font-bold text-white">
            Your Voice Shapes Better Experiences
          </h1>
          <p className="absolute bottom-10 md:bottom-20 md:left-20 left-4 text-gray-500 md:text-2xl text-lg max-w-5xl">
            We value your insights. Share your feedback to help us improve our courses, events, and community.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="hidden md:grid px-4 grid-cols-3 gap-6 mx-auto">
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-center py-10 text-red-500">
            <p>{error}</p>
            <button onClick={() => window.location.reload()} className="mt-3 text-sm text-primary underline">
              حاول مرة أخرى
            </button>
          </div>
        )}

        {/* Mobile Slider */}
        {!loading && !error && (
          <div className="md:hidden my-10">
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
                  transition: isDragging ? "none" : "transform 0.3s ease-in-out",
                }}
              >
                {reviewGroups.map((group, groupIndex) => (
                  <div key={groupIndex} className="min-w-full flex-shrink-1 px-2 flex flex-col gap-4">
                    {group.map((review) => (
                      <ReviewCard key={review.id} review={review} colorIndex={reviews.indexOf(review)} />
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center gap-2 mt-4">
              {reviewGroups.map((_, groupIndex) => (
                <button
                  key={groupIndex}
                  onClick={() => setCurrentSlide(groupIndex)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    groupIndex === currentSlide ? "bg-primary w-6" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Desktop Grid */}
        {!loading && !error && (
          <div className="hidden md:grid px-4 grid-cols-3 gap-6 mx-auto">
            {columns.map((col, ci) => (
              <div key={ci} className="flex flex-col gap-4">
                {col.map((review) => (
                  <ReviewCard key={review.id} review={review} colorIndex={reviews.indexOf(review)} />
                ))}
              </div>
            ))}
          </div>
        )}

        <Footer />
      </div>
    </div>
  );
};

export default FeedBacks;