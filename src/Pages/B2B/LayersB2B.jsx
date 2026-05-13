import { useState, useEffect } from 'react';
import { getOurNumbers } from '../../services/about/aboutService';

const LayersB2B = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOurNumbers()
      .then((res) => setItems(res.data.our_numbers || []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return null;

  const displayItems = [...items, ...items];

  return (
    <div className="md:my-20 sm:my-12 my-14 overflow-hidden w-full">
      <div className="flex items-center gap-4 animate-marquee whitespace-nowrap w-max hover:[animation-play-state:paused]">
        {displayItems.map((item, index) => (
          <div
            key={index}
            className="bg-[#F6F7FB] rounded-2xl py-3 md:py-4 px-3 md:px-4 flex-shrink-0"
          >
            <div className="flex flex-row items-center gap-3">
              <img
                src={item.image}
                alt={item.title}
                className="w-10 h-10 md:w-14 md:h-14 rounded-full object-cover shrink-0"
              />
              <div className="text-left whitespace-nowrap">
                <h3 className="text-sm md:text-base font-semibold text-gray-900 leading-tight">
                  {item.number}+
                </h3>
                <p className="text-xs md:text-sm font-medium text-gray-500 mt-1">
                  {item.title}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LayersB2B;