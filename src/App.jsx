import { useState, useEffect } from "react"; // useState stores data and useEffects will be used later to fetch data from API
import "./App.css";
// Main App component
function App() { // In React, everything is a function that returns UI. This is our main component where we will build our app.

  const [donors, setDonors] = useState([]); 

  const [loading, setLoading] = useState(true); 

  const [selectedGroup, setSelectedGroup] = useState("");

  const [requested, setRequested] = useState({});

  const [searchCity, setSearchCity] = useState("");

  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {

    // function to fetch donor data
    const fetchDonors = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await response.json();
        console.log(data);

        // store data in donors state
        // adding blood group manually to each donor (since API doesn't provide it)
        const bloodGroups = ["A+", "B+", "O+", "AB+", "A-", "B-", "O-", "AB-"];

        const donorsWithBlood = data.map((donor, index) => ({
          ...donor,
          bloodGroup: bloodGroups[index % bloodGroups.length], // assigning blood group in cycle
          availability: index % 2 === 0 ? "Available" : "Busy"
        }));

        // store updated donors
        setDonors(donorsWithBlood);

        // stop loading
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDonors();

  }, []); // empty array means this runs only once when app loads

  // applying filter + search + sort together
  const processedDonors = donors
    .filter((donor) => {
      if (selectedGroup !== "" && donor.bloodGroup !== selectedGroup) return false;
      if (searchCity !== "" && !donor.address.city.toLowerCase().includes(searchCity.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortOrder === "available") {
        return a.availability === "Available" ? -1 : 1;
      }
      if (sortOrder === "busy") {
        return a.availability === "Busy" ? -1 : 1;
      }
      return 0;
    });

  return ( 
    <div>
      <h1>Blood Donor Finder</h1>

      <div className="controls">
        {/* dropdown to filter donors by blood group */}
        <select
          value={selectedGroup}
          onChange={(e) => setSelectedGroup(e.target.value)}
        >
          <option value="">All</option>
          <option value="A+">A+</option>
          <option value="B+">B+</option>
          <option value="O+">O+</option>
          <option value="AB+">AB+</option>
          <option value="A-">A-</option>
          <option value="B-">B-</option>
          <option value="O-">O-</option>
          <option value="AB-">AB-</option>
        </select>

        {/* search by city */}
        <input
          type="text"
          placeholder="Search by city"
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
        />

        {/* sort by availability */}
        <select onChange={(e) => setSortOrder(e.target.value)}>
          <option value="">Sort</option>
          <option value="available">Available First</option>
          <option value="busy">Busy First</option>
        </select>
      </div>

      {/* showing total donors (after filtering) */}
      <p>
        Total Donors: {processedDonors.length}
      </p>

      {/* This checks loading state */}
      {/* If loading = true → show loading text */}
      {/* If loading = false → show donors section */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid-container">
          {/* looping through donors to show them as cards */}

          {processedDonors.length === 0 && (
            <p>No donors found</p>
          )}

          {processedDonors.map((donor) => (
            <div key={donor.id} className="card">
              <h3>{donor.name}</h3>
              <p>Email: {donor.email}</p>
              <p>Phone: {donor.phone}</p>
              <p>Blood Group: {donor.bloodGroup}</p>
              <p>City: {donor.address.city}</p>
              <p>Availability: {donor.availability}</p>

              {/* button to request help from donor */}
              <button
                onClick={() => {
                  setRequested({
                    ...requested,
                    [donor.id]: true
                  });
                }}
                disabled={requested[donor.id] || donor.availability === "Busy"} // disables after click
              >
                {donor.availability === "Busy"
                  ? "Not Available "
                  : requested[donor.id]
                  ? "Request Sent "
                  : "Request Help"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
