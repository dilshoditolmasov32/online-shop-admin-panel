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
    // backendga yuborish:
    // fetch("/api/date", { method: "POST", headers: {"Content-Type":"application/json"}, body: JSON.stringify({date}) })
  }

  return (
    <>
      <div class="cards-wrapper">
        <div class="wrapper-card">
          <div className="calendar-info-calendar">
            <p>
              
              • {
                pickedDate?`${pickedDate}`:"Сегодня"
              }

            </p>
            <div className="calendar-btn" onClick={handleClickCalendar}>
              Календарь
            </div>
          </div>
          <div class="wrapper-card-info">
            сделка: <span>1 000</span>
          </div>
          <div class="wrapper-card-info">
            на сумму: <span>1 000 000 000</span>
          </div>
        </div>
        <div class="wrapper-card">
          <p>• Первичный контакты</p>
          <div class="wrapper-card-info">
            сделка: <span>1 000</span>
          </div>
          <div class="wrapper-card-info">
            на сумму: <span>1 000 000 000</span>
          </div>
        </div>
        <div class="wrapper-card">
          <p>• Не дозвон</p>
          <div class="wrapper-card-info">
            сделка: <span>1 000</span>
          </div>
          <div class="wrapper-card-info">
            на сумму: <span>1 000 000 000</span>
          </div>
        </div>
        <div class="wrapper-card">
          <p>• Принимают решение</p>
          <div class="wrapper-card-info">
            сделка: <span>1 000</span>
          </div>
          <div class="wrapper-card-info">
            на сумму: <span>1 000 000 000</span>
          </div>
        </div>
        <div class="wrapper-card">
          <p>• Успешно реализовано</p>
          <div class="wrapper-card-info">
            сделка: <span>1 000</span>
          </div>
          <div class="wrapper-card-info">
            на сумму: <span>1 000 000 000</span>
          </div>
        </div>
        <div class="wrapper-card">
          <p>• Закрыто реализовано</p>
          <div class="wrapper-card-info">
            сделка: <span>1 000</span>
          </div>
          <div class="wrapper-card-info">
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
