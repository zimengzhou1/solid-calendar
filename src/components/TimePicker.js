import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Button from "@mui/material/Button";

export default function CustomTimePicker() {
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  const addToCal = () => {
    console.log("clicked");
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <h4>Set the start and end time:</h4>
      <Stack spacing={3}>
        <DateTimePicker
          label="Meeting Start Date"
          inputVariant="outlined"
          value={startTime}
          onChange={setStartTime}
          renderInput={(params) => <TextField {...params} />}
        />
        <DateTimePicker
          label="Meeting End Date"
          inputVariant="outlined"
          value={endTime}
          onChange={setEndTime}
          renderInput={(params) => <TextField {...params} />}
        />
      </Stack>
      <h4>Select your calendar:</h4>
      <Button sx={{ mb: 4 }} variant="outlined">
        Schedule meeting using Google Calendar
      </Button>
    </LocalizationProvider>
  );
}
