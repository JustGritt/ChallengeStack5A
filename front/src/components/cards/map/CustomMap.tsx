"use client";

import React, { FC, useMemo, useState } from "react";
import Map, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
} from "react-map-gl";
import type { CircleLayer } from "react-map-gl";
import type { FeatureCollection } from "geojson";
import { CITIES } from "@/lib/constants/fakeDatas";
import { Company } from "@/redux/types/Companies";
import Pin from "./Pin";

type ViewportProps = {
  latitude: number;
  longitude: number;
  zoom: number;
};

type CustomMapProps = {
  callBackMarker: (company: Company) => void;
};

const CustomMap: FC<CustomMapProps> = ({ callBackMarker }) => {
  const [cityInfo, setCityInfo] = useState<Company | undefined>();
  const [viewPort, setViewPort] = useState<ViewportProps>({
    longitude: 2.352,
    latitude: 48.8567,
    zoom: 14,
  });

  const pins = useMemo(
    () =>
      CITIES.map((city, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={city.longitude}
          latitude={city.latitude}
          anchor="bottom"
          onClick={(e) => {
            // If we let the click event propagates to the map, it will immediately close the popup
            // with `closeOnClick: true`
            callBackMarker(city);
            e.originalEvent.stopPropagation();
            setCityInfo(city);
          }}
        >
          <Pin color={cityInfo?.name === city.name ? "#e1edff" : undefined} />
        </Marker>
      )),
    [cityInfo?.name, callBackMarker]
  );

  return (
    <aside className="bg-black sm:bottom-auto bottom-6 w-full flex-[.7] sticky sm:relative">
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_KEY}
        initialViewState={viewPort}
        onMove={(e) => {
          setViewPort({
            longitude: e.viewState.longitude,
            latitude: e.viewState.latitude,
            zoom: e.viewState.zoom,
          });
          console.log(e.viewState);
        }}
        cursor="grab"
        scrollZoom={false}
        // styles white
        mapStyle="mapbox://styles/mapbox/light-v10"
        style={{ width: "100%", height: "100%" }}
      >
        <GeolocateControl position="top-left" />
        <FullscreenControl position="top-left" />
        <NavigationControl position="top-left" />
        {pins}
      </Map>
    </aside>
  );
};

export default CustomMap;
