import bgImage from "./assets/city-dusk.png";
import { UI_TEXT } from "./constants";

function App() {
  return (
    <div
      className="w-screen h-screen flex justify-center items-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute top-6 left-6 z-10 text-white select-none">
        <h1 className="font-hand text-3xl font-semibold leading-none tracking-[1px]">
          {UI_TEXT.APP_TITLE}
        </h1>
        <p className="font-main text-xs tracking-[2px] uppercase mt-1 ml-1">
          {UI_TEXT.APP_DESCRIPTION}
        </p>
      </div>

      {/* timer block */}
      <div className="font-main z-10 text-6xl text-white">25:00</div>
    </div>
  );
}

export default App;
