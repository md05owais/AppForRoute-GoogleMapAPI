import React, { useRef, useState } from "react";

import Icon from "../assets/Icon.svg";
import "./Body.css";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";

const center = { lat: 28.70406, lng: 77.102493 };

const Body = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_MAP_KEY,
    libraries: [process.env.REACT_APP_PLACE],
  });

  const [directionResponce, setDirectionReponce] = useState(null);
  const [distance, setDistance] = useState("");
  const [orignVal, setOriginVal] = useState("");
  const [destVal, setDestVal] = useState("");
  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef();
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destinationRef = useRef();

  //eslint-disable-next-line no-unused-vars
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));

  if (!isLoaded) {
    return <h1>Loading...</h1>;
  }

  async function calculateRoute() {
    if (originRef.current.value === "" || destinationRef.current.value === "") {
      return;
    }
    //eslint-disable-next-line no-undef
    const dirrectionSurvice = new google.maps.DirectionsService();
    setOriginVal(originRef.current.value);
    setDestVal(destinationRef.current.value);
    const results = await dirrectionSurvice.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      //eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });

    setDirectionReponce(results);

    setDistance(results.routes[0].legs[0].distance.value);
  }

  return (
    <div className="body">
      <p className="title">
        Let's calculate <b>distance</b> from Google maps
      </p>
      <div className="mainFunction">
        <div className="inputField">
          <div className="placeholderValue">origin</div>
          <div className="input">
            <img src={Icon} className="Image image1" alt="🔍" />
            <Autocomplete>
              <input type="text" ref={originRef} />
            </Autocomplete>
          </div>

          <button onClick={calculateRoute}>calculate</button>

          <div className="placeholderValue">destination</div>
          <div className="input">
            <img src={Icon} className="Image" alt="🔍" />
            <Autocomplete>
              <input type="text" ref={destinationRef} />
            </Autocomplete>
          </div>

          <div className="distance">
            <div className="calculateDist">
              <div className="nameDist">distance</div>
              <div className="distVal">{distance / 1000}</div>
            </div>
            <div className="distanceOriginDest">
              <div className="p">
                The distance between <b>{orignVal}</b> and <b>{destVal}</b> is{" "}
                <b>{distance / 1000} kms.</b>
              </div>
            </div>
          </div>
        </div>

        <div className="googleMap">
          <GoogleMap
            zoom={15}
            center={center}
            mapContainerStyle={{
              width: "100%",
              height: "100%",
            }}
            options={{
              zoomControl: false,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
            }}
            onLoad={(map) => setMap(map)}
          >
            <Marker position={center} />
            {directionResponce && (
              <DirectionsRenderer directions={directionResponce} />
            )}
          </GoogleMap>
        </div>
      </div>
    </div>
  );
};

export default Body;
