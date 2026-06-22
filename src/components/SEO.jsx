import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * SEO Component - Sets dynamic meta tags, OG tags, Twitter cards, and Schema.org JSON-LD
 * Use this in every page to manage per-route SEO
 *
 * @param {Object} props
 * @param {string} props.title - Page title (will be appended with site name)
 * @param {string} props.description - Meta description (max 200 chars)
 * @param {string} props.keywords - Comma-separated keywords
 * @param {string} props.url - Canonical URL of this page
 * @param {string} props.image - OG image URL (1200x630 recommended)
 * @param {string} props.type - OG type (website, article, course, event)
 * @param {Object} props.schema - Schema.org JSON-LD object
 * @param {string} props.breadcrumb - BreadcrumbList array for breadcrumb schema
 * @param {string} props.locale - ar_AR or en_US
 */
const SEO = ({
  title,
  description,
  keywords,
  url,
  image = 'https://onsyntax.mhwaralabtikar.com/og-image.png',
  type = 'website',
  schema = null,
  breadcrumb = null,
  locale = 'ar_AR',
}) => {
  const { i18n } = useTranslation();
  const siteName = 'Syntax Academy';
  const siteUrl = 'https://onsyntax.mhwaralabtikar.com';
  const fullTitle = title ? `${title} | ${siteName}` : `${siteName} | كورسات تصميم UX/UI بالعربي`;
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl;
  const finalDescription = description || 'تعلم تصميم UX/UI باحترافية مع Syntax. كورسات عربية شاملة في تجربة المستخدم، واجهات التطبيقات، Figma، وأدوات التصميم الحديثة.';
  const finalKeywords = keywords || 'كورس UX UI بالعربي, تعلم تصميم واجهات, كورس Figma, تجربة المستخدم, تصميم تطبيقات';

  // Stringify once to use as stable dependency (prevents infinite loop)
  const schemaString = schema ? JSON.stringify(schema) : '';
  const breadcrumbString = breadcrumb ? JSON.stringify(breadcrumb) : '';

  // Track last applied values to avoid unnecessary DOM writes
  const lastApplied = useRef({});

  useEffect(() => {
    // Helper to set meta
    const setMeta = (selector, attr, value) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        const [attrName, attrValue] = attr.split('=');
        el.setAttribute(attrName, attrValue.replace(/['"]/g, ''));
        document.head.appendChild(el);
      }
      el.setAttribute('content', value);
    };

    const removeMeta = (selector) => {
      const el = document.querySelector(selector);
      if (el) el.remove();
    };

    const key = `${fullTitle}|${finalDescription}|${fullUrl}|${image}|${type}|${locale}|${schemaString}|${breadcrumbString}`;

    // Skip if nothing changed (prevents redundant DOM writes)
    if (lastApplied.current.key === key) return;
    lastApplied.current.key = key;

    // Document title
    document.title = fullTitle;

    // Standard meta tags
    setMeta('meta[name="description"]', 'name="description"', finalDescription);
    setMeta('meta[name="keywords"]', 'name="keywords"', finalKeywords);

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = fullUrl;

    // Hreflang - remove old then add new
    removeMeta('link[hreflang="ar"]');
    const hreflangAr = document.createElement('link');
    hreflangAr.rel = 'alternate';
    hreflangAr.hreflang = 'ar';
    hreflangAr.href = fullUrl;
    document.head.appendChild(hreflangAr);

    removeMeta('link[hreflang="x-default"]');
    const hreflangDefault = document.createElement('link');
    hreflangDefault.rel = 'alternate';
    hreflangDefault.hreflang = 'x-default';
    hreflangDefault.href = fullUrl;
    document.head.appendChild(hreflangDefault);

    // Open Graph
    setMeta('meta[property="og:type"]', 'property="og:type"', type);
    setMeta('meta[property="og:url"]', 'property="og:url"', fullUrl);
    setMeta('meta[property="og:title"]', 'property="og:title"', fullTitle);
    setMeta('meta[property="og:description"]', 'property="og:description"', finalDescription);
    setMeta('meta[property="og:image"]', 'property="og:image"', image);
    setMeta('meta[property="og:site_name"]', 'property="og:site_name"', siteName);
    setMeta('meta[property="og:locale"]', 'property="og:locale"', locale);

    // Twitter
    setMeta('meta[name="twitter:card"]', 'name="twitter:card"', 'summary_large_image');
    setMeta('meta[name="twitter:url"]', 'name="twitter:url"', fullUrl);
    setMeta('meta[name="twitter:title"]', 'name="twitter:title"', fullTitle);
    setMeta('meta[name="twitter:description"]', 'name="twitter:description"', finalDescription);
    setMeta('meta[name="twitter:image"]', 'name="twitter:image"', image);

    // Schema.org JSON-LD
    const schemasToInject = [];
    if (schema) {
      schemasToInject.push({ id: 'seo-schema', data: schema });
    }
    if (breadcrumb) {
      schemasToInject.push({
        id: 'seo-breadcrumb',
        data: {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: breadcrumb,
        },
      });
    }

    schemasToInject.forEach(({ id, data }) => {
      document.getElementById(id)?.remove();
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = id;
      script.text = JSON.stringify(data);
      document.head.appendChild(script);
    });

    // Cleanup on unmount only
    return () => {
      document.getElementById('seo-schema')?.remove();
      document.getElementById('seo-breadcrumb')?.remove();
      lastApplied.current.key = '';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fullTitle, finalDescription, finalKeywords, fullUrl, image, type, locale, schemaString, breadcrumbString]);

  return null;
};

export default SEO;
