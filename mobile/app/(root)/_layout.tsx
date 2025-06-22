import { useUser } from "@clerk/clerk-expo";
import { Redirect, Stack } from "expo-router";

export default function ProtectedLayout() {
  const { isSignedIn } = useUser();
  // auth check and redirect
  if (!isSignedIn) return <Redirect href={"/sign-in"} />;

  return (
    <Stack screenOptions={{ headerShown: false, statusBarStyle: "dark" }} />
  );
}
