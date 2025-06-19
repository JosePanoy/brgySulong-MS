import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../../assets/css/dashboard/brgy-inventory-css/brgy-add-inventory.css";

function BrgyAddInventory() {
  const [lastMaintenance, setLastMaintenance] = useState(null);
  const [acquisitionDate, setAcquisitionDate] = useState(null);
  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file,
      url: URL.createObjectURL(file)
    }));
    setImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (index) => {
    setImages((prev) => {
      URL.revokeObjectURL(prev[index].url);
      return prev.filter((_, i) => i !== index);
    });
  };

  return (
    <div className="brgy-add-inventory">
      <div className="brgy-add-inventory__row">
        <div className="brgy-add-inventory__field">
          <label>Item Name</label>
          <input type="text" />
        </div>
        <div className="brgy-add-inventory__field">
          <label>Item Type</label>
          <select>
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
        <textarea rows="3" />
      </div>

      <div className="brgy-add-inventory__row">
        <div className="brgy-add-inventory__field">
          <label>Unit</label>
          <select>
            <option value="">Choose</option>
            <option>PC</option>
            <option>Boxes</option>
            <option>Tools</option>
            <option>Other</option>
          </select>
        </div>
        <div className="brgy-add-inventory__field">
          <label>Condition Status</label>
          <select>
            <option value="">Choose</option>
            <option>Good</option>
            <option>Needs Repair</option>
            <option>Damaged</option>
          </select>
        </div>
        <div className="brgy-add-inventory__field">
          <label>Quantity Total</label>
          <input type="number" />
        </div>
      </div>

      <div className="brgy-add-inventory__row">
        <div className="brgy-add-inventory__field">
          <label>Unique Identifier (serial tag)</label>
          <input type="text" />
        </div>
        <div className="brgy-add-inventory__field">
          <label>Status</label>
          <select>
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
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="brgy-add-inventory__file-input"
          />
          {images.length === 0 && <span>+</span>}
          <div className="brgy-add-inventory__image-preview">
            {images.map((img, index) => (
              <div key={index} className="brgy-add-inventory__image-item">
                <img src={img.url} alt={`upload-${index}`} />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="brgy-add-inventory__remove-button"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
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
    </div>
  );
}

export default BrgyAddInventory;
