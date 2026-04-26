 import {  Globe } from 'lucide-react' ;
import Logo from '../../assets/logo.svg'

const Footer = () => {
  return (
    <div className="pb-2 md:px-8 sm:px-6 px-4">
      <div className="max-w-5xl mx-auto bg-gray-50 border border-gray-200 rounded-3xl px-10 py-10">
        <div className="grid  grid-cols-1 md:grid-cols-4 md:gap-20 sm:gap-10 gap-6">

          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className=""><img src={Logo} className='w-40 h-12 object-cover' alt="logo" /></span>
            </div>
            <p className="text-sm text-left text-gray-500 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua Quis ipsum suspendisse ultrices gravida.
            </p>
            {/* Social Icons */}
            <div className="flex  items-start gap-3 mt-1">
              <a href="#" className="text-gray-900 hover:text-[#1e2d6b] transition-colors">
                <Globe size={22} />
              </a>
              <a href="#" className="text-gray-900 hover:text-[#1e2d6b] transition-colors">
                <Globe size={22} />
              </a>
              <a href="#" className="text-gray-900 hover:text-[#1e2d6b] transition-colors">
                <Globe size={22} />
              </a>
              <a href="#" className="text-gray-900 hover:text-[#1e2d6b] transition-colors">
                  <Globe size={22} />
              </a>
              <a href="#" className="text-gray-900 hover:text-[#1e2d6b] transition-colors">
                  <Globe size={22} />
              </a>
            </div>
          </div>

          {/* Solutions */}
          <div className="text-left">
            <h4 className="text-lg font-bold text-gray-750 mb-4">Solutions</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              {["Academy", "UX Design Meetup", "7orof Podcast", "Newsletter", "Community"].map(item => (
                <li key={item}>
                  <a href="#" className="hover:text-[#1e2d6b] transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="text-left">
            <h4 className="text-lg font-bold text-gray-750 mb-4">Resources</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              {["Blog", "Resources", "Free Courses", "Books"].map(item => (
                <li key={item}>
                  <a href="#" className="hover:text-[#1e2d6b] transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="text-left">
            <h4 className="text-lg font-bold text-gray-750 mb-4">Company</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              {["About", "History", "Contact"].map(item => (
                <li key={item}>
                  <a href="#" className="hover:text-[#1e2d6b] transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className=" mt-5 pt-6 text-center text-sm text-gray-400">
          © 2025 onsyntax.com
        </div>
      </div>
    </div>
  );
};

export default Footer;