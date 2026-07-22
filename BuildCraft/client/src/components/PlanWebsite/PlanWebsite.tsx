import { useState } from "react";
import axios, { AxiosError } from "axios";
import type { ApiResponse, PlanRequestFormData } from "../../types/api";
import "./PlanWebsite.css";

const defaultFormData: PlanRequestFormData = {
  name: "",
  email: "",
  business_name: "",
  industry: "",
  message: "",
};

const PlanWebsite = (): React.ReactElement => {
  const [formData, setFormData] = useState<PlanRequestFormData>(defaultFormData);

  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    const key = name as keyof PlanRequestFormData;

    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.post<ApiResponse<null>>("/api/plan", formData);

      alert(res.data.message);
      setFormData(defaultFormData);
    } catch (err: unknown) {
      const error = err as AxiosError<ApiResponse<null>>;

      alert(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="plan" className="plan-section">
      <div className="container">
        <div className="plan-title">
          <h2>Plan Your Website</h2>

          <p>
            Tell us about your business and we'll recommend the perfect website
            solution.
          </p>
        </div>

        <form className="plan-form" onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-4">
              <label>Full Name</label>

              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6 mb-4">
              <label>Email Address</label>

              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6 mb-4">
              <label>Business Name</label>

              <input
                type="text"
                name="business_name"
                className="form-control"
                placeholder="Your business name"
                value={formData.business_name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6 mb-4">
              <label>Industry</label>

              <select
                name="industry"
                className="form-select"
                value={formData.industry}
                onChange={handleChange}
                required
              >
                <option value="">Choose Industry</option>
                <option>Business</option>
                <option>E-Commerce</option>
                <option>Restaurant</option>
                <option>Healthcare</option>
                <option>Education</option>
                <option>Portfolio</option>
              </select>
            </div>

            <div className="col-12 mb-4">
              <label>Website Requirements</label>

              <textarea
                rows={5}
                name="message"
                className="form-control"
                placeholder="Tell us what kind of website you need..."
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="submit-btn"
            disabled={loading}
            aria-busy={loading}
          >
            {loading ? "Submitting..." : "Submit Requirement"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default PlanWebsite;