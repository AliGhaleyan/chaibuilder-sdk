import { ShuffleIcon, SmileIcon } from "lucide-react";
import { ArrowDownIcon, ArrowUpIcon, CheckIcon } from "@radix-ui/react-icons";
import { FaFilePen } from "react-icons/fa6";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui";
import { useAskAi } from "../hooks/useAskAi.ts";
import { FaRecycle } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const QUICK_PROMPTS = [
  {
    name: "ai_quick_prompts.improve_writing",
    icon: FaFilePen,
    prompt: "Improving writing in all text elements. Replacing placeholder content with meaningful relevant content.",
  },
  {
    name: "ai_quick_prompts.replace_placeholder_content",
    icon: FaRecycle,
    prompt: "Discard current placeholder content and replace with meaningful relevant content.",
  },
  // {
  //   name: "Change tone",
  //   icon: MegaphoneIcon,
  //   subMenus: ["joyful", "serious", "angry", "sad", "excited", "relaxed", "confident", "assertive", "polite"],
  //   prompt: "Change tone in all text elements. Rewrite all text elements in a more _TONE_ tone.",
  // },
  {
    name: "ai_quick_prompts.fix_grammar",
    icon: CheckIcon,
    prompt: "Fix grammar in all text elements. Ensuring the text is grammatically correct and free of errors.",
  },
  // {
  //   name: "Translate",
  //   icon: GlobeIcon,
  //   subMenus: ["English", "Spanish", "French", "German", "Italian", "Portuguese", "Chinese", "Japanese", "Korean"],
  //   prompt: "Translate all text elements to a __LANG__ language.",
  // },
  {
    name: "ai_quick_prompts.make_longer",
    icon: ArrowUpIcon,
    prompt: "Make all text elements longer.",
  },
  {
    name: "ai_quick_prompts.make_shorter",
    icon: ArrowDownIcon,
    prompt: "Make all text elements shorter.",
  },
  {
    name: "ai_quick_prompts.add_emojis",
    icon: SmileIcon,
    prompt: "Add emojis to text elements if relevant.",
  },
  {
    name: "ai_quick_prompts.randomize",
    icon: ShuffleIcon,
    prompt: "Randomize all text elements.",
  },
];

export function QuickPrompts({ onClick }: { onClick: (prompt: string) => void }) {
  const { loading } = useAskAi();
  const { t } = useTranslation();
  return (
    <div className={loading ? "pointer-events-none opacity-50" : ""}>
      <ul className="space-y-2">
        {QUICK_PROMPTS.map(({ name, icon: Icon, subMenus, prompt }: any) =>
          subMenus ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <li className="flex cursor-pointer items-center space-x-2 hover:bg-gray-100" key={name}>
                  <Icon className="h-4 w-4" />
                  <span>{name}</span>
                </li>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <li
              onClick={() => onClick(prompt)}
              className="flex cursor-pointer items-center space-x-2 rounded p-1 pl-2 text-sm hover:bg-gray-100"
              key={name}>
              <Icon className="h-4 w-4" />
              <span>{t(name)}</span>
            </li>
          ),
        )}
      </ul>
    </div>
  );
}
