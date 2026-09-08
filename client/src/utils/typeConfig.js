import { Building2, Camera, NotepadText, Train } from "lucide-react"

const typeConfig = {
  0: {
    icon: Train,
    title: "Verbindung",
    description: "Mein Reiseverlauf",
    layout: "connection",
    // Verbindungsetappen entstehen nur automatisch, nie durch Nutzerauswahl
    selectable: false,
  },
  1: {
    icon: Building2,
    title: "Unterkunft",
    description: "Meine Unterkunft",
    layout: "connection",
    selectable: true,
  },
  2: {
    icon: NotepadText,
    title: "Notiz",
    description: "Meine Notiz",
    layout: "note",
    selectable: true,
  },
  3: {
    icon: Camera,
    title: "Sehenswürdigkeit",
    description: "Meine Sehenswürdigkeit",
    layout: "connection",
    selectable: true,
  },
}

export const selectableStageTypes = Object.keys(typeConfig)
  .map(Number)
  .filter((type) => typeConfig[type].selectable)

export default typeConfig
