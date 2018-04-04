import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import _ from "lodash";
import { SingleDatePicker } from "react-dates";

import { OUTSIDE_RANGE } from "../constants";

window.moment = moment;

class DatePicker extends Component {
  state = {
    focused: this.props.autoFocus,
    date: (() => {
      try {
        return this.props.initialDate.isValid() ? this.props.initialDate : null;
      } catch (e) {
        return null;
      }
    })()
  };

  render() {
    return (
      <SingleDatePicker
        block={this.props.block}
        placeholder={this.props.placeholder}
        focused={this.state.focused}
        date={this.state.date}
        onDateChange={date => {
          this.setState({ date });
          (async () => this.props.onDateChange(date))();
        }}
        onFocusChange={({ focused }) => this.setState({ focused })}
        isOutsideRange={this.props.isOutsideRange}
      />
    );
  }
}

DatePicker.propTypes = {
  autoFocus: PropTypes.bool,
  isOutsideRange: PropTypes.func,
  onDateChange: PropTypes.func
};

DatePicker.defaultProps = {
  autoFocus: false,
  initialDate: null,
  placeholder: "DD/MM/YYYY",
  block: true,
  isOutsideRange: OUTSIDE_RANGE.ANY,
  onDateChange: () => {}
};

export default DatePicker;
