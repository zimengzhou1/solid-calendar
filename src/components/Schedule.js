import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import PeopleDrawer from "../components/PeopleDrawer";
import { useSession } from "@inrupt/solid-ui-react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import CustomTimePicker from "./TimePicker";
import CustomCalendar from "./CustomCalendar";
import {
  fetchParticipantWebIDs,
  fetchDataOfParticipants,
} from "../utils/participantsHelper";
import {
  downloadAvailabilityCalendar,
  downloadVacationCalendar,
} from "../utils/calendarHelper";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const participants = {
  dummy1: {
    name: "Dummy 1",
    availabilityCalendar: {
      url: "test:dummy1",
      status: "not-downloaded",
      data: undefined,
    },
    vacationCalendar: {
      url: "test:dummy1-vacation",
      status: "not-downloaded",
      data: undefined,
    },
  },
  dummy2: {
    name: "Dummy 2",
    availabilityCalendar: {
      url: "test:dummy2",
      status: "not-downloaded",
      data: undefined,
    },
    vacationCalendar: {
      url: "test:dummy2-vacation",
      status: "not-downloaded",
      data: undefined,
    },
  },
};
const employeesUrl =
  "https://data.knows.idlab.ugent.be/person/office/employees.ttl";

export default function Schedule() {
  const { session } = useSession();
  const solidFetch = session.fetch;

  const [validParticipants, setValidParticipants] = useState([]);
  const [invalidParticipants, setInvalidParticipants] = useState([]);
  const [selectedParticipants, setSelectedParticipants] = useState([]);

  const fetchAvailability = async () => {
    await fetchParticipantWebIDs(employeesUrl, participants, solidFetch);
    console.log("All participants' WebIDs fetched (without data).");
    await fetchDataOfParticipants(
      participants,
      solidFetch,
      setValidParticipants,
      setInvalidParticipants
    );
    console.log(participants);
  };

  return (
    <>
      {session.info.isLoggedIn && (
        <Box height="100vh" width="100%" display="flex">
          <Grid container spacing={4}>
            <Grid item xs={9}>
              {/* <Divider flexItem /> */}
              <Stack
                spacing={2}
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={{ mb: 3 }}
              >
                <Button variant="outlined">Find availability</Button>
                <Button variant="outlined">Show vacation days</Button>
              </Stack>
              <Box sx={{ height: "60%" }}>
                <CustomCalendar />
              </Box>
              <Box sx={{ m: 5 }} />
              <CustomTimePicker />

              <Box sx={{ m: 5 }} />
            </Grid>

            <Grid item xs={3}>
              <PeopleDrawer
                getContacts={fetchAvailability}
                validParticipants={validParticipants}
                invalidParticipants={invalidParticipants}
                selectedParticipants={selectedParticipants}
                setSelectedParticipants={setSelectedParticipants}
              />
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
}
