import { notFound } from "next/navigation";
import EventSite from "@/components/layout/EventSite";
import { getEventForCity } from "@/data/event";

const event = getEventForCity("delhi");

export const metadata = {
  title: "OLYMPE INDIA — Delhi | 27 Nov",
  description: "OLYMPE INDIA × Sidejou Invites — 27 Nov Delhi.",
};

export default function DelhiPage() {
  if (!event) notFound();

  return <EventSite event={event} />;
}
