import React, { useState } from "react";
import { submitRequest } from "../../../helpers/patron";
import { toast } from "react-toastify";

const Request = () => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestData = {
      subject,
      message,
    };
    try {
      setIsSubmitting(true);
      const res = await submitRequest(requestData);
      if (res.status === "error") throw new Error(res.message);
      toast.success("Request submitted successfully!");
      setSubject("");
      setMessage("");
    } catch (err) {
      toast.error(err.message || "Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Request Form</h1>
          <p className="text-gray-600 mt-2">
            Please use the form below to tell us any problem or feature
            you&apos;d
            <br />
            like us to address.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="subject"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              placeholder="Enter the subject of your request"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
              required
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              placeholder="Describe your issue or request in detail…"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows="5"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {!isSubmitting ? "Submit" : "Submitting ..."}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Request;
