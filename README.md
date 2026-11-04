# FORMULA DREAM CHAMPION (FDC)

**Prototype 0.1 — browser-based 3D driving slice**

FDC is an original, mobile-first formula racing game prototype. This first build is a technical greybox, not a finished simulator.

## Run
1. Enable GitHub Pages for this repository: **Settings → Pages → Deploy from a branch → main → /(root) → Save**.
2. Open the published Pages URL in Safari.
3. Tap **START ENGINE**.
4. Use the on-screen steering, brake and throttle controls. Keyboard controls (desktop): WASD or arrow keys.

## Files
- `index.html` — app shell and HUD.
- `style.css` — responsive mobile interface.
- `game.js` — Three.js scene, greybox formula car, oval circuit and driving prototype.

## Prototype scope
- One original generic open-wheel car.
- One simple oval test circuit.
- Touchscreen and keyboard controls.
- Chase camera and basic speed/lap HUD.
- Three-lap practice session.

## Current limitations
- Uses Three.js from jsDelivr, so the first version requires an internet connection.
- Vehicle handling and lap detection are early prototype approximations.
- No opponent AI, pit stops, tyre model, damage, licensed teams, drivers, or official circuit assets yet.
- Not yet packaged as a native iOS application.
- Performance must be tested on actual iPhone models before setting frame-rate guarantees.

## IP note
Use original or properly licensed cars, logos, team identities, driver likenesses, circuit layouts and championship marks for public/commercial releases.


## Grand Prix environments (prototype expansion)

The prototype now includes a selectable 2026-inspired Grand Prix catalogue with 23 venues, per-venue layout profiles, circuit atmosphere, instanced spectator crowds and grandstands. Weather presets include sunny, cloudy, rain, heavy rain and a dynamic profile; circuit profiles can also suggest a default weather type.

**Important:** the current 3D layouts are generated approximations, not surveyed or laser-scanned reproductions. Track elevation, kerbs, pit buildings, exact corner radii, real-world crowd animation and realistic wet-weather tyre physics are not implemented yet. The 2026 venue list is based on the published Formula 1 calendar; the game uses original FDC geometry and placeholder environments rather than official licensed assets.
