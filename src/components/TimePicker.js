import React, { useState } from "react";
import dayjs from "dayjs";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";

export default function CustomTimePicker() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleChange = (newValue) => {
    setSelectedDate(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <h4>Set the start and end time:</h4>
      <Stack spacing={3}>
        <DateTimePicker
          label="Meeting Start Date"
          inputVariant="outlined"
          value={selectedDate}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
        <DateTimePicker
          label="Meeting End Date"
          inputVariant="outlined"
          value={selectedDate}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </Stack>
      <h4>Select your calendar:</h4>
    </LocalizationProvider>
  );
}
