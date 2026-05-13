import { FaAngleRight } from "react-icons/fa";
import { getHeroB2b } from "../../services/b2b/b2bService";
import { useEffect, useState } from "react";

const HeroSection = () => {
  const [heroData, setHeroData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getHeroB2b()
      .then((response) => setHeroData(response.data.b2b_hero[0]))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!heroData) return null;

    return (
         <div className="hero-section">
        <div className="mt-5">
            <h6 className='flex items-center justify-start gap-2'>Home  <span> <FaAngleRight size={12}/></span> B2B Collaboration</h6>

            <h2 className="font-semibold text-3xl sm:text-3xl leading-sm w-full text-left md:text-5xl my-12"> {heroData.title} </h2>
            <img 
            loading="lazy"
            src={heroData.image} className="w-full  mt-4" alt="B2BCollaborationImg" />
        </div>
        <div className="bg-[#F2F4F7] rounded-2xl p-10 my-10">
            <p className='text-md md:text-2xl text-gray-500 text-left'>
                {heroData.description}
                </p>
        </div>
        </div>
    )
}
export default HeroSection