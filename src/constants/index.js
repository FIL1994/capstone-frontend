import moment from "moment";
import {
  isAfterDay,
  isBeforeDay,
  isInclusivelyAfterDay,
  isInclusivelyBeforeDay
} from "../helpers";

export const ROOT_URL = "http://207.148.28.48:3000";

export const URLS = {
  PROJECT: ROOT_URL + "/project",
  JOB: ROOT_URL + "/job",
  CUSTOMER: ROOT_URL + "/customer",
  EMPLOYEE: ROOT_URL + "/employee",
  MATERIAL: ROOT_URL + "/material"
};

export const OUTSIDE_RANGE = {
  PAST: day => !isBeforeDay(day, moment()),
  FUTURE: day => !isAfterDay(day, moment()),
  PAST_INCLUSIVE: day => !isInclusivelyBeforeDay(day, moment()),
  FUTURE_INCLUSIVE: day => !isInclusivelyAfterDay(day, moment()),
  ANY: () => false
};
