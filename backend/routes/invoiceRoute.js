import express from 'express';
import {
  createInvoice,
  getInvoices,
  getInvoicesByCustomer,
  getLastInvoice,
  getSingleInvoice,
} from '../controller/InvoiceController.js';

const router = express.Router();
router.route('/invoice/new').post(createInvoice);
router.route('/invoices').get(getInvoices);
router.route('/invoice/:id').get(getSingleInvoice);
router.route('/lastinvoice').get(getLastInvoice);
router.route('/customer/invoice').get(getInvoicesByCustomer);

export default router;
