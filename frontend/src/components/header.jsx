import React, { useState, useEffect } from "react";

function Header() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <header className="bg-[#355F2E] text-white p-4">
      <div className="container mx-auto">
        <div className="text-xl">
          {formatDate(time)} <span className="bg-[#FFCFEF] text-black px-2 py-1 rounded">{formatTime(time)}</span>
        </div>
      </div>
    </header>
  );
}

export default Header;
