// components/InvoiceForm.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCustomer,
  setGst,
  addProduct,
  removeProduct,
  fetchBillNo,
} from '../slices/invoiceSlice.js';
import { fetchCustomers } from '../slices/customerSlice.js';
import '../styles/InvoiceForm.css';
import { useNavigate } from 'react-router-dom';
const InvoiceForm = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log('Hello World');
    dispatch(fetchCustomers());
    dispatch(fetchBillNo);
  }, [dispatch]);
  const { customers, loading, error } = useSelector((state) => state.customers);
  const { billNo, customer, gst, products, totalAmount, grandTotal } =
    useSelector((state) => state.invoice);

  const [productName, setProductName] = useState('');
  // const [billNo, setBillNo] = useState(null);
  const [date, setDate] = useState();
  // const [gstt, setGstt] = useState(null);
  const [challanNo, setChallanNo] = useState(null);
  const [uom, setUom] = useState('NOS');
  const [quantity, setQuantity] = useState(0);
  const [rate, setRate] = useState(0);

  const handleCustomerChange = async (event) => {
    const selectedCustomerId = event.target.value;
    // console.log(customers);
    // console.log(event.target.value);
    const selectedCustomerObject = await customers.find(
      (customer) => customer._id === selectedCustomerId
    );
    console.log(selectedCustomerObject);
    dispatch(setCustomer(selectedCustomerObject));
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleProductNameChange = (event) => {
    setProductName(event.target.value);
  };
  // const handleBillNoChange = (event) => {
  //   setBillNo(event.target.value);
  // };
  const handleGstChange = (event) => {
    console.log(event.target.value);
    // setGstt(event.target.value);
    dispatch(setGst(event.target.value));
  };
  const handleChallanNoChange = (event) => {
    setChallanNo(event.target.value);
  };

  const handleQuantityChange = (event) => {
    setQuantity(Number(event.target.value));
  };

  const handleRateChange = (event) => {
    setRate(Number(event.target.value));
  };
  const handleUomChange = (event) => {
    setUom(event.target.value);
  };

  const handleAddProduct = () => {
    dispatch(addProduct({ productName, quantity, rate, uom, date }));
    setProductName('');
    setUom('NOS');
    setQuantity(0);
    setRate(0);
  };

  const handleRemoveProduct = (index) => {
    dispatch(removeProduct(index));
  };
  const navigate = useNavigate();
  const dataRecipient = {
    billNo,
    products,
    customer,
    date,
    grandTotal,
    totalAmount,
    invoicefor: 'Original for Recipient',
  };
  const dataVendor = {
    billNo,
    products,
    customer,
    date,
    grandTotal,
    totalAmount,
    invoicefor: 'Duplicate for Vendor',
  };

  const handleGeneratePdf = () => {
    navigate('/invoices/preview', { state: dataRecipient });
  };
  const handleGeneratePdfVendor = () => {
    navigate('/invoices/preview', { state: dataVendor });
  };

  return (
    <div className='invoice-container'>
      <h2 className='invoice-header'>Create Invoice</h2>
      <form className='invoice-form'>
        <div className='form-group'>
          <label htmlFor='customer' className='form-label'>
            Customer:
          </label>
          <select
            id='customer'
            className='form-select'
            value={customer ? customer._id : ''}
            onChange={handleCustomerChange}
            required
          >
            <option>select</option>
            {loading ? (
              <option value=''>Loading...</option>
            ) : error ? (
              <option value=''>Error: {error}</option>
            ) : (
              customers.map((customer) => (
                <option key={customer._id} value={customer._id}>
                  {customer.name}
                </option>
              ))
            )}
          </select>
        </div>
        <div className='form-group'>
          <label htmlFor='billNo' className='form-label'>
            Bill No
          </label>
          <input
            type='text'
            id='billNo'
            className='form-input'
            value={billNo}
            disabled
          />
        </div>
        <div className='form-group'>
          <label htmlFor='challanNo' className='form-label'>
            Challan No
          </label>
          <input
            type='text'
            id='challanNO'
            className='form-input'
            value={challanNo}
            onChange={handleChallanNoChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='gst' className='form-label'>
            GST
          </label>
          <select
            id='gst'
            className='form-select'
            value={gst}
            onChange={handleGstChange}
          >
            <option disabled selected>
              select
            </option>
            <option value={6}>6%</option>
            <option value={9}>9%</option>
          </select>
        </div>
        <div className='form-group'>
          <label htmlFor='date' className='form-label'>
            Date:
          </label>
          <input
            type='date'
            placeholder={date}
            id='date'
            className='form-input'
            value={date}
            onChange={handleDateChange}
          />
        </div>
        <h3 className='products-header'>Products</h3>
        {products.length > 0 ? (
          <table className='products-table'>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>UOM</th>
                <th>Rate</th>
                <th>Amount</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index}>
                  <td>{product.productName}</td>
                  <td>{product.quantity}</td>
                  <td>{product.uom}</td>
                  <td>{product.rate}</td>
                  <td>{product.quantity * product.rate}</td>
                  <td>
                    <button
                      type='button'
                      className='remove-btn'
                      onClick={() => handleRemoveProduct(index)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className='no-products'>No products added yet.</p>
        )}
        <div className='form-group'>
          <label htmlFor='productName' className='form-label'>
            Product Name:
          </label>
          <input
            type='text'
            id='productName'
            className='form-input'
            value={productName}
            onChange={handleProductNameChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='quantity' className='form-label'>
            Quantity:
          </label>
          <input
            type='number'
            id='quantity'
            className='form-input'
            value={quantity}
            onChange={handleQuantityChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='rate' className='form-label'>
            Rate:
          </label>
          <input
            type='number'
            id='rate'
            className='form-input'
            value={rate}
            onChange={handleRateChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='uom' className='form-label'>
            UOM:
          </label>
          <select
            id='uom'
            className='form-select'
            value={uom}
            onChange={handleUomChange}
            defaultValue='NOS'
          >
            <option value='NOS' defaultChecked={true} defaultValue={true}>
              NOS
            </option>
            <option value='SET'>SET</option>
          </select>
        </div>
        <button type='button' className='add-btn' onClick={handleAddProduct}>
          Add Product
        </button>
      </form>
      <div className='totals'>
        <p className='total-amount'>Total Amount: {totalAmount}</p>
        <p className='grand-total'>Grand Total: {grandTotal}</p>
      </div>
      <button type='button' className='add-btn' onClick={handleGeneratePdf}>
        Original for customer
      </button>
      <button
        type='button'
        className='add-btn'
        style={{ marginLeft: '15px' }}
        onClick={handleGeneratePdfVendor}
      >
        Duplicate for Vendor
      </button>
    </div>
  );
};

export default InvoiceForm;
