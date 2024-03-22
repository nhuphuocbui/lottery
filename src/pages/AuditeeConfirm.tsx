import React, { useState } from "react";
import Toast from "../utils/notification";

const AuditeeConfirm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [data, setData] = useState<any[]>([
    { id: 1, name: 'PQM_Complaint FA Engineer', description: '', confirmed: false },
    { id: 2, name: 'PQM_Complaint Quality Analyst', description: '', confirmed: false },
    { id: 3, name: 'PQM_Dresden PEs', description: '', confirmed: false },
    { id: 4, name: 'PQM_Design Engineer', description: '', confirmed: false },
    // Thêm dữ liệu giả định ở đây
  ]);

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>, id: number) => {
    const newData = data.map((item) => {
      if (item.id === id) {
        return { ...item, description: event.target.value };
      }
      return item;
    });

    setData(newData);
  };

  const handleConfirmationChange = (id: number) => {
    const newData = data.map((item) => {
      if (item.id === id) {
        return { ...item, confirmed: !item.confirmed };
      }
      return item;
    });

    setData(newData);
  };

  //--------------------------------
  const handleSubmit = () => {
    console.log(data);
    setIsSubmitted(true);
    Toast.notifySuccess("Submitted successfully!");
  };



  return (
    <div className="container">
      <h5 className="pt-3 pl-3">AUDITEE CONFIRM</h5>
      {isSubmitted ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "70vh" }}
        >
          <h1 className="">Thank you for your time!</h1>
        </div>
      ) : (
        <>
          <div className="container-fluid">
            <div className="row">
              <p className="col-md-2">NAME: </p>
              <p className="col-md-10">AN PHAM</p>
            </div>
            <div className="row">
              <p className="col-md-2">TITLE: </p>
              <p className="col-md-10">IT ANALYST</p>
            </div>
            <div className="row">
              <p className="col-md-2">MANAGER: </p>
              <p className="col-md-10">TERRY QUINLIVAN</p>
            </div>
            <div className="row">
              <p className="col-md-2"> DEPARTMENT: </p>
              <p className="col-md-10">
                {" "}
                RVC/DO(ISD, Software & Digitalization)/ISD/-/ISQS
              </p>
            </div>
            <div className="row">
              <p className="col-md-2"> LAST USED: </p>
              <p className="col-md-10"> 2023-08-31</p>
            </div>
            <div className="row fw-bold">
              <p className="col-md-2 "> NOTES: </p>
              <p className="col-md-10 ">
                {" "}
                Please ensure accurate confirmation based on your current role
                and responsibilities. Your confirmation will assist in
                maintaining accurate user group privileges.
              </p>
            </div>
          </div>

          {/*  */}
          <div className="container pb-5 mb-5">
            <table className="table ">
              <thead>
                <tr className="text-center ">
                  <th>#</th>
                  <th>NAME</th>
                  <th>DESCRIPTION</th>
                  <th>CONFIRMATION</th>
                </tr>
              </thead>
              <tbody >
                {data.map((item: any, index: number) => (
                  <tr key={item.id} className="text-center">
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        value={item.description}
                        onChange={(e) => handleDescriptionChange(e, item.id)}
                      />
                    </td>
                    <td >
                      <input
                        style={{width:'25px', height:'25px'}}
                        type="checkbox"
                        checked={item.confirmed}
                        onChange={() => handleConfirmationChange(item.id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="container mt-5 pt-5">
            <div className="container d-flex ">
               <input type="checkbox" className="text-center mx-3" required/>
               <div className="">I have reviewed the confirmation details and made necessary approvals/rejections.</div>
            </div>
            <div className="d-flex justify-content-end">
               <button className="btn btn-primary px-4" onClick={handleSubmit}>
                SUBMIT
               </button>
            </div>
          </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AuditeeConfirm;
