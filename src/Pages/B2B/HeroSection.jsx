import B2BCollaborationImg from "../../../public/images/B2BHero.webp";
import { FaAngleRight } from "react-icons/fa";

const HeroSection = () => {
    return (
         <div className="hero-section">
        <div className="mt-5">
            <h6 className='flex items-center justify-start gap-2'>Home  <span> <FaAngleRight size={12}/></span> B2B Collaboration</h6>

            <h2 className="font-semibold text-3xl sm:text-3xl leading-sm w-full text-left md:text-5xl my-12"> To help businesses thrive in the digital era, we provide training to both people and teams. </h2>
            <img src={B2BCollaborationImg} className="w-full  mt-4" alt="B2BCollaborationImg" />
        </div>
        <div className="bg-[#F2F4F7] rounded-2xl p-10 my-10">
            <p className='text-md md:text-2xl text-gray-500 text-left'>
                Our training programs' main objective is to assist you in creating better goods, services, procedures, tactics, environments, and experiences. We assist people and groups in creating creative and workable answers to UX design issues.
                </p>
        </div>
        </div>
    )
}
export default HeroSection