import type { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
const Home: NextPage = () => {
  const { data: session } = useSession();
  const user = session?.user;
  console.log(session);
  return (
    <div>
      {!user && (
        <button
          onClick={() => {
            signIn();
          }}
        >
          Sign in with github
        </button>
      )}

      {user && (
        <div>
          <img width="50" src={user?.image || ""} alt="db" />
          <label>{user?.name}</label>
          <button
            onClick={() => {
              signOut();
            }}
          >
            Signout
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
