import AymanAboutR from "../../../public/images/AymanAboutR.webp"
import heroAboutleft from "../../../public/images/heroAboutleft.webp"

const HeroAbout = () => {
  return (
    <div className="w-full md:my-25 my-12">
      {/* ===== Hero Top Section ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start py-10">
        {/* Left: Badge + Title */}
        <div className="text-right md:text-left">
          <span className="inline-block bg-gray-900 text-white text-sm font-medium px-4 py-2 rounded-xl mb-4">
            About Us
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-900">
            Welcome to <br /> Syntax Community
          </h1>
        </div>

        {/* Right: Description + Buttons */}
        <div className="flex flex-col gap-6 justify-center">
          <p className="text-lg text-left text-gray-500 leading-relaxed">
            Zippay Bill Pay automates your entire accounts payable workflow so
            every bill is recorded, approved, and paid without any data entry
            or repetitive tasks
          </p>
          <div className="flex gap-4 flex-wrap">
            <button className="px-5 py-3.5 rounded-xl  text-gray-900 text-sm bg-[#F2F4F7] font-medium hover:bg-gray-900 hover:text-white  transition-colors">
              Contact US
            </button>
            <button className="px-5 py-3.5 rounded-xl hover:bg-gray-900 bg-transparent hover:text-white text-gray-900 text-sm font-medium  transition-colors">
              Start Learning
            </button>
          </div>
        </div>
      </div>

      {/*  Images   */}
      <div className="grid grid-cols-4 gap-4 mb-12">
        {/* Large classroom image */}
        <div className="col-span-3 rounded-3xl overflow-hidden h-82 md:h-[583px] ">
          <img
            src={heroAboutleft}
            alt="Syntax Community Classroom"
            className="w-full h-full object-cover"
          />
        </div>
        {/* Instructor image */}
        <div className="col-span-1 rounded-3xl overflow-hidden h-82 md:h-[583px] ">
          <img
            src={AymanAboutR}
            alt="Syntax Instructor"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* ===== What We Do Section ===== */}
      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-28 gap-10 items-start pb-10">
        {/* Left: Title */}
        <div className="md:col-span-1">
          <h2 className="text-5xl text-left pb-6 font-extrabold text-gray-900">What we do</h2>
        </div>

        {/* Right: Paragraphs */}
        <div className="md:col-span-2 flex flex-col gap-6">
          <p className="md:text-lg text-sm font-medium text-left text-[#797979] leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempos Lorem ipsum dolor sitamet, consectetur adipiscing elit, sed do eiusmod tempor


Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempos Lorem ipsum dolor sitamet, consectetur adipiscing elit, sed do eiusmod tempor
          </p>
          <p className="md:text-lg text-sm font-medium text-left text-[#797979] leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempos Lorem ipsum dolor sitamet, consectetur adipiscing elit, sed do eiusmod tempor


Lorem ipsum dolor sit amet, consectetur adipiscing elit, consectetur adipiscing elit, sed do eiusmod tempor
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroAbout;