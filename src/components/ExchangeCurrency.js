import React, { useState, useEffect } from "react";
import { Select, message } from "antd";
import moment from "moment";
import "antd/dist/antd.css";

const { Option } = Select;

const ExchangeCurrency = (props) => {
  const [curType, setCurType] = useState("USD");
  const [curRate, setCurRate] = useState("");
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));

  const tweakCurType = (type) => setCurType(type);

  const fetchCurRate = async () => {
    try {
      const res = await fetch(
        `https://www.bankofcanada.ca/valet/observations/FXCAD${curType}/json?start_date=${
          props.date ? props.date : date
        }&end_date=${props.date ? props.date : date}`
      );
      const data = await res.json();

      if (data.observations.length === 0) {
        message.info("There is no exchange rate on this day.");
        setCurRate("");
      } else {
        setCurRate(data.observations[0][`FXCAD${curType}`].v);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // side effect of each props' change
  useEffect(() => {
    setDate(props.date);
    fetchCurRate();
  }, [props, curType]);

  return (
    <div>
      <section style={{ marginTop: "10px" }}>
        <Select
          defaultValue="USD"
          style={{ width: 120 }}
          onChange={tweakCurType}
        >
          <Option value="USD">USD</Option>
          <Option value="EUR">EUR</Option>
        </Select>
      </section>

      <section style={{ marginTop: "10px" }}>
        <p>Today's currency exchange rate is {curRate}</p>
      </section>
    </div>
  );
};

// class ExchangeCurrency extends React.Component {

//   tweakCurType = (type) => {
//     console.log(type);
//     this.setState({ currencyType: type });
//   };

// fetchCurRate = async () => {
//   try {
//     const res = await fetch(
//       `https://www.bankofcanada.ca/valet/observations/FXCAD${
//         this.state.currencyType
//       }/json?start_date=${
//         this.props.date ? this.props.date : this.state.date
//       }&end_date=${this.props.date ? this.props.date : this.state.date}`
//     );
//     const data = await res.json();

//     console.log(data);

//     if (data.observations.length === 0) {
//       message.info("There is no exchange rate on this day.");
//       this.setState({ currencyRate: "" });
//     } else {
//       this.setState({
//         currencyRate: data.observations[0][`FXCAD${this.state.currencyType}`].v,
//       });
//       console.log(this.state.currencyRate);
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

//   componentDidMount = () => {
//     this.fetchCurRate();
//   };

//   componentWillReceiveProps = (nextProps) => {
//     if (nextProps.date !== this.props.date) {
//       this.setState({ date: nextProps.date });
//     }
//     this.fetchCurRate();
//   };

//   componentDidUpdate = (prevProps, prevState) => {
//     if (prevState.currencyType !== this.state.currencyType) {
//       this.fetchCurRate();
//     }
//   };

// }

export default ExchangeCurrency;
