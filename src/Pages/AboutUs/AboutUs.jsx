import HeroAbout from "./HeroAbout";
import MeetTeam from "./MeetTeam";
import MissionVisions from "./MissionVisions";
import CoreValues from "./CoreValues";
import OurAchievements from "./OurAchievements";
import Footer from "../../Components/Layout/Footer";


const AboutUs = () => {
  return (
    <div className="min-h-screen   flex items-center justify-center md:max-w-5xl lg:max-w-6xl mx-auto ">
      <div className="sm:max-w-5xl md:max-w-6xl w-[92%] lg:w-full text-center mx-1">
       
    <section>
      {/* HeroAbout */}
        <HeroAbout />
        {/* MissionVisions */}
        <MissionVisions />
        {/* CoreValues */}
        <CoreValues />
        {/* MeetTeam */}
        <MeetTeam />
        {/* OurAchievements */}
        <OurAchievements />
        {/* Footer */}
        <Footer/>
       
    </section>
    </div>
    </div>
  )
}

export default AboutUs  