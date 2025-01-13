import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const BidPage = () => {
  const [email, setEmail] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [timeRange, setTimeRange] = useState('');
  const [destination, setDestination] = useState('');
  const baseURL = 'http://localhost:8005'

  const timeSlots = Array.from({ length: 24 }, (_, i) => `${i}-${i + 1}`); // Generate time ranges: 0-1, 1-2, etc.

  // Combine selectedDate and startHour into SQL TIMESTAMP format
 

  const handleSubmit = async(e) => {

    const formattedTimeRange = timeRange
    .split('-')
    .map((time) => time.padStart(2, '0')) // Ensure each part has 2 digits
    .join('');

    e.preventDefault();
    console.log({
      email,
      selectedDate: selectedDate.toISOString().split('T')[0],
      timeRange: formattedTimeRange,
      destination,
    });
    try{
        
        const res = await fetch(`${baseURL}/placebid`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                selectedDate: selectedDate.toISOString().split('T')[0],
                timeRange: formattedTimeRange,
                destination,
            })
        });
        const data = await res.json();
        console.log(data);
        if(res.status==422 || !data)
            console.log("some error bro");
        else {
            console.log("bid placed bro");
            console.log(data);
            
        }
    }
    catch(error){
        console.log("here bro",error.message);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
      <h1>B Page</h1>
      <form onSubmit={handleSubmit}>
        {/* Email Input */}
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        {/* Calendar */}
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="calendar" style={{ display: 'block', marginBottom: '5px' }}>
            Select a Day:
          </label>
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            style={{ marginBottom: '10px' }}
          />
        </div>

        {/* Time Range Dropdown */}
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="timeRange" style={{ display: 'block', marginBottom: '5px' }}>
            Time Range:
          </label>
          <select
            id="timeRange"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          >
            <option value="" disabled>
              Select a time range
            </option>
            {timeSlots.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>

        {/* Destination Input */}
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="destination" style={{ display: 'block', marginBottom: '5px' }}>
            Destination:
          </label>
          <input
            type="text"
            id="destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            required
            placeholder="Enter destination"
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          style={{
            backgroundColor: '#007bff',
            color: '#fff',
            padding: '10px 15px',
            borderRadius: '4px',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Submit Bid
        </button>
      </form>
    </div>
  );
};

export default BidPage;
