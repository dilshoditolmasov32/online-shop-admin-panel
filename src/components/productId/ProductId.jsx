import ProductCard from "../product-card/ProductCard";
import "./ProductId.css";


const ProductId = () => {
  const cardsData = [
    {
      title: "Реклама",
      productIdCard: "1 000 000",
      sum: "100 000 000 000",
      cards: [
        {
          name: "Mukhamadbobur-1",
          number: "103",
          sum: "100 100 000 000",
          phone: "+998 00 000 00 00",
          date: "21.03.2023",
          time: "22:32",
          tag: "#samarkand",
          status: "Ожидание",
          color: "#CCE6EF",
        },
        {
          name: "Ali",
          number: "104",
          sum: "200 000 000",
          phone: "+998 90 123 45 67",
          date: "22.03.2023",
          time: "14:20",
          tag: "#tashkent",
          status: "Завершено",
          color: "#CCE6EF",
        },
      ],
    },
  ];
  return (
    <div className="productId-page">
      <div className="productId-sidebar">
        {cardsData.map((column, index) => (
          <div className="productId-card-column" key={index}>
            <div className="productId-card-header">
              <p>• {column.title}</p>
              <div className="productId-card-meta">
                <div className="productId-buyurtma">
                  <p>сделка:</p>
                  <span>{column.productIdCard}</span>
                </div>
                <div className="productId-summa-card">
                  <p> на сумму:</p>

                  <span>{column.sum}</span>
                </div>
              </div>
            </div>

            {column.cards.map((card, i) => (
              <div
                className="productId-card-card"
                key={i}
                style={{ backgroundColor: card.color }}
              >
                <div className="card-header">
                  <strong>{card.name}</strong>
                  <span>№{card.number}</span>
                </div>
                <div className="card-sum">
                  <span>на сумму</span>:<br />
                  <h3>{card.sum}</h3>
                </div>
                <div className="card-footer">
                  <span className="card-phone">{card.phone}</span>
                  <span className="card-status">{card.status}</span>
                </div>
                <div className="card-meta">
                  <span>{card.tag}</span>
                  <div className="date-time">
                    <span>{card.date}</span>
                    <span>{card.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <ProductCard />
    </div>
  );
};

export default ProductId;
