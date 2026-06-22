import { useState } from "react";

const AVATAR_COLORS = [
  "#e85d75", "#4e8ff7", "#43c897", "#f5a623",
  "#9b59b6", "#1abc9c", "#e67e22", "#3498db",

];

const getInitials = (name) =>
  name?.split(" ").map((w) => w[0]).join("") || "?";


// const StarRating = () => (
//   <div className="text-3xl font-bold text-start mb-2 text-[#f5c842]" style={{ letterSpacing: "2px" }}>
//     {"★".repeat(5)}
//   </div>
// );

const Avatar = ({ name, image, colorIndex }) => {
  const [imgError, setImgError] = useState(false);
  const color = AVATAR_COLORS[colorIndex % AVATAR_COLORS.length];

  if (image && !imgError) {
    return (
      <img
        src={image}
        alt={name}
        onError={() => setImgError(true)}
        className="h-[44px] w-[44px] rounded-full object-cover"
      />
    );
  }

  return (
    <div
      className="h-[44px] w-[44px] rounded-full flex items-center justify-center text-white font-bold text-sm"
      style={{ background: color }}
    >
      {getInitials(name)}
    </div>
  );
};

const ReviewCard = ({ review, colorIndex }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="overflow-hidden flex flex-col items-start justify-between h-fit py-5 px-4 gap-2 rounded-2xl bg-[#F2F4F7]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        transition: "box-shadow .25s, transform .25s",
        boxShadow: hovered ? "0 8px 28px rgba(0,0,0,0.10)" : "none",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
      }}
    >
      {/* Top */}
      <div className="flex-1 text-start mb-3 overflow-hidden">
        {/* <StarRating /> */}
        <p
          className="text-[#4a5568] text-base"
          style={{
            lineHeight: "1.65",
            display: "-webkit-box",
            // WebkitLineClamp: 5,
            WebkitBoxOrient: "vertical",
            // overflow: "hidden",
          }}
        >
          {review.content} 
        </p>
      </div>

      {/* Bottom */}
      <div className="flex items-center gap-2">
        <Avatar name={review.name} image={review.image} colorIndex={colorIndex} />
        <div>
          <div className="text-sm text-start font-semibold text-gray-900">{review.name}</div>
          <div className="text-xs text-gray-600">{review.job}</div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;