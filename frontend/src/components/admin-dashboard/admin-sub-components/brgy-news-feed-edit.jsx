import React, { useState } from 'react';
import "../../../assets/css/dashboard/sub-dashboard/brgy-news-feed-edit.css";
import SaveBTN from "../../../assets/img/save.png";
import EditBTN from "../../../assets/img/edit.png";
import CancelBTN from "../../../assets/img/cancel.png";

function BrgyNewsFeedEdit({ eventData, onClose }) {
  const [editingField, setEditingField] = useState(null);
  const [editedValues, setEditedValues] = useState({});

  if (!eventData) return null;

  const formatDateDisplay = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatDateInput = (dateString) => {
    if (!dateString) return "";
    const d = new Date(dateString);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const fields = [
    { key: 'type', label: 'Type', value: eventData.type, type: "text" },
    { key: 'description', label: 'Description', value: eventData.description, type: "text" },
    { key: 'category', label: 'Category', value: eventData.category || "N/A", type: "text" },
    { key: 'date_start', label: 'Start Date', value: eventData.date_start, type: "date" },
    { key: 'date_end', label: 'End Date', value: eventData.date_end, type: "date" },
    { key: 'location', label: 'Location', value: eventData.location || "N/A", type: "text" },
    { key: 'organizer', label: 'Organizer', value: eventData.organizer || "N/A", type: "text" },
    { key: 'status', label: 'Status', value: eventData.status, type: "text" },
    { key: 'priority', label: 'Priority', value: eventData.priority, type: "text" },
    { key: 'rsvp_required', label: 'RSVP Required', value: eventData.rsvp_required ? "Yes" : "No", type: "checkbox" },
    { key: 'attendance_limit', label: 'Attendance Limit', value: eventData.attendance_limit || "N/A", type: "text" },
    { key: 'contact_person', label: 'Contact Person', value: eventData.contact_person || "N/A", type: "text" },
    { key: 'created_at', label: 'Created At', value: eventData.created_at, type: "date" },
    { key: 'updated_at', label: 'Updated At', value: eventData.updated_at, type: "date" },
  ];

  const handleChange = (key, value) => {
    setEditedValues((prev) => ({ ...prev, [key]: value }));
  };

  const renderFieldValue = ({ key, value, type }) => {
    if (editingField === key) {
      if (type === "date") {
        return (
          <input
            type="date"
            value={editedValues[key] ?? formatDateInput(value)}
            onChange={(e) => handleChange(key, e.target.value)}
          />
        );
      }
      if (type === "checkbox") {
        return (
          <input
            type="checkbox"
            checked={editedValues[key] !== undefined ? editedValues[key] : value === "Yes"}
            onChange={(e) => handleChange(key, e.target.checked)}
          />
        );
      }
      return (
        <input
          type="text"
          value={editedValues[key] ?? value}
          onChange={(e) => handleChange(key, e.target.value)}
        />
      );
    } else {
      if (type === "date") {
        return <span className="field-value">{formatDateDisplay(value)}</span>;
      }
      if (type === "checkbox") {
        return <span className="field-value">{value === "Yes" || value === true ? "Yes" : "No"}</span>;
      }
      return <span className="field-value">{value}</span>;
    }
  };

  return (
    <div className="brgy-news-feed-edit-overlay">
      <div className="brgy-news-feed-edit-modal">
        <button className="brgy-news-feed-edit-close-btn" onClick={onClose}>×</button>
        <h2 className="brgy-news-feed-edit-title">{eventData.title}</h2>
        <div className="brgy-news-feed-edit-columns">
          {fields.map(({ key, label, value, type }) => (
            <div key={key} className="brgy-news-feed-edit-section editable-row">
              <strong>{label}:</strong>
              {renderFieldValue({ key, value, type })}
              {editingField !== key && (
                <button
                  className="icon-btn edit-btn"
                  onClick={() => {
                    setEditingField(key);
                    setEditedValues({ ...editedValues, [key]: value });
                  }}
                  aria-label={`Edit ${label}`}
                >
                  <img src={EditBTN} alt="Edit" width={20} height={20} />
                </button>
              )}
              {editingField === key && (
                <>
                  <button
                    className="icon-btn save-btn"
                    onClick={() => setEditingField(null)}
                    aria-label={`Save ${label}`}
                  >
                    <img src={SaveBTN} alt="Save" width={20} height={20} />
                  </button>
                  <button
                    className="icon-btn cancel-btn"
                    onClick={() => {
                      setEditingField(null);
                      setEditedValues((prev) => {
                        const newVals = { ...prev };
                        delete newVals[key];
                        return newVals;
                      });
                    }}
                    aria-label={`Cancel ${label}`}
                  >
                    <img src={CancelBTN} alt="Cancel" width={20} height={20} />
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BrgyNewsFeedEdit;
