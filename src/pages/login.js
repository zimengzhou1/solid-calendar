import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession, LoginButton } from "@inrupt/solid-ui-react";

const providers = [
  { title: "Inrupt Pod Spaces", url: "https://broker.pod.inrupt.com/" },
  { title: "inrupt.net", url: "https://inrupt.net/" },
  { title: "solidcommunity.net", url: "https://solidcommunity.net/" },
  { title: "Solid Web", url: "https://solidweb.org/" },
  { title: "Trinpod", url: "https://trinpod.us/" },
];

export default function Login() {
  const router = useRouter();
  const [currentUrl, setCurrentUrl] = useState("https://localhost:3000");
  const [provider, setProvider] = useState("");

  useEffect(() => {
    setCurrentUrl(window.location.origin);
    console.log(window.location.origin);
  }, [setCurrentUrl]);

  const onSubmitProvider = (e) => {
    e.preventDefault();
    console.log(provider);
    try {
      session.login({
        oidcIssuer: provider,
        clientName: "Solid Calendar",
        redirectUrl: window.location.href,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <LoginButton
        authOptions={{ clientName: "solid calendar" }}
        oidcIssuer={"https://solidcommunity.net/"}
        redirectUrl={currentUrl}
        onError={console.error}
      ></LoginButton>
      <header>
        <div>
          <div>
            <form onSubmit={onSubmitProvider}>
              <h3>Sign In</h3>
              <h3>Select or enter your pod provider</h3>
              <div>
                <div>
                  <input
                    name="provider"
                    type="text"
                    placeholder="Pod Provider"
                    value={provider}
                    onChange={(e) => setProvider(e.target.value)}
                  />
                </div>
                <div>
                  <input type="submit" value="Login" />
                </div>
              </div>
            </form>
          </div>
        </div>
        <button
          onClick={() => {
            // session.logout();
            // logout();
            console.log("got here");
            const mylogout = async () => {
              console.log(
                "Current sesh is loggedin: ",
                session.info.isLoggedIn
              );
              await logout();
              await session.logout();
              console.log("After logout", session.info.isLoggedIn);
            };
            mylogout();
          }}
        >
          👋 Logout
        </button>
      </header>
    </div>
  );
}
