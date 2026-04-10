import { useEffect, useMemo, useState, useRef } from "react";
import { Workers, Chat, Message, Wrapper } from "../../components";
import "./Home.css";

const Home = () => {
  const [maxHeight, setMaxHeight] = useState(0);
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const refs = useMemo(() => [ref1, ref2, ref3], [ref1, ref2, ref3]);

  useEffect(() => {
    function updateHeights() {
      let heights = refs.map((ref) => ref.current?.offsetHeight || 0);
      setMaxHeight(Math.max(...heights));
    }

    updateHeights();

    window.addEventListener("resize", updateHeights);
    return () => window.removeEventListener("resize", updateHeights);
  }, [refs]);

  return (
    <>
      <div className="home">
        <Wrapper />
        <div className="lists">
          <Workers innerRef={refs[0]} height={maxHeight} />
          <Chat innerRef={refs[1]} height={maxHeight} />
          <Message innerRef={refs[2]} height={maxHeight} />
        </div>
      </div>
    </>
  );
};

export default Home;
