"use client";

import React, { useState, useEffect } from "react";
import supabase, { Outreach } from "@/lib/supabase";
import { Search, MapPin, Calendar, Heart, ShieldAlert } from "lucide-react";

export default function Impact() {
  const [outreaches, setOutreaches] = useState<Outreach[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("All");

  useEffect(() => {
    async function fetchOutreaches() {
      try {
        setLoading(true);
        const { data, error } = await supabase.from("outreaches").select("*");
        if (error) {
          throw new Error(error.message);
        }
        if (data) {
          // Sort outreaches by date descending
          const sorted = [...data].sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          );
          setOutreaches(sorted);
        }
      } catch (err) {
        console.error("Error fetching outreaches:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchOutreaches();
  }, []);

  // Get unique locations for filtering
  const locations = ["All", ...Array.from(new Set(outreaches.map((o) => {
    // Extract state name or base location
    const parts = o.location.split(",");
    return parts[parts.length - 1].trim();
  })))];

  // Filtering logic
  const filteredOutreaches = outreaches.filter((outreach) => {
    const matchesSearch =
      outreach.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      outreach.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLocation =
      selectedLocation === "All" ||
      outreach.location.toLowerCase().includes(selectedLocation.toLowerCase());

    return matchesSearch && matchesLocation;
  });

  // Aggregated Stats
  const totalPeopleSupported = outreaches.reduce((sum, o) => sum + (o.people_supported || 0), 0);
  const totalOutreaches = outreaches.length;
  const uniqueStateCount = new Set(
    outreaches.map((o) => {
      const parts = o.location.split(",");
      return parts[parts.length - 1].trim();
    })
  ).size;

  return (
    <div className="flex flex-col bg-background text-foreground">
      {/* Hero Header */}
      <section className="bg-primary text-primary-foreground py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-yellow">
            Documented Action
          </span>
          <h1 className="mt-4 font-display text-4xl font-extrabold sm:text-5xl">
            Our Impact. <span className="text-brand-yellow">Real Stories.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base text-white/85 leading-relaxed sm:text-lg">
            Every donation has a face, a family, and a story. We keep a documented timeline of our community outreaches so you can see the light you're helping us create.
          </p>
        </div>
      </section>

      {/* Aggregate Stats Strip */}
      <section className="border-b border-border bg-white py-8 shadow-sm">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="border-r border-border/60">
              <p className="text-2xl sm:text-4xl font-extrabold text-primary">
                {loading ? "..." : totalOutreaches}
              </p>
              <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-muted-foreground mt-1">
                Outreaches Completed
              </p>
            </div>
            <div className="border-r border-border/60">
              <p className="text-2xl sm:text-4xl font-extrabold text-primary">
                {loading ? "..." : totalPeopleSupported.toLocaleString()}
              </p>
              <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-muted-foreground mt-1">
                Lives Impacted
              </p>
            </div>
            <div>
              <p className="text-2xl sm:text-4xl font-extrabold text-primary">
                {loading ? "..." : uniqueStateCount}
              </p>
              <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-muted-foreground mt-1">
                States Reached
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Timeline Section */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 w-full">
        {/* Filters and Search Bar */}
        <div className="mb-10 flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-4 rounded-2xl border border-border/80 shadow-sm">
          {/* Search Input */}
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search outreaches..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-border bg-transparent pl-10 pr-4 py-2 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary/20"
            />
          </div>

          {/* Location Filters */}
          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto justify-start sm:justify-end">
            <span className="text-xs font-semibold text-muted-foreground mr-1 hidden md:inline">Filter Region:</span>
            {locations.map((loc) => (
              <button
                key={loc}
                onClick={() => setSelectedLocation(loc)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                  selectedLocation === loc
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-secondary text-foreground/70 hover:bg-secondary/80 hover:text-foreground"
                }`}
              >
                {loc}
              </button>
            ))}
          </div>
        </div>

        {/* Outreach List Grid */}
        {loading ? (
          /* Loading Skeletons */
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <div key={n} className="rounded-3xl border border-border bg-card overflow-hidden animate-pulse">
                <div className="aspect-video w-full bg-secondary"></div>
                <div className="p-6 space-y-4">
                  <div className="h-4 w-1/3 bg-secondary rounded"></div>
                  <div className="h-6 w-3/4 bg-secondary rounded"></div>
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-secondary rounded"></div>
                    <div className="h-4 w-5/6 bg-secondary rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredOutreaches.length === 0 ? (
          /* Empty State */
          <div className="text-center py-20 border-2 border-dashed border-border rounded-3xl p-6">
            <ShieldAlert className="mx-auto h-12 w-12 text-muted-foreground/60 mb-4" />
            <h3 className="font-display text-lg font-bold">No outreaches found</h3>
            <p className="text-sm text-muted-foreground max-w-sm mx-auto mt-2 leading-relaxed">
              We couldn't find any outreach records matching "{searchTerm}" in the selected region.
            </p>
          </div>
        ) : (
          /* Main Results Grid */
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredOutreaches.map((outreach) => (
              <article
                key={outreach.id}
                className="flex flex-col rounded-3xl border border-border bg-card overflow-hidden hover-lift transition-all-custom"
              >
                {/* Photo Header */}
                <div className="aspect-video w-full relative bg-secondary overflow-hidden">
                  <img
                    src={outreach.image_url}
                    alt={outreach.title}
                    className="h-full w-full object-cover transition duration-300 hover:scale-105"
                  />
                  <div className="absolute top-3 right-3 rounded-full bg-primary/90 backdrop-blur-md px-3 py-1 text-[10px] font-bold text-white uppercase tracking-wider flex items-center gap-1 shadow-sm">
                    <Heart className="h-3 w-3 fill-current text-brand-yellow" />
                    {outreach.people_supported} supported
                  </div>
                </div>

                {/* Details Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    {/* Meta Info Row */}
                    <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-muted-foreground font-semibold">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5 text-primary" />
                        {outreach.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {new Date(outreach.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>

                    <h3 className="font-display text-lg font-extrabold text-foreground leading-snug">
                      {outreach.title}
                    </h3>

                    <p className="text-sm leading-relaxed text-muted-foreground font-normal">
                      {outreach.description}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
