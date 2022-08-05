import { getRDFasJson } from "./fetchHelper";
const rdfParser = require("rdf-parse").default;

export async function fetchParticipantWebIDs(
  employeesUrl,
  participants,
  fetch
) {
  const frame = {
    "@context": {
      "@vocab": "http://schema.org/",
    },
    employee: {},
  };

  const result = await getRDFasJson(employeesUrl, frame, fetch);
  const ids = result.employee.map((a) => a["@id"]);

  ids.forEach((id) => {
    participants[id] = {};
    console.log(participants[id]);
  });

  console.log(participants);
}
