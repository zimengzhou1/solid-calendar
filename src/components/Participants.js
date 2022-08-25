import React, { useState } from "react";
import PeopleDrawer from "../components/PeopleDrawer";
import { useSession } from "@inrupt/solid-ui-react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import {
  fetchParticipantWebIDs,
  fetchDataOfParticipants,
} from "../utils/participantsHelper";
import {
  downloadAvailabilityCalendar,
  downloadVacationCalendar,
} from "../utils/calendarHelper";

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

export default function Participants() {
  const { session } = useSession();
  const solidFetch = session.fetch;

  const [validParticipants, setValidParticipants] = useState([]);
  const [invalidParticipants, setInvalidParticipants] = useState([]);
  const [invalidToggle, setInvalidToggle] = useState(false);
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

  const downloadCalendars = async (webid) => {
    console.log("Downloading calendars!");
    try {
      if (
        participants[webid].availabilityCalendar.status === "not-downloaded"
      ) {
        await downloadAvailabilityCalendar(webid, participants, solidFetch);
      }
    } catch (e) {
      console.log(e);
    }

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
  };

  return (
    <>
      {session.info.isLoggedIn && (
        <Box>
          <Stack
            spacing={2}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Button variant="outlined">Find availability</Button>
            <Button variant="outlined">Show vacation days</Button>
          </Stack>

          <PeopleDrawer
            getContacts={fetchAvailability}
            validParticipants={validParticipants}
            invalidParticipants={invalidParticipants}
            selectedParticipants={selectedParticipants}
            setSelectedParticipants={setSelectedParticipants}
          />
        </Box>
      )}
    </>
  );
}
