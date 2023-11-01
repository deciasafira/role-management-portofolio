import React from "react";

const DetailItem = ({ label, value }) => {
  return (
    <div className={`pt-5 flex justify-between`}>
      <div className="w-[15rem] py-2.5 text-variant-on-surface text-base font-bold flex justify-start">
        <p>{label}</p>
      </div>
      <div className="w-10/12 justify-end p-2.5 text-white rounded-lg bg-dark-main-gray block font-thin overflow-y-auto">
        <p>{value}</p>
      </div>
    </div>
  );
};

export default DetailItem;
