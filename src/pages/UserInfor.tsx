import React, { useState, useEffect } from 'react';
import UserInforService from '../services/UserInforService';

export default function UserInfor() {
  const [managerInfo, setManagerInfo] = useState({} as any);
  const [userInfo, setUserInfo] = useState([]);
  const [emailInput, setEmailInput] = useState('');
  const [roleResult, setRoleResult] = useState('');
  const [infor, setInfor] = useState<any>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userService = new UserInforService();

        const userData = await userService.getUserList();
        setUserInfo(userData);

        const uniqueManagers = await userService.getManagerList();
        setManagerInfo(uniqueManagers);

        const usersWithSameManager = await userService.getUsersByManager('terry.quinlivan.df@gr.renesas.com', userData);
        console.log(usersWithSameManager);
        console.log(uniqueManagers);
        console.log(userData);
        console.log("get role of terry: " + userService.getRole("terry.quinlivan.df@gr.renesas.com"));

        // setInfor(userService.getUserInfor(emailInput));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleCheckRole = () => {
    const userService = new UserInforService();
    setRoleResult(userService.getRole(emailInput));

  }
  return (
    <div className="container">
      <h4>User information</h4>
      <div className="mb-3">
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
          required
        />
      </div>
      <button
        className="btn btn-primary"
        onClick={handleCheckRole}
      >
        Check Role
      </button>
      <h5>User roles:</h5>
      {roleResult && (
        <div className="mt-3">
          <p>{roleResult}</p>
          <p>{infor}</p>
        </div>
      )}
    </div>
  );
}
