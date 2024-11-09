import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { useMapContext } from "./MapContext";
import { Location } from "../types/type";

type Props = {
  data?: Location[];
};

export default function LocationList({ data }: Props) {
  const {
    setCarPosition,
    setRotation,
    setDisplayPathOnMap,
    displayPathOnMap,
    setRoutePoints,
  } = useMapContext();

  const [showAnimation, setShowAnimation] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const play = () => {
    setShowAnimation((pre) => !pre);
  };

  const showUserPath = () => {
    setDisplayPathOnMap(!displayPathOnMap);
    setRoutePoints?.(data);
  };

  const updatePositionAndRotation = useCallback(
    (prevIndex: number, nextIndex: number) => {
      if (!data) return;
      const nextPosition = data[nextIndex];
      const newRotation = calculateRotationAngle(data[prevIndex], nextPosition);

      setCarPosition(nextPosition);
      setRotation(newRotation);
      return nextIndex;
    },
    [data, setCarPosition, setRotation]
  );

  useEffect(() => {
    setRoutePoints?.(data);

    if (data) {
      setCurrentIndex(0);
      setCarPosition(data[0]);
    }
  }, [data, updatePositionAndRotation, setRoutePoints, setCarPosition]);

  useEffect(() => {
    if (!showAnimation || !data) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % data.length;
        return updatePositionAndRotation(prevIndex, nextIndex) ?? 0;
      });
    }, 1000);

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, [
    showAnimation,
    updatePositionAndRotation,
    setRoutePoints,
    data,
    setCarPosition,
  ]);

  useEffect(() => {
    if (itemRefs.current[currentIndex]) {
      itemRefs.current[currentIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [currentIndex]);

  const onItemClick = (i: number) => {
    setShowAnimation(false);
    setCurrentIndex(i);
    if (data) {
      const location = data[i];
      setCarPosition(location);
      if (i > 0) {
        const newRotation = calculateRotationAngle(data[i - 1], location);
        setRotation(newRotation);
      }
    }
  };

  const showData = () => {
    if (data == undefined) {
      return null;
    }

    if (data?.length == 0) {
      <p>هیچ دیتایی برای نمایش وجود ندارد</p>;
    }

    return (
      <div className="flex flex-col flex-grow overflow-hidden max-h-full">
        <Button variant={"outline"} onClick={play}>
          {showAnimation ? "توقف" : "حرکت"}
        </Button>
        <Button className="mt-2" variant={"outline"} onClick={showUserPath}>
          {displayPathOnMap ? "عدم نمایش مسیر روی نقشه" : "نمایش مسیر روی نقشه"}
        </Button>

        <div className="flex-grow overflow-auto ">
          {data?.map((it, i) => {
            const current = currentIndex == i ? "bg-green-300" : "";
            return (
              <div
                className={`cursor-pointer border rounded my-1 p-2 ${current}`}
                key={i}
                ref={(el) => (itemRefs.current[i] = el)}
                onClick={() => onItemClick(i)}
              >
                <p>زمان</p>
                <p>طول : {it[0]}</p>
                <p>عرض : {it[1]}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  if (!data) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2 flex-grow  overflow-hidden h-full">
      {showData()}
    </div>
  );
}

function calculateRotationAngle(
  [lat1, lng1]: [number, number],
  [lat2, lng2]: [number, number]
) {
  const radianAngle = Math.atan2(lat2 - lat1, lng2 - lng1);
  return (radianAngle * 180) / Math.PI; // Convert radians to degrees
}
