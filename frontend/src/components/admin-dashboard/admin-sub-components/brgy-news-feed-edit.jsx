import React, { useState, useEffect } from "react";
import "../../../assets/css/dashboard/sub-dashboard/brgy-news-feed-edit.css";
import SaveBTN from "../../../assets/img/save.png";
import EditBTN from "../../../assets/img/edit.png";
import CancelBTN from "../../../assets/img/cancel.png";
import DeleteIcon from "../../../assets/img/delete.png";
import BrgyNewsFeedEditConfirm from "./brgy-news-feed-edit-confirm";
import BrgyNewsUpdateMessage from "./brgy-news-update-message";
import BrgyNewsDeleteConfirm from "./brgy-news-delete"; // for confirming deleting the data
import BrgyNewsDeleteConfirmMessage from "./brgy-news-delete-confirm"; /// for displaying status message if success or error deleting

function BrgyNewsFeedEdit({ eventData, onClose, onUpdate }) {
  const [localEventData, setLocalEventData] = useState(eventData);
  const [editingField, setEditingField] = useState(null);
  const [editedValues, setEditedValues] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [fieldToSave, setFieldToSave] = useState(null);
  const [updateStatus, setUpdateStatus] = useState(null);
  const [newImageFile, setNewImageFile] = useState(null);
  const [newImagePreview, setNewImagePreview] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deleteStatus, setDeleteStatus] = useState(null);

  useEffect(() => {
    setLocalEventData(eventData);
    setNewImageFile(null);
    setNewImagePreview(null);
  }, [eventData]);

  if (!localEventData) return null;

  const formatDateDisplay = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatDateInput = (dateString) => {
    if (!dateString) return "";
    const d = new Date(dateString);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const fields = [
    { key: "type", label: "Type", value: localEventData.type, type: "text" },
    {
      key: "description",
      label: "Description",
      value: localEventData.description,
      type: "text",
    },
    {
      key: "category",
      label: "Category",
      value: localEventData.category || "N/A",
      type: "text",
    },
    {
      key: "date_start",
      label: "Start Date",
      value: localEventData.date_start,
      type: "date",
    },
    {
      key: "date_end",
      label: "End Date",
      value: localEventData.date_end,
      type: "date",
    },
    {
      key: "location",
      label: "Location",
      value: localEventData.location || "N/A",
      type: "text",
    },
    {
      key: "organizer",
      label: "Organizer",
      value: localEventData.organizer || "N/A",
      type: "text",
    },
    {
      key: "status",
      label: "Status",
      value: localEventData.status,
      type: "text",
    },
    {
      key: "priority",
      label: "Priority",
      value: localEventData.priority,
      type: "text",
    },
    {
      key: "rsvp_required",
      label: "RSVP Required",
      value: localEventData.rsvp_required ? "Yes" : "No",
      type: "checkbox",
    },
    {
      key: "attendance_limit",
      label: "Attendance Limit",
      value: localEventData.attendance_limit || "N/A",
      type: "text",
    },
    {
      key: "contact_person",
      label: "Contact Person",
      value: localEventData.contact_person || "N/A",
      type: "text",
    },
    {
      key: "created_at",
      label: "Created At",
      value: localEventData.created_at,
      type: "date",
    },
    {
      key: "updated_at",
      label: "Updated At",
      value: localEventData.updated_at,
      type: "date",
    },
  ];

  const handleChange = (key, value) => {
    setEditedValues((prev) => ({ ...prev, [key]: value }));
  };

  const confirmSave = () => {
    setConfirmModalOpen(false);
    handleSaveField(fieldToSave);
  };

  const cancelSave = () => {
    setConfirmModalOpen(false);
    if (fieldToSave === "image_url") {
      setNewImageFile(null);
      setNewImagePreview(null);
    }
  };

  const handleSaveClick = (key) => {
    if (key === "image_url" ? newImageFile : key in editedValues) {
      setFieldToSave(key);
      setConfirmModalOpen(true);
    } else {
      setEditingField(null);
      if (key === "image_url") {
        setNewImageFile(null);
        setNewImagePreview(null);
      }
    }
  };

  const handleSaveField = async (key) => {
    setIsSaving(true);
    try {
      if (key === "image_url") {
        if (!newImageFile) {
          setUpdateStatus("error");
          setIsSaving(false);
          return;
        }
        const formData = new FormData();
        formData.append("_method", "PUT");
        formData.append("image_file", newImageFile);
        const response = await fetch(
          `http://127.0.0.1:8000/api/events/${localEventData.event_id}`,
          {
            method: "POST",
            body: formData,
          }
        );
        if (!response.ok) {
          setUpdateStatus("error");
          setIsSaving(false);
          return;
        }
        const updatedEvent = await response.json();
        setLocalEventData(updatedEvent);
        if (onUpdate) setTimeout(() => onUpdate(updatedEvent), 0);
        setNewImageFile(null);
        setNewImagePreview(null);
      } else {
        let payloadValue = editedValues[key];
        if (fields.find((f) => f.key === key)?.type === "checkbox") {
          payloadValue = !!payloadValue;
        }
        const payload = { [key]: payloadValue };
        const response = await fetch(
          `http://127.0.0.1:8000/api/events/${localEventData.event_id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          }
        );
        if (!response.ok) {
          setUpdateStatus("error");
          setIsSaving(false);
          return;
        }
        setLocalEventData((prev) => {
          const updated = { ...prev, [key]: payloadValue };
          if (onUpdate) setTimeout(() => onUpdate(updated), 0);
          return updated;
        });
        setEditedValues((prev) => {
          const newVals = { ...prev };
          delete newVals[key];
          return newVals;
        });
      }
      setEditingField(null);
      setUpdateStatus("success");
    } catch {
      setUpdateStatus("error");
    } finally {
      setIsSaving(false);
      setFieldToSave(null);
    }
  };

  const hideUpdateMessage = () => {
    setUpdateStatus(null);
  };

  const renderFieldValue = ({ key, value, type }) => {
    if (editingField === key) {
      if (type === "date") {
        return (
          <input
            type="date"
            value={editedValues[key] ?? formatDateInput(value)}
            onChange={(e) => handleChange(key, e.target.value)}
            disabled={isSaving}
          />
        );
      }
      if (type === "checkbox") {
        return (
          <input
            type="checkbox"
            checked={
              editedValues[key] !== undefined
                ? editedValues[key]
                : value === "Yes"
            }
            onChange={(e) => handleChange(key, e.target.checked)}
            disabled={isSaving}
          />
        );
      }
      return (
        <input
          type="text"
          value={editedValues[key] ?? value}
          onChange={(e) => handleChange(key, e.target.value)}
          disabled={isSaving}
        />
      );
    } else {
      if (type === "date") {
        return <span className="field-value">{formatDateDisplay(value)}</span>;
      }
      if (type === "checkbox") {
        return (
          <span className="field-value">
            {value === "Yes" || value === true ? "Yes" : "No"}
          </span>
        );
      }
      return <span className="field-value">{value}</span>;
    }
  };

  const renderImageField = () => {
    const existingImageUrl = localEventData.image_url || null;
    return (
      <div className="brgy-news-feed-edit-section editable-row" key="image_url">
        <strong>Featured Image:</strong>
        {!editingField ? (
          <>
            {existingImageUrl ? (
              <img
                src={`http://127.0.0.1:8000/${existingImageUrl}`}
                alt="Featured"
                style={{
                  width: 50,
                  height: 50,
                  objectFit: "cover",
                  verticalAlign: "middle",
                  marginRight: 8,
                }}
              />
            ) : (
              "N/A"
            )}
            <button
              className="icon-btn edit-btn"
              onClick={() => {
                setEditingField("image_url");
                setNewImageFile(null);
                setNewImagePreview(null);
              }}
              aria-label="Edit Featured Image"
              disabled={isSaving}
            >
              <img src={EditBTN} alt="Edit" width={20} height={20} />
            </button>
          </>
        ) : (
          <>
            <div
              style={{
                display: "inline-block",
                verticalAlign: "middle",
                marginRight: 8,
              }}
            >
              {newImagePreview ? (
                <img
                  src={newImagePreview}
                  alt="New preview"
                  style={{ width: 50, height: 50, objectFit: "cover" }}
                />
              ) : existingImageUrl ? (
                <img
                  src={`http://127.0.0.1:8000/${existingImageUrl}`}
                  alt="Current"
                  style={{ width: 50, height: 50, objectFit: "cover" }}
                />
              ) : (
                "N/A"
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setNewImageFile(file);
                  setNewImagePreview(URL.createObjectURL(file));
                } else {
                  setNewImageFile(null);
                  setNewImagePreview(null);
                }
              }}
              disabled={isSaving}
              style={{ verticalAlign: "middle" }}
            />
            <button
              className="icon-btn save-btn"
              onClick={() => handleSaveClick("image_url")}
              aria-label="Save Featured Image"
              disabled={isSaving || !newImageFile}
              style={{ marginLeft: 8 }}
            >
              <img src={SaveBTN} alt="Save" width={20} height={20} />
            </button>
            <button
              className="icon-btn cancel-btn"
              onClick={() => {
                setEditingField(null);
                setNewImageFile(null);
                setNewImagePreview(null);
              }}
              aria-label="Cancel Featured Image"
              disabled={isSaving}
              style={{ marginLeft: 8 }}
            >
              <img src={CancelBTN} alt="Cancel" width={20} height={20} />
            </button>
          </>
        )}
      </div>
    );
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/events/${localEventData.event_id}`,
        { method: "DELETE" }
      );

      if (!response.ok) {
        setDeleteStatus("error");

        setTimeout(() => {
          setDeleteStatus(null);
          setDeleteConfirmOpen(false);
        }, 3000);
        return;
      }

      setDeleteStatus("success");

      setTimeout(() => {
        setDeleteStatus(null);
        setDeleteConfirmOpen(false);
        if (onUpdate) onUpdate(null);
        onClose();
      }, 3000);
    } catch {
      setDeleteStatus("error");

      setTimeout(() => {
        setDeleteStatus(null);
        setDeleteConfirmOpen(false);
      }, 3000);
    }
  };

  return (
    <div className="brgy-news-feed-edit-overlay">
      <div className="brgy-news-feed-edit-modal">
        <button className="brgy-news-feed-edit-close-btn" onClick={onClose}>
          ×
        </button>
        <h2 className="brgy-news-feed-edit-title">
          {localEventData.title}
          <button
            className="icon-btn delete-btn"
            aria-label="Delete Event"
            disabled={isSaving}
            onClick={() => setDeleteConfirmOpen(true)}
          >
            <img src={DeleteIcon} alt="Delete" width={30} height={30} />
          </button>
        </h2>

        <div className="brgy-news-feed-edit-columns">
          {fields.map(({ key, label, value, type }) => (
            <React.Fragment key={key}>
              <div className="brgy-news-feed-edit-section editable-row">
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
                    disabled={isSaving}
                  >
                    <img src={EditBTN} alt="Edit" width={20} height={20} />
                  </button>
                )}
                {editingField === key && (
                  <>
                    <button
                      className="icon-btn save-btn"
                      onClick={() => handleSaveClick(key)}
                      aria-label={`Save ${label}`}
                      disabled={isSaving}
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
                      disabled={isSaving}
                    >
                      <img
                        src={CancelBTN}
                        alt="Cancel"
                        width={20}
                        height={20}
                      />
                    </button>
                  </>
                )}
              </div>
              {key === "updated_at" && renderImageField()}
            </React.Fragment>
          ))}
        </div>

        {confirmModalOpen && (
          <BrgyNewsFeedEditConfirm
            fieldLabel={
              fields.find((f) => f.key === fieldToSave)?.label === undefined &&
              fieldToSave === "image_url"
                ? "Featured Image"
                : fields.find((f) => f.key === fieldToSave)?.label || ""
            }
            onConfirm={confirmSave}
            onCancel={cancelSave}
          />
        )}

        {updateStatus && (
          <BrgyNewsUpdateMessage
            status={updateStatus}
            onClose={hideUpdateMessage}
          />
        )}

        {deleteConfirmOpen && (
          <BrgyNewsDeleteConfirm
            onConfirm={handleDelete}
            onCancel={() => setDeleteConfirmOpen(false)}
          />
        )}

        {(deleteStatus === "success" || deleteStatus === "error") && (
          <BrgyNewsDeleteConfirmMessage
            status={deleteStatus}
            onHide={() => {
              setDeleteStatus(null);
              if (deleteStatus === "success") onClose();
            }}
          />
        )}
      </div>
    </div>
  );
}

export default BrgyNewsFeedEdit;
