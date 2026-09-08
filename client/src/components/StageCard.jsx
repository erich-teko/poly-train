import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardAction,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import DateTimePicker from "./DateTimePicker"
import ConnectionInfo from "./ConnectionInfo"
import {
  Building2,
  Camera,
  Check,
  NotepadText,
  Pencil,
  Train,
  X,
} from "lucide-react"
import { useState } from "react"

function StageCard({
  stageStart,
  stageEnd,
  startDate,
  endDate,
  address,
  note,
  _id,
  transfers,
  type,
  trainConnection,
  onSave,
  startInEdit = false,
}) {
  const [isEditing, setIsEditing] = useState(startInEdit)
  const [draftStartDate, setDraftStartDate] = useState(startDate)
  const [draftEndDate, setDraftEndDate] = useState(endDate)
  const [draftAddress, setDraftAddress] = useState(() =>
    typeof address === "object" && address !== null
      ? address
      : { street: address || "", postalCode: "", city: "", country: "" }
  )
  const [draftNote, setDraftNote] = useState(note || "")
  const [draftType, setDraftType] = useState(type)
  const typeConfig = {
    0: {
      icon: <Train className="h-5 w-5" />,
      title: "Verbindung",
      description: "Mein Reiseverlauf",
      layout: "connection",
    },
    1: {
      icon: <Building2 className="h-5 w-5" />,
      title: "Unterkunft",
      description: "Meine Unterkunft",
      layout: "connection",
    },
    2: {
      icon: <NotepadText className="h-5 w-5" />,
      title: "Notiz",
      description: "Meine Notiz",
      layout: "note",
    },
    3: {
      icon: <Camera className="h-5 w-5" />,
      title: "Sehenswürdigkeit",
      description: "Meine Sehenswürdigkeit",
      layout: "connection",
    },
  }

  const activeType = isEditing ? draftType : type
  const config = typeConfig[activeType] || {
    icon: null,
    title: "Etappe",
    description: `Kategorie ${activeType}`,
    layout: "connection",
  }

  const isDateEditable =
    activeType === 1 || activeType === 2 || activeType === 3

  const handleDateChange = (date) => {
    if (!date) return

    const currentDate = draftStartDate ? new Date(draftStartDate) : new Date()
    const updatedDate = new Date(date)
    updatedDate.setHours(
      currentDate.getHours(),
      currentDate.getMinutes(),
      currentDate.getSeconds(),
      currentDate.getMilliseconds()
    )
    setDraftStartDate(updatedDate.toISOString())
  }

  const handleTimeChange = (time) => {
    if (!time) return

    const updatedDate = draftStartDate ? new Date(draftStartDate) : new Date()
    const [hours, minutes] = time.split(":").map(Number)
    updatedDate.setHours(hours, minutes, 0, 0)
    setDraftStartDate(updatedDate.toISOString())
  }

  const handleEndDateChange = (date) => {
    if (!date) return

    const currentDate = draftEndDate ? new Date(draftEndDate) : new Date()
    const updatedDate = new Date(date)
    updatedDate.setHours(
      currentDate.getHours(),
      currentDate.getMinutes(),
      currentDate.getSeconds(),
      currentDate.getMilliseconds()
    )
    setDraftEndDate(updatedDate.toISOString())
  }

  const handleEndTimeChange = (time) => {
    if (!time) return

    const updatedDate = draftEndDate ? new Date(draftEndDate) : new Date()
    const [hours, minutes] = time.split(":").map(Number)
    updatedDate.setHours(hours, minutes, 0, 0)
    setDraftEndDate(updatedDate.toISOString())
  }

  const handleEdit = () => {
    setDraftStartDate(startDate)
    setDraftEndDate(endDate)
    setDraftAddress(
      typeof address === "object" && address !== null
        ? address
        : { street: address || "", postalCode: "", city: "", country: "" }
    )
    setDraftNote(note || "")
    setDraftType(type)
    setIsEditing(true)
  }

  const handleCancel = () => {
    setDraftStartDate(startDate)
    setDraftEndDate(endDate)
    setDraftAddress(
      typeof address === "object" && address !== null
        ? address
        : { street: address || "", postalCode: "", city: "", country: "" }
    )
    setDraftNote(note || "")
    setDraftType(type)
    setIsEditing(false)
  }

  const updateDraftAddress = (field, value) => {
    setDraftAddress((currentAddress) => ({
      ...currentAddress,
      [field]: value,
    }))
  }

  const handleSave = async () => {
    await onSave?.({
      type: draftType,
      startDate: draftStartDate,
      endDate: draftEndDate,
      address: draftAddress,
      note: draftNote,
    })
    setIsEditing(false)
  }

  // Calculate total travel time
  const calculateTravelTime = () => {
    if (!startDate || !endDate) return "Zeit nicht verfügbar"

    const start = new Date(startDate)
    const end = new Date(endDate)
    const diffMs = end - start

    if (diffMs < 0) return "Ungültige Zeit"

    const hours = Math.floor(diffMs / (1000 * 60 * 60))
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))

    if (hours === 0) return `${minutes}min`
    return `${hours}h ${minutes}min`
  }

  const calculateNights = () => {
    if (!startDate || !endDate) return null

    const start = new Date(startDate)
    const end = new Date(endDate)
    const startDay = Date.UTC(
      start.getFullYear(),
      start.getMonth(),
      start.getDate()
    )
    const endDay = Date.UTC(end.getFullYear(), end.getMonth(), end.getDate())
    const nights = Math.round((endDay - startDay) / (1000 * 60 * 60 * 24))

    return nights >= 0 ? nights : null
  }

  const nights = activeType === 1 ? calculateNights() : null
  const connectionInfo = trainConnection || {
    from: { name: stageStart, departure: startDate },
    to: { name: stageEnd, arrival: endDate },
    transfers: transfers ?? 0,
  }

  return (
    <Card className="w-full rounded-xl border-border bg-card text-card-foreground shadow-sm dark:border-slate-700 dark:bg-slate-900/80">
      <CardHeader
        className={
          config.layout === "note"
            ? "bg-yellow-50 dark:bg-yellow-900"
            : activeType === 1
              ? "bg-violet-50 dark:bg-violet-900"
              : activeType === 3
                ? "bg-green-50 dark:bg-green-900"
                : ""
        }
      >
        <CardTitle className="flex items-center gap-2">
          {config.icon}
          {isEditing ? (
            <select
              aria-label="Kategorie"
              value={draftType}
              onChange={(event) => setDraftType(Number(event.target.value))}
              className="h-9 rounded-md border border-input bg-background px-2 text-base font-semibold outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value={1}>Unterkunft</option>
              <option value={2}>Notiz</option>
              <option value={3}>Sehenswürdigkeit</option>
            </select>
          ) : (
            <span>{config.title}</span>
          )}
        </CardTitle>
        <CardDescription>
          {isDateEditable ? (
            isEditing ? (
              activeType === 1 ? (
                <div className="flex flex-col gap-3">
                  <div>
                    <Label>Startdatum</Label>
                    <DateTimePicker
                      date={
                        draftStartDate ? new Date(draftStartDate) : undefined
                      }
                      time={
                        draftStartDate
                          ? new Date(draftStartDate).toTimeString().slice(0, 5)
                          : undefined
                      }
                      idPrefix="accommodation-start"
                      onDateChange={handleDateChange}
                      onTimeChange={handleTimeChange}
                    />
                  </div>
                  <div>
                    <Label>Enddatum</Label>
                    <DateTimePicker
                      date={draftEndDate ? new Date(draftEndDate) : undefined}
                      time={
                        draftEndDate
                          ? new Date(draftEndDate).toTimeString().slice(0, 5)
                          : undefined
                      }
                      idPrefix="accommodation-end"
                      onDateChange={handleEndDateChange}
                      onTimeChange={handleEndTimeChange}
                    />
                  </div>
                </div>
              ) : (
                <DateTimePicker
                  date={draftStartDate ? new Date(draftStartDate) : undefined}
                  time={
                    draftStartDate
                      ? new Date(draftStartDate).toTimeString().slice(0, 5)
                      : undefined
                  }
                  onDateChange={handleDateChange}
                  onTimeChange={handleTimeChange}
                />
              )
            ) : startDate ? (
              <>
                {new Date(startDate).toLocaleString("de-CH", {
                  dateStyle: "short",
                  timeStyle: "short",
                })}
                {activeType === 1 && endDate && (
                  <>
                    {" "}
                    bis{" "}
                    {new Date(endDate).toLocaleString("de-CH", {
                      dateStyle: "short",
                      timeStyle: "short",
                    })}
                  </>
                )}
                {nights !== null &&
                  ` · ${nights} ${nights === 1 ? "Nacht" : "Nächte"}`}
              </>
            ) : (
              "Zeit nicht gesetzt"
            )
          ) : (
            config.description
          )}
        </CardDescription>
        {type !== 0 && (
          <CardAction>
            {isEditing ? (
              <div className="flex gap-2">
                <Button type="button" size="sm" onClick={handleSave}>
                  <Check />
                  Speichern
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={handleCancel}
                >
                  <X />
                  Abbrechen
                </Button>
              </div>
            ) : (
              <Button
                type="button"
                size="icon"
                variant="outline"
                title="Etappe bearbeiten"
                aria-label="Etappe bearbeiten"
                onClick={handleEdit}
              >
                <Pencil />
              </Button>
            )}
          </CardAction>
        )}
      </CardHeader>
      <CardContent className={config.layout === "note" ? undefined : "p-4"}>
        <form>
          <div className="flex flex-col gap-6">
            {/* Note Layout */}
            {type === 1 || type === 3 ? (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="grid gap-2 md:col-span-1">
                  <Label htmlFor="accommodation-street" className="text-xs">
                    Adresse
                  </Label>
                  <div className="flex min-h-24 flex-col justify-center gap-2 rounded-md border border-gray-300 bg-gray-100 p-3 dark:border-gray-600 dark:bg-gray-800">
                    {isEditing ? (
                      <>
                        <Input
                          id="accommodation-street"
                          value={draftAddress.street}
                          placeholder="Strasse / Hausnummer"
                          onChange={(event) =>
                            updateDraftAddress("street", event.target.value)
                          }
                        />
                        <div className="grid grid-cols-2 gap-2">
                          <Input
                            id="accommodation-postal-code"
                            value={draftAddress.postalCode}
                            placeholder="PLZ"
                            onChange={(event) =>
                              updateDraftAddress(
                                "postalCode",
                                event.target.value
                              )
                            }
                          />
                          <Input
                            id="accommodation-city"
                            value={draftAddress.city}
                            placeholder="Ort"
                            onChange={(event) =>
                              updateDraftAddress("city", event.target.value)
                            }
                          />
                        </div>
                        <Input
                          id="accommodation-country"
                          value={draftAddress.country}
                          placeholder="Land"
                          onChange={(event) =>
                            updateDraftAddress("country", event.target.value)
                          }
                        />
                      </>
                    ) : (
                      <div className="text-sm whitespace-pre-wrap">
                        {address?.street ||
                        address?.postalCode ||
                        address?.city ||
                        address?.country ? (
                          <>
                            {address.street}
                            {(address.postalCode || address.city) && (
                              <>
                                <br />
                                {[address.postalCode, address.city]
                                  .filter(Boolean)
                                  .join(" ")}
                              </>
                            )}
                            {address.country && (
                              <>
                                <br />
                                {address.country}
                              </>
                            )}
                          </>
                        ) : (
                          address || "Keine Adresse"
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid gap-2 md:col-span-2">
                  <Label htmlFor="accommodation-note" className="text-xs">
                    Notizen
                  </Label>
                  <div className="flex min-h-24 flex-col justify-center rounded-md border border-gray-300 bg-gray-100 p-3 dark:border-gray-600 dark:bg-gray-800">
                    {isEditing ? (
                      <textarea
                        id="accommodation-note"
                        value={draftNote}
                        placeholder="Notizen zur Unterkunft"
                        onChange={(event) => setDraftNote(event.target.value)}
                        className="min-h-16 w-full resize-y rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      />
                    ) : (
                      <div className="text-sm whitespace-pre-wrap">
                        {note || "Keine Notizen"}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : config.layout === "note" ? (
              <div className="grid gap-2">
                {/* Note Field */}
                <div className="grid gap-2">
                  <Label htmlFor="note" className="text-xs">
                    Notiz
                  </Label>
                  <div className="flex flex-col justify-center rounded-md border border-gray-300 bg-gray-100 p-3 dark:border-gray-600 dark:bg-gray-800">
                    {isEditing ? (
                      <Input
                        id="note"
                        value={draftNote}
                        onChange={(event) => setDraftNote(event.target.value)}
                      />
                    ) : (
                      <div className="text-sm">{note || "Keine Notiz"}</div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              /* Connection Layout */
              <ConnectionInfo connection={connectionInfo} />
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default StageCard
