import React, { useState, useRef, useEffect } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import LandingPageNavbar from '../sub-components/landing-page-navbar';
import '../assets/css/signin-page.css';

function SignInPage() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    address: '',
    brgy_position: '',
    gender: '',
    phone_number: '',
    nickname: '',
    password: '',
    confirm_password: '',
    profile_picture: null,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImageConfirmed, setIsImageConfirmed] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [isAgreementChecked, setIsAgreementChecked] = useState(false);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profile_picture' && files && files[0]) {
      setFormData((prev) => ({ ...prev, profile_picture: files[0] }));
      setIsImageConfirmed(false);
      setIsModalOpen(true);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const togglePasswordVisibility = (field) => {
    if (field === 'password') {
      setShowPassword(!showPassword);
      setTimeout(() => setShowPassword(false), 3500);
    }
    if (field === 'confirm_password') {
      setShowConfirmPassword(!showConfirmPassword);
      setTimeout(() => setShowConfirmPassword(false), 3500);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const confirmImageSelection = () => {
    setIsImageConfirmed(true);
    setIsModalOpen(false);
  };

  const reselectImage = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    if (formData.password !== formData.confirm_password) {
      setPasswordError('Passwords do not match');
    } else {
      setPasswordError('');
    }
  }, [formData.password, formData.confirm_password]);

  const isFormValid = Object.values(formData).every((field) => field !== '') && !passwordError && isAgreementChecked;

  return (
    <>
      <LandingPageNavbar />
      <div className="signin-page-container">
        <form className="signin-page-form" onSubmit={handleSubmit}>
          <h2>Sign Up for Brgy Sulong Admin</h2>
          <div className="signin-page-form-columns">
            <div className="signin-page-left-column">
              <input type="text" name="first_name" placeholder="First Name" onChange={handleChange} required />
              <input type="text" name="last_name" placeholder="Last Name" onChange={handleChange} required />
              <input type="text" name="nickname" placeholder="Nickname" onChange={handleChange} required />
              <input type="text" name="address" placeholder="Address" onChange={handleChange} required />
              <input type="text" name="brgy_position" placeholder="Barangay Position" onChange={handleChange} required />
              <div className="signin-page-phone-number">
                <span>+63</span>
                <input type="text" name="phone_number" placeholder="912345678" onChange={handleChange} required />
              </div>
              <select name="gender" onChange={handleChange} required>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>

            <div className="signin-page-right-column">
             
              <div className="signin-page-password-field">
                <input type={showPassword ? 'text' : 'password'} name="password" placeholder="Password" onChange={handleChange} required />
                <span onClick={() => togglePasswordVisibility('password')}>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
              </div>
              <div className="signin-page-password-field">
                <input type={showConfirmPassword ? 'text' : 'password'} name="confirm_password" placeholder="Confirm Password" onChange={handleChange} required />
                <span onClick={() => togglePasswordVisibility('confirm_password')}>{showConfirmPassword ? <FaEyeSlash /> : <FaEye />}</span>
              </div>

              {passwordError && <p className="error-message">{passwordError}</p>}

              <label className="signin-page-file-upload">
                Upload Profile Picture
                <input type="file" name="profile_picture" accept="image/*" ref={fileInputRef} onChange={handleChange} />
              </label>


              <div className="signin-page-agreement">
                <input type="checkbox" onChange={() => setIsAgreementChecked(!isAgreementChecked)} />
                <span className="agreement-text">
                    By checking this box, you consent to the storage of your personal information, including details and profile picture, in our database for registration and service purposes. You also acknowledge that your data may be retained as required by law and for platform functionality.
                </span>
                </div>
                <button type="submit" disabled={!isFormValid}>Sign In</button>

            </div>
          </div>
        </form>

        {isModalOpen && (
          <div className="signin-page-image-modal-overlay">
            <div className="signin-page-image-modal">
              <img src={URL.createObjectURL(formData.profile_picture)} alt="Selected" className="signin-page-modal-image" />
              <div className="signin-page-modal-buttons">
                <button className="signin-page-confirm-btn" onClick={confirmImageSelection}>Confirm Image</button>
                <button className="signin-page-reselect-btn" onClick={reselectImage}>Reselect Image</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default SignInPage;
