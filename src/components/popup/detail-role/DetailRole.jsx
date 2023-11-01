import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Button, DetailItem, TagsContainer } from '../../index';
import Button from "../../Button/Button";
import DetailItem from "./DetailItem";
import TagsContainer from "../../tags-container/TagsContainer";

import { asyncReceiverRoles } from "../../../states/roles/Action";

const DetailRole = ({ handleClose, details }) => {
  const dispatch = useDispatch();

  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClose]);

  useEffect(() => {
    // Call the asyncReceiverRoles function with details as a parameter
    dispatch(asyncReceiverRoles(details));
  }, [dispatch, details]);

  const roles = useSelector((state) => state.roles);

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none w-screen">
        <div ref={modalRef} className="relative my-6 mx-auto w-detail-roles">
          {/*content*/}
          <div className="px-20 py-12 rounded-2xl shadow-2xl relative flex flex-col bg-high-container outline-none focus:outline-none">
            {/*header*/}
            <div className="py-2.5 flex items-start justify-between">
              <h1 className="text-3xl font-bold text-variant-on-surface ">
                Role Details
              </h1>
            </div>
            {/*body*/}
            <div className="pb-10 relative">
              <div>
                <DetailItem label="Role Name" className="text-variant-on-surface" value={details.name} />
                <div className={`pt-5 flex justify-between`}>
                  <div className="w-[6.5rem] py-2.5 text-variant-on-surface text-base font-bold flex justify-start">
                    <p>Access Role</p>
                  </div>
                </div>
                <div className="flex flex-wrap">
                  <div className="w-1/2 pt-5 flex-col justify-start gap-13">
                    <div className="font-bold w-24 py-2.5 text-variant-on-surface text-base flex-wrap justify-start">
                      <p>Worksets</p>
                    </div>
                    <div className="flex flex-wrap gap-1 overflow-y-auto max-h-62">
                      {details.worksets.length !== 0 ? (
                        details.worksets.map((workset) => (
                          <TagsContainer
                            key={workset.workset.id}
                            value={workset.workset.name}
                          />
                        ))
                      ) : (
                        <TagsContainer value="N/A" />
                      )}
                    </div>
                  </div>
                  <div className="w-1/2 pt-5 flex-col justify-start gap-13">
                    <div className="font-bold w-24 py-2.5 text-variant-on-surface text-base flex-wrap justify-start">
                      <p>Services</p>
                    </div>
                    <div className="flex flex-wrap gap-1 overflow-y-auto max-h-62">
                      {Array.isArray(details.services) &&
                        details.services.length !== 0 ? (
                        details.services.map((services) => (
                          <TagsContainer
                            key={services.service.id}
                            value={services.service.name}
                          />
                        ))
                      ) : (
                        <TagsContainer value="N/A" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-center">
              <Button
                label="Close"
                clickHandler={handleClose}
                className="bg-dark-secondary hover:bg-secondary-hover text-white shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-80 fixed z-10 inset-0 bg-gray-800"></div>
    </>
  );
};

export default DetailRole;
