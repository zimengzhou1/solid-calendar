import React, { useState, useEffect } from "react";
import { useSession } from "@inrupt/solid-ui-react";
import { fetchParticipantWebIDs } from "../utils/participantsHelper";

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

  useEffect(() => {
    const getParticipantWebID = async () => {
      await fetchParticipantWebIDs(employeesUrl, participants, solidFetch);
    };
    getParticipantWebID();
    console.log("once");
  });

  return <>{session.info.isLoggedIn && <h2>Logged in!</h2>}</>;
}
