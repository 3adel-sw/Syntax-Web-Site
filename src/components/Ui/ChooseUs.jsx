import { FaLaptopCode } from "react-icons/fa";
import { GrDocument   } from "react-icons/gr";
const ChooseUs = () => {
  return (
  <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Why Choose us?</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: <GrDocument /> , title: 'Showcase Work', desc: 'Showcase your project to stand out among all' },
            { icon: <FaLaptopCode /> , title: 'Resume Builder', desc: "Create a professional resume using our built-in resume builder" },
            { icon: <FaLaptopCode />, title: 'Showcase Work', desc: 'Showcase your project to stand out among all' },
            { icon: <GrDocument />, title: 'Resume Builder', desc: "Create a professional resume using our built-in resume builder" },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-2 border border-gray-200 rounded-2xl p-5 bg-white">
              <div className="w-12 h-12  rounded-xl flex items-center justify-center text-2xl">
                {item.icon}
              </div>
              <p className="text-base max-w-3xl font-semibold text-gray-800">{item.title}</p>
              <p className="text-sm  text-gray-500 text-center">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
  )
}

export default ChooseUs