import { Paystack } from "paystack-sdk";

export interface InitializePaymentParams {
  email: string;
  amount: number; // Amount in USD or NGN
  currency?: string;
  reference: string;
  callback_url: string;
  metadata?: Record<string, any>;
}

export async function initializePaystackTransaction(params: InitializePaymentParams) {
  const secretKey = process.env.PAYSTACK_SECRET_KEY;

  if (!secretKey) {
    return {
      status: false,
      message: "PAYSTACK_SECRET_KEY is missing. Please add your secret key from dashboard.paystack.com to your .env file.",
      data: null,
    };
  }

  const paystack = new Paystack(secretKey);

  try {
    const response = await paystack.transaction.initialize({
      email: params.email,
      amount: (Math.round(params.amount * 100)).toString(),
      currency: params.currency || "USD",
      reference: params.reference,
      callback_url: params.callback_url,
      metadata: params.metadata,
    });

    return response;
  } catch (error: any) {
    console.error("Paystack SDK Initialize Error:", error);
    return {
      status: false,
      message: error.message || "Failed to initialize Paystack transaction",
      data: null,
    };
  }
}

export async function verifyPaystackTransaction(reference: string) {
  const secretKey = process.env.PAYSTACK_SECRET_KEY;

  if (!secretKey) {
    return {
      status: false,
      message: "PAYSTACK_SECRET_KEY is missing.",
      data: null,
    };
  }

  const paystack = new Paystack(secretKey);

  try {
    const response = await paystack.transaction.verify(reference);
    return response;
  } catch (error: any) {
    console.error("Paystack SDK Verify Error:", error);
    return {
      status: false,
      message: error.message || "Failed to verify Paystack transaction",
      data: null,
    };
  }
}
