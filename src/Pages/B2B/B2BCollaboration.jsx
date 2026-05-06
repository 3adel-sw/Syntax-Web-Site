import Footer from "../../components/layout/Footer";
import HeroSection from "./HeroSection";
import ChooseCardTraining from "./ChooseCardTraining";
import LayersB2B from "./LayersB2B";
import ProgramVariations from "./ProgramVariations";


const B2BCollaboration = () => {
  return (
      <div className="min-h-screen home-page  flex items-center justify-center md:max-w-5xl lg:max-w-6xl mx-auto ">
      <div className="sm:max-w-5xl md:max-w-6xl w-[92%] lg:w-full text-center mx-1">
       
          {/* Hero Section */}
          <HeroSection />
          {/* Choose Cards Training */}
          <ChooseCardTraining />
          {/* Layers Section */}
          <LayersB2B />
          {/* Program Variations */}
          <ProgramVariations />
          {/* Footer */}
        <Footer />

      </div>
      </div>
   
  )
}

export default B2BCollaboration