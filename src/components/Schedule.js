import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import PeopleDrawer from "../components/PeopleDrawer";
import { useSession } from "@inrupt/solid-ui-react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import CustomTimePicker from "./TimePicker";
import CustomCalendar from "./CustomCalendar";
import { intersect } from "../utils/dates";
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
  const [availableEvents, setAvailableEvents] = useState([]);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  const fetchContacts = async () => {
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

  const clickEvent = (e) => {
    let { start, end } = e;
    setStartTime(start);
    setEndTime(end);
  };

  const createEvents = (slots) => {
    let events = [];
    for (let e of slots) {
      events.push({
        title: "Available",
        start: new Date(e["startDate"]),
        end: new Date(e["endDate"]),
      });
    }
    setAvailableEvents(events);
  };

  const showAvailability = async () => {
    console.log("Downloading calendars!");
    const calendars = [];
    let error = undefined;

    for (let webid of selectedParticipants) {
      // Download calendar
      try {
        if (
          participants[webid].availabilityCalendar.status === "not-downloaded"
        ) {
          await downloadAvailabilityCalendar(webid, participants, solidFetch);
        }
      } catch (e) {
        console.log(e);
      }

      // Download vacation
      try {
        let vacationStatus = participants[webid].vacationCalendar.status;
        if (
          vacationStatus === "not-downloaded" &&
          vacationStatus !== "download-failed"
        ) {
          await downloadVacationCalendar(webid, participants, solidFetch);
        }
      } catch (e) {
        console.log("Could not download vacation calendar.");
      }

      if (
        participants[webid].availabilityCalendar.status === "download-failed"
      ) {
        error = participants[webid].availabilityCalendar.error;
        break;
      }

      calendars.push(participants[webid].availabilityCalendar.data);
    }

    let slots = undefined;

    if (!error) {
      if (calendars.length > 1) {
        slots = intersect(...calendars);
      } else {
        slots = calendars[0];
      }
      createEvents(slots);
    } else {
      console.log("download error: ", e);
    }
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
                <Button
                  variant="outlined"
                  onClick={(e) => {
                    showAvailability();
                  }}
                >
                  Find availability
                </Button>
                <Button variant="outlined">Show vacation days</Button>
              </Stack>
              <Box sx={{ height: "60%" }}>
                <CustomCalendar
                  availableEvents={availableEvents}
                  clickEvent={clickEvent}
                />
              </Box>
              <Box sx={{ m: 5 }} />
              <CustomTimePicker
                startTime={startTime}
                setStartTime={setStartTime}
                endTime={endTime}
                setEndTime={setEndTime}
              />
              <Box sx={{ m: 5 }} />
            </Grid>

            <Grid item xs={3}>
              <PeopleDrawer
                getContacts={fetchContacts}
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
