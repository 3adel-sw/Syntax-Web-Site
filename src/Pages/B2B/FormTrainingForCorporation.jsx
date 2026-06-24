import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Mail, X } from "lucide-react";
import { registerInB2B } from "../../services/b2b/registerInB2B";
import { useTranslation } from "react-i18next";

const FormTrainingForCorporation = ({ onSubmit }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    jobTitle: "",
    trainingLocation: "",
    noOfEmployees: "",
    phone: "",
    email: "",
    requestDetails: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      await registerInB2B({
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        company_name: formData.companyName,
        job_title: formData.jobTitle,
        number_employess: formData.noOfEmployees,
        training_location: formData.trainingLocation,
        additional_request: formData.requestDetails,
      });
      setSuccess(false);
      setShowModal(true);
      if (onSubmit) onSubmit(formData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full border border-gray-200 rounded-lg px-3.5 py-3 text-sm bg-white focus:outline-none focus:border-gray-800 transition-colors placeholder-gray-300";

  const fields = [
    { name: "companyName", label: t("b2b.form.companyName"), placeholder: t("b2b.form.companyName") },
    { name: "jobTitle", label: t("b2b.form.jobTitle"), placeholder: t("b2b.form.jobTitle") },
    { name: "trainingLocation", label: t("b2b.form.trainingLocation"), placeholder: t("b2b.form.online") },
    { name: "noOfEmployees", label: t("b2b.form.noOfEmployees"), placeholder: t("b2b.form.number"), type: "number" },
    { name: "phone", label: t("forms.phone"), placeholder: t("forms.phonePlaceholder"), type: "tel" },
    { name: "email", label: t("forms.email"), placeholder: t("forms.emailPlaceholder"), type: "email" },
  ];

  return (
    <div className="min-h-screen md:mb-32 mb-12  flex items-center justify-center">
      {!success && (
        <div className=" rounded-2xl md:p-8  p-4 w-full  shadow-sm">
          <h2 className="md:text-4xl sm:text-3xl text-lg font-bold text-center text-gray-900 md:mb-9 mb-6 ">
            {t("b2b.form.title")}
          </h2>

          {/* Full Name */}
          <div className="mb-4">
            <label className="block md:text-lg text-sm text-start font-medium text-gray-500 mb-1.5">
              {t("forms.fullName")}
            </label>
            <input
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder={t("forms.fullNamePlaceholder")}
              className={inputClass}
            />
          </div>

          {/* 2-column grid */}
          <div className="grid grid-cols-2 gap-4">
            {fields.map(({ name, label, placeholder, type = "text" }) => (
              <div key={name}>
                <label className="block md:text-lg text-[12px] text-start font-medium text-gray-500 mb-1.5">
                  {label}
                </label>
                <input
                  name={name}
                  type={type}
                  value={formData[name]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  className={inputClass}
                />
              </div>
            ))}
          </div>

          {/* Request Details */}
          <div className="mt-4">
            <label className="block md:text-lg text-sm text-start font-medium text-gray-500 mb-1.5">
              {t("b2b.form.requestDetailsLabel")}
            </label>
            <textarea
              name="requestDetails"
              value={formData.requestDetails}
              onChange={handleChange}
              placeholder={t("b2b.requestDetails")}
              className={`${inputClass} resize-y min-h-[100px]`}
            />
          </div>

          {error && (
            <p className="text-red-500 md:text-2xl font-bold text-xs text-center mt-2">{t("messages.formInputError")}</p>
          )}

          <div className="flex justify-center mt-7">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex items-center gap-4 bg-gray-900 text-white rounded-2xl px-10 py-3.5 text-base font-medium hover:bg-gray-700 transition-colors disabled:opacity-60"
            >
              {loading ? t("registerModal.sending") : t("common.submit")}
              {!loading && <AiOutlineLoading3Quarters />}
            </button>
          </div>
        </div>
      )}

      {/* -- MODAL -- */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl p-8 h-[35%] w-full max-w-sm flex flex-col justify-center items-center gap-4 relative">
            {/* close button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="text-black" size={24} />
            </button>

            <div className="flex flex-col items-center w-[90%] space-y-4 justify-end py-6">
              {/* icon email */}
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
                <Mail size={28} className="text-white" />
              </div>

              {/* text */}
              <p className="text-lg font-semibold text-slate-800">
                {t("messages.thanksForRegistering")}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormTrainingForCorporation;
