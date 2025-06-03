import { useState } from 'react'
// import './Booking.css';

type BookingData = {
    date: string;
    time: string;
    numberOfPersons: number;
}

type UserBookingDetailsProps = {
    data: BookingData
    onNext: (data: BookingData) => void;
};

const UserBookingDetails: React.FC<UserBookingDetailsProps> = ({ data, onNext }) => {
    const [formData, setFormData] = useState<BookingData>(data);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: name === 'numberOfPersons' ? parseInt(value) || 1 : value,
      }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formData.date || !formData.time || !formData.numberOfPersons) {
            alert("Please fill out all fields.");
            return;
        }
        onNext(formData);
    };

    return (
      <div className="booking-container">
        <h2>Book a table</h2>
        <p className="booking-description">
          Please add the details of your booking
        </p>

        <form className="booking-form" onSubmit={handleSubmit}>
          <div className="display-field">
            <span className="field-label">People</span>
            <span className="field-value">
              <input
                type="number"
                name="numberOfPersons"
                value={formData.numberOfPersons}
                onChange={handleChange}
                required
                min="1"
                style={{
                  border: "none",
                  background: "transparent",
                  fontSize: "1.1rem",
                  fontWeight: "500",
                  width: "80px",
                  padding: "0",
                }}
              />{" "}
              persons
            </span>
          </div>

          <div className="display-field">
            <span className="field-label">Date</span>
            <span className="field-value">
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                style={{
                  border: "none",
                  background: "transparent",
                  fontSize: "1.1rem",
                  fontWeight: "500",
                  padding: "0",
                }}
              />
            </span>
          </div>

          <div className="display-field">
            <span className="field-label">Time</span>
            <span className="field-value">
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                style={{
                  border: "none",
                  background: "transparent",
                  fontSize: "1.1rem",
                  fontWeight: "500",
                  padding: "0",
                }}
              />
            </span>
          </div>

          <button type="submit" className="booking-button">
            Book now
          </button>
        </form>
      </div>
    );
}

export default UserBookingDetails;