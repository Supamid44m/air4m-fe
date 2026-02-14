"use client";
import { headerItems } from "../common/header";
import { IHeaderItem } from "../model/inteface/IHeaderItem";

import { Fragment } from "react/jsx-runtime";
import Link from "next/link";
import { it } from "node:test";
import React, { useEffect, useState } from "react";
import StatusCard from "./StatusCard";

export default function Header() {
  const [isHovering, setIsHovering] = React.useState(false);
  const items: IHeaderItem[] = headerItems;

  const handleMouseHover = () => {
    setIsHovering(!isHovering);
  };

  return (
    <Fragment>
      <div className="header-box flex flex-col">
        <div className="flex flex-row w-full items-center justify-between border-b-2 border-solid    p-3  border-stone-50">
          <div className="flex flex-col">
            <div
              className="text-white text-2xl italic"
              onMouseEnter={() => handleMouseHover()}
              onMouseLeave={() => handleMouseHover()}
            >
              Air4m
            </div>
             {isHovering && (
              <div>
                <StatusCard isShow={isHovering} />
              </div>
            )}
           
          </div>
          {items.map((item: IHeaderItem) => (
            <div key={item.name} className="text-white list-none">
              <li className="header-item font-bold uppercase">
                <Link href={item.url}>{item.title}</Link>
              </li>
            </div>
          ))}
        </div>
        
      </div>
    </Fragment>
  );
}
