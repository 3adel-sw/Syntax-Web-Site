import { subscribeEmail } from "../../services/contact/contactService";
import { useState } from "react";

const Subscribe = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }

    try {
      setLoading(true);
      const res = await subscribeEmail({ email });
      setMessage(res.data?.msg || "Subscribed successfully.");
      setEmail("");
    } catch (err) {
      setError(err.response?.data?.msg || "Failed to subscribe. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
         {/* ── SUBSCRIBE ── */}
        <div className="bg-primary rounded-3xl p-9 text-center mb-5 my-12 md:my-10">
          <h2 className="text-white font-bold md:text-4xl text-2xl  mb-4">Subscribe now!</h2>
          <p className="text-purple-200 md:text-xl text-lg mb-5 md:max-w-3xl mx-auto">
            Don't miss the opportunity to be part of our active community in the Creativs field. Subscribe now and start your journey towards excellence!
          </p>
          <form onSubmit={handleSubmit} className="flex md:flex-row flex-col items-center justify-center gap-4 md:max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Your E-Mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="md:flex-1 w-full  bg-white rounded-xl px-4 py-3  text-sm outline-none border-none"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-white text-primary rounded-xl px-4 py-3 text-sm font-bold whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? "Subscribing..." : "Subscribe Now"}
            </button>
          </form>
          {message && <p className="mt-4 text-sm font-semibold text-white">{message}</p>}
          {error && <p className="mt-4 text-sm font-semibold text-red-200">{error}</p>}
        </div></div>
  )
}

export default Subscribe
