import React from "react";

const Mistakes = ({count}) => {
  return <div className="game__mistakes">
    {[0, 1, 2].map((i) => <div key={i} className={i < count ? `wrong` : `correct`}/>)}
  </div>;
};

export default Mistakes;
