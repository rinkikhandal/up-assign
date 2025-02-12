import { useState, useEffect, useRef, useMemo } from "react";
import Popup from "../subComponents/Popup";

// I Think Problem Solved ++++++++++++++++++++++++++++

export const UserDataForm = () => {
  const generateId = () => `user-${Date.now()}`;

  // Get stored user data from localStorage (if available)
  // getting this is necessary because if the user by chance does reload the page the useRef value will be null (if we did it diff way i.e. by having an object in useRef with storedData (which will be saved when the user submits the form), and user.) and we won't be able to compare it with the stored value in database (or localStorage)
  // useCase when we don't unnecessarily want to store the value again that is already present (will be more efficient at backend) OR MAY be it is redundant as we are still fetching the data once???
  const storedUser = JSON.parse(localStorage.getItem("userData")) || null;

  const [user, setUser] = useState({
    id: generateId(),
    name: "",
    address: "",
    email: "",
    phone: "",
  });

  const initialFormData = useRef(user);

  const [openPopup, setOpenPopup] = useState({ isOpen: false, message: "" });

  const hasChanged = useMemo(() => {
    const { id, ...userWithoutId } = user;
    const { id: storedId, ...storedUserWithoutId } = storedUser || {};
    const { id: initialUserId, ...initialUserWithoutId } =
      initialFormData.current || {};

    for (let key in userWithoutId) {
      if (
        userWithoutId[key] !== storedUserWithoutId[key] &&
        userWithoutId[key] !== initialUserWithoutId[key]
      ) {
        return true; // Data has changed
      }
    }

    return false; // No changes detected
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

    initialFormData.current.storedData = { ...user }; // Update initial data after save

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
