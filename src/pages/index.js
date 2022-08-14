import Head from "next/head";
import { useEffect, useState } from "react";
import { useSession } from "@inrupt/solid-ui-react";
import Participants from "../components/Participants";
import { getPersonName } from "../utils/participantsHelper";
import { getRDFasJson } from "../utils/fetchHelper";

export default function Home() {
  const { session } = useSession();
  const [name, setName] = useState("");

  if (session.info.isLoggedIn) {
    console.log(session);
  }

  useEffect(() => {
    const webID = session.info.webId;
    if (webID !== undefined) {
      const frame = {
        "@context": {
          "@vocab": "http://xmlns.com/foaf/0.1/",
          knows: "https://data.knows.idlab.ugent.be/person/office/#",
          schema: "http://schema.org/",
        },
        "@id": webID,
      };

      const result = (async () => {
        await getRDFasJson(webID, frame, fetch);
      })();
      setName(getPersonName(result) || webID);
    }
  }, [session.info.webId]);

  return (
    <div>
      <Head>
        <title>Solid Calendar</title>
        <meta name="description" content="Calendar using solid protocol" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {session.info.isLoggedIn ? (
          <p>Welcome {name}</p>
        ) : (
          <p>Not logged in!</p>
        )}
        <Participants />
      </main>
    </div>
  );
}
