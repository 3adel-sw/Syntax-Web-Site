import { useEffect, useState } from 'react';
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { getSetting } from '../../services/home/homeService';
import { useTranslation } from 'react-i18next';
import { FaXTwitter } from "react-icons/fa6";
import logoFooter from '../../assets/logoFooter.svg';

const Footer = () => {
  const { t } = useTranslation();
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await getSetting();
setSettings(res.data?.settings ?? null);
      } catch (err) {
        console.error('Failed to load footer settings:', err);
      }
    };

    fetchSettings();
  }, []);

  const socialLinks = [
    { key: 'facebook', href: settings?.social?.facebook, icon: <FaFacebook size={22} /> },
    // { key: 'github', href: settings?.social?.github, icon: <FaGithub size={22} /> },
    { key: 'X', href: settings?.social?.twitter, icon: <FaXTwitter size={22} /> },
    { key: 'instagram', href: settings?.social?.instagram, icon: <FaInstagram size={22} /> },
    { key: 'linkedin', href: settings?.social?.linkedin, icon: <FaLinkedin size={22} /> },
    { key: 'tiktok', href: settings?.social?.tiktok, icon: <FaTiktok size={22} /> },
    { key: 'youtube', href: settings?.social?.youtube, icon: <FaYoutube size={22} /> },
    { key: 'whatsapp', href: settings?.social?.whatsapp, icon: <FaWhatsapp size={22} /> },
  ].filter((item) => item.href);

  return (
   <div className="pb-2 mx-auto my-10 w-full">
  <div className="md:max-w-full mx-auto rounded-3xl px-10 py-10 bg-primary">
    
    {/* Grid: mobile = brand full width + 3 cols below | desktop = 4 cols */}
    <div className="grid grid-cols-1 md:grid-cols-4 lg:gap-40 md:gap-32 sm:gap-24 gap-8">

      {/* Brand - full width on mobile */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 w-40 h-12">
          {(settings?.footer_logo || settings?.logo) && (
  <img 
  loading="lazy"
  src={settings?.footer_logo || settings?.logo || logoFooter} 
  className='w-36 h-auto object-contain' 
  alt={t('common.brandLogo')}
  onError={(e) => {
    e.target.onerror = null;
    e.target.src = logoFooter; 
  }}
/>
)}
        </div>
        <p className="text-sm text-start text-white leading-relaxed">
          {settings?.description || t('footer.fallbackDescription')}
        </p>
        {/* Social Icons */}
        <div className="flex items-start gap-3 mt-1">
          {socialLinks.map((item) => (
            <a
              key={item.key}
              target="_blank"
              rel="noopener noreferrer"
              href={item.href}
              className="text-white/80 hover:text-white hover:scale-160 transition-all duration-200"
            >
              {item.icon}
            </a>
          ))}
        </div>
      </div>

      {/* Links wrapper: on mobile = 3 cols in one row, on desktop = 3 separate grid cols */}
      <div className="grid grid-cols-2 text-start  md:contents gap-12 md:gap-14">

        {/* Solutions */}
        <div >
          <h4 className="text-xl font-bold text-white mb-4">{t('footer.solutions')}</h4>
          <ul className="space-y-4.5 text-base text-white/90">
            {[
              ['footer.academy', '/courses'],
              ['footer.uxDesignMeetup', '/events'],
              ['footer.podcast', '/podcasts'],
              ['footer.newsletter', '/contact'],
              ['footer.community', '/community'],
            ].map(([key, href]) => (
              <li key={key}><a href={href} className="hover:text-white transition-colors">{t(key)}</a></li>
            ))}
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="text-xl font-bold text-white mb-4">{t('footer.resources')}</h4>
          <ul className="space-y-4.5 text-base text-white/90">
            {[
              ['footer.blog', '/blogs'],
              ['footer.resources', '/resources'],
              ['footer.freeCourses', '/courses'],
              ['footer.books', '/books'],
            ].map(([key, href]) => (
              <li key={key}><a href={href} className="hover:text-white transition-colors">{t(key)}</a></li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div className="hidden md:flex flex-col gap-4">
          <h4 className="text-xl font-bold text-white ">{t('footer.company')}</h4>
          <ul className="space-y-4.5 text-base text-white/90">
            {[
              ['nav.about', '/about'],
              ['footer.history', '/history'],
              ['nav.contact', '/contact'],
            ].map(([key, href]) => (
              <li key={key}><a href={href} className="hover:text-white transition-colors">{t(key)}</a></li>
            ))}
          </ul>
        </div>

      </div>
      {/* Company Mobile*/}
        <div className="md:hidden flex flex-col  items-start  gap-6">
          <h4 className="text-xl font-semibold text-white ">{t('footer.company')}</h4>
          <ul className="flex flex-row gap-4  text-base text-white/90">
            {[
              ['nav.about', '/about'],
              ['footer.history', '/history'],
              ['nav.contact', '/contact'],
            ].map(([key, href]) => (
              <li key={key}><a href={href} className="hover:text-white transition-colors">{t(key)}</a></li>
            ))}
          </ul>
        </div>
    </div>

    {/* Bottom copyright */}
    <div className="mt-5 pt-6 text-center text-sm text-white">
      {t('footer.copyright')}
    </div>
  </div>
</div>
  );
};

export default Footer;
