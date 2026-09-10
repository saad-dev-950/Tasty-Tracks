import React from 'react';

const MenuSection = ({ id, title, children }) => {
  return (
    <div id={id} className="container my-3">
        <h3 className="text-white mt-5">{title}</h3>
        <div className="row mt-2 g-4 align-items-stretch">
            {children}
        </div>
    </div>
  );
};

export default MenuSection;
