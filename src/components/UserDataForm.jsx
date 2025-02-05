import { useState, useEffect } from "react";
import Popup from "../subComponents/Popup";

export const UserDataForm = () => {
  const [formData, setFormData] = useState({
    id: "", // Auto-generated ID
    name: "",
    address: "",
    email: "",
    phone: "",
  });
  const [hasChanged, setHasChanged] = useState(false);
  const [openPopup, setOpenPopup] = useState([false, ""]);

  // Auto-generate ID on component mount
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      id: `user-${Date.now()}`,
    }));
  }, []);

  // Warn user about unsaved changes before leaving
  useEffect(() => {
    if (!hasChanged) return;
    const handleBeforeUnload = (e) => {
      if (hasChanged) {
        e.preventDefault();
        // setOpenPopup([
        //   true,
        //   "You have unsaved changes. Do you really want to leave?",
        // ]);
        // return (e.returnValue =
        //   "You have unsaved changes. Do you really want to leave?");
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasChanged]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setHasChanged(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save data to localStorage
    localStorage.setItem("userData", JSON.stringify(formData));
    setOpenPopup([true, "Data saved successfully!"]);
    setHasChanged(false);
    // Reset form fields
    setFormData({
      id: `user-${Date.now()}`,
      name: "",
      address: "",
      email: "",
      phone: "",
    });
  };

  const cancelPopupOpen = () => {
    setOpenPopup([false, ""]);
  };

  return (
    <>
      {openPopup[0] ? (
        <Popup message={openPopup[1]} cancelPopupOpen={cancelPopupOpen} />
      ) : (
        ""
      )}
      <main className="flex w-[100%] min-h-[100dvh] overflow-y-auto">
        <div className="content-grid  w-[100%] ">
          <div className="form-container m-auto">
            <h2 className="heading">User Data Form</h2>
            <form onSubmit={handleSubmit}>
              <div className="inp-div">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className=""
                  required
                />
              </div>
              <div className="inp-div">
                <label htmlFor="address">Address:</label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  // rows={1}
                  required
                />
              </div>
              <div className="inp-div">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
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
                  value={formData.phone}
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
