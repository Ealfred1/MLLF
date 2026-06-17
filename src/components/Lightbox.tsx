"use client";

import { useEffect, useState } from "react";

export default function Lightbox() {
  const [isOpen, setIsOpen] = useState(false);
  const [imgSrc, setImgSrc] = useState("");
  const [caption, setCaption] = useState("");

  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const tile = target.closest(".mtile, .gtile") as HTMLElement | null;
      if (tile && tile.dataset.img) {
        let src = tile.dataset.img;
        if (src === "ph") {
          src = "/images/outreach-01.jpg";
        } else if (src === "photo") {
          src = "/images/founder.jpg";
        }
        
        const cap = tile.dataset.cap || "";
        const sub = tile.dataset.sub || "";
        
        setImgSrc(src);
        setCaption(cap + (sub ? " — " + sub : ""));
        setIsOpen(true);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleGlobalClick);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("click", handleGlobalClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div
      className="lightbox on"
      id="lightbox"
      onClick={() => setIsOpen(false)}
    >
      <span className="lb-close">✕ close</span>
      <div className="lb-inner" onClick={(e) => e.stopPropagation()}>
        <img id="lbImg" src={imgSrc} alt="Outreach photo" />
        <div className="lb-cap" id="lbCap">
          {caption}
        </div>
      </div>
    </div>
  );
}
