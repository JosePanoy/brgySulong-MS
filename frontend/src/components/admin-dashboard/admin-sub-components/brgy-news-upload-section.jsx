import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../../assets/css/dashboard/sub-dashboard/brgy-news-upload-section.css";

import BrgyNewsFeedUploadConfirm from "./brgy-news-upload-confirm";
import BrgyNewsUploadMessage from "./brgy-news-upload-message";

function BrgyNewsUploadSection() {
  const [userData, setUserData] = useState(null);
  const [postType, setPostType] = useState("News");
  const [isImportant, setIsImportant] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);

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

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("brgy-news-upload-modal-overlay")) {
      setShowForm(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirm(true);
  };

  const submitPost = async () => {
    if (
      postType.toLowerCase() === "event" &&
      form.date_start &&
      form.date_end &&
      form.date_end < form.date_start
    ) {
      alert("End Date must be after or equal to Start Date.");
      setShowConfirm(false);
      return;
    }

    let payload = {
      type: postType,
      title: form.title,
      description: form.description,
      category: form.category,
      priority: form.priority,
      image_url: null,
      is_important: isImportant,
    };

    if (postType.toLowerCase() === "event") {
      payload = {
        ...payload,
        date_start: form.date_start
          ? form.date_start.toISOString().slice(0, 19).replace("T", " ")
          : null,
        date_end: form.date_end
          ? form.date_end.toISOString().slice(0, 19).replace("T", " ")
          : null,
        location: form.location,
        organizer: form.organizer,
        status: form.status,
        rsvp_required: form.rsvp_required,
        attendance_limit:
          form.attendance_limit !== "" ? parseInt(form.attendance_limit, 10) : null,
        contact_person: form.contact_person,
      };
    } else {
      payload.status = "Scheduled";
      payload.date_start = null;
      payload.date_end = null;
      payload.location = null;
      payload.organizer = null;
      payload.rsvp_required = false;
      payload.attendance_limit = null;
      payload.contact_person = null;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const responseText = await response.text();

      if (!response.ok) {
        let errorData;
        try {
          errorData = JSON.parse(responseText);
          alert("Error: " + JSON.stringify(errorData.errors || errorData));
        } catch {
          alert("Error: Received non-JSON response from server.");
          console.error("Non-JSON API error response:", responseText);
        }
        setShowConfirm(false);
        setUploadStatus("error");
        return;
      }

      setForm({
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
      setIsImportant(false);
      setShowForm(false);
      setShowConfirm(false);
      setUploadStatus("success");
    } catch (error) {
      alert("Failed to submit post: " + error.message);
      console.error("Fetch error:", error);
      setShowConfirm(false);
      setUploadStatus("error");
    }
  };

  const handleConfirm = () => {
    setShowConfirm(false);
    submitPost();
  };

  const handleCancelConfirm = () => {
    setShowConfirm(false);
  };

  const handleHideMessage = () => {
    setUploadStatus(null);
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

            <form className="brgy-news-upload-box" onSubmit={handleSubmit}>
              <div className="brgy-news-post-type-buttons">
                <button
                  type="button"
                  className={`brgy-news-post-type-button ${
                    postType === "News" ? "active" : ""
                  }`}
                  onClick={() => setPostType("News")}
                >
                  News
                </button>
                <button
                  type="button"
                  className={`brgy-news-post-type-button ${
                    postType === "Event" ? "active" : ""
                  }`}
                  onClick={() => setPostType("Event")}
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

              {postType === "Event" && (
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
                        required
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
                        required
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
                    required
                  />

                  <input
                    type="text"
                    name="organizer"
                    className="brgy-news-input"
                    placeholder="Organizer"
                    value={form.organizer}
                    onChange={handleChange}
                    required
                  />

                  <div className="brgy-news-upload-row rsvp-schedule-attendance-row">
                    <select
                      name="status"
                      className="brgy-news-select status-select"
                      value={form.status}
                      onChange={handleChange}
                      required
                      style={{marginBottom: '5px'}}
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
                         style={{marginBottom: '5px'}}
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
                      min="1"
                      style={{marginBottom: '5px'}}
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

              <button type="submit" className="brgy-news-upload-post-button">
                Post Now
              </button>
            </form>
          </div>
        </div>
      )}

      {showConfirm && (
        <BrgyNewsFeedUploadConfirm
          onConfirm={handleConfirm}
          onCancel={handleCancelConfirm}
        />
      )}

      {uploadStatus && (
        <BrgyNewsUploadMessage status={uploadStatus} onHide={handleHideMessage} />
      )}
    </div>
  );
}

export default BrgyNewsUploadSection;
