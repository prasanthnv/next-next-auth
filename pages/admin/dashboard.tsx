import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import React from "react";
interface Props {
  loggedSession: Session;
}
export default function Dashboard({ loggedSession }: Props) {
  console.log(loggedSession);
  return (
    <div>
      <div>Dashboard for only for logged in user !!</div>
      <label htmlFor="">Logged User = {loggedSession?.user?.name}</label>
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const userSession = await getSession(context);
  if (!userSession) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: {},
    };
  }
  return {
    props: {
      loggedSession: userSession,
    },
  };
}
