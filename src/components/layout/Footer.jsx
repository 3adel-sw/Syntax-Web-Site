
import Logo from '../../assets/logoo.svg'
import { FaFigma } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
   <div className="pb-2 mx-auto my-10 w-full">
  <div className="md:max-w-full mx-auto bg-[#F7F4F2] border border-gray-200 rounded-3xl px-10 py-10">
    
    {/* Grid: mobile = brand full width + 3 cols below | desktop = 4 cols */}
    <div className="grid grid-cols-1 md:grid-cols-4 md:gap-20 gap-8">

      {/* Brand - full width on mobile */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 w-40 h-12">
          <img src={Logo} className='w-full object-cover' alt="logo" />
        </div>
        <p className="text-sm text-left text-gray-500 leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua Quis ipsum suspendisse ultrices gravida.
        </p>
        {/* Social Icons */}
        <div className="flex items-start gap-3 mt-1">
          <a href="#" className="text-gray-900 hover:text-primary transition-colors"><FaFigma size={22} /></a>
          <a href="#" className="text-gray-900 hover:text-primary transition-colors"><FaFacebook size={22} /></a>
          <a href="#" className="text-gray-900 hover:text-primary transition-colors"><FaGithub size={22} /></a>
          <a href="#" className="text-gray-900 hover:text-primary transition-colors"><FaTwitter size={22} /></a>
          <a href="#" className="text-gray-900 hover:text-primary transition-colors"><FaInstagram size={22} /></a>
          <a href="#" className="text-gray-900 hover:text-primary transition-colors"><FaLinkedin size={22} /></a>
        </div>
      </div>

      {/* Links wrapper: on mobile = 3 cols in one row, on desktop = 3 separate grid cols */}
      <div className="grid grid-cols-2 text-left md:text-center md:contents gap-6 md:gap-0">

        {/* Solutions */}
        <div >
          <h4 className="text-lg font-bold text-gray-750 mb-4">Solutions</h4>
          <ul className="space-y-4.5 text-sm text-gray-500">
            {["Academy", "UX Design Meetup", "7orof Podcast", "Newsletter", "Community"].map(item => (
              <li key={item}><a href="#" className="hover:text-primary transition-colors">{item}</a></li>
            ))}
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="text-lg font-bold text-gray-750 mb-4">Resources</h4>
          <ul className="space-y-4.5 text-sm text-gray-500">
            {["Blog", "Resources", "Free Courses", "Books"].map(item => (
              <li key={item}><a href="/blogs" className="hover:text-primary transition-colors">{item}</a></li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div className="hidden md:flex flex-col gap-6">
          <h4 className="text-lg font-bold text-gray-750 mb-4">Company</h4>
          <ul className="space-y-4.5 text-sm text-gray-500">
            {["About", "History", "Contact"].map(item => (
              <li key={item}><a href="/Contact" className="hover:text-primary transition-colors">{item}</a></li>
            ))}
          </ul>
        </div>

      </div>
      {/* Company Mobile*/}
        <div className="md:hidden flex flex-col  items-start  gap-6">
          <h4 className="text-lg font-semibold text-gray-750 ">Company</h4>
          <ul className="flex flex-row gap-4  text-sm text-gray-500">
            {["About", "History", "Contact"].map(item => (
              <li key={item}><a href="/Contact" className="hover:text-primary transition-colors">{item}</a></li>
            ))}
          </ul>
        </div>
    </div>

    {/* Bottom copyright */}
    <div className="mt-5 pt-6 text-center text-sm text-gray-400">
      © 2025 onsyntax.com
    </div>
  </div>
</div>
  );
};

export default Footer;