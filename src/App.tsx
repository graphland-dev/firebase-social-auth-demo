import {
  GoogleAuthProvider,
  User,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "./filebase";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>();
  const [token, setToken] = useState<string | null>();

  const handleSocialLogin = (provider: "google" | "apple") => {
    if (provider === "google") {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider).then(async (res) => {
        const token = await res.user.getIdToken();
        console.log(token);
      });
    }
  };

  const handleLogout = () => {
    if (confirm("Sure to logout?")) {
      signOut(auth).finally(() => {
        setUser(null);
      });
    }
  };

  useEffect(() => {
    setLoading(true);
    onAuthStateChanged(auth, async (user) => {
      setLoading(false);
      if (user) {
        const token = await user.getIdToken();
        setUser(user);
        setToken(token);
      }
    });
  }, []);

  if (loading) return <h1>Loading....</h1>;

  if (user)
    return (
      <div>
        <pre>{JSON.stringify(user, null, 2)}</pre>
        <textarea
          value={token || ""}
          style={{ width: "100%", height: 150, padding: "0 10px" }}
        ></textarea>
        <button onClick={() => handleLogout()}>Signout</button>
      </div>
    );

  return (
    <div>
      <h1>Firebase Social Auth</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 15,
          alignItems: "flex-start",
        }}
      >
        <button onClick={() => handleSocialLogin("google")}>Google</button>
        {/* <button onClick={() => handleSocialLogin("apple")}>Apple</button> */}
      </div>
    </div>
  );
};

export default App;
