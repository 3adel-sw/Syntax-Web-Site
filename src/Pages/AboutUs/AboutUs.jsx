import HeroAbout from "./HeroAbout";
import MeetTeam from "./MeetTeam";
import MissionVisions from "./MissionVisions";
import CoreValues from "./CoreValues";
import OurAchievements from "./OurAchievements";
import Footer from "../../components/layout/Footer";
import SEO from "../../components/SEO";
import { LuLoaderCircle } from "react-icons/lu";
import { useState, useEffect } from "react";


const AboutUs = () => {
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const [loading, setLoading] = useState(true);
  if (loading) return <div className="flex justify-center items-center min-h-screen"><LuLoaderCircle size={70} className="animate-spin text-primary" /></div>;

  return (
    <div className="min-h-screen flex items-center justify-center md:max-w-5xl lg:max-w-6xl mx-auto ">
      <SEO
        title="عن أكاديمية Syntax - قصتنا ورسالتنا في تعليم التصميم"
        description="تعرّف على أكاديمية Syntax: قصتنا، رسالتنا، فريقنا، وإنجازاتنا في تعليم تصميم UX/UI باللغة العربية منذ 2020."
        keywords="عن Syntax, أكاديمية تصميم UX UI, فريق سينتاكس, قصة أكاديمية, تصميم عربي"
        url="/about"
        type="website"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          name: 'عن أكاديمية Syntax',
          description: 'قصة ورسالة أكاديمية Syntax في تعليم تصميم UX/UI',
          url: 'https://onsyntax.mhwaralabtikar.com/about',
          mainEntity: {
            '@type': 'EducationalOrganization',
            name: 'Syntax Academy',
            foundingDate: '2020',
            url: 'https://onsyntax.mhwaralabtikar.com/',
          },
        }}
        breadcrumb={[
          { '@type': 'ListItem', position: 1, name: 'الرئيسية', item: 'https://onsyntax.mhwaralabtikar.com/' },
          { '@type': 'ListItem', position: 2, name: 'عن سينتاكس', item: 'https://onsyntax.mhwaralabtikar.com/about' },
        ]}
      />
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
          <Footer />
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
