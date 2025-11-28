import React from "react";
import "./Notification.css";

export default function Notification({ message }) {
  if (!message) return null;

  return (
    <div className="notif-popup">
      {message}
    </div>
  );
}
