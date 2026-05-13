
import { useTranslation } from 'react-i18next';

const Overview = ({ course }) => {
  const { t } = useTranslation();

  return (
    <>
      {/* Description */}
<h2 className="text-2xl font-semibold text-gray-900 mb-3">{t('courseDetails.description')}</h2>
<div
  dir="auto"
  className="prose prose-gray prose-li:marker:text-gray-800 max-w-none text-gray-500 leading-relaxed mb-8"
  dangerouslySetInnerHTML={{ __html: course?.description || t('common.notFound') }}
/>

{/* Certifications */}
<h2 className="text-2xl font-semibold text-gray-900 mb-3">{t('courseDetails.certifications')}</h2>
<div
  dir="auto"
  className="prose prose-gray max-w-none text-gray-500 leading-relaxed"
  dangerouslySetInnerHTML={{ __html: course?.certificationDesc || course?.certification_desc || t('common.notFound') }}
/>
    </>
  );
};

export default Overview;
