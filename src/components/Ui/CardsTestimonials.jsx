const testimonials = [
  {
    id: 1,
    quote: "I really like how it suggests edits to existing code. It noticed I was inconsistent with my markup and popped up this suggestion that matched my other items!",
    name: "Marc Köhlbrugge",
    role: "WIP",
    initials: "MK",
    color: "bg-blue-50 text-blue-700",
  },
  {
    id: 2,
    quote: "After many recommendations, I finally switched and wow! It's absolutely incredible. There is no going back.",
    name: "Johannes Schickling",
    role: "Prisma",
    initials: "JS",
    color: "bg-orange-50 text-orange-700",
  },
  {
    id: 3,
    quote: "It is so good and literally gets better, more feature-rich every couple of weeks.",
    name: "Morgan McGuire",
    role: "Weights & Biases",
    initials: "MM",
    color: "bg-red-50 text-red-700",
  },
  {
    id: 4,
    quote: "Started using it yesterday and I'm blown away. It's how Copilot should feel. I'm completely off VSCode now.",
    name: "Sam Whitmore",
    role: "New Computer",
    initials: "SW",
    color: "bg-green-50 text-green-700",
  },
  {
    id: 5,
    quote: "It is for real.",
    name: "Steven Tey",
    role: "Dub",
    initials: "ST",
    color: "bg-purple-50 text-purple-700",
  },
  {
    id: 6,
    quote: "It is awesome! Someone finally put GPT into a code editor in a seamless way. It's so elegant and easy. I'm an hour in and already hooked.",
    name: "Andrew McCallip",
    role: "Varda",
    initials: "AM",
    color: "bg-indigo-50 text-indigo-700",
  },
  {
    id: 7,
    quote: "I really like how it suggests edits to existing code. It noticed I was inconsistent with my markup and popped up this suggestion.",
    name: "Logan Kilpatrick",
    role: "Google",
    initials: "LK",
    color: "bg-rose-50 text-rose-700",
  },
  {
    id: 8,
    quote: "I really like how it suggests edits to code. It noticed I was inconsistent with my markup.",
    name: "Wes Bos",
    role: "Internet",
    initials: "WB",
    color: "bg-emerald-50 text-emerald-700",
  },
  {
    id: 9,
    quote: "It is at least a 2x improvement over Copilot. It's amazing having an AI pair programmer, and is an incredible accelerator for me and my team.",
    name: "Ben Bernard",
    role: "Instacart",
    initials: "BB",
    color: "bg-amber-50 text-amber-700",
  },
];

const splitIntoColumns = (arr, cols) => {
  const columns = Array.from({ length: cols }, () => []);
  arr.forEach((item, i) => columns[i % cols].push(item));
  return columns;
};

const TestimonialCard = ({ quote, name, role, initials, color }) => (
  <div className="bg-white border border-gray-100 rounded-2xl p-5 flex flex-col gap-3">
    <p className="text-sm text-gray-700 leading-relaxed">{quote}</p>
    <div className="flex items-center gap-3">
      <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 ${color}`}>
        {initials}
      </div>
      <div className="text-left">
        <p className="text-sm font-semibold text-gray-900">{name}</p>
        <p className="text-xs text-gray-400">{role}</p>
      </div>
    </div>
  </div>
);

const CardsTestimonials = () => {
  const columns = splitIntoColumns(testimonials, 3);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:mt-20 sm:mt-18 mt-16 items-start">
      {columns.map((col, colIdx) => {
        const isSide = colIdx === 0 || colIdx === 2;
        const isFirst = colIdx === 0;
        const isLast = colIdx === 2;

        return (
          <div key={colIdx} className="relative flex flex-col gap-3 bottom-12">
            {/* fade from top */}
            {isSide && (
              <div
                className="absolute top-0 left-0 right-0 h-28 z-10 pointer-events-none"
                style={{
                  background: isFirst
                    ? "linear-gradient(to bottom, white 0%, transparent 100%)"
                    : "linear-gradient(to bottom, white 0%, transparent 100%)",
                }}
              />
            )}

            {col.map((t) => (
              <TestimonialCard key={t.id} {...t} />
            ))}

            {/* fade from bottom  */}
            {isSide && (
              <div
                className="absolute bottom-5 left-0 right-0 h-28 z-10 pointer-events-none"
                style={{
                  background: "linear-gradient(to top, white 0%, transparent 100%)",
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CardsTestimonials;   