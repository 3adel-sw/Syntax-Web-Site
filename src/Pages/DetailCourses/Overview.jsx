
  const toStr = (val) => {
    if (!val) return '';
    if (typeof val === 'object') return val?.name || val?.title || '';
    return val;
  };

const Overview = ({ course }) => {
   
    return (
        <>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">Description</h2>
              <p className="text-base text-gray-500 leading-relaxed mb-4">
                  {toStr(course?.description) || ' UnFound  '}
              </p>
              <ul className="space-y-2 mb-6">
               {course?.topics?.length > 0 ? (
  <ul className="space-y-2 mb-6">
    {course.topics.map((item, index) => (
      <li key={index} className="text-base text-gray-500 leading-relaxed">
        • <strong className="text-gray-800">
          {toStr(item.title) || toStr(item.name) || toStr(item)}:
        </strong>{' '}
        {toStr(item.desc) || toStr(item.description) || ''}
      </li>
    ))}
  </ul>
) : (
  <p className="text-gray-400 mb-6">No topics found.</p>
)}
              </ul>

              <h2 className="text-2xl font-semibold text-gray-900 mb-3">Certifications</h2>
              <p className="text-base text-gray-500 leading-relaxed">
                  {toStr(course?.certificationDesc) || 
                  toStr(course?.certification_desc) ||
                  toStr(course?.certification) ||
                  toStr(course?.certificate) ||
                  toStr(course?.certificateDesc) ||
                  'UnFound'}
                </p>
            </>
    );
};
export default Overview;