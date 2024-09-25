import axios from "axios";

export const fetcher = (url) =>
  axios
    .get(url, {
      headers: {
        "X-Authorization": "RGVlcGFrS3-VzaHdhaGE5Mzk5MzY5ODU0-QWxoblBvb2ph",
        Authorization:
          localStorage.getItem("token") ||
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzI1OTg0MDc3LCJleHAiOjE3NTc1NDE2Nzd9.kaaecHOziQQLnp-TfepV32Y4z9awmXaag9xNIZHbsJc",
      },
    })
    .then((res) => res.data);
