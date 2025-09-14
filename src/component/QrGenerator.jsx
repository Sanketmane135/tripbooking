"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import generateQR from "@omkarbhosale/upiqr";

const Qrcode = ({ amount }) => {
  const [qrCode, setQrCode] = useState(null);
  const [error, setError] = useState(null);

  // Ensure numbers
  const totalAmount = Number(amount) ;

  useEffect(() => {
    const fetchQRCode = async () => {
      try {
        const data = await generateQR({
          UPI_ID: "sanketmane0407@hdfcbank", // put your UPI ID in .env.local
          AMOUNT: totalAmount, // ✅ use totalAmount
        });

        setQrCode(data);
      } catch (error) {
        setError("Error generating QR code");
        console.error("Error generating QR code:", error);
      }
    };

    if (totalAmount > 0) {
      fetchQRCode();
    }
  }, [totalAmount]);

  return (
    <div>
      {error ? (
        <p>{error}</p>
      ) : qrCode ? (
        <Image src={qrCode} alt="UPI QR Code" width={200} height={200} />
      ) : (
        <p>Loading QR code...</p>
      )}
    </div>
  );
};

export default Qrcode;
