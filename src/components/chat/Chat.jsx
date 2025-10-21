import "./Chat.css";

const Chat = ({innerRef, height}) => {
  return (
    <div 
    ref={innerRef}
    style={{
      flex:1,
      height: height || "auto"
    }}
    className="chat-lists">
      <h2 id="text-title">Беседы</h2>
      <div className="chat-data">
        <div className="chat-title">
          <p>Обработанные беседы</p>
        </div>
        <ul>
          <li>
            <h5 className="social-network">Реклама</h5>
            <span href="./#" className="social-contract">
              09
            </span>
          </li>

          <li>
            <h5 className="social-network">Muhammadodil</h5>
            <span href="./#" className="social-contract">
              1003
            </span>
          </li>
        </ul>

        <div className="line"></div>
        <ul>
          <div className="chat-title">
            <p>Не обработанные беседы</p>
          </div>
          <li>
            <h5 className="social-network">Реклама</h5>
            <span href="./#" className="social-contract">
              09
            </span>
          </li>

          <li>
            <h5 className="social-network">Muhammadodil</h5>
            <span href="./#" className="social-contract">
              1003
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Chat;
