import { Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


const EventCard = ({ event }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
  <div  
  onClick={() => navigate(`/events-detail/${event.id}`)}
  className="bg-white rounded-2xl border  h-fit border-gray-200 p-2  overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-300 cursor-pointer"
      >
         <div className="h-67 flex items-center rounded-2xl justify-center relative overflow-hidden">
      <div className="w-full h-full rounded-lg overflow-hidden">
        <img
          loading="lazy"
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.parentElement.innerHTML = `
              <div style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;background:#f3f4f6;border-radius:8px;">
                <span style="font-size:12px;color:#9ca3af;">${t('common.imageNotAvailable')}</span>
              </div>`;
          }}
        />
      </div>
    </div>
    <div className="p-2.5 text-start space-y-2">
      <span className="inline-block bg-[#EDEEF9] text-primary text-[11px] font-semibold tracking-wider px-3 py-1 rounded-md mb-3">{event.type}</span>
      <h3 className="text-[17px] font-bold text-gray-900 mb-2 leading-snug mt-2">{event.title}</h3>
      <div className="flex items-center gap-3 text-sm my-4 text-gray-500">
        <Clock  size={18} />
        <span>{event.duration}</span>
      </div>
    </div>
  </div>
);
};
export default EventCard;
