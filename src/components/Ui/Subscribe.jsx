import { subscribeEmail } from "../../services/contact/contactService";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const Subscribe = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!email.trim()) {
      setError(t("messages.emailRequired"));
      return;
    }

    try {
      setLoading(true);
      const res = await subscribeEmail({ email });
      setMessage(res.data?.msg || t("messages.subscribedSuccessfully"));
      setEmail("");
    } catch (err) {
      setError(err.response?.data?.msg || t("messages.failedToSubscribe"));
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
         {/* ── SUBSCRIBE ── */}
        <div className="bg-primary rounded-3xl p-9 text-center mb-5 my-12 md:my-10">
          <h2 className="text-white font-bold md:text-4xl text-2xl  mb-4">{t("subscribe.title")}</h2>
          <p className="text-purple-200 md:text-xl text-lg mb-5 md:max-w-3xl mx-auto">
            {t("subscribe.description")}
          </p>
          <form onSubmit={handleSubmit} className="flex md:flex-row flex-col items-center justify-center gap-4 md:max-w-lg mx-auto">
            <input
              type="email"
              placeholder={t("subscribe.emailPlaceholder")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="md:flex-1 w-full  bg-white rounded-xl px-4 py-3  text-sm outline-none border-none"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-white text-primary rounded-xl px-4 py-3 text-sm font-bold whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? t("subscribe.loading") : t("subscribe.button")}
            </button>
          </form>
          {message && <p className="mt-4 text-sm font-semibold text-white">{message}</p>}
          {error && <p className="mt-4 text-sm font-semibold text-red-200">{error}</p>}
        </div></div>
  )
}

export default Subscribe
