import React from "react";
import { ToastContainer, toast } from "react-toastify";

export default () => (
  <ToastContainer
    className="my-toast"
    position={toast.POSITION.BOTTOM_CENTER}
    autoClose={5000}
  />
);

export { toast };
