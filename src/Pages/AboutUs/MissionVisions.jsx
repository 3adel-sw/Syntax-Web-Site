import missionVisiomImg from '../../../public/images/MissionVisions.webp'


const MissionVisions = () => {
  //   API useEffect
  const data = {
    badge: "Our Mission & Visions",
    title: "Empowering innovative Creatives.",
    image: missionVisiomImg,
    cards: [
      {
        id: 1,
        heading: "Our Mission",
        body: `We're in the middle of a design revolution as more companies take a design-first approach to product development. The number of UX professionals is expected to increase 10-fold between now and. We're in the middle of a design revolution as more companies take a design-first approach to product development. The number of UX professionals is expected to increase 10-fold between now and`,
      },
      {
        id: 2,
        heading: "Our Vision",
        body: `We're in the middle of a design revolution as more companies take a design-first approach to product development. The number of UX professionals is expected to increase 10-fold between now and. We're in the middle of a design revolution as more companies take a design-first approach to product development. The number of UX professionals is expected to increase 10-fold between now and`,
      },
    ],
  };

  // MissionVisions.jsx
// useEffect(() => {
//   fetch("https://your-api.com/api/mission-visions")
//     .then((r) => r.json())
//     .then(setData);
// }, []);

  return (
    <section className="w-full my-12 md:my-25 text-left">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {/* Left: Image */}
        <div className="rounded-4xl  md:col-span-1 overflow-hidden h-82 md:h-full min-h-[583px] bg-gray-200">
          <img
            src={data.image}
            alt="Mission"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.parentNode.style.background = "#c5cdd8";
              e.target.style.display = "none";
            }}
          />
        </div>

        {/* Right: Content */}
        <div className="md:col-span-2">
        <div className="flex flex-col gap-4">
          {/* Badge */}
          <span className="text-xl font-semibold text-[#B71C41]  tracking-wide pt-4 text-left">
            {data.badge}
          </span>

          {/* Title */}
          <h2 className="md:text-[42px] text-xl font-bold text-gray-900 mb-4 leading-tight text-left">
            {data.title}
          </h2>

          {/* Cards */}
          <div className="flex flex-col gap-4">
            {data.cards.map((card) => (
              <div
                key={card.id}
                className="border border-gray-200 rounded-2xl md:p-6 p-3 bg-white/80"
              >
                <h3 className="md:text-xl text-base font-medium text-gray-900 mb-2">
                  {card.heading}
                </h3>
                <p className="md:text-lg text-sm text-gray-500 leading-relaxed">
                  {card.body}
                </p>
              </div>
            ))}
          </div>
        </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVisions;