import { useRef, useEffect, useState } from "react"
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd"
import { initialData, columnColors } from "../../components/salesData/SalesData"
import { CardHeaderData } from "../../components/salesData/SalesData"
import "./DealCards.css"
import { NavLink } from "react-router-dom"

function DealCards() {
  const scrollContainerRef = useRef(null)
  const [data, setData] = useState(initialData)

  const handleOnDragEnd = result => {
    if (!result.destination) return

    const { source, destination } = result
    const sourceCol = [...data[source.droppableId]]
    const destCol =
      source.droppableId === destination.droppableId
        ? sourceCol
        : [...data[destination.droppableId]]

    const [removed] = sourceCol.splice(source.index, 1)
    removed.color = columnColors[destination.droppableId]
    destCol.splice(destination.index, 0, removed)

    setData({
      ...data,
      [source.droppableId]: sourceCol,
      [destination.droppableId]: destCol
    })
  }

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    let isDown = false
    let startX = 0
    let scrollLeft = 0

    const handleMouseDown = e => {
      if (e.target.closest(".card")) return
      isDown = true
      startX = e.pageX - container.offsetLeft
      scrollLeft = container.scrollLeft
    }

    const handleMouseUp = () => {
      isDown = false
    }

    const handleMouseMove = e => {
      if (!isDown) return
      e.preventDefault()
      const x = e.pageX - container.offsetLeft
      const walk = (x - startX) * 2
      container.scrollLeft = scrollLeft - walk
    }

    container.addEventListener("mousedown", handleMouseDown)
    container.addEventListener("mouseup", handleMouseUp)
    container.addEventListener("mouseleave", handleMouseUp)
    container.addEventListener("mousemove", handleMouseMove)

    return () => {
      container.removeEventListener("mousedown", handleMouseDown)
      container.removeEventListener("mouseup", handleMouseUp)
      container.removeEventListener("mouseleave", handleMouseUp)
      container.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div className="deal-page">
      <div className="scroll-container" ref={scrollContainerRef}>
        <div className="header-row">
          {CardHeaderData.map(el => (
            <div className="header-card" key={el.id}>
              <h3>● {el.title}</h3>
              <div className="header-stats">
                <div className="stat-box">
                  <p>сделок:</p>
                  <span>{el.summa}</span>
                </div>
                <div className="stat-box">
                  <p>на сумму:</p>
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
                    className={`column ${
                      snapshot.isDraggingOver ? "drag-over" : ""
                    }`}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {items.map((item, idx) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id.toString()}
                        index={idx}
                      >
                          {(provided, snapshot) => (
                      <NavLink to={"productId"} >
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`card ${
                              snapshot.isDragging ? "dragging" : ""
                            }`}
                            style={{
                              ...provided.draggableProps.style,
                              background: item.color
                            }}
                          >
                            <div className="card-header">
                              <strong>{item.name}</strong>
                              <div className="card-number">
                                <span>№{item.number}</span>
                              </div>
                            </div>
                            <div className="card-sum">
                              <span>на сумму:</span>
                              <h3>{item.sum}</h3>
                            </div>
                            <div className="card-footer">
                              <span className="card-phone">{item.phone}</span>
                              <span className="card-status">{item.status}</span>
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
  )
}

export default DealCards
