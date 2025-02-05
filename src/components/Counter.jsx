import { useEffect, useState } from "react";
import { useSpring, animated } from "react-spring";

export const Counter = () => {
  const [count, setCount] = useState(() => {
    const savedCount = localStorage.getItem("counter");
    return savedCount ? parseInt(savedCount) : 0;
  });

  useEffect(() => {
    localStorage.setItem("counter", count.toString());
  }, [count]);

  const backgroundAnimation = useSpring({
    backgroundColor: `rgba(${count * 20},${count * 10}, ${
      count * 3
    }, ${Math.min(count / 10, 1)})`,
  });

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => Math.max(prev - 1, 0));
  const reset = () => setCount(0);

  return (
    <>
      <main className="flex w-[100%] min-h-[100dvh] overflow-y-auto">
        <div className="content-grid w-[100%]">
          {/* commit to check */}
          <animated.div
            style={backgroundAnimation}
            className="full-width content-grid"
          >
            <div className="text-center font-serif m-auto">
              <h1 className="text-[max(6cqi,2.8rem)] mb-5 font-bold font-[Young_Serif,serif]">
                Counter: {count}
              </h1>
              <div className="flex justify-center gap-4">
                <button
                  className="rounded-sm  w-[100px] h-[2rem] rounded-lsm border hover:bg-black hover:text-white transition-all border-black border-solid text-[max(1cqi,0.89rem)]"
                  onClick={increment}
                >
                  Add
                </button>
                <button
                  className="rounded-sm  w-[100px]  border border-black border-solid  hover:bg-black hover:text-white transition-all text-[max(1cqi,0.89rem)] "
                  onClick={reset}
                >
                  Reset
                </button>
                <button
                  className=" w-[100px] rounded-sm   border border-black border-solid  hover:bg-black hover:text-white transition-all text-[max(1cqi,0.89rem)]"
                  onClick={decrement}
                >
                  Subtract
                </button>
              </div>
            </div>
          </animated.div>
        </div>
      </main>
    </>
  );
};
