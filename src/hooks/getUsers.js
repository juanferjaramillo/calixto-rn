import axios from "axios";

export default async function getUsers() {
  async function gu() {
    try {
      console.log("pidiendo usuarios");
      const AllUsr = await axios("http://192.168.1.184:3003/everyuser/");
      console.log(AllUsr);
      return AllUsr;
    } catch (error) {
      console.log(error.message);
    }
  }
  await gu();
}
