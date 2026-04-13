export const PaymentService = {
  async createSubscription(planId: string, userId: string) {
    console.log(`Creating Razorpay subscription for plan ${planId} and user ${userId}`);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    return {
      id: `sub_${Math.random().toString(36).substr(2, 9)}`,
      status: "active",
      short_url: "https://rzp.io/i/example"
    };
  },

  async processPayment(amount: number, currency: string = "INR") {
    console.log(`Processing payment of ${currency} ${amount}`);
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { success: true, transactionId: `pay_${Math.random().toString(36).substr(2, 9)}` };
  }
};
