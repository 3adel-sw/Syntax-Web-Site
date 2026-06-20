


const CardGraduated = ({ data = [] }) => {
  const apiLogos = data
    .map((item, index) => ({
      id: item.id || item.created_at || index,
      src: item.image || item.logo,
      alt: item.name || item.title || `Organization ${index + 1}`,
    }))
    .filter((logo) => logo.src);
      const visibleLogos = apiLogos;
  const allLogos = [...visibleLogos, ...visibleLogos, ...visibleLogos];

  return (
    <div className="my-8 overflow-hidden">
      <div className="flex items-center md:gap-4 gap-1 animate-marquee whitespace-nowrap">
        {allLogos.map((logo, index) => (
          <div key={`${logo.id}-${index}`} className="flex-shrink-0 flex items-center justify-center px-1">
            <img 
            loading="lazy"
            fetchPriority="high"
            src={logo.src} alt={logo.alt} className="max-h-12 w-auto object-contain" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default CardGraduated
