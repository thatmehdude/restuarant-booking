import { useState } from "react";
import UserBookingDetails from "./BookingDetails";
import UserContactDetails from "./ContactDetails";
// import './Booking.css';

type BookingData = {
  date: string;
  time: string;
  numberOfPersons: number;
};

type ContactData = {
  name: string;
  email: string;
  phone: string;
};

const BookingForm: React.FC = () => {

    const [bookingDetails, setBookingDetails] = useState<BookingData>({
      date: "",
      time: "",
      numberOfPersons: 1,
    });
    const [contactDetails, setContactDetails] = useState<ContactData>({
      name: "",
      email: "",
      phone: "",
    });

    const [step, setStep] = useState<number>(1);

    const handleNextStep = (data: BookingData) => {
      setBookingDetails(data);
      setStep(2);
    }

    const handleConfirm = (data: ContactData) => {
      setContactDetails(data);
      const fullBooking = {
        ...bookingDetails,
        ...data,
      };
      console.log("Booking confirmed:", fullBooking);
      alert("Booking confirmed! Check console for details.");
    };
    return (
      <div>
        {step === 1 ? (
          <UserBookingDetails data={bookingDetails} onNext={handleNextStep} />
        ) : (
          <UserContactDetails
            data={contactDetails}
            bookingData={bookingDetails}
            onConfirm={handleConfirm}
          />
        )}
      </div>
    );
}

export default BookingForm;