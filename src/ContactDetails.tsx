import { useState } from 'react'
// import './Booking.css';

type ContactData = {
    name: string;
    email: string;
    phone: string;
};

type BookingData = {
    date: string;
    time: string;
    numberOfPersons: number;
}

type UserContactDetailsProps = {
    data: ContactData;
    bookingData: BookingData;
    onConfirm: (data: ContactData) => void;
};

const UserContactDetails: React.FC<UserContactDetailsProps> = ({ data, bookingData, onConfirm }) => {
    const [formData, setFormData] = useState<ContactData>(data);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.phone) {
            alert("Please fill out all contact details.");
            return;
        }
        onConfirm(formData);
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleDateString("en-GB");
    };

    const formatTime = (timeString: string) => {
        if (!timeString) return "";
        return timeString.substring(0, 5);
    }

    return (
      <div className="booking-container">
        <h2>Contact details</h2>

        <div className="booking-summary">
          You are making a reservation for{" "}
          <strong>
            {bookingData.numberOfPersons} person
            {bookingData.numberOfPersons !== 1 ? "s" : ""}
          </strong>
          , on <strong>{formatDate(bookingData.date)}</strong> at{" "}
          <strong>{formatTime(bookingData.time)}</strong>
        </div>

        <form className="booking-form" onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="phone">Phone number</label>
            <input
              id="phone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="booking-button">
            Confirm reservation
          </button>
        </form>
      </div>
    );
};

export default UserContactDetails;