import PublicNav from "@/components/PublicNav";
import { prisma } from "@/lib/prisma";

export default async function ContactPage() {
  let settings = null;
  try {
    settings = await prisma.eventSettings.findFirst();
  } catch {}

  const email = settings?.organizerEmail || "hello@creatorverse.in";
  const phone = settings?.organizerPhone || "+91-XXXXXXXXXX";
  const organizer = settings?.organizerName || "CREATORVERSE Team";

  return (
    <>
      <PublicNav
        eventName={settings?.eventName || "CREATORVERSE"}
        registrationOpen={settings?.registrationOpen ?? true}
      />
      <main className="mx-auto max-w-2xl px-4 py-12">
        <h1 className="text-3xl font-extrabold tracking-tight">Contact & Help Desk</h1>
        <p className="mt-3 text-ink-600">
          Questions about registration, tickets, travel or the programme? Reach out to the team.
        </p>

        <div className="card mt-8 space-y-4">
          <div>
            <p className="text-sm font-medium text-ink-500">Email</p>
            <a className="text-lg font-semibold text-brand-600 hover:underline" href={`mailto:${email}`}>
              {email}
            </a>
          </div>
          <div>
            <p className="text-sm font-medium text-ink-500">Phone / WhatsApp</p>
            <p className="text-lg font-semibold text-ink-900">{phone}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-ink-500">Organizer</p>
            <p className="text-lg font-semibold text-ink-900">{organizer}</p>
          </div>
        </div>

        <h2 className="mt-10 text-xl font-bold">Help Desk leads</h2>
        <ul className="mt-3 space-y-2 text-ink-600">
          <li>
            <strong>Ananya Shah</strong> — Registration & Help Desk
          </li>
          <li>
            <strong>Kavya Patel</strong> — Creator & Speaker Management
          </li>
        </ul>
        <p className="mt-4 text-sm text-ink-500">
          Details can be updated anytime from Admin → Settings.
        </p>
      </main>
    </>
  );
}
