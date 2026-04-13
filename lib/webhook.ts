export async function logEvent(event: {
  type: string;
  data: Record<string, unknown>;
}) {
  if (!process.env.GOOGLE_SHEETS_WEBHOOK_URL) return;
  try {
    await fetch(process.env.GOOGLE_SHEETS_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...event,
        ts: new Date().toISOString(),
        project: "market-event-board",
      }),
    });
  } catch {
    /* non-blocking */
  }
}
