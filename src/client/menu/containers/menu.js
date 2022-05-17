import React from "react";
import MenuLayout from "../components/menu-layout";

function Menu() {
  return (
    <MenuLayout>
      <div className="container">
        <a className="brand-logo" href="/">
          MERN Stack
        </a>
      </div>
    </MenuLayout>
  );
}

export default Menu;
