import { useLocation } from "react-router-dom";

const CardProduct = () => {
  const { state } = useLocation();
  const card = state?.card;

  if (!card) {
    return <p>Ma'lumot topilmadi</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>{card.name}</h2>
      <p><b>№</b>{card.number}</p>
      <p><b>Summasi:</b> {card.sum}</p>
      <p><b>Telefon:</b> {card.phone}</p>
      <p><b>Sana:</b> {card.date} {card.time}</p>
      <p><b>Tag:</b> {card.tag}</p>
      <p><b>Status:</b> {card.status}</p>
    </div>
  );
};

export default CardProduct;
