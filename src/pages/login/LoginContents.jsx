import { Text, View, TextInput, Button } from "react-native";
import { useForm, Controller } from "react-hook-form";
import Display from "../display/Display";
import { useState } from "react";

//=================COMPONENT==================
export default function LoginContents() {
  const [auth, setAuth] = useState(false);

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

  const onSubmit = () => {
    console.log("submitted");
    setAuth(true);
  };

  //----------------------render--------------------
  return (
    <View
      style={{
        height: "100%",
        marginTop: 40,
        backgroundColor: "lightblue",
      }}
    >
      {auth ? (
        <Display />
      ) : (
        <View
          //Screen of the loging form
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              marginTop: 50,
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
