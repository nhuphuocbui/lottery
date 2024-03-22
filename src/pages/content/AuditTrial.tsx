import React, { useContext, useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import FilterComponent from '../../components/FilterComponent';
import { useNavigate } from 'react-router-dom';
import { GeneralContext } from '../../context/GeneralContext';
import UserInforService from '../../services/UserInforService';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
interface userData {
	id: string,
    name: string,
    user_group: string,
    creation_date: string,
    last_used: string,
    manager: string,
    org: string,
}
export default function AuditTrial() {
	const [userDataList, setUserDataList] = useState<userData[]>([]);
	useEffect(() => {
		const fetchUserData = async () => {
		  try {
			const userService = new UserInforService();
			const data = await userService.getUserList();

			// Chuyển đổi dữ liệu từ UserInforService thành định dạng userData
			const formattedData: userData[] = data.map((item: any) => {
			  return {
				id: item['Login id'],
				name: `${item['First Name']} ${item['Last Name']}`,
				user_group: item['User Groups'],
				creation_date: item['Account created date'],
				last_used: item['Last Login'],
				manager: item["Manager's Email"],
				org: item['company'],
			  };
			});

			setUserDataList(formattedData);
			setIsLoading(false);
		  } catch (error) {
			console.error("Error fetching user data:", error);
		  }
		};

		fetchUserData();
	  }, []);

	const columns = [
    {
      name: "ID",
      selector: (row:any) => row.id,
	  		wrap: true,
			sortable: true,
    },
    {
      name: "NAME",
      selector: (row:any) => row.name,
			wrap: true,
			sortable: true,
    },
	{
      name: "USER GROUP",
      selector: (row:any) => row.user_group,
			width: "20rem",
			wrap: true,
			sortable: true,
    },
		{
      name: "CREATION DATE",
      selector: (row:any) => row.creation_date,
			wrap: true,
			sortable: true,
    },
		{
      name: "LAST USED",
      selector: (row:any) => row.last_used,
			with: "auto",
			sortable: true,
    },
		{
      name: "MANAGER",
      selector: (row:any) => row.manager,
			width: "auto",
			wrap: true,
			sortable: true,
    },
		{
      name: "ORG",
      selector: (row:any) => row.org,
    },
  ];

  	//loading
	const [isLoading, setIsLoading] = useState(true); // State to manage loading state
  	//set duration value
  	const { duration, setDurationValue } = useContext(GeneralContext);
	//fetch filter data trước, data chính là userDataList
	//filter
	const [filterText, setFilterText] = React.useState('');
	const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
	const filteredData = userDataList.filter(
		item => item.name && item.name.toLowerCase().includes(filterText.toLowerCase()),
	);
	const subHeaderComponentMemo = React.useMemo(() => {
		const handleClear = () => {
			if (filterText) {
				setResetPaginationToggle(!resetPaginationToggle);
				setFilterText('');
			}
		};
		return (
			<FilterComponent onFilter={(e: { target: { value: React.SetStateAction<string>; }; }) => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
		);
	}, [filterText, resetPaginationToggle]);

	//--------------
	const navigate = useNavigate();
	const handleNextBtn = () => {
		console.log("Next btn clicked!");
		console.log("Duration: " + duration);
		navigate("/content/audit_form");
	}
	const handleSelectChange = (event : any) => {
		const selectedDuration = event.target.value;
		setDurationValue(selectedDuration);
	};
  return (
    <>
      <div className="container ">
        <div className="container d-flex align-items-center mt-3" >
          <div className="px-3 fw-bold">DURATION:</div>
          <select className="" style={{width:'20%'}} onChange={handleSelectChange}>
            <option value="14">2 Weeks</option>
            <option value="30">1 Month</option>
            <option value="60">2 Months</option>
          </select>
		  <div className='mx-3'>
			<button className="btn btn-primary" onClick={handleNextBtn}>
				Next
			</button>
		  </div>
        </div>
        {isLoading ? (
          // Show Skeleton when loading
          <div className="container-fluid mt-5">
            <Skeleton count={5} height={40} />
          </div>
        ) : (
          // Show DataTable when data is loaded
          <div className="container-fluid my-2">
            <DataTable
              columns={columns}
              data={filteredData}
              pagination
              paginationResetDefaultPage={resetPaginationToggle}
              fixedHeader
              responsive
              highlightOnHover
              subHeader
              subHeaderComponent={subHeaderComponentMemo}
            />
          </div>
        )}
      </div>
    </>
  );
}
