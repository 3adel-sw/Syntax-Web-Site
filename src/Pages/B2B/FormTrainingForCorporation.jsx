import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
const FormTrainingForCorporation = ({ onSubmit }) => {
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

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("https://your-api.com/training-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("حدث خطأ، حاول مجدداً");
      setSuccess(true);
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
    { name: "companyName", label: "Company Name", placeholder: "Company Name" },
    { name: "jobTitle", label: "Job Title", placeholder: "Job Title" },
    { name: "trainingLocation", label: "Training Location", placeholder: "Online" },
    { name: "noOfEmployees", label: "No. Of Employees", placeholder: "Number", type: "number" },
    { name: "phone", label: "Phone", placeholder: "Phone", type: "tel" },
    { name: "email", label: "Email", placeholder: "Email", type: "email" },
  ];

  if (success) {
    return (
      <div className="min-h-screen bg-[#f0ede8] flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl px-12 py-12 w-full max-w-xl shadow-[0_4px_40px_rgba(0,0,0,0.07)] text-center text-gray-900 text-lg">
          Done Sending Form Successfully !
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen md:mb-32 mb-12  flex items-center justify-center p-6">
      <div className=" rounded-2xl px-12 py-12 w-full md:max-w-4xl shadow-sm">
        <h1 className="md:text-4xl sm:text-3xl text-lg font-bold text-center text-gray-900 md:mb-9 mb-6 ">
          Let's Start Your Training
        </h1>

        {/* Full Name */}
        <div className="mb-4">
          <label className="block text-lg text-left font-medium text-gray-500 mb-1.5">
            Full Name
          </label>
          <input
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            className={inputClass}
          />
        </div>

        {/* 2-column grid */}
        <div className="grid grid-cols-2 gap-4">
          {fields.map(({ name, label, placeholder, type = "text" }) => (
            <div key={name}>
              <label className="block text-lg text-left font-medium text-gray-500 mb-1.5">
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
          <label className="block text-lg text-left font-medium text-gray-500 mb-1.5">
            Your Request Details
          </label>
          <textarea
            name="requestDetails"
            value={formData.requestDetails}
            onChange={handleChange}
            placeholder="Write your Request Details"
            className={`${inputClass} resize-y min-h-[100px]`}
          />
        </div>

        {error && (
          <p className="text-red-500 text-xs text-center mt-2">{error}</p>
        )}

        <div className="flex justify-center mt-7">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex items-center gap-4 bg-gray-900 text-white rounded-2xl px-10 py-3.5 text-base font-medium hover:bg-gray-700 transition-colors disabled:opacity-60"
          >
            {loading ? "Sending..." : "Submit"}
            {!loading && (
            <AiOutlineLoading3Quarters />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormTrainingForCorporation;