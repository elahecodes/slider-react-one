import React, { useState, useEffect } from "react";
import arrow from '../assets/icons/arrow.png'
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

  const imgSelected = (id) => {
    setAnimate(true);
    setTimeout(() => setAnimate(false), 1000);
    let selected = items[id];
    setShowSlide([selected]);
    setCounter(id);
  };
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
    <div className="flex flex-col justify-center items-center gap-4 h-svh bg-slate-950">
      <div className="slider-container w-[60rem] relative overflow-hidden h-[30rem] p-1 mt-7">
        <div className="absolute z-10 inset-0 w-full left-0 h-full rounded-3xl bg-gradient-to-b from-transparent to-neutral-800"></div>
        {showSlide.map((item, index) => (
          <div
            key={index}
            className={`w-full h-full slide ${
              animate ? "animate-opacity" : ""
            }`}
          >
            <img
              className="w-full z-0 absolute inset-0 h-full object-cover rounded-3xl"
              src={item.img}
              alt=""
            />
            <div className="absolute z-20 right-8 bottom-8 flex flex-col justify-center items-start gap-4 max-w-[95%]">
              <h2
                className={`text-3xl text-white font-bold ${
                  animate ? "animate-translateTitle" : ""
                }`}
              >
                {item.title}
              </h2>
           
            </div>
          </div>
        ))}

        <button
          onClick={plus}
          className="absolute hover:scale-110 transition-all border-transparent border-2 hover:border-white flex top-[45%] justify-center items-center rounded-full w-16 h-16 backdrop-blur-sm bg-white/20 z-30 top-30 p-2 text-xl right-4"
        >
          <img className="w-6" src={arrow} alt="" />
        </button>
        <button
          onClick={mines}
          className="absolute hover:scale-110 transition-all border-transparent border-2 hover:border-white flex top-[45%] justify-center items-center rounded-full w-16 h-16 backdrop-blur-sm bg-white/20 z-30 top-30 p-2 text-xl left-4"
        >
          <img className="w-6 rotate-180" src={arrow} alt="" />
        </button>
      </div>
      <div className="w-[60rem] flex flex-nowrap items-center h-40 gap-2 overflow-x-auto">
        {items.map((item) => {
          return (
            <div
              onClick={() => imgSelected(item.id - 1)}
              className="w-32 overflow-hidden shrink-0 rounded-2xl h-20 cursor-pointer"
            >
              <img className="object-cover hover:scale-125 transition-all" src={item.img} alt="" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Slider;
//npx tailwindcss -i ./src/input.css -o ./src/output.css --watch
