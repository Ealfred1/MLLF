"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import RippleImage from "./RippleImage";

interface Tile {
  id: number;
  img: string;
  paddingBottom: string;
  cap: string;
  sub: string;
}

const TILES: Tile[] = [
  { id: 1, img: "/outreach-banner-1.jpg", paddingBottom: "56%", cap: "Feeding day at the Home", sub: "Faith Community Children's Home" },
  { id: 2, img: "/footbridge-giving.jpg", paddingBottom: "178%", cap: "Street outreach", sub: "Lagos overpass" },
  { id: 3, img: "/mother-child.jpg", paddingBottom: "177%", cap: "A caring hand", sub: "Street outreach" },
  { id: 4, img: "/outreach-arrival.jpg", paddingBottom: "56%", cap: "Arriving with the team", sub: "Faith Community Children's Home" },
  { id: 5, img: "/supplies-flatlay.jpg", paddingBottom: "178%", cap: "Packing the provisions", sub: "Before every outreach" },
  { id: 6, img: "/outreach-canopy.jpg", paddingBottom: "56%", cap: "Sharing a moment together", sub: "Community outreach" },
  { id: 7, img: "/orphanage-sign.jpg", paddingBottom: "178%", cap: "Registered & recognised", sub: "Compassionate Orphanage · Lagos" },
  { id: 8, img: "/car-provisions.jpg", paddingBottom: "178%", cap: "Loaded up and ready", sub: "Supply run" },
  { id: 9, img: "/outreach-crowd.jpg", paddingBottom: "56%", cap: "Faces we remember", sub: "Community visit" },
  { id: 10, img: "/indoor-handoff.jpg", paddingBottom: "178%", cap: "One box at a time", sub: "Distribution day" },
  { id: 11, img: "/outreach-banner-2.jpg", paddingBottom: "56%", cap: "Every visit, documented", sub: "Faith Community Children's Home" },
  { id: 12, img: "/courtyard-kids.jpg", paddingBottom: "178%", cap: "A day to celebrate", sub: "Community visit" },
];

export default function GalleryGrid() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      const tiles = gridRef.current?.querySelectorAll(".mtile");
      if (tiles && tiles.length > 0) {
        gsap.from(tiles, {
          opacity: 0,
          y: 34,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.06,
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 84%",
          },
        });
      }
    }, gridRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="masonry reveal" id="gallery-grid" ref={gridRef}>
      {TILES.map((tile) => (
        <div
          key={tile.id}
          className="mtile"
          data-img={tile.img}
          data-cap={tile.cap}
          data-sub={tile.sub}
        >
          <div className="frame" style={{ paddingBottom: tile.paddingBottom }}>
            <RippleImage src={tile.img} alt={tile.cap} className="img" />
          </div>
          <div className="zoom-ic">⤢</div>
          <div className="cap">
            {tile.cap}
            <small>{tile.sub}</small>
          </div>
        </div>
      ))}
    </div>
  );
}
