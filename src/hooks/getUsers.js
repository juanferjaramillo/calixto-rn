import axios from "axios";

export default async function getUsers() {
  async function gu() {
    try {
      console.log("getUsers6 - pidiendo usuarios");
      const allUsr = (await axios("http://192.168.1.184:3003/everyuser/")).data;
      return allUsr;
    } catch (error) {
      console.log(error.message);
    }
  }
  const usrs = await gu();
  return usrs;

}
