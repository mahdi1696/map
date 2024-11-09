"use client";

import * as React from "react";
import { FixedSizeList as List } from "react-window";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { useState } from "react";

type Props = {
  items?: {
    value: string;
    label: string;
  }[];
  disabled?: boolean;
  triggerText?: string;
  searchPlaceHolder?: string;
  onChange?: (v: { value: string; label: string } | undefined) => void;
};

export function SelectWithSearch({
  items,
  triggerText = "انتخاب کنید",
  searchPlaceHolder = "جستجو کنید",
  disabled,
  onChange,
}: Props) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const [filteredItems, setFilteredItems] = useState(items);

  const Row = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => {
    const item = filteredItems?.[index];
    return (
      <div
        className="cursor-pointer hover:bg-muted/50"
        style={style}
        onClick={() => {
          if (item) {
            setValue(item?.value);
            setOpen(false);
            onChange?.(item);
          }
        }}
      >
        {item?.label}
      </div>
    );
  };

  const onTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const t = e.target.value;
    if (!t) {
      return setFilteredItems(items);
    }
    const filteredItems = items?.filter((it) => it.label.includes(t));
    setFilteredItems(filteredItems);
  };

  return (
    <Popover
      open={open}
      onOpenChange={(e) => {
        setOpen(e);
        setFilteredItems(items);
      }}
    >
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className="w-full justify-between p-1 "
        >
          <p className="text-ellipsis overflow-hidden">
            {value
              ? items?.find((it) => it.value === value)?.label
              : triggerText}
          </p>
          {value && (
            <X
              className="ml-1 h-4 w-4 shrink-0 opacity-50"
              onClick={(e) => {
                console.log("x");

                e.stopPropagation();
                setValue("");
                onChange?.(undefined);
              }}
            />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" sticky="always">
        <div>
          <Input
            className="focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 "
            onChange={onTextChange}
            placeholder={searchPlaceHolder}
          />
          <List
            direction="rtl"
            height={150}
            itemCount={items?.length ?? 0}
            itemSize={32}
            width={200}
          >
            {Row}
          </List>
        </div>
      </PopoverContent>
    </Popover>
  );
}
