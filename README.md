# FORMULA DREAM CHAMPION (FDC)

**Development build — mobile browser racing prototype**

FDC is an original formula racing game prototype designed for iPhone Safari in landscape mode. It is not a native iOS app and is not yet a finished commercial simulator.

## Play
1. Open the GitHub Pages URL in Safari.
2. Rotate iPhone to landscape.
3. Choose a Grand Prix and weather preset.
4. Tap **START ENGINE**.
5. Hold THROTTLE, steer with left/right and use BRAKE. Camera button cycles chase, TV and cockpit views.

## Current implemented prototype systems
- Three.js 3D scene and original detailed open-wheel car with custom cockpit geometry.
- 24 selectable venues: the current 2026 calendar venues plus Bahrain and Jeddah as additional F1-inspired bonus venues. The track shapes are generated FDC approximations, not accurate track reproductions.
- Basic track-following driving: throttle, brake, steering/lateral offset, track edge penalty, speed/gear/RPM HUD and selectable 5/10/15/20-lap race distances (plus 3-lap qualifying).
- Up to 23 computer-controlled rivals with basic lane avoidance (24-car grid in Grand Prix/Career; no rivals in Time Trial).
- Four game modes: Grand Prix, Career (local championship progression), Time Trial and Qualifying (three-lap best-time session).
- Four race-length presets: 25%, 50%, 75%, and 100% (prototype presets of 5/10/15/20 laps).
- Basic ERS deployment, DRS proximity/straight-zone boost logic, tyre wear indicator and manual pit-stop tyre reset.
- Live player position calculation against the AI field.
- Weather presets: sunny, cloudy, rain, heavy rain and dynamic wet/dry grip phases.
- Instanced spectator crowd and simple grandstand placeholders.
- Procedural synthesized multi-layer engine tone and basic tyre-squeal effect, and basic off-track damage/pace degradation.
- Chase, TV-style and cockpit camera positions, with a detailed FDC steering wheel, digital display, control buttons, driver arms, seat and halo.
- Basic 3D safety car with flashing lights, reduced field pace, track-limits warnings and accumulated post-race time penalties.
- Qualifying mode with best-lap timing and locally saved results.
- Career championship points, wins, race count, driver XP/levels, credits and up to three engine upgrades stored locally.
- iPhone home-screen web app metadata and a service worker that caches the app shell and attempts to cache Three.js for offline use.

## Remaining roadmap and known limitations
- AI rivals use simplified corner-aware pace and lane avoidance; advanced overtaking, full collision physics and race strategy are not implemented.
- Circuit geometry, pit lane, kerbs, elevation, buildings and grandstands are generated approximations, not surveyed replicas.
- Weather is visual/basic grip simulation only; no puddles, spray simulation, tyre compounds or aquaplaning model.
- Career includes locally saved championship points, race wins, driver XP/levels, credits and up to three engine upgrades. Contracts, transfers and a full AI driver championship remain future work.
- DRS/ERS are simplified prototype boosts, not full FIA rule simulations.
- Pit stop, tyre wear, safety car and track-limit penalties are simplified prototype mechanics; no tyre compounds, tyre temperature, full championship tables or race strategy yet.
- Procedural synthesized engine tone and basic off-track damage are implemented; tyre, wind, crowd, pit crew and radio audio are not yet implemented.
- Offline startup depends on the browser successfully caching the external Three.js module. First launch requires internet.
- Performance, touch behavior, and installation must be verified on actual iPhone hardware. No iPhone 11 test has been performed by the developer.

## Install on iPhone
After the site is published over HTTPS, open it in Safari, tap Share, then **Add to Home Screen**. This is an installed web app/PWA-style experience, not an App Store native binary.

## Intellectual property
FDC uses original generic visual assets and fictional identities. Public/commercial use of official F1 marks, team names/logos, driver likenesses or licensed circuit assets requires permission.
