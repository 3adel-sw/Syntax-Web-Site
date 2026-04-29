
import Spherulelogo from '../../assets/Spherulelogo.svg'
import Boltshiftlogo from '../../assets/Boltshiftlogo.svg'
import FeatherDevlogologo from '../../assets/FeatherDevlogologo.svg'
import Fictionalcompanylogo from '../../assets/Fictionalcompanylogo.svg'
import Lightboxlogo from '../../assets/Lightboxlogo.svg'
import globalBanklogo from '../../assets/globalBanklogo.svg'

const logos = [
  { id: 1, src: Spherulelogo, alt: 'Spherulelogo' },
  { id: 2, src: Boltshiftlogo, alt: 'Boltshiftlogo' },
  { id: 3, src: FeatherDevlogologo, alt: 'FeatherDevlogologo' },
  { id: 4, src: Fictionalcompanylogo, alt: 'Fictionalcompanylogo' },
  { id: 5, src: Lightboxlogo, alt: 'Lightboxlogo' },
  { id: 6, src: globalBanklogo, alt: 'globalBanklogo' },
];

const CardGraduated = () => {
  const allLogos = [...logos, ...logos, ...logos];

  return (
    <div className="my-8 overflow-hidden">
      <div className="flex items-center gap-8 animate-marquee whitespace-nowrap">
        {allLogos.map((logo, index) => (
          <div key={`${logo.id}-${index}`} className="flex-shrink-0 flex items-center justify-center px-4">
            <img src={logo.src} alt={logo.alt} className="max-h-12 w-auto object-contain" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default CardGraduated
