import { useState } from "react";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";
import "../styles/globle.css";

export default function Home() {
  const [inTime, setInTime] = useState("");
  const [breakStart, setBreakStart] = useState("");
  const [breakEnd, setBreakEnd] = useState("");
  const [result, setResult] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!inTime) newErrors.inTime = "Required in time";
    if (!breakStart) newErrors.breakStart = "Required";
    if (!breakEnd) newErrors.breakEnd = "Required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateEndTime = () => {
    if (!validate()) return;

    const parseTime = (timeStr) => {
      const [hours, minutes] = timeStr.split(":").map(Number);
      return new Date(0, 0, 0, hours, minutes);
    };

    const inDate = parseTime(inTime);
    const breakStartDate = parseTime(breakStart);
    const breakEndDate = parseTime(breakEnd);

    const breakMinutes = (breakEndDate - breakStartDate) / (1000 * 60);
    const totalMinutes = 510 + breakMinutes;

    const endDate = new Date(inDate.getTime() + totalMinutes * 60 * 1000);
    let hours = endDate.getHours();
    const minutes = endDate.getMinutes().toString().padStart(2, "0");
    const period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;

    setResult(`You can leave at ${hours}:${minutes} ${period}`);
  };

  return (
    <div className="home-wrapper">
      <Card>
        <CardContent>
          <h2 className="title">Work Hours Calculator</h2>
          <label className="label">
            Morning check in time <span className="asterisk">*</span>
          </label>
          <Input
            type="time"
            value={inTime}
            onChange={(e) => setInTime(e.target.value)}
            error={errors.inTime}
          />

          <label className="label">
            Break start time <span className="asterisk">*</span>
          </label>
          <Input
            type="time"
            value={breakStart}
            onChange={(e) => setBreakStart(e.target.value)}
            error={errors.breakStart}
          />

          <label className="label">
            Break end time <span className="asterisk">*</span>
          </label>
          <Input
            type="time"
            value={breakEnd}
            onChange={(e) => setBreakEnd(e.target.value)}
            error={errors.breakEnd}
          />

          <Button onClick={calculateEndTime}>Calculate</Button>
          {result && <p className="result">{result}</p>}
        </CardContent>
      </Card>
    </div>
  );
}
