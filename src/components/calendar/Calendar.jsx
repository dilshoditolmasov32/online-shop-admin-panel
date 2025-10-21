import { useState, useEffect } from "react";
import { Box, Modal } from "@mui/material";
import right from "../../assets/images/next.svg";
import left from "../../assets/images/prevent.svg";
import "./Calendar.css";

const Calendar = ({ showCalendar, setShowCalendar, onDateChange }) => {
  const [selectedDate, setSelectedDate] = useState(null); // "DD-MM-YYYY"
  const [currentDate, setCurrentDate] = useState(new Date());

  const style = {
    bgcolor: "background.paper",
    border: "1px solid #10355b",
    boxShadow: 6,
    padding: "16px",
    borderRadius: "6px",
  };

  const monthNames = [
    "Январь","Февраль","Март","Апрель","Май","Июнь",
    "Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь",
  ];
  const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

  const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (month, year) => {
    let day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1;
  };

  // Sana formatlash: DD-MM-YYYY
  const formatDateLocal = (dateObj) => {
    const d = String(dateObj.getDate()).padStart(2, "0");
    const m = String(dateObj.getMonth() + 1).padStart(2, "0");
    const y = dateObj.getFullYear();
    return `${d}-${m}-${y}`;
  };

  useEffect(() => {
    if (showCalendar && selectedDate) {
      const [d, m, y] = selectedDate.split("-").map(Number);
      setCurrentDate(new Date(y, m - 1, d));
    }
  }, [showCalendar]);

  const prevMonth = () =>
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));

  const nextMonth = () =>
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

  const daysInMonth = getDaysInMonth(currentDate.getMonth(), currentDate.getFullYear());
  const firstDayIndex = getFirstDayOfMonth(currentDate.getMonth(), currentDate.getFullYear());

  let daysArray = [];
  for (let i = 0; i < firstDayIndex; i++) daysArray.push("");
  for (let i = 1; i <= daysInMonth; i++) daysArray.push(i);

  const handleClose = () => setShowCalendar(false);

  const handleSelectedDate = (day) => {
    if (!day) return;

    const selected = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const fullDate = formatDateLocal(selected); // DD-MM-YYYY

    setSelectedDate(fullDate);
    handleClose();

    if (typeof onDateChange === "function") {
      onDateChange(fullDate);
    }

    console.log("Tanlangan sana:", fullDate);
  };

  return (
    <>
      <Modal
        open={showCalendar}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Box sx={style}>
          <div className="calendar-container">
            <div className="calendar-header">
              <button onClick={prevMonth}>
                <img src={left} alt="left" />
              </button>
              <span>
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </span>
              <button onClick={nextMonth}>
                <img src={right} alt="right" />
              </button>
            </div>

            <div className="calendar-weekdays">
              {weekDays.map((day, index) => (
                <div key={index} className="weekday">
                  {day}
                </div>
              ))}
            </div>

            <div className="calendar-days">
              {daysArray.map((day, index) => {
                if (day === "") {
                  return <div key={index} className="day empty" />;
                }

                const thisDateStr = formatDateLocal(
                  new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
                );
                const isSelected = selectedDate === thisDateStr;

                return (
                  <div
                    key={index}
                    className={`day ${isSelected ? "selected" : ""}`}
                    onClick={() => handleSelectedDate(day)}
                  >
                    {day}
                  </div>
                );
              })}
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default Calendar;
