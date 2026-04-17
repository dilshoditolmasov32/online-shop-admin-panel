import { useRef, useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { CardHeaderData } from "../../components/salesData/SalesData";
import { useOrders } from "../../hooks/useOrders";
import "./DealCards.css";
import { NavLink, Outlet } from "react-router-dom";

const statusColumnMap = {
  pending: "column1",
  processing: "column2",
  shipping: "column3",
  completed: "column4",
  canceled: "column5",
};

const statusLabelMap = {
  pending: "Kutilmoqda",
  processing: "Jarayonda",
  shipping: "Yetkazilmoqda",
  completed: "Yakunlandi",
  canceled: "Bekor qilindi",
};

const columnColors = {
  column1: "#CCE6EF",
  column2: "#F6FFB9",
  column3: "#E8F5E9",
  column4: "#FFDFA7",
  column5: "#FFCBCB",
};

const emptyColumns = {
  column1: [],
  column2: [],
  column3: [],
  column4: [],
  column5: [],
};

const formatCurrency = (value) => {
  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) {
    return "0 so'm";
  }

  return `${new Intl.NumberFormat("uz-UZ").format(numericValue)} so'm`;
};

const buildHeaderStats = (orders = []) =>
  CardHeaderData.map((card, index) => {
    const columnId = `column${index + 1}`;
    const columnOrders = orders.filter(
      (order) => (statusColumnMap[order.status] || "column1") === columnId,
    );
    const totalAmount = columnOrders.reduce((sum, order) => {
      const numericValue = Number(order?.grand_total ?? 0);
      return sum + (Number.isFinite(numericValue) ? numericValue : 0);
    }, 0);

    return {
      ...card,
      summa: String(columnOrders.length),
      umumiySumma: formatCurrency(totalAmount),
    };
  });

const SkeletonCard = ({ color }) => (
  <div className="card deal-card-skeleton" style={{ background: color }}>
    <div className="deal-skeleton-line deal-skeleton-title" />
    <div className="deal-skeleton-line deal-skeleton-number" />
    <div className="deal-skeleton-block deal-skeleton-sum" />
    <div className="deal-skeleton-row">
      <div className="deal-skeleton-chip" />
      <div className="deal-skeleton-chip" />
    </div>
    <div className="deal-skeleton-row">
      <div className="deal-skeleton-tag" />
      <div className="deal-skeleton-date-group">
        <div className="deal-skeleton-date" />
        <div className="deal-skeleton-date" />
      </div>
    </div>
  </div>
);

function DealCards() {
  const scrollContainerRef = useRef(null);
  const { orders, loading, error } = useOrders();
  const [data, setData] = useState(emptyColumns);
  const headerStats = loading ? CardHeaderData : buildHeaderStats(orders);

  const handleOnDragEnd = (result) => {
    if (!result.destination || loading) return;

    const { source, destination } = result;
    const sourceCol = [...data[source.droppableId]];
    const destCol =
      source.droppableId === destination.droppableId
        ? sourceCol
        : [...data[destination.droppableId]];

    const [removed] = sourceCol.splice(source.index, 1);
    removed.color = columnColors[destination.droppableId];
    destCol.splice(destination.index, 0, removed);

    setData({
      ...data,
      [source.droppableId]: sourceCol,
      [destination.droppableId]: destCol,
    });
  };

  useEffect(() => {
    if (error) {
      console.error("Failed to load orders:", error);
      return;
    }

    if (loading) {
      return;
    }

    const newData = { ...emptyColumns };

    orders.forEach((order) => {
      const columnKey = statusColumnMap[order.status] || "column1";
      const createdAt = new Date(order.created_at);
      const date = createdAt.toLocaleDateString("ru-RU");
      const time = createdAt.toLocaleTimeString("ru-RU", {
        hour: "2-digit",
        minute: "2-digit",
      });

      newData[columnKey].push({
        id: order.id,
        name:
          order.customer?.name ||
          `${order.customer_first_name} ${order.customer_last_name}`.trim(),
        number: order.increment_id,
        sum: order.formatted_grand_total,
        phone: order.billing_address?.phone || order.customer_email || "-",
        status: order.status,
        status_label: order.status_label || statusLabelMap[order.status],
        tag: order.channel_name ? `#${order.channel_name}` : "-",
        date,
        time,
        color: columnColors[columnKey],
      });
    });

    setData(newData);
  }, [orders, loading, error]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    const handleMouseDown = (e) => {
      if (e.target.closest(".card")) return;
      isDown = true;
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    };
    const handleMouseUp = () => {
      isDown = false;
    };
    const handleMouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      container.scrollLeft = scrollLeft - (x - startX) * 2;
    };

    container.addEventListener("mousedown", handleMouseDown);
    container.addEventListener("mouseup", handleMouseUp);
    container.addEventListener("mouseleave", handleMouseUp);
    container.addEventListener("mousemove", handleMouseMove);

    return () => {
      container.removeEventListener("mousedown", handleMouseDown);
      container.removeEventListener("mouseup", handleMouseUp);
      container.removeEventListener("mouseleave", handleMouseUp);
      container.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      <div className="deal-page">
        {error && (
          <div
            style={{ padding: "20px", color: "#d32f2f", textAlign: "center" }}
          >
            Buyurtmalarni yuklab bo'lmadi. Iltimos, keyinroq urinib ko'ring.
          </div>
        )}

        <div className="scroll-container" ref={scrollContainerRef}>
          <div className="header-row">
            {headerStats.map((el) => (
              <div className="header-card" key={el.id}>
                <h3>{`\u2022 ${el.title}`}</h3>
                <div className="header-stats">
                  <div className="stat-box">
                    <p>buyurtmalar:</p>
                    <span>{el.summa}</span>
                  </div>
                  <div className="stat-box">
                    <p>umumiy summa:</p>
                    <span>{el.umumiySumma}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <DragDropContext onDragEnd={handleOnDragEnd}>
            <div className="columns-row">
              {Object.entries(data).map(([columnId, items]) => (
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => (
                    <div
                      className={`column ${snapshot.isDraggingOver ? "drag-over" : ""}`}
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      {loading
                        ? Array.from({ length: 3 }).map((_, idx) => (
                            <SkeletonCard
                              key={`${columnId}-skeleton-${idx}`}
                              color={columnColors[columnId]}
                            />
                          ))
                        : items?.map((item, idx) => (
                            <Draggable
                              key={item.id}
                              draggableId={item.id.toString()}
                              index={idx}
                            >
                              {(provided, snapshot) => (
                                <NavLink to={`${item.id}`}>
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className={`card ${snapshot.isDragging ? "dragging" : ""}`}
                                    style={{
                                      ...provided.draggableProps.style,
                                      background: item.color,
                                    }}
                                  >
                                    <div className="card-header">
                                      <strong>{item.name}</strong>
                                      <div className="card-number">
                                        <span>{`\u2116${item.number}`}</span>
                                      </div>
                                    </div>

                                    <div className="card-sum">
                                      <span>summa:</span>
                                      <h3>{item.sum}</h3>
                                    </div>

                                    <div className="card-footer">
                                      <span className="card-phone">
                                        {item.phone}
                                      </span>
                                      <span className="card-status">
                                        {item.status_label}
                                      </span>
                                    </div>

                                    <div className="card-meta">
                                      <span className="card-tag">{item.tag}</span>
                                      <div className="card-datetime">
                                        <span>{item.date}</span>
                                        <span>{item.time}</span>
                                      </div>
                                    </div>
                                  </div>
                                </NavLink>
                              )}
                            </Draggable>
                          ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              ))}
            </div>
          </DragDropContext>
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default DealCards;
