import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import axios from "axios";

import UseAuth from "../../../Hooks/UseAuth";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import toast from "react-hot-toast";

const StripePayment = ({ paymentData }) => {
    const { user } = UseAuth();
    const [clientSecrate, setClientSecrate] = useState('')
   
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = UseAxiosSecure();

    
    const { sessionTitle,
        tutorName,
        tutorEmail,
        sessionDescription,
        registrationStartDate,
        registrationEndDate,
        classStartDate,
        classEndDate,
        sessionDuration,
        registrationFee,


        _id } = paymentData;

    const allData = {
        sessionTitle,
        tutorName,
        tutorEmail,
        sessionDescription,
        registrationStartDate,
        registrationEndDate,
        classStartDate,
        classEndDate,
        sessionDuration,
        registrationFee, studentEmail: user?.email, StudentName: user?.displayName, studySessionId: _id
    }

    


    useEffect(() => {
        axiosSecure.post("/stripe-payment", { price: registrationFee })
            .then(res => {
                // console.log(res.data.clientSecret)
                setClientSecrate(res.data.clientSecret);
            })
    }, [axiosSecure, registrationFee]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: card,
        });
        if (error) {
            console.error("Error creating payment method:", error);
            return;
        } else {
            console.log("payment method", paymentMethod);
        }

        //to confirm payment
        const { paymentIntent, error: cardErrr } = await stripe.confirmCardPayment(clientSecrate, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'default@example.com',
                    name: user?.displayName || 'Anonymous',
                }
            }
        })
        if (cardErrr) {
            console.log('confirmation error', cardErrr);
        }
        else {
            console.log(paymentIntent)
            if (paymentIntent.status === 'succeeded') {
                console.log('payment success', paymentIntent.id)
                // toast.success('payment successfully');
                try {
                    const { data } = await axiosSecure.post('/booking', allData);
                    console.log(data)
                    if (data.message) {
                        toast.error('all ready exist')
                    }
                    else {
                        toast.success("Session booked successfully!");
                        const paymentSummary = {
                            transectionId: paymentIntent.id,
                            amount: paymentIntent.amount / 100, // Convert to dollars
                            currency: paymentIntent.currency,
                            status: paymentIntent.status,
                            sessionId: _id,
                            studentEmail: user?.email,
                        };
    
                        await axiosSecure.post("/payment-intent", paymentSummary);
                    }

                }
                catch (error) {
                    console.log(error);
                    toast.error(error)
                }
                // to data
                // axiosSecure.post('/',{paymentinfo : paymentData})
            }
        }
    };
    return (
        <div className="max-w-lg mt-10 mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-center mb-6">
                Payment Information
            </h2>
            <form onSubmit={handleFormSubmit}>
                <div className="mb-4">
                    <label htmlFor="card" className="block text-gray-700 font-medium">
                        Credit Card Information
                    </label>
                    <CardElement
                        id="card"
                        iconStyle="solid"
                        style={{
                            base: {
                                iconColor: "#c4f0ff",
                                color: "#fff",
                                fontSize: "16px",
                                fontFamily: "Arial, sans-serif",
                                fontSmoothing: "antialiased",
                                "::placeholder": {
                                    color: "#aab7c4",
                                },
                            },
                            invalid: {
                                iconColor: "#FFC7EE",
                                color: "#FFC7EE",
                            },
                        }}
                    />
                </div>

                <div className="mb-4">
                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        disabled={!stripe || !clientSecrate}
                    >
                        Pay Now
                    </button>
                </div>
            </form>
        </div>
    );
};

export default StripePayment;
