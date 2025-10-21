import { Slide, toast } from "react-toastify";
import "./Network.css";

const Network = () => {
  const copyToClipboard = async (text) => {
    console.log(text);
    try {
      if (text) {
        await navigator.clipboard.writeText(text);
        toast.info("Nusxalandi", {
          position: "bottom-right",
          autoClose: 909,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Slide,
          style: {
            width: "150px",
            background: "#22BB33",
            borderRadius: "30px",
            fontFamily: "Neometric",
            fontSize: "14px",
          },
        });
      }
    } catch (error) {
      console.error("Failed to copy text: ", error);
    }
  };
  return (
    <div className="reklama-network-page">
      <div className="section">
        <h2>#Networks</h2>
        <ul className="list">
          <li className="item" onClick={() => copyToClipboard("instagram")}>
            <span>instagram</span>
            <span className="action">Скопировать</span>
          </li>
          <li className="item" onClick={() => copyToClipboard("Facebook")}>
            <span>Facebook</span>
            <span className="action">Скопировать</span>
          </li>
          <li className="item" onClick={() => copyToClipboard("Website")}>
            <span>Website</span>
            <span className="action">Скопировать</span>
          </li>
          <li className="item" onClick={() => copyToClipboard("Telegram")}>
            <span>Telegram</span>
            <span className="action">Скомпровать</span>
          </li>
          <li className="item" onClick={() => copyToClipboard("Influencer")}>
            <span>Influencer</span>
            <span className="action">Скопировать</span>
          </li>
        </ul>
      </div>
      <div className="section">
        <h2>#Integration</h2>
        <ul className="list">
          <li className="item" onClick={() => copyToClipboard("Integration_1")}>
            <span>Integration_1</span>
            <span className="action">Скопировать</span>
          </li>
          <li className="item" onClick={() => copyToClipboard("Integration_2")}>
            <span>Integration_2</span>
            <span className="action">Скопировать</span>
          </li>
          <li className="item" onClick={() => copyToClipboard("Integration_3")}>
            <span>Integration_3</span>
            <span className="action">Скопировать</span>
          </li>
          <li className="item" onClick={() => copyToClipboard("Integration_4")}>
            <span>Integration_4</span>
            <span className="action">Скопировать</span>
          </li>
          <li className="item" onClick={() => copyToClipboard("Integration_5")}>
            <span>Integration_5</span>
            <span className="action">Скопировать</span>
          </li>
          <li className="item" onClick={() => copyToClipboard("Integration_6")}>
            <span>Integration_6</span>
            <span className="action">Скопировать</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Network;
