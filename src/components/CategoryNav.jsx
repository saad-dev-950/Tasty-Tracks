import React from 'react';

const CategoryNav = () => {
  return (
    <div className="container-fluid">
        <div className="row">
            <div className="d-flex justify-content-center p-3 gap-3" id="top-menu">
                <a href="#Deals" className="dealLinks">Deals</a>
                <a href="#Burger" className="dealLinks">Burger</a>
                <a href="#Pizza" className="dealLinks">Pizza</a>
                <a href="#Quick-Bites" className="dealLinks">Quick Bite</a>
                <a href="#Fries" className="dealLinks">Fries</a>
            </div>
        </div>
    </div>
  );
};

export default CategoryNav;
