import React, { useState, useEffect } from "react";
import { useSession } from "@inrupt/solid-ui-react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import {
  fetchParticipantWebIDs,
  fetchDataOfParticipants,
} from "../utils/participantsHelper";

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

  // On load retrieve list of webIDs
  useEffect(() => {
    (async () => {
      await fetchParticipantWebIDs(employeesUrl, participants, solidFetch);
      console.log("All participants' WebIDs fetched (without data).");
      await fetchDataOfParticipants(
        participants,
        solidFetch,
        setValidParticipants,
        setInvalidParticipants
      );
    })();
  }, []);

  return (
    <>
      {session.info.isLoggedIn && (
        <>
          <h3>Select participants:</h3>
          <FormGroup>
            {validParticipants.map((item) => (
              <FormControlLabel
                sx={{ margin: -1 }}
                control={<Checkbox />}
                label={item.id}
                key={item.id}
              />
            ))}
          </FormGroup>
          <div style={{ display: "inline-block" }}>
            <h3>Invalid participants: {invalidParticipants.length}</h3>
          </div>
          <div style={{ display: "inline-block", padding: 4 }}>
            {invalidToggle ? (
              <Button
                onClick={() => setInvalidToggle(false)}
                size="small"
                variant="outlined"
              >
                Hide
              </Button>
            ) : (
              <Button
                onClick={() => setInvalidToggle(true)}
                size="small"
                variant="outlined"
              >
                Show
              </Button>
            )}
          </div>
          {invalidToggle && (
            <FormGroup>
              {invalidParticipants.map((item) => (
                <FormControlLabel
                  disabled
                  sx={{ margin: -1 }}
                  control={<Checkbox />}
                  label={item.id + item.error}
                  key={item.id}
                />
              ))}
            </FormGroup>
          )}
        </>
      )}
    </>
  );
}