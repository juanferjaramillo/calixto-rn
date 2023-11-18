import { Text, View, TextInput, Button } from "react-native";
import { useForm, Controller } from "react-hook-form";
import Display from "../display/Display";
import { useState } from "react";

export default function LoginContents() {
  const [auth, setAuth] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
    },
  });
  const onSubmit = () => {
    console.log("submitted");
    setAuth(true);
  };

  return (
    <>
      {auth ? (
        <Display />
      ) : (
        <View style={{ marginTop: 50 }}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="First name"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="firstName"
          />
          {errors.firstName && (
            <Text style={{ color: "red" }}>😯👆🏻 This is required.</Text>
          )}

          <Controller
            control={control}
            rules={{
              maxLength: 100,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Last name"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="lastName"
          />

          <Button title="Submit" onPress={handleSubmit(onSubmit)} />
        </View>
      )}
    </>
  );
}
