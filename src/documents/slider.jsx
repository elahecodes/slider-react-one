import React, { useState, useEffect } from "react";

const Slider = () => {
  const [counter, setCounter] = useState(0);
  const [items, setItems] = useState([]);
  const [showSlide, setShowSlide] = useState([]);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    fetch("src/documents/json/data.json")
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
      })
      .catch((err) => console.error(err, "ارور در دریافت اطلاعات"));
  }, []);
  useEffect(() => {
    if (items.length > 0) {
      let selected = items[0];
      setShowSlide([selected]);
      setCounter(0);
    }
  }, [items]);

  const plus = () => {
    setAnimate(true);
    setTimeout(() => setAnimate(false), 1000);
    let nextCounter = counter + 1;
    if (nextCounter >= items.length) {
      nextCounter = 0;
    }
    let selected = items[nextCounter];
    setShowSlide([selected]);
    setCounter(nextCounter);
  };
  const mines = () => {
    setAnimate(true);
    setTimeout(() => setAnimate(false), 1000);
    let prevCounter = counter - 1;
    if (prevCounter < 0) {
      prevCounter = items.length - 1;
    }
    const seleced = items[prevCounter];
    if (seleced) {
      setShowSlide([seleced]);
    }
    setCounter(prevCounter);
  };

  return (
    <div>
      <div className="slider-container bg-red-400 relative h-2/3 w-4/5 p-1">
        {showSlide.map((item, index) => (
          <div
            key={index}
            className={`bg-slate-500 slide border border-stale-500 m-2 ${
              animate ? "animate-opacity" : ""
            }`}
          >
            <img className="w-full z-0 h-[40rem] object-cover" src={item.img} alt="" />
         <div className="absolute bottom-7">
             <h2
              className={`text-3xl font-bold ${
                animate ? "animate-translateTitle" : ""
              }`}
            >
              {item.title}
            </h2>
            <p className={` ${
                animate ? "animate-translateParagraph" : ""
                }`}>
              {item.description}
            </p>
         </div>
          </div>
        ))}

        <button
          onClick={plus}
          className="absolute z-30 top-30 bg-pink-200 p-2 text-xl right-0"
        >
          +
        </button>
        <button
          onClick={mines}
          className="absolute z-30 top-30 bg-pink-200 p-2 text-xl left-0"
        >
          -
        </button>
      </div>
    </div>
  );
};

export default Slider;
//npx tailwindcss -i ./src/input.css -o ./src/output.css --watch
