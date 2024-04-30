import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InvoiceForm from './components/InvoiceForm'; // Replace with your path
import Print from './components/Print';
import InvoiceList from './components/InvoiceList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/invoices/new' element={<InvoiceForm />} />
        <Route path='/invoices/preview' element={<Print />} />
        <Route path='/invoices/all' element={<InvoiceList />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
}

export default App;
