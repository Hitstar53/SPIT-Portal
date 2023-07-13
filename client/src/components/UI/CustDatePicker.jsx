import * as React from "react";
import dayjs from 'dayjs';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateField } from "@mui/x-date-pickers/DateField";

export default function CustDatePicker(props) {
  const value = dayjs(props.defaultValue);
  console.log(value);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={props.label}
        value={value}
        onChange={props.onChange}
      />
    </LocalizationProvider>
  );
}