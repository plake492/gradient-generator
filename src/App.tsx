import GradientBg from "./components/GradientBg"
import Particles from "./components/Particles"
import SvgNoise from "./components/SvgNoise"
import ControlPanel from "./components/ControlPanel"

import "./scss/app.scss"

function App() {
  return (
    <>
      <GradientBg />
      <Particles />
      <SvgNoise />
      <div style={{ position: "relative", zIndex: 2 }}>
        <ControlPanel />
        <div
          className="container d-flex flex-col justify-content-center align-items-center"
          style={{ minHeight: "100vh", width: "100%" }}
        >
          <h1>
            Hello <i>There</i>
          </h1>
          <p className="mt-xxl">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam enim
            ipsum nulla odio sit ab, amet eum laborum deserunt mollitia quam,
            quos minima sunt incidunt. Obcaecati maiores dicta rerum sint.
          </p>
        </div>

        <div
          className="container d-flex flex-col justify-content-center align-items-center"
          style={{ minHeight: "100vh", width: "100%" }}
        >
          <h1>
            Hello <i>There</i>
          </h1>
          <p className="mt-xxl">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam enim
            ipsum nulla odio sit ab, amet eum laborum deserunt mollitia quam,
            quos minima sunt incidunt. Obcaecati maiores dicta rerum sint.
          </p>
        </div>

        <div
          className="container d-flex flex-col justify-content-center align-items-center"
          style={{ minHeight: "100vh", width: "100%" }}
        >
          <h1>
            Hello <i>There</i>
          </h1>
          <p className="mt-xxl">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam enim
            ipsum nulla odio sit ab, amet eum laborum deserunt mollitia quam,
            quos minima sunt incidunt. Obcaecati maiores dicta rerum sint.
          </p>
        </div>
      </div>
    </>
  )
}

export default App
