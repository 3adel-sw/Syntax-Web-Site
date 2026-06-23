import { useTranslation } from 'react-i18next';

const CardGraduated = ({ data = [] }) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const apiLogos = data
    .map((item, index) => ({
      id: item.id || item.created_at || index,
      src: item.image || item.logo,
      alt: item.name || item.title || `Organization ${index + 1}`,
    }))
    .filter((logo) => logo.src);

  const allLogos = [...apiLogos, ...apiLogos];

  return (
    <div className="my-8 overflow-hidden" dir="ltr">
      <style>{`
        @keyframes scroll-ltr {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes scroll-rtl {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .slider-track {
          animation: ${isRTL ? 'scroll-rtl' : 'scroll-ltr'} 20s linear infinite;
        }
        .slider-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div
        className="slider-track flex items-center gap-4 whitespace-nowrap"
        style={{ width: 'max-content', direction: 'ltr' }}
      >
       
        {(isRTL ? [...allLogos].reverse() : allLogos).map((logo, index) => (
          <div
            key={`${logo.id}-${index}`}
            className="flex-shrink-0 flex items-center justify-center px-1"
          >
            <img
              loading="lazy"
              src={logo.src}
              alt={logo.alt}
              className="max-h-12 w-auto object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardGraduated;


// import { useTranslation } from 'react-i18next';

// const CardGraduated = ({ data = [] }) => {
//   const { i18n } = useTranslation();
//   const isRTL = i18n.language === 'ar';

//   const apiLogos = data
//     .map((item, index) => ({
//       id: item.id || item.created_at || index,
//       src: item.image || item.logo,
//       alt: item.name || item.title || `Organization ${index + 1}`,
//     }))
//     .filter((logo) => logo.src);

//   const allLogos = [...apiLogos, ...apiLogos];
//   const logos = isRTL ? [...allLogos].reverse() : allLogos;

//   return (
//     <div className="my-8 w-full overflow-hidden" dir="ltr">
//       <style>{`
//         @keyframes scroll-infinite {
//           0%   { transform: translateX(0); }
//           100% { transform: translateX(-50%); }
//         }

//         .slider-track {
//           display: flex;
//           flex-direction: row;
//           flex-wrap: nowrap;
//           align-items: center;
//           width: max-content;
//           min-width: 200%;
//           will-change: transform;
//           animation: scroll-infinite ${Math.max(logos.length * 2, 20)}s linear infinite;
//           transform: translateZ(0);
//         }

//         .slider-track:hover {
//           animation-play-state: paused;
//         }

//         .slider-item {
//           flex-shrink: 0;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           padding: 0 16px;
//         }

//         .slider-item img {
//           height: 48px;
//           width: auto;
//           max-width: 120px;
//           object-fit: contain;
//           display: block;
//         }
//       `}</style>

//       <div className="slider-track">
//         {logos.map((logo, index) => (
//           <div key={`${logo.id}-${index}`} className="slider-item">
//             <img
//               loading="lazy"
//               src={logo.src}
//               alt={logo.alt}
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CardGraduated;