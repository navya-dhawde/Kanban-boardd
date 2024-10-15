import React from 'react';
import './Ticket.css';
import { ReactComponent as Priority0Icon } from './../assets/Priority0Icon.svg';
import { ReactComponent as PriorityLowIcon } from './../assets/PriorityLowIcon.svg';
import { ReactComponent as PriorityMediumIcon } from './../assets/PriorityMediumIcon.svg';
import { ReactComponent as PriorityHighIcon } from './../assets/PriorityHighIcon.svg';
import { ReactComponent as PriorityUrgentIcon } from './../assets/PriorityUrgentIcon.svg';
import { ReactComponent as StatusOpenIcon } from './../assets/To-do.svg';
import { ReactComponent as StatusClosedIcon } from './../assets/Done.svg';
import { ReactComponent as StatusBackIcon } from './../assets/Backlog.svg';
import { ReactComponent as StatusMidIcon } from './../assets/in-progress.svg';
import { ReactComponent as StatusCanceledIcon } from './../assets/Cancelled.svg';
import UserIcon from './UserIcon'; // Import the UserIcon

function Ticket({ ticket, isGroupedByPriority, users, isGroupedByUser, isGroupedByStatus }) {
  // Find the user based on the ticket's userId
  const user = users.find(user => user.id === ticket.userId);
  const userName = user ? user.name : 'Unknown User'; // Fallback if the user is not found
  const isAvailable = user ? user.available : false; // Fallback to false if availability not found

  const statusIcons = {
    'Todo': <StatusOpenIcon />,
    'In progress': <StatusMidIcon />,
    'Backlog': <StatusBackIcon />,
    'Done': <StatusClosedIcon />,
    'Canceled': <StatusCanceledIcon /> // Add Canceled status icon
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 0:
        return <Priority0Icon />;
      case 1:
        return <PriorityLowIcon />;
      case 2:
        return <PriorityMediumIcon />;
      case 3:
        return <PriorityHighIcon />;
      case 4:
        return <PriorityUrgentIcon />;
      default:
        return null;
    }
  };

  // Move getStatusIcon inside the Ticket component
  const getStatusIcon = (status) => {
    return statusIcons[status] || null;
  };

  return (
    <div className={`ticket-card priority-${ticket.priority}`}>
      <div className="ticket-header">
        <h3 className="ticket-id">{ticket.id}</h3>
        {/* Conditionally render UserIcon based on grouping */}
        {!isGroupedByUser && (
          <UserIcon name={userName} isAvailable={isAvailable} /> 
        )}
      </div>
      <div className="ticket-title-with-status">
        <div className="status-icon-container">
          {/* Only render the status icon if not grouped by status */}
          {!isGroupedByStatus && getStatusIcon(ticket.status)} {/* Display status icon here */}
        </div>
        <h4 className="ticket-title">{ticket.title}</h4>
      </div>

      <div className="ticket-content">
        {!isGroupedByPriority && (
          <div className="priority-icon">
            {getPriorityIcon(ticket.priority)}
          </div>
        )}
        <div className="feature-request-box">
          <div className="circle-icon"></div>
          <span className="feature-request-text">Feature Request</span>
        </div>
      </div>
    </div>
  );
}

export default Ticket;
