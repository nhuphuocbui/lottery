import React from "react";
import TicketForm from "./TicketForm";

export default function LotteryAdd() {
  return (
    <>
      <div className="container p-3" style={{backgroundColor:"white"}}>
        <h5>New tickets</h5>
        <TicketForm />
      </div>
    </>
  );
}
