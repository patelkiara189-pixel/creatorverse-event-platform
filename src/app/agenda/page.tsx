import PublicNav from "@/components/PublicNav";
import { prisma } from "@/lib/prisma";

const DEFAULT_AGENDA = [
  {
    day: 1,
    items: [
      { time: "09:00 – 10:00", title: "Registration & Welcome Networking", desc: "Check-in, badges and coffee" },
      { time: "10:00 – 11:00", title: "Opening Keynote", desc: "The Future of Content Creation" },
      { time: "11:15 – 12:30", title: "Panel: Building Your Personal Brand", desc: "Strategies that work in 2026" },
      { time: "13:30 – 15:00", title: "Reel Factory Workshop", desc: "Hands-on short-form video creation" },
      { time: "15:15 – 16:30", title: "Creator × Brand Speed Networking", desc: "Meet potential partners" },
    ],
  },
  {
    day: 2,
    items: [
      { time: "10:30 – 12:00", title: "Creator Challenge Finals", desc: "Live presentations and judging" },
      { time: "13:00 – 14:30", title: "Masterclass: Monetization", desc: "From views to revenue" },
      { time: "14:45 – 16:00", title: "Creator Spotlight Awards", desc: "Recognising standout creators" },
      { time: "16:15 – 17:00", title: "Closing Keynote & Farewell", desc: "Final takeaways and group photo" },
    ],
  },
];

export default async function AgendaPage() {
  let settings = null;
  try {
    settings = await prisma.eventSettings.findFirst();
  } catch {}
  const agenda = (settings?.agenda as any[])?.length
    ? (settings?.agenda as any[])
    : DEFAULT_AGENDA;

  return (
    <>
      <PublicNav
        eventName={settings?.eventName || "CREATORVERSE"}
        registrationOpen={settings?.registrationOpen ?? true}
      />
      <main className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-3xl font-extrabold tracking-tight">Event Agenda</h1>
        <p className="mt-2 text-sm text-ink-500">
          Provisional schedule — subject to change. Final timings will be confirmed closer to the event.
        </p>

        {agenda.map((day: any) => (
          <div key={day.day} className="mt-10">
            <h2 className="text-xl font-bold text-brand-700">Day {day.day}</h2>
            <ul className="mt-4 space-y-3">
              {(day.items || []).map((item: any, i: number) => (
                <li key={i} className="flex gap-4 border-b border-ink-100 pb-3">
                  <span className="w-36 shrink-0 text-sm font-semibold text-brand-600">
                    {item.time}
                  </span>
                  <div>
                    <p className="font-medium text-ink-900">{item.title}</p>
                    {item.desc && <p className="text-sm text-ink-500">{item.desc}</p>}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </main>
    </>
  );
}
