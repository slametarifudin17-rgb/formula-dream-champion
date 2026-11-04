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
- Three.js 3D scene and original greybox open-wheel car.
- 24 selectable venues based on the 2026 F1 calendar, with generated FDC track shapes. These are visual approximations, not accurate track reproductions.
- Basic track-following driving: throttle, brake, steering/lateral offset, track edge penalty, speed/gear/RPM HUD and three-lap session.
- Five simple computer-controlled rival cars following the racing line.
- Weather presets: sunny, cloudy, rain, heavy rain and dynamic wet/dry grip phases.
- Instanced spectator crowd and simple grandstand placeholders.
- Chase, TV-style and cockpit camera positions.
- iPhone home-screen web app metadata and a service worker that caches the app shell and attempts to cache Three.js for offline use.

## Known limitations / next milestones
- AI rivals are simple pace-following placeholders; no overtaking logic, collision, qualifying or race strategy.
- Circuit geometry, pit lane, kerbs, elevation, buildings and grandstands are generated approximations, not surveyed replicas.
- Weather is visual/basic grip simulation only; no puddles, spray simulation, tyre compounds or aquaplaning model.
- No pit stops, DRS/ERS, safety car, penalties, damage, career progression, championship save data or full 24-car grid yet.
- Audio is not implemented.
- Offline startup depends on the browser successfully caching the external Three.js module. First launch requires internet.
- Performance, touch behavior, and installation must be verified on actual iPhone hardware. No iPhone 11 test has been performed by the developer.

## Install on iPhone
After the site is published over HTTPS, open it in Safari, tap Share, then **Add to Home Screen**. This is an installed web app/PWA-style experience, not an App Store native binary.

## Intellectual property
FDC uses original generic visual assets and fictional identities. Public/commercial use of official F1 marks, team names/logos, driver likenesses or licensed circuit assets requires permission.
