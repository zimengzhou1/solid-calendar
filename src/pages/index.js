import Head from "next/head";
import { useEffect, useState } from "react";
import { useSession } from "@inrupt/solid-ui-react";
import Participants from "../components/Participants";

export default function Home() {
  const { session } = useSession();
  const [currentUrl, setCurrentUrl] = useState("https://localhost:3000");

  if (session.info.isLoggedIn) {
    console.log(session);

    //console.log(myobj.profile);
  }

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, [setCurrentUrl]);

  return (
    <div>
      <Head>
        <title>Solid Calendar</title>
        <meta name="description" content="Calendar using solid protocol" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Welcome to Solid Calendar!</h1>
        <Participants />
      </main>
    </div>
  );
}
