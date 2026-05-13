import { useEffect, useState } from "react";
import Footer from "../../components/layout/Footer";
import HeroSection from "./HeroSection";
import ChooseCardTraining from "./ChooseCardTraining";
import LayersB2B from "./LayersB2B";
import ProgramVariations from "./ProgramVariations";
import FormTrainingForCorporation from "./FormTrainingForCorporation";
import CardGraduated from '../../components/Ui/CardGraduated';
import { getOrganizations } from "../../services/home/homeService";
import { LuLoaderCircle } from "react-icons/lu";
import { useTranslation } from "react-i18next";


const B2BCollaboration = () => {
  const { t } = useTranslation();
  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);
    const [loading, setLoading] = useState(true);
  
  const [organizations, setOrganizations] = useState([]);

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const res = await getOrganizations();
        setOrganizations(res.data?.organizations || res.data || []);
      } catch (err) {
        console.error('Failed to load organizations:', err);
      }
    };

    fetchOrganizations();
  }, []);
   if (loading) return <div className="flex justify-center items-center min-h-screen"><LuLoaderCircle size={70} className="animate-spin text-primary" /></div>;
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
             {/* Graduates */}
        <div className='md:my-22 sm:my-16 my-16 lg:my-24'>
          <div className=' space-y-5'>
            <h3 className='md:text-2xl text-xl  text-gray-500 leading-snug'>{t("b2b.graduates")}</h3>
            {/* Cards */}
           <CardGraduated data={organizations} />
          </div>
         {/* Form Training For Corporation */}
        <FormTrainingForCorporation />
        </div>
          {/* Footer */}
        <Footer />

      </div>
      </div>
   
  )
}

export default B2BCollaboration
