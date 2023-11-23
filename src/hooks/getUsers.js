import axios from "axios";
import {SERVER_URL} from "@env";

export default async function getUsers() {
  async function gu() {
    try {
      console.log("getUsers6 - pidiendo usuarios");
      const allUsr = (await axios(`${SERVER_URL}/everyuser/`)).data;
      return allUsr;
    } catch (error) {
      console.log(error.message);
    }
  }
  const usrs = await gu();
  return usrs;

}
