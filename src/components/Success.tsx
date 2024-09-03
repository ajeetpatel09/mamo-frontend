import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { BACKEND_URL } from "../routes/IPConfig";

const Success = () => {
  const [paymentInfo, setPaymentInfo] = useState({
    amount: 0,
    created_at: "",
    customer_name: "",
    business_name: "",
    currency: "",
    identifier: "",
  });
//   console.log(paymentInfo);

  const location = useLocation();

  async function getPaymentInfo(chargeUID: string | null) {
    if (!chargeUID) return;
    const response = await fetch(
      `${BACKEND_URL}/payment/get-info/${chargeUID}`,
      {
        method: "GET",
      }
    );

    const data = await response.json();
    // console.log(data);
    setPaymentInfo((prev) => ({
      ...prev,
      amount: data.data.amount,
      created_at: data.data.created_at,
      customer_name: data.data.customer_name,
      business_name: data.data.business_name,
      currency: data.data.currency,
      identifier: data.data.identifier,
    }));
  }
  // Helper function to parse query parameters
  const getQueryParams = () => {
    return new URLSearchParams(location.search);
  };

  useEffect(() => {
    const chargeUID = getQueryParams().get("chargeUID");
    getPaymentInfo(chargeUID);
  }, []);

  function formatDate(dateStr: string) {
    if (!dateStr || !dateStr.length) return "";
    // Create a Date object from the input string
    const date = new Date(dateStr);

    // Format options
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric", // Use "numeric" instead of "string"
      month: "long", // "long" for full month name
      day: "2-digit", // "2-digit" for day with leading zeros
      hour: "2-digit", // "2-digit" for hour with leading zeros
      minute: "2-digit", // "2-digit" for minute with leading zeros
      hour12: true, // true for 12-hour format (AM/PM)
    };

    // Create an Intl.DateTimeFormat object with the desired options
    const formatter = new Intl.DateTimeFormat("en-US", options);

    // Format the date
    const formattedDate = formatter.format(date);
    return formattedDate;
  }
  return (
    <>
      <div className="flex justify-center items-center flex-col gap-2 w-1/2 h-2/3 bg-[#f5f5f5] mx-auto mt-10 rounded-xl p-5">
        <h1 className="text-3xl text-center text-green-400 mt-2">
          Payment Successfull
        </h1>
        <p className="text-xl text-center">
          Thanks {paymentInfo?.customer_name}, you paid {paymentInfo?.currency}{" "}
          {paymentInfo?.amount} to {paymentInfo?.business_name}.
        </p>
        <p>Refernce ID: {paymentInfo?.identifier}</p>
        <p>{formatDate(paymentInfo?.created_at)}</p>
      </div>
      <div className="flex justify-center items-center flex-col mt-5">
        <NavLink to="/">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-3 py-2 px-4 rounded">
            Go Home
          </button>
        </NavLink>
      </div>
    </>
  );
};

export default Success;
