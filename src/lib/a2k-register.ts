"use client";

// Guarded registration for a2k web components to avoid double-define during HMR/StrictMode
// Only define if not already present in the CustomElementRegistry.

import { A2kSelect } from "@a2000/select";

(() => {
  if (typeof window === "undefined") return;
  try {
    if (!customElements.get("a2k-select")) {
      customElements.define("a2k-select", A2kSelect as unknown as CustomElementConstructor);
    }
  } catch (e) {
    // Swallow errors caused by race conditions in HMR/parallel imports
    // console.debug("a2k component registration skipped:", e);
  }
})();