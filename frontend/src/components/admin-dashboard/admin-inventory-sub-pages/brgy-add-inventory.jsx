import React, { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import SaveIcon from "../../../assets/img/save1.png";
import "react-datepicker/dist/react-datepicker.css";
import "../../../assets/css/dashboard/brgy-inventory-css/brgy-add-inventory.css";

function BrgyAddInventory() {
  const [itemName, setItemName] = useState("");
  const [itemType, setItemType] = useState("");
  const [description, setDescription] = useState("");
  const [unit, setUnit] = useState("");
  const [conditionStatus, setConditionStatus] = useState("");
  const [quantityTotal, setQuantityTotal] = useState("");
  const [quantityAvailable, setQuantityAvailable] = useState("");
  const [uniqueIdentifier, setUniqueIdentifier] = useState("");
  const [status, setStatus] = useState("");
  const [lastMaintenance, setLastMaintenance] = useState(null);
  const [acquisitionDate, setAcquisitionDate] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif"];

    if (file && allowedTypes.includes(file.type)) {
      if (image?.url) URL.revokeObjectURL(image.url);
      setImage({ file, url: URL.createObjectURL(file) });
    } else if (file) {
      alert("Only JPEG, PNG, JPG, and GIF files are allowed.");
    }
    e.target.value = "";
  };

  const removeImage = () => {
    if (image?.url) URL.revokeObjectURL(image.url);
    setImage(null);
  };

  const isFormValid =
    itemName &&
    itemType &&
    description &&
    unit &&
    conditionStatus &&
    quantityTotal &&
    uniqueIdentifier &&
    status &&
    lastMaintenance &&
    acquisitionDate;

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("item_name", itemName);
    formData.append("description", description);
    formData.append("quantity_total", parseInt(quantityTotal) || 0);
    formData.append(
      "quantity_available",
      parseInt(quantityAvailable) || parseInt(quantityTotal) || 0
    );
    formData.append("unit", unit);
    formData.append("condition_status", conditionStatus);
    formData.append(
      "last_maintenance_date",
      lastMaintenance ? lastMaintenance.toISOString().split("T")[0] : ""
    );
    formData.append("unique_identifier", uniqueIdentifier);
    formData.append("status", status);

    if (image?.file) {
      const validTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif"];
      if (!validTypes.includes(image.file.type)) {
        alert("Error: Image must be jpeg, png, jpg, or gif.");
        setMessage("Error: Image must be jpeg, png, jpg, or gif.");
        return;
      }
      formData.append("item_image", image.file);
    }

    try {
      setLoading(true);
      await axios.post("http://127.0.0.1:8000/api/inventory", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Inventory item successfully added.");
      setItemName("");
      setItemType("");
      setDescription("");
      setUnit("");
      setConditionStatus("");
      setQuantityTotal("");
      setQuantityAvailable("");
      setUniqueIdentifier("");
      setStatus("");
      setLastMaintenance(null);
      setAcquisitionDate(null);
      removeImage();
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Submission failed.";
      alert("Error: " + errorMsg);
      setMessage("Error: " + errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="brgy-add-inventory">
      {message && <div className="brgy-add-inventory__message">{message}</div>}

      <div className="brgy-add-inventory__row">
        <div className="brgy-add-inventory__field">
          <label>Item Name</label>
          <input
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
        </div>
        <div className="brgy-add-inventory__field">
          <label>Item Type</label>
          <select
            value={itemType}
            onChange={(e) => setItemType(e.target.value)}
          >
            <option value="">Choose</option>
            <option>Equipment</option>
            <option>Medical</option>
            <option>Utility</option>
            <option>Armory</option>
          </select>
        </div>
      </div>

      <div className="brgy-add-inventory__field brgy-add-inventory__textarea">
        <label>Description</label>
        <textarea
          rows="3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="brgy-add-inventory__row">
        <div className="brgy-add-inventory__field">
          <label>Unit</label>
          <select value={unit} onChange={(e) => setUnit(e.target.value)}>
            <option value="">Choose</option>
            <option>PC</option>
            <option>Boxes</option>
            <option>Tools</option>
            <option>Other</option>
          </select>
        </div>
        <div className="brgy-add-inventory__field">
          <label>Condition Status</label>
          <select
            value={conditionStatus}
            onChange={(e) => setConditionStatus(e.target.value)}
          >
            <option value="">Choose</option>
            <option>Good</option>
            <option>Needs Repair</option>
            <option>Damaged</option>
          </select>
        </div>
        <div className="brgy-add-inventory__field">
          <label>Quantity Total</label>
          <input
            type="number"
            value={quantityTotal}
            onChange={(e) => setQuantityTotal(e.target.value)}
          />
        </div>
      </div>

      <div className="brgy-add-inventory__row">
        <div className="brgy-add-inventory__field">
          <label>Unique Identifier (serial tag)</label>
          <input
            type="text"
            value={uniqueIdentifier}
            onChange={(e) => setUniqueIdentifier(e.target.value)}
          />
        </div>
        <div className="brgy-add-inventory__field">
          <label>Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">Choose</option>
            <option>Active</option>
            <option>Archived</option>
          </select>
        </div>
      </div>

      <div className="brgy-add-inventory__field">
        <label>Attach Item Image</label>
        <div className="brgy-add-inventory__upload-box">
          <input
            type="file"
            name="item_image"
            accept="image/jpeg,image/png,image/jpg,image/gif"
            onChange={handleImageChange}
            className="brgy-add-inventory__file-input"
          />
          {!image && <span>+</span>}
          {image && (
            <div className="brgy-add-inventory__image-preview">
              <div className="brgy-add-inventory__image-item">
                <img src={image.url} alt="upload" />
                <button
                  type="button"
                  onClick={removeImage}
                  className="brgy-add-inventory__remove-button"
                >
                  ×
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="brgy-add-inventory__row brgy-add-inventory__row--centered">
        <div className="brgy-add-inventory__field">
          <label>Last Maintenance</label>
          <DatePicker
            selected={lastMaintenance}
            onChange={(date) => setLastMaintenance(date)}
            className="brgy-add-inventory__datepicker"
            placeholderText="Choose"
          />
        </div>
        <div className="brgy-add-inventory__field">
          <label>Acquisition Date</label>
          <DatePicker
            selected={acquisitionDate}
            onChange={(date) => setAcquisitionDate(date)}
            className="brgy-add-inventory__datepicker"
            placeholderText="Choose"
          />
        </div>
      </div>

      <div className="brgy-add-inventory__actions">
        <button
          onClick={handleSubmit}
          disabled={loading || !isFormValid}
          className="brgy-add-inventory__save-button"
        >
          <img src={SaveIcon} alt="Save" />
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
}

export default BrgyAddInventory;
