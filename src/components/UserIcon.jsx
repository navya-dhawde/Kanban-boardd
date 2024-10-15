import React from 'react';
import './UserIcon.css';

function UserIcon({ name, isAvailable }) {
  // Check if name is defined and not empty
  const initials = name 
    ? name.split(' ').map(word => word[0].toUpperCase()).join('') 
    : '??'; // Fallback initials if name is not available

  return (
    <div className="user-icon">
      {initials}
      <div 
        className="status-dot" 
        style={{ backgroundColor: isAvailable ? 'rgb(255, 231, 93)' : 'grey' }}
      ></div> {/* Change color based on availability */}
    </div>
  );
}

export default UserIcon;
