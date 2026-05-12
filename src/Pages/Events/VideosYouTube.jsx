const toEmbedUrl = (url) => {
  if (!url) return '';

  if (url.includes('/embed/')) return url;

  const shortsMatch = url.match(/youtube\.com\/shorts\/([^?&/]+)/);
  if (shortsMatch?.[1]) return `https://www.youtube.com/embed/${shortsMatch[1]}`;

  const watchMatch = url.match(/[?&]v=([^?&]+)/);
  if (watchMatch?.[1]) return `https://www.youtube.com/embed/${watchMatch[1]}`;

  const shortMatch = url.match(/youtu\.be\/([^?&/]+)/);
  if (shortMatch?.[1]) return `https://www.youtube.com/embed/${shortMatch[1]}`;

  return url;
};

const VideosYouTube = ({ videos = [] }) => {
  if (!videos.length) {
    return (
      <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6 text-center text-sm text-gray-400 mb-6">
        No videos available.
      </div>
    );
  }

  return (
    <div className="space-y-4 mb-6">
      {videos.map((video, index) => {
        const url = typeof video === 'string' ? video : video.url;
        const title = typeof video === 'string' ? `Event video ${index + 1}` : video.title;

        return (
          <div key={url || index} className="rounded-2xl overflow-hidden border border-gray-100">
            <div className="bg-gray-50 px-4 py-2 border-b border-gray-100">
              <p className="text-xs text-gray-500">{title}</p>
            </div>
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                src={toEmbedUrl(url)}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
                style={{ border: 'none' }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default VideosYouTube;
