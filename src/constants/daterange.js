import moment from "moment";
import {
  isAfterDay,
  isBeforeDay,
  isInclusivelyAfterDay,
  isInclusivelyBeforeDay
} from "../helpers";

export const OUTSIDE_RANGE = {
  PAST: day => !isBeforeDay(day, moment()),
  FUTURE: day => !isAfterDay(day, moment()),
  PAST_INCLUSIVE: day => !isInclusivelyBeforeDay(day, moment()),
  FUTURE_INCLUSIVE: day => !isInclusivelyAfterDay(day, moment()),
  ANY: () => false
};
