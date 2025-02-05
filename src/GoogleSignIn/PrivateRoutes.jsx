import { Navigate } from "react-router-dom";
import { UserAuth } from "../Context/AuthContext";
import { PropTypes } from "prop-types";

export const PrivateRoutes = ({ children }) => {
  const { user, localUser } = UserAuth();

  return user || localUser ? children : <Navigate to="/" />;
};

PrivateRoutes.propTypes = {
  children: PropTypes.node.isRequired,
};
