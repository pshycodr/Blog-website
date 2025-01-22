import React from "react";

interface DateTimeProps {
  isoDate: string; // The ISO date string from the database
}

const DateTime: React.FC<DateTimeProps> = ({ isoDate }) => {
  const formatDateTime = (isoString: string): string => {
    const date = new Date(isoString);

    // Format date
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();

    // Format time
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // Format hours and minutes with leading zero if needed
    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");

    return `${day} ${month} ${year}, ${formattedHours}:${formattedMinutes}`;
  };

  return <span>{formatDateTime(isoDate)}</span>;
};

export default DateTime;
