import Subscribe from "../../components/Ui/Subscribe";
import CardContact from "../../components/Ui/CardContact";
import CommunityCards from "../../components/Ui/CommunityCards";
import InboxAbout from "./inboxAbout"
import Footer from "../../components/layout/Footer";
import { LuLoaderCircle } from "react-icons/lu";
  import { useState ,useEffect} from "react";


const Contact = () => {
  useEffect(() => {
  // eslint-disable-next-line react-hooks/immutability
  const timer = setTimeout(() => setLoading(false), 3000);
  return () => clearTimeout(timer);
}, []);
  const [loading, setLoading] = useState(true);
  if (loading) return <div className="flex justify-center items-center min-h-screen"><LuLoaderCircle size={70} className="animate-spin text-primary" /></div>;
 
  return (
      <div className="min-h-screen flex items-center justify-center md:max-w-5xl lg:max-w-6xl mx-auto ">
      <div className="sm:max-w-5xl md:max-w-6xl w-[92%] lg:w-full text-center mx-1">
{/* ── HERO ── */}
<CardContact/>
      <div className=" mt-5 space-y-4 w-full ">
    {/* ── FORM + SIDEBAR ── */}
              <InboxAbout/>
         {/* ── COMMUNITY  ── */}
        <CommunityCards />
      {/* ── SUBSCRIBE  ── */}
       <Subscribe/>
      </div>
      {/* ── FOOTER  ── */}
      <Footer/>
    </div>
    </div>
    
  );
};

export default Contact;