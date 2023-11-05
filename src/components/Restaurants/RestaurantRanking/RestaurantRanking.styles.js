import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  content: {
    marginVertical: 10,
    marginHorizontal: 15,
    backgroundColor: "#fff"
  },
  image: {
    width: "100%",
    height: 150,
  },
  infoContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleName: {
    fontSize: 18,
    fontWeight: "bold"
  },
  description: {
    color: "#828282",
    fontSize: 12,
    paddingHorizontal: 25,
    paddingTop: 5,
    paddingBottom: 15
  },
  nameContent: {
   flexDirection: "row",
   alignItems: "center" 
  },
  iconMedal: {
    marginRight: 5
  },
});
