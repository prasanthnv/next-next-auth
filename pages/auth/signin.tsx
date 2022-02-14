import { AppProviders } from "next-auth/providers";
import {
  getCsrfToken,
  getProviders,
  getSession,
  signIn,
} from "next-auth/react";
import { FormEvent } from "react";

interface SignInProps {
  providers?: AppProviders;
  csrfToken: any;
}

export default function SignIn({ providers, csrfToken }: SignInProps) {
  const signInWithGit = () => {
    signIn("github", {
      redirect: false,
      callbackUrl: `${window.location.origin}/`,
    });
  };
  const signInEmail = (e: FormEvent) => {
    e.preventDefault();
    signIn("credentials", {
      email: "prasanth@gmail.com",
      password: "1Barcelona",
      redirect: true,
      callbackUrl: `${window.location.origin}/`,
    });
  };
  return (
    <div>
      <form method="post" action="/api/auth/callback/credentials">
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <label>
          Email
          <input name="email" type="text" />
        </label>
        <label>
          Password
          <input name="password" type="password" />
        </label>
        <button type="submit" onClick={signInEmail}>
          Sign in
        </button>
      </form>
      <button type="button" onClick={signInWithGit}>
        Sign in with GitHub
      </button>
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const csrfToken = await getCsrfToken(context);
  return {
    props: { csrfToken },
  };
}
