import React from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
export default function Sidebar() {
  const location = useLocation();

  return (
    <div className='sidebar collapse d-lg-block' style={{ height: '100vh', width:'9vw'}}>
      <nav className="collapse d-lg-block sidebar collapse bg-white" >
        <div className="position-sticky bg-light" style={{height: '100vh'}} >
          <div className="list-group list-group-flush mr-1 ">
            <a
              href="/content/dashboard"
              className={`list-group-item list-group-item-action py-2 ripple ${
                (location.pathname === '/content/dashboard' || location.pathname === '/content')  ? 'active' : ''
              }`}
            >
              <span>Dashboard</span>
            </a>
            <a
              href="/content/lottery_add"
              className={`list-group-item list-group-item-action py-2 ripple ${
                location.pathname === '/content/lottery_add' ? 'active' : ''
              }`}
            >
              <span>Lottery Add</span>
            </a>
            <a
              href="/content/lottery_summary"
              className={`list-group-item list-group-item-action py-2 ripple ${
                location.pathname === '/content/lottery_summary' ? 'active' : ''
              }`}
            >
              <span>Lottery Summary</span>
            </a>
            <a
              href="/content/audit_trial"
              className={`list-group-item list-group-item-action py-2 ripple ${
                location.pathname === '/content/audit_trial' ? 'active' : ''
              }`}
            >
              <span>Audit Trail</span>
            </a>
            <a
              href="/content/monitoring"
              className={`list-group-item list-group-item-action py-2 ripple ${
                location.pathname === '/content/monitoring' ? 'active' : ''
              }`}
            >
              <span>Monitoring</span>
            </a>
            <a
              href="/content/audit_form"
              className={`list-group-item list-group-item-action py-2 ripple ${
                location.pathname === '/content/audit_form' ? 'active' : ''
              }`}
            >
              <span>Form</span>
            </a>
            <a
              href="/content/report"
              className={`list-group-item list-group-item-action py-2 ripple ${
                location.pathname === '/content/report' ? 'active' : ''
              }`}
            >
              <span>Report</span>
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
}
