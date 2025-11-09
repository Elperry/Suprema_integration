import { useState, useEffect } from 'react';
import { deviceAPI, gateEventAPI, employeeAPI } from '../services/api';

export default function Dashboard({ health }) {
  const [stats, setStats] = useState({ devices: 0, events: 0, employees: 0 });
  const [events, setEvents] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [devs, evts, emps] = await Promise.all([
        deviceAPI.getAll(),
        gateEventAPI.getAll({ limit: 10 }),
        employeeAPI.getAll({ limit: 1 })
      ]);
      setStats({ devices: devs.data.data.length, events: evts.data.total, employees: emps.data.total });
      setEvents(evts.data.data);
    } catch (e) { console.error(e); }
  };

  return (
    <div className="dashboard">
      <h2> Dashboard</h2>
      <div className="stats-grid">
        <div className="stat-card"><h3>Devices</h3><p>{stats.devices}</p></div>
        <div className="stat-card"><h3>Employees</h3><p>{stats.employees}</p></div>
        <div className="stat-card"><h3>Events</h3><p>{stats.events}</p></div>
      </div>
      <div className="card">
        <h3>Recent Events</h3>
        <table className="table">
          <thead><tr><th>Employee</th><th>Door</th><th>Direction</th><th>Time</th></tr></thead>
          <tbody>
            {events.map((e, i) => (
              <tr key={i}>
                <td>{e.employee_id}</td>
                <td>{e.door_no}</td>
                <td>{e.dir}</td>
                <td>{new Date(e.etime).toLocaleTimeString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
