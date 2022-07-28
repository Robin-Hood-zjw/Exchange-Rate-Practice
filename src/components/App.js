// online libraries
import React, { useState } from "react";
import "antd/dist/antd.css";
import moment from "moment";
import { Calendar } from "antd";

// Local libraries
import "../styles.css";
import ExchangeCurrency from "./ExchangeCurrency";

const App = () => {
  const [date, setDate] = useState("");

  return (
    <div>
      <Calendar
        fullscreen={false}
        onChange={(date) => setDate(moment(date).format("YYYY-MM-DD"))}
      />
      <ExchangeCurrency date={date} />
    </div>
  );
};

// class App extends React.Component {
//   state = { date: "" };

//   tweakDate = (newDate) =>
//     this.setState({ date: moment(newDate).format("YYYY-MM-DD") });

//   render() {
//     return (
//       <div>
//         <Calendar
//           fullscreen={false}
//           onChange={(date) => this.tweakDate(date)}
//         />
//         <ExchangeCurrency date={this.state.date} />
//       </div>
//     );
//   }
// }

export default App;
