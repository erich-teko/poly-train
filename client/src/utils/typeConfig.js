import { Building2, Camera, NotepadText, Train } from "lucide-react"

const typeConfig = {
  0: {
    icon: Train,
    title: "Verbindung",
    description: "Mein Reiseverlauf",
    layout: "connection",
    headerClassName: "bg-blue-50 pt-3 pb-3 dark:bg-blue-900",
    // Verbindungsetappen entstehen nur automatisch, nie durch Nutzerauswahl
    selectable: false,
  },
  1: {
    icon: Building2,
    title: "Unterkunft",
    description: "Meine Unterkunft",
    layout: "connection",
    headerClassName: "bg-violet-50 pt-3 pb-3 dark:bg-violet-900",
    selectable: true,
  },
  2: {
    icon: NotepadText,
    title: "Notiz",
    description: "Meine Notiz",
    layout: "note",
    headerClassName: "bg-yellow-50 pt-3 pb-3 dark:bg-yellow-900",
    selectable: true,
  },
  3: {
    icon: Camera,
    title: "Sehenswürdigkeit",
    description: "Meine Sehenswürdigkeit",
    layout: "connection",
    headerClassName: "bg-green-50 pt-3 pb-3 dark:bg-green-900",
    selectable: true,
  },
}

export const selectableStageTypes = Object.keys(typeConfig)
  .map(Number)
  .filter((type) => typeConfig[type].selectable)

export default typeConfig
