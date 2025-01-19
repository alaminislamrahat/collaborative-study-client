import { useLoaderData } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripePayment from "./StripePayment";
const stripePromiss = loadStripe(
    "pk_test_51QXRfDKPpJI1sAIboEpenN3As84W3hylEJVg1f5xzNj0UNIAhcppzBJ3gDJhXwRiBEzYPugNfTCcIa60hWLzByRI009SMThg0N"
);
const Payment = () => {
    const data = useLoaderData();
    console.log(data)

    return (
        <div>
            <Elements stripe={stripePromiss}>
                <StripePayment />

            </Elements>
        </div>
    );
};

export default Payment;