import NetInfo from "@react-native-community/netinfo";
import { useEffect, useState } from "react";
import  Login  from "./src/pages/login/Login";

//===============COMPONENT==================
export default function App() {
  const [ir, setIr] = useState(false);

  useEffect(() => {
    async function checkConex() {
      // const isInternetReachable = (await NetInfo.fetch()).isInternetReachable
      setIr((await NetInfo.fetch()).isInternetReachable);
    }
    checkConex();
  }, []);

  //----------------render--------------------
  return (
      <Login />
  );
}