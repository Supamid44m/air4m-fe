"use client";

import React, { useEffect, useState } from "react";
import { Fragment } from "react/jsx-runtime";

type Props = {
  isShow: boolean;
};

export default function StatusCard({ isShow }: Props) {
  const [time, setTime] = React.useState(new Date());
  const [isOpen, setIsOpen] = React.useState(false);

  useEffect(() => {
    setIsOpen(isShow);
  }, []);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedDate = time.toLocaleTimeString("th-TH", {});

  const boxStyle = `
        p-3 absolute  
        flex flex-col  
        rounded-sm
        bg-stone-50 shadow-lg 
        z-10
  `

  return (
    <Fragment>
      {isOpen && (
        <div className={boxStyle}>
          <div className="text-black">{formattedDate}</div>
          <div>24c</div>
          <div>pm2.5 90</div>
        </div>
      )}
    </Fragment>
  );
}
