import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../../assets/css/dashboard/sub-dashboard/brgy-news-upload-section.css";

function BrgyNewsUploadSection() {
  const [userData, setUserData] = useState(null);
  const [postType, setPostType] = useState("news");
  const [isImportant, setIsImportant] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    date_start: null,
    date_end: null,
    location: "",
    organizer: "",
    status: "Scheduled",
    rsvp_required: false,
    attendance_limit: "",
    contact_person: "",
    priority: "Medium",
  });

  useEffect(() => {
    const user = localStorage.getItem("user_data");
    if (user) setUserData(JSON.parse(user));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Close modal on overlay click
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("brgy-news-upload-modal-overlay")) {
      setShowForm(false);
    }
  };

  return (
    <div className="brgy-news-upload-container">
      {userData && (
        <div className="brgy-news-upload-user-info-wrapper">
          <div className="brgy-news-upload-user-info">
            {userData.brgy_position} {userData.fname} {userData.lname}
          </div>
          <button
            type="button"
            className="brgy-news-upload-toggle-form-button"
            onClick={() => setShowForm(true)}
          >
            Add New Post
          </button>
        </div>
      )}

      {showForm && (
        <div
          className="brgy-news-upload-modal-overlay"
          onClick={handleOverlayClick}
          aria-modal="true"
          role="dialog"
        >
          <div className="brgy-news-upload-modal-content">
            <button
              type="button"
              className="brgy-news-upload-modal-close-button"
              onClick={() => setShowForm(false)}
              aria-label="Close Modal"
            >
              &times;
            </button>

            <div className="brgy-news-upload-box">
              <div className="brgy-news-post-type-buttons">
                <button
                  type="button"
                  className={`brgy-news-post-type-button ${
                    postType === "news" ? "active" : ""
                  }`}
                  onClick={() => setPostType("news")}
                >
                  News
                </button>
                <button
                  type="button"
                  className={`brgy-news-post-type-button ${
                    postType === "event" ? "active" : ""
                  }`}
                  onClick={() => setPostType("event")}
                >
                  Event
                </button>
              </div>

              <input
                type="text"
                name="title"
                className="brgy-news-input"
                placeholder="Title"
                value={form.title}
                onChange={handleChange}
                required
              />

              <textarea
                name="description"
                className="brgy-news-textarea"
                placeholder={
                  userData
                    ? `Hi ${userData.fname}, what's on your mind?`
                    : "Description"
                }
                rows={4}
                value={form.description}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="category"
                className="brgy-news-input"
                placeholder="Category"
                value={form.category}
                onChange={handleChange}
              />

              <div className="brgy-news-upload-row">
                <label className="brgy-news-upload-file-label">
                  📎 Attach Image
                  <input type="file" className="brgy-news-upload-file-input" />
                </label>

                <select
                  name="priority"
                  className="brgy-news-select priority-select"
                  value={form.priority}
                  onChange={handleChange}
                >
                  <option value="High">High Priority</option>
                  <option value="Medium">Medium Priority</option>
                  <option value="Low">Low Priority</option>
                </select>

                <button
                  type="button"
                  className={`brgy-news-important-button ${
                    isImportant ? "active" : ""
                  }`}
                  onClick={() => setIsImportant(!isImportant)}
                  aria-pressed={isImportant}
                >
                  {isImportant ? "Marked Important" : "Mark as Important"}
                </button>
              </div>

              {postType === "event" && (
                <>
                  <div className="brgy-news-upload-row">
                    <div className="datepicker-group">
                      <label>Start Date:</label>
                      <DatePicker
                        selected={form.date_start}
                        onChange={(date) =>
                          setForm((prev) => ({ ...prev, date_start: date }))
                        }
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        dateFormat="MMMM d, yyyy h:mm aa"
                        placeholderText="Select start date"
                        className="brgy-news-input datepicker-input"
                      />
                    </div>
                    <div className="datepicker-group">
                      <label>End Date:</label>
                      <DatePicker
                        selected={form.date_end}
                        onChange={(date) =>
                          setForm((prev) => ({ ...prev, date_end: date }))
                        }
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        dateFormat="MMMM d, yyyy h:mm aa"
                        placeholderText="Select end date"
                        className="brgy-news-input datepicker-input"
                      />
                    </div>
                  </div>

                  <input
                    type="text"
                    name="location"
                    className="brgy-news-input"
                    placeholder="Location"
                    value={form.location}
                    onChange={handleChange}
                  />

                  <input
                    type="text"
                    name="organizer"
                    className="brgy-news-input"
                    placeholder="Organizer"
                    value={form.organizer}
                    onChange={handleChange}
                  />

                  <div className="brgy-news-upload-row rsvp-schedule-attendance-row">
                    <select
                      name="status"
                      className="brgy-news-select status-select"
                      value={form.status}
                      onChange={handleChange}
                    >
                      <option value="Scheduled">Scheduled</option>
                      <option value="Ongoing">Ongoing</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>

                    <label className="brgy-news-checkbox-label">
                      <input
                        type="checkbox"
                        name="rsvp_required"
                        checked={form.rsvp_required}
                        onChange={handleChange}
                      />
                      RSVP Required
                    </label>

                    <input
                      type="number"
                      name="attendance_limit"
                      className="brgy-news-input attendance-input"
                      placeholder="Attendance Limit"
                      value={form.attendance_limit}
                      onChange={handleChange}
                      min="0"
                    />
                  </div>

                  <input
                    type="text"
                    name="contact_person"
                    className="brgy-news-input"
                    placeholder="Contact Person"
                    value={form.contact_person}
                    onChange={handleChange}
                  />
                </>
              )}

              <button className="brgy-news-upload-post-button">Post Now</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BrgyNewsUploadSection;
