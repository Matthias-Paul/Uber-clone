import "./global.css";
import { Redirect } from "expo-router";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

const Index = () => {
  const loginUser = useSelector(
    (state: RootState) => state.auth?.loginUser ?? null
  );

  console.log("loginUser state:", loginUser);

  if (loginUser) {
    return <Redirect href="/(root)/(tabs)/home" />;
  }

  return <Redirect href="/(auth)/welcome" />;
};

export default Index;
