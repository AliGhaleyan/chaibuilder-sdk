import { useDarkMode } from "@/core/hooks";
import { Switch } from "@/ui/shadcn/components/ui/switch";
import { Moon, SunIcon } from "lucide-react";

export function DarkMode() {
  const [darkMode, setDarkMode] = useDarkMode();
  return (
    <div className="flex items-center">
      <SunIcon className="size-4 shrink-0" />
      <Switch
        id="dark-mode-switch"
        checked={darkMode}
        onCheckedChange={() => {
          setDarkMode(!darkMode);
        }}
        className={`${darkMode ? "bg-violet-600" : "bg-violet-300"} relative ml-2 inline-flex h-[20px] w-[40px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}>
        <span
          aria-hidden="true"
          className={`${darkMode ? "translate-x-5" : "translate-x-0"} pointer-events-none -mt-px inline-block h-[18px] w-[20px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
      </Switch>
      <Moon className="ml-3 size-4 shrink-0" size={16} />
    </div>
  );
}
