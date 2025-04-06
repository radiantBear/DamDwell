import Image from "next/image";

export default function RentalCard() {
  return (
    <div className="w-50 border-2 border-gray-300 rounded-md p-2">
        <Image src="/rental1.jpg" alt="Rental Card" width={200} height={100} />
        <p>Rent: $1000</p>
        <p>123 Main St</p>
        <p>Available: 4/15/2025</p>
    </div>
  );
}