import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTimeSlot, addTimeSlot, removeTimeSlot } from '../actions/timeSlotActions';

const Settings = () => {
  const dispatch = useDispatch();
  const timeSlots = useSelector((state) => state.timeSlots);
  const [newTime, setNewTime] = useState('');

  const handleToggle = (time) => {
    dispatch(toggleTimeSlot(time));
  };

  const handleAddTime = () => {
    const trimmedTime = newTime.trim();
    const timeRegex = /^([0-1]\d|2[0-3]):([0-5]\d)$/;

    if (!timeRegex.test(trimmedTime)) {
      alert('Please enter a valid time in HH:MM format.');
      return;
    }
    if (timeSlots.includes(trimmedTime)) {
      alert('This time slot already exists.');
      return;
    }

    dispatch(addTimeSlot(trimmedTime));
    setNewTime('');
  };

  const handleRemoveTime = (time) => {
    if (window.confirm(`Are you sure you want to remove the time slot ${time}?`)) {
      dispatch(removeTimeSlot(time));
    }
  };

  return (
    <div className="settings-container">
      <h2>Manage Time Slots</h2>
      <div className="time-slots">
        {timeSlots.length > 0 ? (
          timeSlots.map((time, index) => (
            <div key={index} className="time-slot">
              <label>
                <input
                  type="checkbox"
                  checked={timeSlots.includes(time)}
                  onChange={() => handleToggle(time)}
                />
                {time}
              </label>
              <button className="remove-btn" onClick={() => handleRemoveTime(time)}>✕</button>
            </div>
          ))
        ) : (
          <p>No available time slots.</p>
        )}
      </div>
      <div className="add-time">
        <input
          type="text"
          placeholder="Add new time (HH:MM)"
          value={newTime}
          onChange={(e) => setNewTime(e.target.value)}
        />
        <button onClick={handleAddTime}>Add Time</button>
      </div>

      <style>
        {`
          .settings-container {
            max-width: 500px;
            margin: 50px auto;
            padding: 20px;
            background-color: rgba(255, 255, 255, 0.9);
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            font-family: Arial, sans-serif;
          }

          .settings-container h2 {
            text-align: center;
            color: #333;
            margin-bottom: 20px;
          }

          .time-slots {
            display: flex;
            flex-direction: column;
            gap: 10px;
            margin-bottom: 20px;
          }

          .time-slot {
            display: flex;
            align-items: center;
            justify-content: space-between;
            background-color: #f9f9f9;
            padding: 10px 15px;
            border-radius: 5px;
            transition: background-color 0.3s ease;
          }

          .time-slot:hover {
            background-color: #e6f7ff;
          }

          .time-slot label {
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 16px;
            color: #333;
          }

          .remove-btn {
            background: none;
            border: none;
            color: #ff4d4f;
            font-size: 18px;
            cursor: pointer;
            transition: color 0.3s ease;
          }

          .remove-btn:hover {
            color: #ff7875;
          }

          .add-time {
            display: flex;
            gap: 10px;
          }

          .add-time input {
            flex: 1;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            font-size: 16px;
          }

          .add-time button {
            padding: 10px 20px;
            background-color: #1890ff;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            transition: background-color 0.3s ease;
          }

          .add-time button:hover {
            background-color: #40a9ff;
          }
        `}
      </style>
    </div>
  );
};

export default Settings;
