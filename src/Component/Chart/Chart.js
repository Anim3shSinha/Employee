import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import "./Chart.css";

const Charts = ({ maxEmployees, emp }) => {
  const [rotation, setRotation] = useState(-90);

  const percentage = Math.min((emp / maxEmployees) * 100, 100);

  useEffect(() => {
    const angle = (percentage / 100) * 360;
    setRotation(-90 + angle);
  }, [emp, percentage]);

  const ringRadius = 50;

  return (
    <>
      <div>
        <div className="circular-gauge">
          <svg viewBox="0 0 100 120">
            <circle
              cx="50"
              cy="60"
              r={ringRadius}
              className="gauge-background"
              style={{
                stroke: "#ccc",
                strokeWidth: "10",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
              }}
            />
            <circle
              cx="50"
              cy="60"
              r={ringRadius}
              className="gauge-foreground"
              style={{
                stroke: "#2196F3",
                strokeWidth: "10",
                transform: `rotate(${rotation}deg)`,
                transformOrigin: "center",
                strokeDasharray: 2 * Math.PI * ringRadius,
                strokeDashoffset:
                  2 * Math.PI * ringRadius -
                  (percentage / 100) * (2 * Math.PI * ringRadius),
              }}
            />
            <text x="50" y="60" className="gauge-text">
              {emp}
            </text>
          </svg>
        </div>
      </div>
    </>
  );
};

export default Charts;
