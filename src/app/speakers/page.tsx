import PublicNav from "@/components/PublicNav";
import { prisma } from "@/lib/prisma";

const DEFAULT_SPEAKERS = [
  { id: "1", name: "Ranveer Allahbadia", bio: "Podcaster and content creator", status: "PROPOSED", expertise: "Podcasting, personal brand" },
  { id: "2", name: "Prajakta Koli", bio: "Actress and YouTuber", status: "PROPOSED", expertise: "Comedy, storytelling" },
  { id: "3", name: "Bhuvan Bam", bio: "Comedian and content creator", status: "PROPOSED", expertise: "Comedy, short-form" },
  { id: "4", name: "Mumbiker Nikhil", bio: "Travel vlogger", status: "PROPOSED", expertise: "Travel, vlogging" },
  { id: "5", name: "Ankur Warikoo", bio: "Entrepreneur and creator", status: "PROPOSED", expertise: "Startups, personal finance" },
  { id: "6", name: "Dolly Singh", bio: "Content creator and actress", status: "PROPOSED", expertise: "Comedy, lifestyle" },
];

export default async function SpeakersPage() {
  let settings = null;
  let speakers: any[] = [];
  try {
    settings = await prisma.eventSettings.findFirst();
    speakers = await prisma.speaker.findMany({ orderBy: { sortOrder: "asc" } });
  } catch {}

  if (speakers.length === 0) {
    speakers = DEFAULT_SPEAKERS;
  }

  return (
    <>
      <PublicNav
        eventName={settings?.eventName || "CREATORVERSE"}
        registrationOpen={settings?.registrationOpen ?? true}
      />
      <main className="mx-auto max-w-5xl px-4 py-12">
        <h1 className="text-3xl font-extrabold tracking-tight">Proposed Creators & Speakers</h1>
        <p className="mt-2 text-ink-600">
          The following names are <strong>proposed invitees only</strong>. None are confirmed unless
          explicitly updated by organizers.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {speakers.map((s) => (
            <div key={s.id} className="card text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-teal-400 text-2xl font-bold text-white">
                {s.name[0]}
              </div>
              <h3 className="mt-3 font-bold">{s.name}</h3>
              <span className="badge-proposed mt-1">{s.status}</span>
              {s.bio && <p className="mt-2 text-sm text-ink-500">{s.bio}</p>}
              {s.expertise && <p className="mt-1 text-xs text-ink-400">{s.expertise}</p>}
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
