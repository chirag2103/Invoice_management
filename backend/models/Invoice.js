import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
  name: String,
  quantity: Number,
  rate: Number,
});

const invoiceSchema = mongoose.Schema({
  customer: {
    type: mongoose.Schema.ObjectId,
    ref: 'Customer',
    required: true,
  },
  invoiceNo: {
    type: String,
    unique: true,
    required: true,
  },
  invoiceProducts: [productSchema],
  invoiceTotal: Number,
  paidAmount: Number,
  remainingAmount: Number,
  grandTotal: Number,
  date: {
    type: Date,
    required: true,
  },
});

invoiceSchema.pre('save', function (next) {
  let total = 0;
  this.invoiceProducts.forEach((element) => {
    total += element.quantity * element.rate;
  });
  this.invoiceTotal = total;

  // Calculate remaining amount, paid amount, and grand total
  this.remainingAmount = this.invoiceTotal - this.paidAmount;
  this.grandTotal = this.invoiceTotal + this.invoiceTotal * 0.12; // Adding 12% GST tax

  next();
});

export default mongoose.model('Invoice', invoiceSchema);
