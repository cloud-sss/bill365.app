// DashboardCard.jsx
import React from "react";
import "./DashboardCard.css";

const DashboardCard = ({
  header,
  body,
  footerNumber,
  footerText,
  borderColor, // e.g. "#a684ff"
  primaryTextColor,
  secondaryColor,
  svg,
}) => {
  return (
    <div className="card-wrapper">
      <div
        className={`card ${svg} bg-no-repeat bg-cover bg-white p-6 rounded-xl shadow-2xl transition-all duration-300 cursor-pointer`}
        style={{ "--border-color": borderColor }}>
        <div className="flex justify-between mb-3 gap-4">
          <div>
            <span className="block text-gray-600 text-normal font-sans font-bold mb-3">
              {header}
            </span>
            <div className="text-2xl font-bold">{body}</div>
          </div>
          <div
            className={`flex items-center justify-center ${secondaryColor} rounded`}
            style={{ width: "2.5rem", height: "2.5rem" }}>
            <i className={`pi pi-user ${primaryTextColor} text-xl`} />
          </div>
        </div>
        <span className={`${primaryTextColor} font-medium`}>
          {footerNumber}{" "}
        </span>
        <span className="text-500">{footerText}</span>
      </div>
    </div>
  );
};

export default DashboardCard;
