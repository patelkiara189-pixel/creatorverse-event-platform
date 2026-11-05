import PublicNav from "@/components/PublicNav";
import { prisma } from "@/lib/prisma";

export default async function VenuePage() {
  let settings = null;
  try {
    settings = await prisma.eventSettings.findFirst();
  } catch {}

  const venueName = settings?.venueName || "Venue to be announced";
  const venueAddress = settings?.venueAddress || "India (city & exact venue TBA)";
  const startDate = settings?.startDate || "To be announced";
  const endDate = settings?.endDate || "To be announced";

  return (
    <>
      <PublicNav
        eventName={settings?.eventName || "CREATORVERSE"}
        registrationOpen={settings?.registrationOpen ?? true}
      />
      <main className="mx-auto max-w-2xl px-4 py-12">
        <h1 className="text-3xl font-extrabold tracking-tight">Venue & Travel</h1>

        <div className="card mt-8 space-y-3">
          <p>
            <strong className="text-ink-700">Venue:</strong> {venueName}
          </p>
          <p>
            <strong className="text-ink-700">Address:</strong> {venueAddress}
          </p>
          <p>
            <strong className="text-ink-700">Dates:</strong> {startDate} – {endDate}
          </p>
        </div>

        <h2 className="mt-10 text-xl font-bold">Travel policy</h2>
        <p className="mt-3 text-ink-600">
          Complimentary airport transfers are provided <strong>only for approved invited creators,
          speakers, performers or VIP guests</strong>, subject to the approved budget and itinerary.
        </p>
        <p className="mt-3 text-ink-600">
          Ordinary ticket holders should arrange their own travel and accommodation. Recommended
          stay options near the venue will be shared once the location is confirmed.
        </p>

        <h2 className="mt-10 text-xl font-bold">What to expect</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-ink-600">
          <li>Two full days of workshops, panels and networking</li>
          <li>Creator Challenge and Spotlight Awards</li>
          <li>Brand speed-networking sessions</li>
          <li>Digital ticket with QR for smooth check-in</li>
        </ul>
      </main>
    </>
  );
}
