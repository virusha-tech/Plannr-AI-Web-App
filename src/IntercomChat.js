import { useEffect } from "react";

function IntercomChat() {
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("profile"));

    window.gist.identify({
      email: user.email,
      name: user.fname,
    });

    // window.Intercom("boot", {
    //   app_id: "khgmeat8",
    //   name: user.fname,
    //   email: user.email,
    // });

    return () => {
      // window.Intercom("shutdown");
      window.gist.chat('shutdown');

    };
  }, []);

  return null;
}

export default IntercomChat;
