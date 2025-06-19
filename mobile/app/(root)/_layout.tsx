import { useUser } from "@clerk/clerk-expo";
import { Redirect, Stack } from "expo-router";

export default function ProtectedLayout() {
  const { isSignedIn } = useUser();

  if (!isSignedIn) return <Redirect href={"/sign-in"} />;

  return <Stack screenOptions={{ headerShown: false }} />;
}
