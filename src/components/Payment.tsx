import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    MamoPay: any;
  }
}

const MamoPayComponent = () => {
  const mamoCheckoutElementRef = useRef<HTMLDivElement | null>(null);
  const [payment_url, setPayment_url] = useState("");
  async function createPayment() {
    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/payment/get-link",
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
            return_url: "http://localhost:8000",
            capacity: 1,
          }),
        }
      );

      const data = await response.json();
      setPayment_url(data.data.payment_url as string);
      //   return data.data.payment_url as string;
    } catch (error) {
      console.error("Error creating payment link:", error);
    }
  }

  // Function to load external script
  //   const loadScript = (src: string): Promise<void> => {
  //     return new Promise((resolve, reject) => {
  //       // Check if the script is already loaded
  //       if (document.querySelector(`script[src="${src}"]`)) {
  //         resolve();
  //         return;
  //       }
  //       const script = document.createElement("script");
  //       script.src = src;
  //       script.onload = () => {
  //         console.log(`Script loaded: ${src}`);
  //         resolve();
  //       };
  //       script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
  //       document.head.appendChild(script);
  //     });
  //   };

  // Function to initialize MamoPay on button click
  //   const initializeMamoPay = async () => {
  //     try {
  //     //   const paymentLink:string = await createPayment();
  //     //   console.log("Payment link:", paymentLink);
  //     //     setPayment_url(paymentLink);
  //     //   if (mamoCheckoutElementRef.current && paymentLink) {
  //     //     mamoCheckoutElementRef.current.setAttribute("data-src", paymentLink);
  //     //   } else {
  //     //     console.error("Payment link or checkout element not found.");
  //     //   }
  //     //   await loadScript(
  //     //     "https://assets.mamopay.com/stable/checkout-inline-2.0.0.min.js"
  //     //   );
  //     } catch (error) {
  //       console.error("Error loading MamoPay script:", error);
  //     }
  //   };

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <h3 className="text-2xl text-red-500 text-center mb-5 mt-3">
          MamoPay Integration
        </h3>

        <button
          onClick={createPayment}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Initiate Payment
        </button>

        <div id="mamo-checkout" ref={mamoCheckoutElementRef} className="w-[70vw] h-[70vh] my-5 mx-5">
          <iframe
            src={payment_url}
            title="Embedded Content"
            style={{
              width: "100%",
              height: "100%",
              border: "none",
            }}
            allow="payment"
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default MamoPayComponent;
