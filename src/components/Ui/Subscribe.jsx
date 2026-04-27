

const Subscribe = () => {
  return (
    <div>
         {/* ── SUBSCRIBE ── */}
        <div className="bg-primary rounded-3xl p-9 text-center mb-5 md:my-10">
          <h2 className="text-white font-bold text-4xl mb-4">Subscribe now!</h2>
          <p className="text-purple-200 text-lg mb-5 md:max-w-3xl mx-auto">
            Don't miss the opportunity to be part of our active community in the Creativs field. Subscribe now and start your journey towards excellence!
          </p>
          <div className="flex gap-2 md:max-w-lg mx-auto">
            <input
              type="email" placeholder="Your E-Mail"
              className="md:flex-1 bg-white rounded-xl px-4 py-3  text-sm outline-none border-none"
            />
            <button className="bg-white text-primary rounded-xl px-4 py-3 text-sm font-bold whitespace-nowrap">
              Subscribe Now
            </button>
          </div>
        </div></div>
  )
}

export default Subscribe