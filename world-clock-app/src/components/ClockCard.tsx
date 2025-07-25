import { useEffect, useState } from "react";
import moment from "moment-timezone";

type ClockCardProps = {
  city: string;
  onDelete: () => void;
};

const ClockCard: React.FC<ClockCardProps> = ({ city, onDelete }) => {
  const [currentTime, setCurrentTime] = useState<string>("--:--:--");
  const [currentDate, setCurrentDate] = useState<string>("Loading...");

  useEffect(() => {
    const updateTime = () => {
      const now = moment().tz(city);
      setCurrentTime(now.format("HH:mm:ss"));
      setCurrentDate(now.format("dddd, MMMM D, YYYY"));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [city]);

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-xl transition">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-indigo-700">
          {city.replace("_", " ")}
        </h2>
        <button
          onClick={onDelete}
          className="text-red-500 hover:text-red-700 text-sm font-bold"
        >
          ✕
        </button>
      </div>
      <div className="text-3xl font-mono text-gray-800">{currentTime}</div>
      <div className="text-sm text-gray-500 mt-2">{currentDate}</div>
    </div>
  );
};

export default ClockCard;
