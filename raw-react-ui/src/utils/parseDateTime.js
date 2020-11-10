import moment from "moment";
import config from "../config/app";

export default function parseDateTime(date, format = config.DATE_TIME_FORMAT) {
  return moment(date).format(format);
}
