import { useState } from "react";
import Calendar from "../calendar/Calendar";
import "./Wrapper.css";

const Wrapper = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [pickedDate, setPickedDate] = useState(null);

  const handleClickCalendar = () => {
    setShowCalendar(true);
  };

  const handleDateChange = (date) => {
    setPickedDate(date); 
    
  }

  return (
    <>
      <div className="cards-wrapper">
        <div className="wrapper-card">
          <div className="calendar-info-calendar">
            <p>• {pickedDate ? `${pickedDate}` : "Сегодня"}</p>
            <div className="calendar-btn" onClick={handleClickCalendar}>
              Календарь
            </div>
          </div>
          <div className="wrapper-card-info">
            сделка: <span>1 000</span>
          </div>
          <div className="wrapper-card-info">
            на сумму: <span>1 000 000 000</span>
          </div>
        </div>
        <div className="wrapper-card">
          <p>• Первичный контакты</p>
          <div className="wrapper-card-info">
            сделка: <span>1 000</span>
          </div>
          <div className="wrapper-card-info">
            на сумму: <span>1 000 000 000</span>
          </div>
        </div>
        <div className="wrapper-card">
          <p>• Не дозвон</p>
          <div className="wrapper-card-info">
            сделка: <span>1 000</span>
          </div>
          <div className="wrapper-card-info">
            на сумму: <span>1 000 000 000</span>
          </div>
        </div>
        <div className="wrapper-card">
          <p>• Принимают решение</p>
          <div className="wrapper-card-info">
            сделка: <span>1 000</span>
          </div>
          <div className="wrapper-card-info">
            на сумму: <span>1 000 000 000</span>
          </div>
        </div>
        <div className="wrapper-card">
          <p>• Успешно реализовано</p>
          <div className="wrapper-card-info">
            сделка: <span>1 000</span>
          </div>
          <div className="wrapper-card-info">
            на сумму: <span>1 000 000 000</span>
          </div>
        </div>
        <div className="wrapper-card">
          <p>• Закрыто реализовано</p>
          <div className="wrapper-card-info">
            сделка: <span>1 000</span>
          </div>
          <div className="wrapper-card-info">
            на сумму: <span>1 000 000 000</span>
          </div>
        </div>
      </div>

      <Calendar
        showCalendar={showCalendar}
        setShowCalendar={setShowCalendar}
        onDateChange={handleDateChange}
      />
    </>
  );
};

export default Wrapper;
