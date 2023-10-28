import { ScrollView } from "react-native";
import { styles } from "./AddRestaurantScreen.styles";
import { InfoForm } from "../../../components/Restaurants/AddRestaurant/InfoForm";
import { Button } from "react-native-elements";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./AddRestaurantScreen.data";
import { UploadImageForm } from "../../../components/Restaurants/AddRestaurant/UploadImageForm";
import { ImageRestaurant } from "../../../components/Restaurants/AddRestaurant/ImageRestaurant";
import uuid from "react-native-uuid";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../utils/firebase";
import { useNavigation } from "@react-navigation/native";

export function AddRestaurantScreen() {
  const navigation = useNavigation();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      const newData = formValue;
      newData.id = uuid.v4();
      newData.createAt = new Date();

      const database = doc(db, "restaurants", newData.id); //base de firesabe
      await setDoc(database, newData);  // agregamos un nuevo restaurante
      navigation.goBack();
    },
  });
  return (
    <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
      <ImageRestaurant formik={formik} />

      <InfoForm formik={formik} />

      <UploadImageForm formik={formik} />

      <Button
        title="Crear restaurante"
        buttonStyle={styles.addRestaurant}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />

      <Button onPress={() => navigation.goBack()}>
        
      </Button>
    </ScrollView>
  );
}
