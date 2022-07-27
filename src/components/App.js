// online libraries
import React from "react";
import "antd/dist/antd.css";
import moment from "moment";
import { Calendar } from "antd";

// Local libraries
import "../style.css";
import ExchangeCurrency from "./ExchangeCurrency";

class App extends React.Component {
  state = { date: "" };

  tweakDate = (newDate) =>
    this.setState({ date: moment(newDate).format("YYYY-MM-DD") });

  render() {
    return (
      <div>
        <Calendar
          fullscreen={false}
          value={this.state.date}
          onChange={(date) => this.tweakDate(date)}
        />

        <ExchangeCurrency date={this.state.date} />
      </div>
    );
  }
}

export default App;
