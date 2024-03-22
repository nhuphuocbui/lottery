import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

interface Ticket {
  date_play: string;
  station: string;
  ticket_type: string;
  number_play: string;
  primary_fee: number;
  secondary_fee: number;
  customer_charge: number;
  banker_charge: number;
}

const TicketForm: React.FC = () => {
  const { register, handleSubmit, setValue, watch, formState: { errors}, } = useForm<Ticket>();
  const [ticketList, setTicketList] = useState<Ticket[]>([]);

  const onSubmit = (data: Ticket) => {
    const { date_play, station, ticket_type, number_play, primary_fee, secondary_fee } = data;

    // Calculate customer charge and banker charge
    let calculated_customer_charge = 0;

  switch (ticket_type) {
    case "BL":
      calculated_customer_charge = (primary_fee) * 14;
      break;
    case "DD":
      calculated_customer_charge = ((primary_fee) + (secondary_fee)) * (5/6);
      break;
    case "XC":
      calculated_customer_charge = (primary_fee) + (secondary_fee);
      break;
    case "DA":
      calculated_customer_charge = (primary_fee) * 28;
      break;
    case "XIEN":
      calculated_customer_charge = (primary_fee) * 56;
      break;
    case "BL3":
      calculated_customer_charge = (primary_fee) * 14;
      break;
    case "DA3":
      calculated_customer_charge = (primary_fee) * 84;
      break;
    default:
      calculated_customer_charge = 0;
      break;
  }
    const calculated_banker_charge = calculated_customer_charge * 0.9;

    // Create new ticket object
    const newTicket: Ticket = {
      date_play,
      station,
      ticket_type,
      number_play,
      primary_fee,
      secondary_fee,
      customer_charge: calculated_customer_charge,
      banker_charge: calculated_banker_charge,
    };

    // Update ticket list
    const updatedTicketList = [...ticketList, newTicket];
    setTicketList(updatedTicketList);
    console.log(updatedTicketList);
    // Save ticket list to local storage
    localStorage.setItem('ticketList', JSON.stringify(updatedTicketList));

    // Reset form values
    setValue('date_play', new Date().toISOString().split('T')[0]); // Set default date to today
    setValue('station', 'D1'); // Set default station value
    setValue('ticket_type', 'BL'); // Set default ticket type value
    setValue('number_play', ''); // Reset number play field
    setValue('primary_fee', 0); // Reset primary fee field
    setValue('secondary_fee', 0); // Reset secondary fee field
  };

  // Watch primary_fee value changes and update customer charge and banker charge accordingly
  const primaryFee = watch('primary_fee');
  const customerCharge = primaryFee * 18 || 0;
  const bankerCharge = primaryFee * 19 || 0;

  return (
    <div className="container m-3">
      <div className="row">
        <div className="col-md-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3 row">
              <div className="col">
                <label htmlFor="date_play" className="form-label">Date:</label>
                <input type="date" id="date_play" className="form-control" {...register('date_play')} defaultValue={new Date().toISOString().split('T')[0]} />
              </div>
              <div className="col">
                <label htmlFor="station" className="form-label">Station:</label>
                <select id="station" className="form-select" {...register('station')}>
                  <option value="D1">D1</option>
                  <option value="D2">D2</option>
                </select>
              </div>
            </div>
            <div className="mb-3 row">
              <div className="col">
                <label htmlFor="ticket_type" className="form-label">Ticket Type:</label>
                <select id="ticket_type" className="form-select" {...register('ticket_type')}>
                  <option value="BL">BL</option>
                  <option value="DD">DD</option>
                  <option value="DA">DA</option>
                  <option value="XIEN">XIEN</option>
                  <option value="XC">XC</option>
                  <option value="BL3">BL3</option>
                  <option value="DA3">DA3</option>
                </select>
              </div>
              <div className="col">
                <label htmlFor="number_play" className="form-label">Number Play:</label>
                <input type="text" id="number_play" className="form-control"
                {...register('number_play', { required: true })} />
                {errors.number_play && (
                      <span
                        className="text-danger ml-3"
                        style={{ fontSize: "0.8rem" }}
                      >
                        *Required
                      </span>
                    )}
              </div>
            </div>
            <div className="mb-3 row">
              <div className="col">
                <label htmlFor="primary_fee" className="form-label">Primary Fee:</label>
                <input type="number" min="0" id="primary_fee" className="form-control" {...register('primary_fee')} />
              </div>
              <div className="col">
                <label htmlFor="secondary_fee" className="form-label">Secondary Fee:</label>
                <input type="number" min="0" id="secondary_fee" className="form-control" {...register('secondary_fee')} />
              </div>
            </div>
            <div className="mb-3 row">
              <div className="col">
                <label htmlFor="customer_charge" className="form-label">Customer Charge:</label>
                <input type="text" id="customer_charge" className="form-control" value={customerCharge} readOnly />
              </div>
              <div className="col">
                <label htmlFor="banker_charge" className="form-label">Banker Charge:</label>
                <input type="text" id="banker_charge" className="form-control" value={bankerCharge} readOnly />
              </div>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TicketForm;
