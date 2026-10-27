import { notFound } from "next/navigation";
import EventSite from "@/components/layout/EventSite";
import { getEventForCity } from "@/data/event";

const event = getEventForCity("bangalore");

export const metadata = {
  title: "OLYMPE INDIA — Bengaluru | 28 Nov",
  description: "OLYMPE INDIA × Sidejou Invites — 28 Nov Bengaluru.",
};

export default function BangalorePage() {
  if (!event) notFound();

  return <EventSite event={event} />;
}
