import { motion } from "motion/react";
import WorldMap from "./ui/world-map";
import NoiseBackgroundDemo from "./noise-background-demo";
 export default function World() {
  return (
    <div className=" py-15 md:py-4 dark:bg-black bg-white w-full">
      <div className="max-w-7xl mx-auto text-center">
        <p className="font-bold text-xl md:text-4xl dark:text-white text-black">
          Remote{" "}
          <span className="text-neutral-400">
            {"Connectivity".split("").map((word, idx) => (
              <motion.span
                key={idx}
                className="inline-block"
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.04 }}
              >
                {word}
              </motion.span>
            ))}
          </span>
        </p>
        <p className="text-sm md:text-lg text-neutral-500 max-w-2xl mx-auto py-4">
        Leave old-school messaging behind.
Connect instantly from wherever you are  your home, a café, or across continents.
Designed for modern nomads and explorers.
        </p>
      </div>
      <WorldMap
        dots={[
          {
            start: {
              lat: 64.2008,
              lng: -149.4937,
            }, // Alaska (Fairbanks)
            end: {
              lat: 34.0522,
              lng: -118.2437,
            }, // Los Angeles
          },
          {
            start: { lat: 64.2008, lng: -149.4937 }, // Alaska (Fairbanks)
            end: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
          },
          {
            start: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
            end: { lat: 38.7223, lng: -9.1393 }, // Lisbon
          },
          {
            start: { lat: 51.5074, lng: -0.1278 }, // London
            end: { lat: 28.6139, lng: 77.209 }, // New Delhi
          },
          {
            start: { lat: 28.6139, lng: 77.209 }, // New Delhi
            end: { lat: 43.1332, lng: 131.9113 }, // Vladivostok
          },
          {
            start: { lat: 28.6139, lng: 77.209 }, // New Delhi
            end: { lat: -1.2921, lng: 36.8219 }, // Nairobi
          },
          {
  start: { lat: 28.6139, lng: 77.209 }, // New Delhi
  end: { lat: 19.0760, lng: 72.8777 }, // Mumbai
},
{
  start: { lat: 28.6139, lng: 77.209 }, // New Delhi
  end: { lat: 35.6762, lng: 139.6503 }, // Tokyo
},
{
  start: { lat: 28.6139, lng: 77.209 }, // New Delhi
  end: { lat: 51.1657, lng: 10.4515 }, // Germany (center)
},
        ]}
      />
    
        <NoiseBackgroundDemo/>
     
    </div>
  );
}