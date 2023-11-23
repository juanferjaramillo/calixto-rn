import { Text, View, TextInput, Button } from "react-native";
import { useForm, Controller } from "react-hook-form";
import Display from "../display/Display";
import { useEffect, useState } from "react";
import cache from "../../utility/cache";
import { useStore } from "../../globalStore/useStore";
import axios from "axios";
import {SERVER_URL} from "@env";

//=================COMPONENT==================
export default function LoginContents() {
  const [auth, setAuth] = useState(1);
  //0: clave errada, 1:usuario no existe, 2:permitido
  const [usr, setUsr] = useState([]);

  const setUserLogin = useStore((state) => state.setUserLogin);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      identificacion: "",
      clave: "",
    },
  });

  // useEffect(() => {
  //   async function gu() {
  //     //get users
  //     const users = await cache.getAll("user");
  //     setUsr(users);
  //     //users is an array of objects. {id, name, ownerId password, isActive}
  //   }
  //   gu();
  // }, []);

  const onSubmit = async(data) => {
    async function gfa() {
      // console.log("en gfa");
      //get from API
      const allUsr = (await axios(`${SERVER_URL}/everyuser/`)).data;
      allUsr?.map(async (usr, i) => await cache.storeUsers(i, usr));
      return allUsr
    }
    async function gu() {
      //get users
      const users = await cache.getAll("user");
      setUsr(users);
      //users is an array of objects. {id, name, ownerId password, isActive}
      return users;
    }
    try {
      await gfa();
    } catch (error) {
      console.log(error.message);
    }
   const users = await gu()
    // console.log("data", data.identificacion, data.clave);
    // console.log("u;",users.length);
    for (let i = 0; i < users.length; i++) {
      if (
        users[i].id.toString().trim() === data.identificacion.toString().trim()
      ) {
        console.log("user found");
        setAuth(0);
        if (users[i].password.toString() === data.clave.toString()) {
          console.log("LoginContents 36 -ingreso permitido");
          setUserLogin(data.identificacion.toString().trim());
          setAuth(2);
        } else {
          // console.log("Clave errada");
          setAuth(0);
        }
        i = users.length;
      } else {
        setAuth(1);
      }
    }
    if (auth === 0) {
      console.log("clave errada");
    }
    if (auth === 1) {
      console.log("LoginContents62-usuario no encontrado");
    }
  };

  //----------------------render--------------------
  return (
    <View
      style={{
        backgroundColor: "lightblue",
      }}
    >
      {auth === 2 ? (
        <Display />
      ) : (
        <View
          //Screen of the loging form
          style={{
            display: "flex",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              marginTop: 90,
            }}
          >
            Bienvenido a Calixto
          </Text>

          <View
            //frame of the loging form
            style={{
              borderWidth: 1,
              borderRadius: 15,
              borderColor: "darkblue",
              backgroundColor: "lightgrey",
              width: "80%",
              marginTop: 80,
              marginBottom: 50,
              padding: 40,
            }}
          >
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Identificacion"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  backgroundColor={"white"}
                  color={"black"}
                />
              )}
              name="identificacion"
            />
            {errors.identificacion && (
              <Text style={{ color: "red" }}>😯👆🏻 Ingresa tu ID</Text>
            )}

            <Controller
              control={control}
              rules={{
                maxLength: 100,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Clave"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  backgroundColor={"white"}
                  color={"black"}
                  marginTop={20}
                  marginBottom={20}
                />
              )}
              name="clave"
            />

            <Button title="Submit" onPress={handleSubmit(onSubmit)} />
          </View>
        </View>
      )}
    </View>
  );
}
