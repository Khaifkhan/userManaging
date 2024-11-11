import React from "react";
import women from "../../assets/women.png";
import "./Home.css";

function Home() {
  return (
    <div className="home-container">
      <div className="text-container">
        <h1 className="title">ShopEase</h1>
        <h2 className="subtitle">Discover Effortless Shopping</h2>
        <p className="description">
          Explore our wide range of premium products and immerse yourself in a
          shopping experience like no other. Shop with ease, where quality meets
          convenience.
        </p>
        <button className="start-shopping-button">Start Shopping</button>
      </div>
      <img className="image" src={women} alt="Woman Shopping" />
    </div>
  );
}

export default Home;
