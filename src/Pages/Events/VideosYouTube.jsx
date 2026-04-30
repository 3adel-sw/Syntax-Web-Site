
const EVENT = {
  title: 'The Psychology Behind UX Design',
  location: 'Cairo',
  date: '24/07/2024',
  time: '2 PM – 6 PM',
  mode: 'Online',
  image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=280&fit=crop',
  
 
  videos: [
    {
      id: 1,
      url: 'https://www.youtube.com/embed/tEjQypUGQNo',
      title: 'Sed malesuada felis vitae blandit molestie',
    },
    {
      id: 2,
      url: 'https://www.youtube.com/embed/mohOp9vNHjk', 
      title: 'Sed malesuada felis vitae blandit molestie',
    },
  ],

  description: `Lorem ipsum dolor sit amet...`,
  aboutSpeakers: `Lorem ipsum dolor sit amet...`,
};
const VideosYouTube = () => {
  return (
    <div>
      {/* ── Videos ── */}
<div className="space-y-4 mb-6">
  {EVENT.videos.map((video) => (
    <div key={video.id} className="rounded-2xl overflow-hidden border border-gray-100">
      {/* Title bar */}
      <div className="bg-gray-50 px-4 py-2 border-b border-gray-100">
        <p className="text-xs text-gray-500">{video.title}</p>
      </div>
      {/* YouTube iframe */}
      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
        <iframe
          src={video.url}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
          style={{ border: 'none' }}
        />
      </div>
    </div>
  ))}
</div>

{/* Event Description */}

{EVENT.description.split('\n\n').map((para, i) => (
  <p key={i} className="text-xs text-gray-500 leading-relaxed mb-4">{}</p>
))}
    </div>
  )
}

export default VideosYouTube