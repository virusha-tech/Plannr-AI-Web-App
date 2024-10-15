import { useEffect } from "react";
import axios from "axios";

const TravelRecomendations = ({ inputs }) => {
  //   // console.log(props);
  const [{ value: Destination }] = inputs;
  // console.log(Destination);

  useEffect(() => {

    const options = {
      method: "GET",
      url: "https://skyscanner50.p.rapidapi.com/api/v1/searchAirport",
      params: { query: "london" },
      headers: {
        "X-RapidAPI-Key": "48595c0b43msh693580d29aa597fp1dc724jsn7e6e83c5ba4b",
        "X-RapidAPI-Host": "skyscanner50.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        // console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);
  return <span>Okay...</span>;
};
export default TravelRecomendations;
