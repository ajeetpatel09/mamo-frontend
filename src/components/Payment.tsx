import { useRef } from "react";
import MamoPay from "./script";
import { BACKEND_URL } from "../routes/IPConfig";

declare global {
  interface Window {
    MamoPay: any;
  }
}

const MamoPayComponent = () => {
  const mamoCheckoutElementRef = useRef<HTMLDivElement | null>(null);
  async function createPayment() {
    try {
      const response = await fetch(
        `${BACKEND_URL}/payment/get-link`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: "Payment for service",
            email: "customer@example.com",
            first_name: "John",
            last_name: "Doe",
            link_type: "inline",
            amount: 100,
            return_url: "http://localhost:5173/mission-complete",
            capacity: 1,
            save_card: "optional",
          }),
        }
      );

      const data = await response.json();
      // setPayment_url(data.data.payment_url as string);
      return data.data.payment_url as string;
    } catch (error) {
      console.error("Error creating payment link:", error);
    }
  }


  // Function to initialize MamoPay on button click
  const initializeMamoPay = async () => {
    try {
      const paymentLink = (await createPayment()) as string;
      console.log("Payment link:", paymentLink);
      if (mamoCheckoutElementRef.current && paymentLink) {
        mamoCheckoutElementRef.current.setAttribute("data-src", paymentLink);
      } else {
        console.error("Payment link or checkout element not found.");
      }
    
      const checkoutDiv = document.getElementById("mamo-checkout");
      if (checkoutDiv !== null) {
        const mamoPay = new MamoPay();
        mamoPay.addIframeToWebsite(
          "mamo-checkout",
          checkoutDiv.getAttribute("data-src") || ""
        );
      }
    } catch (error) {
      console.error("Error loading MamoPay script:", error);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <h3 className="text-2xl text-red-500 text-center mb-5 mt-3">
          MamoPay Integration
        </h3>

        <button
          onClick={initializeMamoPay}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Initiate Payment
        </button>

        <div
          id="mamo-checkout"
          ref={mamoCheckoutElementRef}
          className="w-[70vw] h-[70vh] my-5 mx-5"
        >
          {/* <iframe
            src={payment_url}
            title="Embedded Content"
            style={{
              width: "100%",
              height: "100%",
              border: "none",
            }}
            allow="payment"
          ></iframe> */}
        </div>
      </div>
    </>
  );
};

export default MamoPayComponent;
