const Overview = () => {
    return (
        <>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Description</h2>
              <p className="text-base text-gray-500 leading-relaxed mb-4">
                Master the art of digital marketing with this comprehensive course, designed to equip
                you with the skills needed to build and execute successful marketing strategies.
                Whether you're a beginner or looking to enhance your current knowledge, this course
                will guide you through key areas such as SEO, social media, content marketing, and
                analytics.
              </p>
              <ul className="space-y-2 mb-6">
                {[
                  { title: 'SEO Mastery', desc: 'Learn how to optimize websites for search engines to improve visibility and rankings.' },
                  { title: 'Content Creation', desc: 'Discover how to create compelling content that resonates with your target audience.' },
                  { title: 'Email Marketing', desc: 'Learn to design and execute successful email campaigns that convert.' },
                  { title: 'PPC Advertising', desc: 'Understand the essentials of paid advertising on platforms like Google and Facebook.' },
                ].map((item) => (
                  <li key={item.title} className="text-base text-gray-500 leading-relaxed">
                    • <strong className="text-gray-800">{item.title}:</strong> {item.desc}
                  </li>
                ))}
              </ul>

              <h2 className="text-xl font-bold text-gray-900 mb-3">Certifications</h2>
              <p className="text-base text-gray-500 leading-relaxed">
                Upon completing this course, you'll receive a recognized digital marketing
                certification that showcases your expertise and commitment to professional growth.
                This certification not only validates your knowledge in key areas like SEO, social
                media, and content marketing but also strengthens your resume and boosts your career
                prospects.
              </p>
            </>
    );
};
export default Overview;