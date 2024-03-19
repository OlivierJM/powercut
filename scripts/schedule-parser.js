const { addDays, setHours, setMinutes } = require("date-fns/fp");
const fs = require("fs");
const path = require("path")

const args = process.argv;
const BASE_DIR = __dirname.replace("scripts", "")

try {
  const file = fs.readFileSync(path.join(BASE_DIR, args[2]));
  
  const data = JSON.parse(file);
  data.forEach((time) => {
    time["Schedules"] = time["Schedules"].map((t) => {
      const startTime = t["Start Time"];
      const startTimeHour = Number(startTime.split(":")[0]);
      const startTimeMinute = Number(startTime.split(":")[1]);
      const startDay = setMinutes(
        startTimeMinute,
        setHours(startTimeHour, new Date(t["Date"]))
      );

      const endTime = t["End Time"];
      const endTimeHour = Number(endTime.split(":")[0]);
      const endTimeMinute = Number(endTime.split(":")[1]);
      const endDay = isNextDay(startTimeHour, endTimeHour)
        ? setMinutes(endTimeMinute, setHours(endTimeHour, addDays(1, startDay)))
        : setMinutes(endTimeMinute, setHours(endTimeHour, startDay));

      obj = {
        Start: startDay.toISOString(),
        End: endDay.toISOString(),
        Group: t["Group"],
      };
      return obj;
    });
  });

  function isNextDay(startHour, endHour) {
    return !endHour ? true : endHour < startHour;
  }
  fs.writeFileSync(path.join(BASE_DIR, "./src/data/schedule.json"), JSON.stringify(data), "utf-8");
  console.log("✨ Schedule successfully updated. Happy coding! ✨\n");
} catch (e) {
  if (args[2])
    console.log(
      `Error: The path "${args[2]}" does not contain a valid JSON file. No valid schedule.json file found\n\nUSAGE: yarn schedule-parse [filePath]\n`
    );
  else
    console.log(
      "Error: File is invalid or no schedule.json file found\n\nUSAGE: yarn schedule-parse [filePath]\n"
    );
}
