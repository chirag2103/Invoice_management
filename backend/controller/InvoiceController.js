import Invoice from '../models/Invoice.js';
import catchAsyncError from '../middlewares/catchAsyncError.js';
import ErrorHandler from '../utils/errorHandler.js';
import Customer from '../models/Customer.js';

export const getLastInvoice = catchAsyncError(async (req, res, next) => {
  try {
    const invoice = await Invoice.findOne().sort({ _id: -1 });
    res.status(200).json({
      invoice,
    });
  } catch (error) {
    next(new ErrorHandler('Error fetching last invoice', 500));
  }
});

export const createInvoice = catchAsyncError(async (req, res, next) => {
  try {
    const invoice = await Invoice.create(req.body);

    res.status(201).json({
      invoice,
    });
  } catch (error) {
    next(new ErrorHandler('Error creating invoice' + error, 500));
  }
});

export const getInvoices = catchAsyncError(async (req, res, next) => {
  try {
    const invoices = await Invoice.find().populate('customer');
    res.status(200).json({
      invoices,
    });
  } catch (error) {
    next(new ErrorHandler('Error fetching invoices', 500));
  }
});

export const getSingleInvoice = catchAsyncError(async (req, res, next) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    res.status(200).json({
      invoice,
    });
  } catch (error) {
    next(new ErrorHandler('Error fetching invoice', 500));
  }
});
export const getInvoicesByCustomer = catchAsyncError(async (req, res, next) => {
  try {
    const customerId = req.params.customerId;

    // Validate if customerId is a valid ObjectId before querying the database
    if (!mongoose.Types.ObjectId.isValid(customerId)) {
      return next(new ErrorHandler('Invalid customer ID', 400));
    }

    const invoices = await Invoice.find({ customer: customerId });

    res.status(200).json({
      invoices,
    });
  } catch (error) {
    next(new ErrorHandler('Error fetching invoices for the customer', 500));
  }
});

export const updateInvoice = catchAsyncError(async (req, res, next) => {
  try {
    let invoice = await Invoice.findById(req.params.id);
    if (!invoice) {
      return next(new ErrorHandler('Invoice not found', 404));
    }

    invoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
      invoice,
    });
  } catch (error) {
    next(new ErrorHandler('Error updating invoice', 500));
  }
});
