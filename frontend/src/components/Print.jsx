import React, { useRef } from 'react';
import './Print.css';
import { useLocation } from 'react-router-dom';

const Print = () => {
  const location = useLocation();
  const {
    challanNo,
    invoicefor,
    billNo,
    products,
    customer,
    date,
    grandTotal,
    totalAmount,
    billDate,
    challanDate,
  } = location.state;
  console.log(date);
  const pdfRef = useRef();

  return (
    <div ref={pdfRef}>
      <div className='Print'>
        <h2>TAX INVOICE</h2>
        <h3>{invoicefor}</h3>
        <div className='print-header'>
          <table className='table-1'>
            <tr>
              <td rowSpan={2} style={{ width: '70%' }}>
                <b>HARI OM ENGINEERING WORKS</b>
                <p>PLOT NO. I-95, G.I.D.C ESTATE, V.U NAGAR</p>
                <p>ANAND-388121, GUJARAT,INDIA</p>
                <p>
                  <b>GSTIN:</b>24AMFPP7083F1ZX
                </p>
                {/* <p>
                  <b>MSME:</b>24AMFPP7083F1ZX
                </p> */}
                <p>
                  <b>PAN:</b>AMFPP7083F
                </p>
                <p>Mobile No. 9714275013</p>
                <p>Email ID: parmarmahendrabhai63@gmail.com</p>
              </td>
              <td style={{ width: '15%' }}>
                <p>Invoice No.</p>
                <b>{billNo}</b>
              </td>
              <td style={{ width: '70%' }}>
                <p>
                  <b>Date:</b>
                </p>
                <b>{billDate}</b>
                {/* <b>{date.toLocaleDateString()}</b> */}
              </td>
            </tr>
            <tr>
              <td>
                <p>Challan No.</p>
                <b>{challanNo ? challanNo : ''}</b>
              </td>
              <td>
                <p>Date</p>
                <b>{challanDate ? challanDate : ''}</b>
              </td>
            </tr>
          </table>
          <table className='table-2'>
            <tr>
              <td rowSpan={3} style={{ width: '70%' }}>
                <p>
                  <b>To,</b>
                </p>
                <b>{customer.name}</b>
                <p>{customer.address}</p>
                <p>
                  <b>GSTIN:</b>
                  {customer.gstNo}
                </p>
              </td>
              <td style={{ width: '15%' }}>
                <p>Buyer's Order No.</p>
                <b></b>
              </td>
              <td style={{ width: '15%' }}>
                <p>Dated</p>
                <b></b>
              </td>
            </tr>
            <tr>
              <td>
                <p>Dispatch Document No.</p>
                <b>-</b>
              </td>
              <td>
                <p>Delivery Note Date</p>
                <b>-</b>
              </td>
            </tr>
            <tr>
              <td>
                <p>Dispatched Through</p>
                <b>-</b>
              </td>
              <td>
                <p>Destination</p>
                <b>-</b>
              </td>
            </tr>
          </table>
        </div>
        <div className='table-container'></div>
        <table className='table-3'>
          <thead>
            <tr>
              <th style={{ width: '10%' }}>Sr.No</th>
              <th style={{ width: '50%' }}>Particulars</th>
              <th style={{ width: '10%' }}>Quantity</th>
              <th style={{ width: '10%' }}>UOM</th>
              <th style={{ width: '10%' }}>Rate</th>
              <th style={{ width: '10%' }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{product.productName}</td>
                <td>{product.quantity}</td>
                <td>{product.uom}</td>
                <td>{product.rate}</td>
                <td>{product.quantity * product.rate}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='calculation'>
          <table className='table-3'>
            <tr>
              <td rowSpan={6} style={{ width: '70%' }}>
                Ruppes in Words :{' '}
                <b>Rupees One Lakh Twenty Nine Thousand Eight Hundred Only</b>
              </td>
              <td style={{ width: '15%' }}>
                <b>Subtotal</b>
              </td>
              <td style={{ width: '15%' }}>
                <b>{totalAmount}</b>
              </td>
            </tr>
            <tr>
              <td>CGST (9%)</td>
              <td>{totalAmount * 0.09}</td>
            </tr>
            <tr>
              <td>SGST (9%)</td>
              <td>{totalAmount * 0.09}</td>
            </tr>
            <tr>
              <td>
                <b>Grand Total</b>
              </td>
              <td>
                <b>{grandTotal}</b>
              </td>
            </tr>
            <tr>
              <td>Advance Paid</td>
              <td>33000</td>
            </tr>
            <tr>
              <td>
                <b>Remaining Total</b>
              </td>
              <td>
                <b>96800</b>
              </td>
            </tr>
          </table>
        </div>
        <table className='table-3'>
          <tr>
            <td>Bank Details</td>
            <td
              rowSpan={2}
              style={{ paddingTop: '100px', textAlign: 'center' }}
            >
              Hari Om Engineering Works
            </td>
          </tr>
          <tr>
            <td>
              <p>Bank Name: Central Bank of India</p>
              <p>A/C No: 3243013874</p>
              <p>IFSC: CBIN0280532</p>
            </td>
          </tr>
          <tr>
            <td colSpan={2}>Subject to anand jurisdiction</td>
          </tr>
        </table>
      </div>
      {/* <button onClick={generatePDF}>PDF</button> */}
    </div>
  );
};

export default Print;
