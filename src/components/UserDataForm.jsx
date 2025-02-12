import { useState, useEffect, useRef, useMemo } from "react";
import Popup from "../subComponents/Popup";

// MISTAKES REMAINING WILL FIX LATER ++++++++++++++++++++++++++++

export const UserDataForm = () => {
  const generateId = () => `user-${Date.now()}`;

  // Get stored user data from localStorage (if available)
  const storedUser = JSON.parse(localStorage.getItem("userData")) || null;

  const [user, setUser] = useState({
    id: generateId(),
    name: "",
    address: "",
    email: "",
    phone: "",
  });

  const initialFormData = useRef({ storedUser, user });

  const [openPopup, setOpenPopup] = useState({ isOpen: false, message: "" });

  const hasChanged = useMemo(() => {
    return (
      JSON.stringify(user) !== JSON.stringify(initialFormData.current.user) &&
      JSON.stringify(user) !==
        JSON.stringify(initialFormData.current.storedUser)
    );
  }, [user]);

  // Warn user about unsaved changes before leaving
  useEffect(() => {
    if (!hasChanged) return;

    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = "You have unsaved changes. Do you really want to leave?";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [hasChanged]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value.trim() })); // Removes leading spaces
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("userData", JSON.stringify(user));

    setOpenPopup({ isOpen: true, message: "Data saved successfully!" });

    // initialFormData.current = { ...user }; // Update initial data after save

    setUser({ id: generateId(), name: "", address: "", email: "", phone: "" });
  };

  const cancelPopupOpen = () => {
    setOpenPopup({ isOpen: false, message: "" });
  };

  return (
    <>
      {openPopup.isOpen && (
        <Popup message={openPopup.message} cancelPopupOpen={cancelPopupOpen} />
      )}
      <main className="flex w-[100%] min-h-[100dvh] overflow-y-auto">
        <div className="content-grid w-[100%]">
          <div className="form-container m-auto">
            <h2 className="heading">User Data Form</h2>
            <form onSubmit={handleSubmit}>
              <div className="inp-div">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="inp-div">
                <label htmlFor="address">Address:</label>
                <textarea
                  id="address"
                  name="address"
                  value={user.address}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="inp-div">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="inp-div">
                <label htmlFor="phone">Phone:</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={user.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <button className="btn" type="submit">
                Save
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};
