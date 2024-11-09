import DatePicker from "react-multi-date-picker";
import persian_fa from "react-date-object/locales/persian_fa";
import persian from "react-date-object/calendars/persian";
import TimePicker from "react-multi-date-picker/plugins/time_picker";

import { useState } from "react";
import { SelectWithSearch } from "../SelectWithSuggestion";
import { users } from "@/services/mockData";
import { Button } from "../ui/button";
import LocationList from "./LocationList";
import { LEC, Location } from "../types/type";
import { getLocationByIdAndPeriod } from "@/services/location";
import { useMapContext } from "./MapContext";

const pleaseChoiceADate = "لطفا تاریخ را انتخاب کنید";

export default function LocationForm() {
  const [{ loading, error, data }, setLEC] = useState<LEC<Location[]>>({
    loading: false,
  });
  /*  const [formStyle, setFormStyle] = useState({
    show: false,
    // style: "md:gap-2 min-w-72 p-2 md:p-4",
    style: "w-0",
  }); */
  const [fromDate, setFromDate] = useState<Date>();
  const [toDate, setToDate] = useState<Date>();
  const [user, setUser] = useState<
    | undefined
    | {
        id: number;
        name: string;
      }
  >(undefined);
  const { isSidePanelOpen, setIsSidePanelOpen } = useMapContext();

  const getUserLocations = async () => {
    const errorMessage = checkInputs({ fromDate, toDate, user });
    if (errorMessage) {
      setLEC({ error: errorMessage, loading: false });
      return;
    }

    setLEC({ loading: true });
    try {
      const result = await getLocationByIdAndPeriod(user!.id);
      setLEC({ loading: false, data: result });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setLEC({
        loading: false,
        error: error?.message ?? "با خطایی رو به رو شدیم",
      });
    }
  };

  const onHideClick = () => {
    if (isSidePanelOpen) {
      return setIsSidePanelOpen(false);
    }
    setIsSidePanelOpen(true);
  };

  return (
    <div
      className={`flex flex-col h-full overflow-hidden gap-1 ${
        isSidePanelOpen ? "md:gap-2 min-w-72 p-2 md:p-4" : "w-0"
      }`}
    >
      <Button
        onClick={onHideClick}
        variant={"outline"}
        className="absolute z-10  border  p-1  border-none top-1 left-[-36px] rotate-90 rounded-none"
      >
        {isSidePanelOpen ? "پنهان" : "نمایش"}
      </Button>
      <div className="flex-none">
        <div>
          <p>شخص</p>
          <SelectWithSearch
            items={users.map((it) => ({
              label: it.name,
              value: it.id.toString(),
            }))}
            disabled={loading}
            onChange={(item) => {
              if (!item) {
                setUser(undefined);
                return;
              }
              setUser(users.find((it) => it.id == +item.value));
            }}
          />
        </div>
        <div className="w-full">
          <p>از تاریخ</p>
          <DatePicker
            format="HH:mm:ss - YYYY/MM/DD"
            containerStyle={{
              width: "100%",
            }}
            render={(value, openCalender) => {
              return (
                <Button
                  variant={"outline"}
                  disabled={loading}
                  className="cursor-pointer w-full"
                  onClick={() => {
                    openCalender();
                  }}
                >
                  {value ? value : pleaseChoiceADate}
                </Button>
              );
            }}
            plugins={[<TimePicker position="bottom" />]}
            locale={persian_fa}
            calendar={persian}
            value={fromDate}
            onChange={(date) => {
              if (date) setFromDate(date?.toDate());
            }}
            calendarPosition="bottom-center"
          />
        </div>
        <div className="w-full">
          <p>تا تاریخ</p>
          <DatePicker
            format="HH:mm:ss - YYYY/MM/DD"
            containerStyle={{
              width: "100%",
            }}
            render={(value, openCalender) => {
              return (
                <Button
                  variant={"outline"}
                  className="cursor-pointer w-full"
                  disabled={loading}
                  onClick={() => {
                    openCalender();
                  }}
                >
                  {value ? value : pleaseChoiceADate}
                </Button>
              );
            }}
            placeholder="لطفا تاریخ را انتخاب کنید"
            plugins={[<TimePicker position="bottom" />]}
            locale={persian_fa}
            calendar={persian}
            value={toDate}
            onChange={(date) => {
              if (date) setToDate(date?.toDate());
            }}
            calendarPosition="bottom-center"
          />
        </div>
      </div>
      <Button
        className="border-blue-300 text-blue-300"
        variant={"outline"}
        disabled={loading}
        onClick={getUserLocations}
      >
        بگیر
      </Button>
      {loading && <p>در حال بارگذاری</p>}
      {error && <p>{error}</p>}
      <LocationList data={data} />
    </div>
  );
}

const checkInputs = ({
  fromDate,
  toDate,
  user,
}: {
  fromDate?: Date;
  toDate?: Date;
  user?: { id: number; name: string };
}) => {
  if (!user) {
    return "لطفا کاربر را مشخص کنید";
  }
  if (!fromDate) {
    return "لطفا تاریخ ابتدا را مشخص کنید";
  }
  if (!toDate) {
    return "لطفا تاریخ انتها را مشخص کنید";
  }

  return undefined;
};
