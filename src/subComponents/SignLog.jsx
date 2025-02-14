import { useState } from "react";
import PropTypes from "prop-types";
import { OverLay } from "./OverLay";
import { UserAuth } from "../Context/AuthContext";
import { LogInComponent } from "./LogInComponent";
import { SignInComponent } from "./SignInComponent";

export const SignLog = ({ closeOverlay, type }) => {
  const [popupType, setPopupType] = useState(type);
  const { googleSignIn } = UserAuth();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
      alert("something went wrong.");
    }
    closeOverlay();
  };

  return (
    <OverLay closeOverlay={closeOverlay}>
      {popupType === "SignIn" ? (
        <SignInComponent
          switchToLogIn={() => setPopupType("LogIn")}
          handleGoogleSignIn={handleGoogleSignIn}
        />
      ) : (
        <LogInComponent
          switchToSignIn={() => setPopupType("SignIn")}
          closeOverlay={closeOverlay}
          handleGoogleSignIn={handleGoogleSignIn}
        />
      )}
    </OverLay>
  );
};

// PropTypes validation
SignLog.propTypes = {
  closeOverlay: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};
