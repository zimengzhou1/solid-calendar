import Box from "@mui/material/Box";
import Participants from "../components/Participants";
import Schedule from "../components/Schedule";

export default function ScheduleMeeting() {
  return (
    <Box sx={{ display: "flex" }}>
      <Schedule />
    </Box>
  );
}
