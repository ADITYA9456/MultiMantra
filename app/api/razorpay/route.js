import Payment from "@/app/models/Payment";
import User from "@/app/models/User";
import connectDb from '@/public/db/connectDb'
import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";

export const POST = async (req) => {
    await connectDb()
    let body = await req.formData()
    body = Object.fromEntries(body)

    // Check if razorpayOrderId is present on the server
    let p = await Payment.findOne({oid: body.razorpay_order_id})
    if(!p){
        return NextResponse.json({success: false, message: "Order Id not found"})
    }

    // fetch the secret of the user who is getting the payment
    let user = await User.findOne({username: p.to_user})
    const secret = process.env.KEY_SECRET
    // Verify the payment
    let xx = validatePaymentVerification({"order_id": body.razorpay_order_id, "payment_id": body.razorpay_payment_id}, body.razorpay_signature, secret)

    if(xx){
        // Update the payment status
        const updatedPayment = await Payment.findOneAndUpdate({oid: body.razorpay_order_id}, {done: true}, {new: true})
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/aa/${updatedPayment.to_user}?paymentdone=true`)
    }
    else{
        return NextResponse.json({success: false, message: "Payment Verification Failed"})
    }
}