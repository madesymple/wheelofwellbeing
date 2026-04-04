import React from "react";
import { WorldMap } from "./ui/world-map";
import Checks from "./cards/checks";
import { WorldMapAvatarsData, WorldMapDotsData } from "@/lib/data";
import AnimatedCounter from "./AnimatedCounter";

const MapSection = (): JSX.Element => {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-4/5 mt-10 md:mt-24">
        <WorldMap dots={WorldMapDotsData} avatars={WorldMapAvatarsData} />

        <div className="grid place-items-center gap-3 font-normal my-16">
          {/* <h1 className="text-4xl text-brand font-bold">23,000+</h1> */}
          <h1 className="text-4xl text-brand font-bold">
            <AnimatedCounter from={1000} to={23000} />+
          </h1>
          <p className="text-neutral-600 text-base">
            Happy customers worldwide
          </p>
        </div>

        <div className="my-10">
          <Checks />
        </div>
      </div>
    </div>
  );
};

export default MapSection;
