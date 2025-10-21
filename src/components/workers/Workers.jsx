import "./Workers.css";

const Workers = () => {
  return (
    <div 
    className="worker-lists">
      <h2 className="xodimlar-text">Сотрудники</h2>
      <div className="workers-data">
        <div className="workers-title">
          <p>Сделки</p>
          <p>Фамилия</p>
          <p>Отдел</p>
        </div>
        <ul>
          <li>
            <h5 className="worker-fullName">Muhammadodil</h5>
            <span className="worker-contract">Отдел продаж</span>
            <a href="./#" className="worker-product">
             430 продажи
            </a>
          </li>
          <li>
            <h5 className="worker-fullName">Muhammadodil</h5>
            <span className="worker-contract">Отдел продаж</span>
            <a href="./#" className="worker-product">
              14 430 продажи
            </a>
          </li>
          <li>
            <h5 className="worker-fullName">Muhammadodil</h5>
            <span className="worker-contract">Отдел продаж</span>
            <a href="./#" className="worker-product">
              14 430 продажи
            </a>
          </li>
          <li>
            <h5 className="worker-fullName">Muhammadodil</h5>
            <span className="worker-contract">Отдел продаж</span>
            <a href="./#" className="worker-product">
              14 430 продажи
            </a>
          </li>
          <li>
            <h5 className="worker-fullName">Muhammadodil</h5>
            <span className="worker-contract">Отдел продаж</span>
            <a href="./#" className="worker-product">
              14 430 продажи
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Workers;
