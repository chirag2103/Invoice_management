import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  billNo: 1,
  customer: null,
  date: null,
  products: [],
  totalAmount: 0,
  grandTotal: 0,
  gst: 6,
  error: null,
  loading: false,
};

export const fetchBillNo = createAsyncThunk('invoice/fetchBillNo', async () => {
  try {
    const response = await axios.get('http://localhost:4000/api/lastinvoice');
    return response.data.billNo;
  } catch (error) {
    throw error;
  }
});

export const sendInvoiceData = createAsyncThunk(
  'invoice/sendInvoiceData',
  async (invoiceData) => {
    try {
      const response = await axios.post('/api/invoices', invoiceData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const invoiceSlice = createSlice({
  name: 'invoice',
  initialState,
  reducers: {
    setCustomer(state, action) {
      state.customer = action.payload;
    },
    setGst(state, action) {
      state.gst = action.payload;
    },
    addProduct(state, action) {
      state.products.push(action.payload);
      state.totalAmount += action.payload.quantity * action.payload.rate;
      console.log(state.gst + 'gst');
      state.grandTotal =
        state.totalAmount + (state.totalAmount * state.gst * 2) / 100;
    },
    removeProduct(state, action) {
      const removedProduct = state.products.splice(action.payload, 1)[0];
      state.totalAmount -= removedProduct.quantity * removedProduct.rate;
      state.grandTotal =
        state.totalAmount + (state.totalAmount * state.gst * 2) / 100;
    },
    storeInvoice(state, action) {},
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchBillNo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBillNo.fulfilled, (state, action) => {
        state.loading = false;
        state.billNo = action.payload + 1;
      })
      .addCase(fetchBillNo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(sendInvoiceData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendInvoiceData.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(sendInvoiceData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setCustomer, setGst, addProduct, removeProduct } =
  invoiceSlice.actions;
export default invoiceSlice.reducer;
