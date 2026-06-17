"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface Tile {
  id: number;
  img: string;
  paddingBottom: string;
  cap: string;
  sub: string;
}

const TILES: Tile[] = [
  { id: 1, img: "/images/outreach-01.jpg", paddingBottom: "128%", cap: "Feeding 100 souls", sub: "The Give Back Project · Dec 2023" },
  { id: 2, img: "/images/outreach-02.jpg", paddingBottom: "75%", cap: "Street outreach", sub: "Lagos State" },
  { id: 3, img: "/images/outreach-03.jpg", paddingBottom: "100%", cap: "A day of rest", sub: "Mrs Okafor · Anambra" },
  { id: 4, img: "/images/outreach-04.jpg", paddingBottom: "120%", cap: "Books & belonging", sub: "Orphanage outreach" },
  { id: 5, img: "/images/outreach-05.jpg", paddingBottom: "75%", cap: "Reading together", sub: "Orphanage" },
  { id: 6, img: "/images/outreach-06.jpg", paddingBottom: "128%", cap: "Provisions delivered", sub: "Lagos" },
  { id: 7, img: "/images/outreach-07.jpg", paddingBottom: "100%", cap: "Our first event", sub: "Lagos State" },
  { id: 8, img: "/images/outreach-08.jpg", paddingBottom: "75%", cap: "Volunteers on the ground", sub: "Outreach day" },
  { id: 9, img: "/images/outreach-09.jpg", paddingBottom: "120%", cap: "Sharing a meal", sub: "On the street" },
  { id: 10, img: "/images/outreach-10.jpg", paddingBottom: "100%", cap: "Notebooks & textbooks", sub: "Back to school" },
  { id: 11, img: "/images/outreach-11.jpg", paddingBottom: "75%", cap: "Smiles that say it all", sub: "Community visit" },
  { id: 12, img: "/images/outreach-12.jpg", paddingBottom: "128%", cap: "Not forgotten", sub: "Every visit, documented" },
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
            <div
              className="img"
              style={{ backgroundImage: `url("${tile.img}")` }}
            ></div>
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
