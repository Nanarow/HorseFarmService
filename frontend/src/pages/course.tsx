import React from "react";

const Course = () => {
  return (
    <div className=" w-full h-screen bg-slate-400 flex gap-2">
      {[1, 2, 3, 4, 5, 6, 7].map((i) => (
        <div key={i} className="flex flex-col w-full gap-2">
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div key={i} className=" bg-slate-500 w-48 h-full"></div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Course;
