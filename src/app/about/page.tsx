import Link from "next/link";
import PublicNav from "@/components/PublicNav";
import { prisma } from "@/lib/prisma";

export default async function AboutPage() {
  let settings = null;
  try {
    settings = await prisma.eventSettings.findFirst();
  } catch {}

  const description =
    settings?.description ||
    "A two-day creators and influencers convention focused on creator skills, personal branding, creator–brand opportunities, collaboration, digital entrepreneurship, and community.";

  return (
    <>
      <PublicNav
        eventName={settings?.eventName || "CREATORVERSE"}
        registrationOpen={settings?.registrationOpen ?? true}
      />
      <main className="mx-auto max-w-2xl px-4 py-12">
        <h1 className="text-3xl font-extrabold tracking-tight">About CREATORVERSE</h1>
        <p className="mt-4 text-lg text-ink-600">{description}</p>

        <p className="mt-6 text-ink-600">
          Expected attendance is approximately 200–300 participants. The city, venue, dates, final
          capacity, ticket prices, and guest confirmations have not yet been finalized.
        </p>

        <div className="card mt-8 space-y-2 text-sm">
          <p>
            <strong>Date:</strong> {settings?.startDate || "To be announced"} –{" "}
            {settings?.endDate || "To be announced"}
          </p>
          <p>
            <strong>Venue:</strong> {settings?.venueName || "To be announced"}
          </p>
          <p>
            <strong>Tagline:</strong> {settings?.tagline || "Create. Connect. Collaborate."}
          </p>
        </div>

        <h2 className="mt-10 text-xl font-bold">What you’ll experience</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-ink-600">
          <li>Hands-on workshops (Reel Factory, Creator Challenge)</li>
          <li>Panels on personal branding and monetization</li>
          <li>Creator × Brand speed networking</li>
          <li>Creator Spotlight Awards</li>
          <li>Digital ticket with QR code for seamless check-in</li>
        </ul>

        <Link href="/register" className="btn-primary mt-10 inline-flex">
          Register now
        </Link>
      </main>
    </>
  );
}
