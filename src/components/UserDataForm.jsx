import { useState, useEffect, useRef } from "react";
// NOT OPTIMIZED FULLY-----
const UserForm = () => {
  const initialState = { name: "", email: "" };
  const [formData, setFormData] = useState(initialState);
  const [originalData, setOriginalData] = useState({});
  const isFormChanged = useRef(false);

  // Load stored data on mount
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userForm")) || {};
    setFormData(storedData);
    setOriginalData(storedData);
  }, []);

  // Warn user before leaving with unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (isFormChanged.current) {
        event.preventDefault();
        event.returnValue = "You have unsaved changes!";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  // Handle input change and track meaningful changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    const trimmedValue = value.trim();

    setFormData((prev) => {
      const updatedData = { ...prev, [name]: value };

      // Detect actual changes
      if (trimmedValue !== (originalData[name] || "").trim()) {
        isFormChanged.current = true;
      } else {
        isFormChanged.current = Object.keys(updatedData).some(
          (key) => updatedData[key].trim() !== (originalData[key] || "").trim()
        );
      }

      return updatedData;
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const storedData = JSON.parse(localStorage.getItem("userForm")) || {};

    // Only save if there are actual changes
    if (JSON.stringify(formData).trim() !== JSON.stringify(storedData).trim()) {
      localStorage.setItem("userForm", JSON.stringify(formData));
      setOriginalData(formData);
      isFormChanged.current = false;
    }

    // Reset form fields after submission
    setFormData(initialState);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:{" "}
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Email:{" "}
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </label>
      <br />
      <button type="submit">Save</button>
    </form>
  );
};

export default UserForm;
