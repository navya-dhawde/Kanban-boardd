import React, { useEffect } from 'react';
import Ticket from './Ticket';
import Dropdown from './Dropdown';
import './Kanban.css';
import { ReactComponent as PlusIcon } from './../assets/add.svg';
import { ReactComponent as ThreeDotsIcon } from './../assets/3 dot menu.svg';
import { ReactComponent as PriorityLowIcon } from './../assets/PriorityLowIcon.svg';
import { ReactComponent as Priority0Icon } from './../assets/Priority0Icon.svg';
import { ReactComponent as Priority4Icon } from './../assets/Priority4Icon.svg';
import { ReactComponent as PriorityMediumIcon } from './../assets/PriorityMediumIcon.svg';
import { ReactComponent as PriorityHighIcon } from './../assets/PriorityHighIcon.svg';
import { ReactComponent as StatusOpenIcon } from './../assets/To-do.svg';
import { ReactComponent as StatusClosedIcon } from './../assets/Done.svg';
import { ReactComponent as StatusBackIcon } from './../assets/Backlog.svg';
import { ReactComponent as StatusMidIcon } from './../assets/in-progress.svg';
import { ReactComponent as StatusCanceledIcon } from './../assets/Cancelled.svg';
import UserIcon from './UserIcon';

function Kanban({ tickets, users, grouping, setGrouping, ordering, setOrdering }) {
  const priorityMapping = {
    0: { name: 'No Priority', icon: <Priority0Icon /> },
    1: { name: 'Low', icon: <PriorityLowIcon /> },
    2: { name: 'Medium', icon: <PriorityMediumIcon /> },
    3: { name: 'High', icon: <PriorityHighIcon /> },
    4: { name: 'Urgent', icon: <Priority4Icon /> }
  };

  const statusIcons = {
    'Todo': <StatusOpenIcon />,
    'In progress': <StatusMidIcon />,
    'Backlog': <StatusBackIcon />,
    'Done': <StatusClosedIcon />,
    'Canceled': <StatusCanceledIcon />
  };

  const groupTickets = () => {
    const grouped = groupBy(grouping, tickets);
    Object.keys(grouped).forEach(group => {
      grouped[group] = sortTickets(grouped[group], ordering);
    });
    return grouped;
  };

  const groupBy = (grouping, tickets) => {
    switch (grouping) {
      case 'status': return groupByStatus(tickets);
      case 'user': return groupByUser(tickets);
      case 'priority': return groupByPriority(tickets);
      default: return {};
    }
  };

  const groupByStatus = (tickets) => {
    return tickets.reduce((acc, ticket) => {
      const status = ticket.status;
      if (!acc[status]) acc[status] = [];
      acc[status].push(ticket);
      return acc;
    }, {});
  };

  const groupByUser = (tickets) => {
    return tickets.reduce((acc, ticket) => {
      const user = ticket.userId;
      if (!acc[user]) acc[user] = [];
      acc[user].push(ticket);
      return acc;
    }, {});
  };

  const groupByPriority = (tickets) => {
    return tickets.reduce((acc, ticket) => {
      const priority = ticket.priority;
      if (!acc[priority]) acc[priority] = [];
      acc[priority].push(ticket);
      return acc;
    }, {});
  };

  const sortTickets = (tickets, ordering) => {
    switch (ordering) {
      case 'priority':
        return tickets.sort((a, b) => b.priority - a.priority);
      case 'title':
        return tickets.sort((a, b) => a.title.localeCompare(b.title));
      default:
        return tickets;
    }
  };

  const groupedTickets = groupTickets();

  const getAllGroups = () => {
    const allGroups = {};
    if (grouping === 'status') {
      Object.keys(statusIcons).forEach(status => {
        allGroups[status] = [];
      });
    } else if (grouping === 'user') {
      users.forEach(user => {
        allGroups[user.id] = [];
      });
    } else if (grouping === 'priority') {
      Object.keys(priorityMapping).forEach(priority => {
        allGroups[priority] = [];
      });
    }
    return allGroups;
  };

  const allGroups = getAllGroups();

  return (
    <div className="kanban-board">
      <Dropdown onGroupChange={setGrouping} onOrderChange={setOrdering} />
      <div className="columns">
        {Object.keys(allGroups).map(group => (
          <div key={group} className="column">
            <h3 className="group-header">
              {grouping === 'status' && statusIcons[group]}
              {grouping === 'priority' && priorityMapping[group]?.icon}
              {grouping === 'user' && (
                <div className="user-info">
                  <UserIcon 
                    name={users.find(user => user.id === group)?.name} 
                    isAvailable={users.find(user => user.id === group)?.available} 
                  />
                  <span>{users.find(user => user.id === group)?.name}</span>
                </div>
              )}
              {grouping === 'priority' && priorityMapping[group]?.name}
              {grouping === 'status' && group}
              <span className="ticket-count">{groupedTickets[group]?.length || 0}</span>

              <div className="icon-container">
                <PlusIcon className="plus-icon" />
                <ThreeDotsIcon className="three-dots-icon" />
              </div>
            </h3>

            {groupedTickets[group]?.map(ticket => (
              <Ticket 
              key={ticket.id} 
              ticket={ticket} 
              users={users}
              isGroupedByPriority={grouping === 'priority'} 
              isGroupedByUser={grouping === 'user'} 
              isGroupedByStatus={grouping === 'status'}  // Pass the new prop here
            />            
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Kanban;
