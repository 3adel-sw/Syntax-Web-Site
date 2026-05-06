// FeedBacks.jsx
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

  return (
     <div className="min-h-screen home-page  flex items-center justify-center md:max-w-5xl lg:max-w-6xl mx-auto ">
      <div className="sm:max-w-5xl md:max-w-6xl w-[92%] lg:w-full text-center mx-1">
       
        {/* Header */}
        <div className="relative overflow-hidden text-left md:my-18 my12 rounded-2xl w-full h-[340px] bg-[#23286B]">
            <img src={feedbackImg} alt="" className="rounded-2xl w-full h-full object-cover" />
          <h1 className="absolute top-20 left-20 text-5xl font-bold text-white">
            Your Voice Shapes Better Experiences
          </h1>
          <p className="absolute bottom-20 left-20 text-gray-500 text-2xl max-w-5xl ">
            We value your insights. Share your feedback to help us improve our courses, events, and community.
             We value your insights. Share your feedback to help us improve our courses, events, and community.
          </p>
        </div>

        {/* Grid — 3 cols, each card 388×261px */}
        <div 
        className="px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 mx-auto">
        
        
        
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