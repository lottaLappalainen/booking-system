import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { useSelector, useDispatch } from 'react-redux';
import 'react-calendar/dist/Calendar.css';
import { toggleTimeSlot, addTimeSlot, removeTimeSlot } from '../actions/timeSlotActions';
import { addBlockedDates, unblockDates } from '../actions/blockingActions'; 
import { setNotification } from "../actions/notificationActions";

const Settings = () => {
  const dispatch = useDispatch();
  const timeSlots = useSelector((state) => state.timeSlots);
  const blockedDates = useSelector((state) => state.blockedDates.blockedDates); 
  const [newTime, setNewTime] = useState('');
  const [selectedBlockedDates, setSelectedBlockedDates] = useState([]);
  const [selectedUnblockedDates, setSelectedUnblockedDates] = useState([]);

  console.log(blockedDates)

  const handleToggle = (time) => {
    dispatch(toggleTimeSlot(time));
  };

  const handleAddTime = () => {
    const trimmedTime = newTime.trim();
    const timeRegex = /^([0-1]\d|2[0-3]):([0-5]\d)$/;

    if (!timeRegex.test(trimmedTime)) {
      dispatch(setNotification({ message: 'Please enter a valid time in HH:MM format.', requestStatus: 'loading' }));
      return;
    }
    if (timeSlots.includes(trimmedTime)) {
      dispatch(setNotification({ message: 'This time slot already exists.', requestStatus: 'error' }));
      return;
    }

    dispatch(addTimeSlot(trimmedTime));
    setNewTime('');
  };

  const handleRemoveTime = (time) => {
    dispatch(removeTimeSlot(time));
  };

  const handleBlockDates = () => {
    if (selectedBlockedDates.length === 0) {
      dispatch(setNotification({ message: 'Please select at least one date to block.', requestStatus: 'loading' }));
      return;
    }
    dispatch(addBlockedDates(selectedBlockedDates));
    setSelectedBlockedDates([]);
  };

  const handleUnblockDates = () => {
    if (selectedUnblockedDates.length === 0) {
      dispatch(setNotification({ message: 'Please select at least one date to unblock.', requestStatus: 'loading' }));
      return;
    }
    dispatch(unblockDates(selectedUnblockedDates));
    setSelectedUnblockedDates([]);
  };

  const handleDateSelect = (dates) => {
    const formattedDates = Array.isArray(dates) ? dates.map((date) => date.toDateString()) : [dates.toDateString()];
    setSelectedBlockedDates(formattedDates);
  };

  const handleDateUnselect = (dates) => {
    const formattedDates = Array.isArray(dates) ? dates.map((date) => date.toDateString()) : [dates.toDateString()];
    setSelectedUnblockedDates(formattedDates);
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
      <h2>Block Dates</h2>
      <p>Select one or multiple days to block them for bookings:</p>
      <Calendar
        onChange={handleDateSelect}
        selectRange={true}
      />
      <button onClick={handleBlockDates} className="block-dates-btn">Block Selected Dates</button>
      <h2>Unblock Dates</h2>
      <p>Select one or multiple blocked days to unblock them:</p>
      <Calendar
        onChange={handleDateUnselect}
        tileDisabled={({ date }) => !blockedDates.includes(date.toDateString())} 
        selectRange={true}
      />
      <button onClick={handleUnblockDates} className="unblock-dates-btn">Unblock Selected Dates</button>

      <style>
        {`
          .settings-container {
            max-width: 600px;
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

          .block-dates-btn {
            margin-top: 20px;
            padding: 10px 20px;
            background-color: #ff4d4f;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            transition: background-color 0.3s ease;
          }

          .block-dates-btn:hover {
            background-color: #ff7875;
          }
        
          .unblock-dates-btn {
            margin-top: 20px;
            padding: 10px 20px;
            background-color: #52c41a;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            transition: background-color 0.3s ease;
          }

          .unblock-dates-btn:hover {
            background-color: #73d13d;
          }
        `}
      </style>
    </div>
  );
};

export default Settings;
