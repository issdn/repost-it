import { SignedIn, SignedOut } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";
import { useLocales } from "expo-localization";
import localizedFormat from "dayjs/plugin/localizedFormat";
import dayjs from "dayjs";
dayjs.extend(localizedFormat);

export default () => {
  const { regionCode } = useLocales()[0];
  dayjs.locale(regionCode?.toLowerCase() || "us");

  return (
    <>
      <SignedIn>
        <Redirect href="videos" />
      </SignedIn>
      <SignedOut>
        <Redirect href="auth" />
      </SignedOut>
    </>
  );
};
