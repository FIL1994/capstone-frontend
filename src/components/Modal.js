import React from "react";
import ReactModal from "react-modal";

ReactModal.setAppElement("#root");

export default props => (
  <ReactModal
    style={{
      content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        padding: "3%"
      },
      overlay: {
        backgroundColor: "rgba(14, 14, 14, 0.38)"
      }
    }}
    {...props}
  />
);
