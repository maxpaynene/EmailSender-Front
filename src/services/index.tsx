import axios from "axios";

export const sendEmail = async (data: any) => {
  console.log("sendEmail..");
  var instanceFormData = new FormData();
  instanceFormData.append("Name", data?.name);
  instanceFormData.append("Rut", data?.rut);
  instanceFormData.append("Email", data?.email);
  instanceFormData.append("PdfFile", data.file);
  console.log("Execute Axios");
  await axios
    .post("https://localhost:7139/api/email-sender", instanceFormData)
    .then((response) => {
      console.log("something...?");
      console.log(response);
    })
    .catch((error) => {
      console.log("Error...");
      console.log(error);
    });
};
