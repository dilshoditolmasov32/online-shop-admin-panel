import "./Skeleton.css";

export default function Skeleton({count}) {
  return (
    <>
    {
      Array(count).fill("").map((_, index)=>(
  <div className="skeleton" key={index}>
        <div className="skeleton-img"></div>
        <div className="skeleton-body">
          <div className="skeleton-header"></div>
          <div className="skeleton-footer"></div>
        </div>
      </div>
      ))
    }
    
    </>
  );
}
