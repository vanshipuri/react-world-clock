import { useState, useEffect } from "react";
import moment from "moment-timezone";
import './App.css';
import ClockCard from "./components/ClockCard";

type Clock = {
  city: string;
};

function App() {
  const [clocks, setClocks] = useState<Clock[]>([]);
  const [city, setCity] = useState("");

  const timezones = moment.tz.names();

  useEffect(() => {
    const saved = localStorage.getItem("city-clocks");
    if (saved) setClocks(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("city-clocks", JSON.stringify(clocks));
  }, [clocks]);

  const addClock = () => {
    if (!city || !timezones.includes(city)) {
      alert("Please select a valid timezone!");
      return;
    }

    if (clocks.some(clock => clock.city === city)) {
      alert("City already added!");
      return;
    }

    setClocks([...clocks, { city }]);
    setCity("");
  };

  const deleteClock = (index: number) => {
    const updated = [...clocks];
    updated.splice(index, 1);
    setClocks(updated);
  };

  return (
  <div
  id="container-1"
  className="min-h-screen w-screen bg-gradient-to-br from-blue-100 via-purple-100 to-indigo-100 flex items-center justify-center px-4"
>
  <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8">
    <h1 className="text-4xl font-bold text-center text-indigo-800 mb-8">
       World Clock
    </h1>

    
    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
      <select
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
      >
        <option value="">-- Select a Timezone --</option>
        {timezones.map((tz) => (
          <option key={tz} value={tz}>
            {tz}
          </option>
        ))}
      </select>

      <button
        onClick={addClock}
        className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition"
      >
        Add Clock
      </button>
    </div>

    
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {clocks.map((clock, index) => (
        <ClockCard
          key={index}
          city={clock.city}
          onDelete={() => deleteClock(index)}
        />
      ))}
    </div>
    <div className="flex justify-center items-center gap-4 mt-8">
      <p>This is Coded by <strong>Vanshi</strong> and is open-sourced on <a href="">Github</a> and Hosted on <a href="">Neltify</a></p>
  </div>
  </div>
</div>
);

}

export default App;
