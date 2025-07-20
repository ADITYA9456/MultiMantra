"use server"

import Payment from "@/app/models/Payment"
import User from "@/app/models/User"
import connectDb from "@/public/db/connectDb"
import Razorpay from "razorpay"

export const initiate = async (amount, to_username, paymentform) => {
    await connectDb()
    // fetch the secret of the user who is getting the payment 
    let user = await User.findOne({ username: to_username })
    const secret = user.razorpaysecret

    var instance = new Razorpay({ key_id: process.env.KEY_ID, key_secret: process.env.KEY_SECRET })


    let options = {
        amount: Number.parseInt(amount),
        currency: "INR",
    }

    let x = await instance.orders.create(options)

    // create a payment object which shows a pending payment in the database
    await Payment.create({ oid: x.id, amount: amount / 100, to_user: to_username, name: paymentform.name, message: paymentform.message })
    return x
}


export const fetchpayments = async (username) => {
    await connectDb()
    // Find all payments for this user and convert to plain objects
    let p = await Payment.find({ to_user: username, done: true }).sort({ amount: -1 }).lean()
    
    // Convert to plain objects and serialize dates
    return p.map(payment => ({
        _id: payment._id.toString(),
        name: payment.name,
        to_user: payment.to_user,
        oid: payment.oid,
        message: payment.message,
        amount: payment.amount,
        done: payment.done,
        createdAt: payment.createdAt.toISOString(),
        updatedAt: payment.updatedAt.toISOString()
    }))
}

export const fetchuser = async (username) => {
    await connectDb()
    let u = await User.findOne({ username: username }).lean()
    
    if (!u) return null
    
    // Convert to plain object
    return {
        _id: u._id.toString(),
        name: u.name,
        email: u.email,
        username: u.username,
        profilepic: u.profilepic,
        coverpic: u.coverpic,
        razorpayid: u.razorpayid,
        razorpaysecret: u.razorpaysecret,
        createdAt: u.createdAt.toISOString(),
        updatedAt: u.updatedAt.toISOString()
    }
}

export const updateProfile = async (data, oldusername) => {
    await connectDb()
    let ndata = Object.fromEntries(data)

    // If the username is being updated, check if username is available
    if (oldusername !== ndata.username) {
        let u = await User.findOne({ username: ndata.username })
        if (u) {
            return { error: "Username already exists" }
        }
        await User.updateOne({ email: ndata.email }, ndata)
        // Now update all the usernames in the Payments table 
        await Payment.updateMany({ to_user: oldusername }, { to_user: ndata.username })

    }
    else {


        await User.updateOne({ email: ndata.email }, ndata)
    }


}