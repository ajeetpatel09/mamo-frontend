
import "./App.css";
// import MamoPayComponent from "./components/Payment";
// import store from "./redux/app/store";
import RouteConfig from "./routes/RouteConfig";

function App() { 

  return (
    <>
      {/* <Provider store={store}> */}
      <RouteConfig />
      {/* <MamoPayComponent /> */}
      {/* </Provider> */}
    </>
  );
}

//"https://mamopay.com/checkout/checkout-inline-2.0.0.min.js"

export default App;
