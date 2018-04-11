import React from "react";
import PropTypes from "prop-types";
import { WindowScroller, Table as VirtualizedTable } from "react-virtualized";
import _ from "lodash";

const Table = ({ ...props }) => {
  if (_.isArray(props.data)) {
    const { data } = props;
    props.rowCount = data.length;
    props.rowGetter = ({ index }) => data[index];
  }

  props = _.omit(props, "data");

  return (
    <WindowScroller>
      {wProps => {
        const { width, height, isScrolling, onChildScroll, scrollTop } = wProps;
        return (
          <VirtualizedTable
            autoHeight
            height={height}
            width={width}
            isScrolling={isScrolling}
            onChildScroll={onChildScroll}
            scrollTop={scrollTop}
            headerHeight={20}
            rowHeight={40}
            {...props}
          />
        );
      }}
    </WindowScroller>
  );
};

Table.propTypes = {
  data: PropTypes.array
};

export default Table;
