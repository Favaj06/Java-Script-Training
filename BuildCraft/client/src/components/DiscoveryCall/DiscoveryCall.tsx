import {
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactElement,
} from "react";
import axios, { AxiosError } from "axios";
import type { ApiResponse, DiscoveryFormData } from "../../types/api";
import "./DiscoveryCall.css";

const defaultFormData: DiscoveryFormData = {
  name: "",
  email: "",
  business_name: "",
  phone: "",
  message: "",
  preferredDate: "",
  timeSlot: "",
};

const timeSlots = [
  "09:00 AM - 09:30 AM",
  "09:30 AM - 10:00 AM",
  "10:00 AM - 10:30 AM",
  "10:30 AM - 11:00 AM",
  "11:00 AM - 11:30 AM",
  "11:30 AM - 12:00 PM",
  "02:00 PM - 02:30 PM",
  "02:30 PM - 03:00 PM",
  "03:00 PM - 03:30 PM",
  "03:30 PM - 04:00 PM",
];

function DiscoveryCall(): ReactElement {
  const [formData, setFormData] = useState<DiscoveryFormData>(defaultFormData);
  const [loading, setLoading] = useState<boolean>(false);
  const [formError, setFormError] = useState<string>("");
  const [formSuccess, setFormSuccess] = useState<string>("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;
    const key = name as keyof DiscoveryFormData;

    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));

    if (formError) {
      setFormError("");
    }

    if (formSuccess) {
      setFormSuccess("");
    }
  };

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    setFormError("");
    setFormSuccess("");

    const requiredFields = [
      formData.name,
      formData.email,
      formData.business_name,
      formData.phone,
      formData.message,
      formData.preferredDate,
      formData.timeSlot,
    ];

    if (requiredFields.some((value) => !value.trim())) {
      setFormError("Please complete all fields before booking your call.");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post<ApiResponse<null>>("/api/discovery", formData);

      setFormSuccess(res.data.message || "Your discovery call has been booked successfully.");
      setFormData(defaultFormData);
    } catch (err: unknown) {
      const error = err as AxiosError<ApiResponse<null>>;
      const apiMessage = error.response?.data?.message || "Something went wrong";

      setFormError(apiMessage === "This slot is already booked." ? "This slot is already booked." : apiMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="discovery" className="discovery-section">
      <div className="container">
        <div className="discovery-content">
          <div className="left-side">
            <span className="tag">🚀 Free Consultation</span>

            <h2>Book a Discovery Call</h2>

            <p>
              Let's discuss your business goals, website requirements,
              timeline, and budget. Our experts will guide you to the best
              solution for your business.
            </p>

            <ul className="benefits">
              <li>✔ 30 Minute Free Consultation</li>
              <li>✔ Website Strategy Discussion</li>
              <li>✔ Budget & Timeline Planning</li>
              <li>✔ No Obligation</li>
            </ul>
          </div>

          <div className="right-side">
            <form onSubmit={handleSubmit}>
              {formError ? (
                <div className="form-message error" role="alert">
                  {formError}
                </div>
              ) : null}

              {formSuccess ? (
                <div className="form-message success" role="status">
                  {formSuccess}
                </div>
              ) : null}

              <input
                type="text"
                placeholder="Full Name"
                className="form-control mb-3"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <input
                type="email"
                placeholder="Email Address"
                className="form-control mb-3"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                placeholder="Business Name"
                className="form-control mb-3"
                name="business_name"
                value={formData.business_name}
                onChange={handleChange}
                required
              />

              <input
                type="tel"
                placeholder="Phone Number"
                className="form-control mb-3"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />

              <div className="form-row">
                <div className="form-group">
                  <input
                    type="date"
                    className="form-control mb-3"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleChange}
                    min={new Date().toISOString().split("T")[0]}
                    required
                  />
                </div>

                <div className="form-group">
                  <select
                    className="form-select mb-3"
                    name="timeSlot"
                    value={formData.timeSlot}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a time slot</option>
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <textarea
                rows={4}
                className="form-control mb-4"
                placeholder="Tell us about your project..."
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              />

              <button
                type="submit"
                className="book-btn"
                disabled={loading}
                aria-busy={loading}
              >
                {loading ? "Booking..." : "Book Free Call"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DiscoveryCall;