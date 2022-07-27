import React from "react";
import moment from "moment";
import "antd/dist/antd.css";
import { Select, message } from "antd";

const { Option } = Select;

class ExchangeCurrency extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currencyType: "USD",
      currencyRate: "",
      date: moment().format("YYYY-MM-DD"),
    };
  }

  tweakCurType = (type) => {
    console.log(type);
    this.setState({ currencyType: type });
  };

  fetchCurRate = async () => {
    try {
      const res = await fetch(
        `https://www.bankofcanada.ca/valet/observations/FXCAD${
          this.state.currencyType
        }/json?start_date=${
          this.props.date ? this.props.date : this.state.date
        }&end_date=${this.props.date ? this.props.date : this.state.date}`
      );
      const data = await res.json();

      if (data.observations.length === 0) {
        message.info("There is no exchange rate on this day.");
        this.setState({ currencyRate: "" });
      } else {
        console.log(data.observations);
        // this.setState({ currencyRate: data });
      }
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount = () => {
    this.fetchCurRate();
  };

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.date !== this.props.date) {
      this.setState({ date: nextProps.date });
    }
    this.fetchCurRate();
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.currencyType !== this.state.currencyType) {
      this.fetchCurRate();
    }
  };

  render() {
    return (
      <div>
        <section style={{ marginTop: "10px" }}>
          <Select
            defaultValue="USD"
            style={{ width: 100 }}
            onChange={this.tweakCurType}
          >
            <Option value={"USD"}>USD</Option>
            <Option value={"EUR"}>EUR</Option>
          </Select>
        </section>

        <section style={{ marginTop: "10px" }}>
          <p>Today's currency exchange rate is {this.state.currencyRate}</p>
        </section>
      </div>
    );
  }
}

export default ExchangeCurrency;
