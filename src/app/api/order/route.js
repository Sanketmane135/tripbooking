import Razorpay from "razorpay";

export async function POST(req) {
  try {
    const { amount } = await req.json(); 

    // Initialize Razorpay instance
    const razorpay = new Razorpay({
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    // Create order
   const options = {
      amount: amount,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1,
    };


    const order = await razorpay.orders.create(options);

    return new Response(
      JSON.stringify({
        success: true,
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Razorpay order creation failed:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}
