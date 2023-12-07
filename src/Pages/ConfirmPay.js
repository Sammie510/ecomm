import React, { useEffect, useState } from 'react';
import './ConfirmPay.css';
import axios from 'axios';
import Button from '../Components/UI/Button';
import { Link } from 'react-router-dom';

const ConfirmPay = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [payments, setPayments] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    // Handle file selection
    setSelectedFile(e.target.files[0]);
  };
  const isAnyFieldEmpty = !selectedFile;

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await axios.get(
        'https://goldensporesstore.000webhostapp.com/paymentReceive.php',
      ); // Update the URL
      setPayments(response.data);
    } catch (error) {
      console.error('Error fetching payments', error.message);
    }
  };

  const handleAccordionClick = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <>
      <Link to="/checkout" className="bk">
        <Button>Back</Button>
      </Link>
      <div className="accordion-container">
        <div className="accordion-fit">
          <h4>CHOOSE A PAYMENT METHOD</h4>
          {payments.map((payment, index) => (
            <div key={index} className="accordion-item">
              <div
                className={`accordion-header ${
                  index === expandedIndex ? 'expanded' : ''
                }`}
                onClick={() => handleAccordionClick(index)}
              >
                <h3>{payment.payment_method}</h3>
              </div>
              {index === expandedIndex && (
                <div className="accordion-content">
                  <p>Bank Name: {payment.account_name}</p>
                  <p>Account Number: {payment.account_number}</p>
                  <p>Charge: ${payment.charge}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        <form className="form">
          <h5>Upload Proof of Payment</h5>
          <input type="file" onChange={handleFileChange} />
          <button className="button" disabled={isAnyFieldEmpty}>
            Upload
          </button>
        </form>
      </div>
    </>
  );
};

export default ConfirmPay;