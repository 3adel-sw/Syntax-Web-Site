


const Overview = ({ course }) => {
  return (
    <>
      {/* Description */}
<h2 className="text-2xl font-semibold text-gray-900 mb-3">Description</h2>
<div
  dir="auto"
  className="prose prose-gray prose-li:marker:text-gray-800 max-w-none text-gray-500 leading-relaxed mb-8"
  dangerouslySetInnerHTML={{ __html: course?.description || 'Not found' }}
/>

{/* Certifications */}
<h2 className="text-2xl font-semibold text-gray-900 mb-3">Certifications</h2>
<div
  dir="auto"
  className="prose prose-gray max-w-none text-gray-500 leading-relaxed"
  dangerouslySetInnerHTML={{ __html: course?.certificationDesc || course?.certification_desc || 'Not found' }}
/>
    </>
  );
};

export default Overview;