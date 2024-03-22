import React from 'react'

export default function Monitoring() {
  return (
    <div className="container">
      <h5 className="m-3 p-3">MONITORING </h5>
      <table className="table mx-4 text-center">
        <thead>
          <tr>
            <th scope="col">NAME</th>
            <th scope="col">START DATE</th>
            <th scope="col">END DATE</th>
            <th scope="col">PHASE 1</th>
            <th scope="col">PHASE 2</th>
            <th scope="col">STATUS</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>AUDIT ALL</td>
            <td>08/12/2023</td>
            <td>09/12/2023</td>
            <td>30/50</td>
            <td>0/10</td>
            <td><button className='btn btn-secondary'>IN PROGRESS</button></td>
          </tr>
          <tr>
            <td>AUDIT PPM </td>
            <td>08/12/2023</td>
            <td>09/12/2023</td>
            <td>50/50</td>
            <td>10/10</td>
            <td><button className='btn btn-primary'>REPORT</button></td>
          </tr>
          <tr>
            <td>AUDIT PQM </td>
            <td>01/23/2023</td>
            <td>02/18/2023</td>
            <td>50/50</td>
            <td>10/10</td>
            <td><button className='btn btn-primary'>REPORT</button></td>
          </tr>
          <tr>
            <td>AUDIT DEMO </td>
            <td>08/23/2023</td>
            <td>09/31/2023</td>
            <td>50/50</td>
            <td>10/10</td>
            <td><button className='btn btn-primary'>REPORT</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
