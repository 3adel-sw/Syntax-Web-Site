
import Spherulelogo from '../../assets/Spherulelogo.svg'
import Boltshiftlogo from '../../assets/Boltshiftlogo.svg'
import FeatherDevlogologo from '../../assets/FeatherDevlogologo.svg'
import Fictionalcompanylogo from '../../assets/Fictionalcompanylogo.svg'
import Lightboxlogo from '../../assets/Lightboxlogo.svg'
import globalBanklogo from '../../assets/globalBanklogo.svg'

const CardGraduated = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-6 gap-4">
        <div>
            <img src={Spherulelogo} alt="Spherulelogo" />
        </div>
        <div>
            <img src={Boltshiftlogo} alt="Boltshiftlogo" />
        </div>
        <div>
            <img src={FeatherDevlogologo} alt="FeatherDevlogologo" />
        </div>
        <div>
            <img src={Fictionalcompanylogo} alt="Fictionalcompanylogo" />
        </div>
        <div>
            <img src={Lightboxlogo} alt="Lightboxlogo" />
        </div>
        <div>
            <img src={globalBanklogo} alt="globalBanklogo" />
        </div>
    </div>
  )
}

export default CardGraduated