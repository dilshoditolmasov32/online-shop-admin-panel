import "./Message.css";

const Message = ({innerRef, height}) => {
  return (
    <div 
    
    className="message-lists"
    ref={innerRef}
    style={{
      flex:1,
      height: height || "auto"
    }}
    >
      <h2 className="text-title">Входящие сообщения</h2>
      <div className="message-data">
        <div className="message-title">
          <p>Платформа</p>
        </div>
        <ul>
          <li>
            <h5 className="social-network">Инстаграм</h5>
            <span href="./#" className="social-contract">
              09
            </span>
          </li>

          <li>
            <h5 className="social-network">Фейсбук</h5>
            <span href="./#" className="social-contract">
              1003
            </span>
          </li>
          <li>
            <h5 className="social-network">Телеграм</h5>
            <span href="./#" className="social-contract">
              1003
            </span>
          </li>
          <li>
            <h5 className="social-network">Веб-сайт</h5>
            <span href="./#" className="social-contract">
              1003
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Message;
