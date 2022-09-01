import React, { useMemo } from "react";
import Box from "@mui/material/Box";
import moment from "moment";
import {
  Calendar,
  Views,
  DateLocalizer,
  momentLocalizer,
} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import events from "../data/events";
import * as dates from "../utils/dates";

const mLocalizer = momentLocalizer(moment);

const ColoredDateCellWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: "lightblue",
    },
  });

export default function CustomCalendar({ localizer = mLocalizer, ...props }) {
  // let temp = new Date(2015, 17, 1);
  // console.log(temp.toDateString());
  // console.log(
  //   dates.add(dates.endOf(new Date(2015, 17, 1), "day"), -1, "hours")
  // );
  let { availableEvents } = props;

  const { components, defaultDate, max, views } = useMemo(
    () => ({
      components: {
        timeSlotWrapper: ColoredDateCellWrapper,
      },
      defaultDate: new Date(),
      max: localizer.endOf(new Date(), "day"),
      views: Object.keys(Views).map((k) => Views[k]),
    }),
    []
  );

  return (
    <Calendar
      components={components}
      defaultDate={defaultDate}
      events={availableEvents}
      localizer={localizer}
      min={localizer.startOf(new Date(), "day")}
      max={max}
      showMultiDayTimes
      step={60}
      views={views}
      defaultView={"week"}
      onSelectEvent={(e) => console.log(e)}
    />
  );
}
