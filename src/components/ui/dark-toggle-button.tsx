import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ui/switch";
import { Switch } from "@/components/ui/switch";

export function ModeSwitch() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  // Set the default checked state based on the current theme
  const [checked, setChecked] = React.useState(isDark);

  React.useEffect(() => {
    setChecked(isDark);
  }, [isDark]);

  return (
    <div className="w-full h-full flex space-x-2 items-center justify-center text-primary">
      <Sun
        className={`h-4 w-4 ${checked ? "text-foreground" : "text-primary"}`}
      />
      <Switch
        checked={checked}
        onCheckedChange={(checked) => {
          setChecked(checked);
          setTheme(checked ? "dark" : "light");
        }}
        className="flex items-center"
      ></Switch>
      <Moon
        className={`h-4 w-4 ${checked ? "text-primary" : "text-foreground"}`}
      />
    </div>
  );
}
