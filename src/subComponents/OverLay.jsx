import PropTypes from "prop-types";

export const OverLay = ({ children, closeOverlay }) => {
  return (
    <>
      <div className="overlay-div" onClick={closeOverlay}>
        <div className="relative m-auto bg-white rounded h-48 w-[90%] max-w-[500px]  grid place-items-center z-50  py-5 px-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="currentColor"
            className="size-6 hover:stroke-red-700  transition cursor-pointer absolute right-2 top-[0.5rem]"
            onClick={closeOverlay}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>

          {/* Use closeOverlay function when clicking the close button */}
          <div className="w-full">{children}</div>
          {/* Render children (like the NewBatch content) */}
        </div>
      </div>
    </>
  );
};

OverLay.propTypes = {
  children: PropTypes.node.isRequired,
  closeOverlay: PropTypes.func.isRequired,
};
