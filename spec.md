# Afzal Mughal Portfolio – VIP Redesign

## Current State
A React portfolio with blue gradient background, white card sections, glassmorphism cards, rainbow name animation, typewriter subtitle, oval profile photo, floating WhatsApp/TikTok buttons, and sections: Hero, About, Education, Skills, Projects, Objective, Contact, QR Code.

## Requested Changes (Diff)

### Add
- Luxury dark theme: deep navy/black background with gold (#FFD700) and electric blue (#00c6ff) accents
- Particle/star background effect in hero section
- Glowing gold border on profile avatar
- Section cards with glassmorphism dark style (dark translucent background, gold/blue border glow)
- Animated skill bars with gradient gold-to-blue fill
- VIP badge/crown icon near the name
- Gold divider lines under section titles
- Dramatic entrance animations (stagger, slide-in, glow-in effects)
- Glowing gradient CTA buttons (gold/blue)
- Premium footer with gold accents

### Modify
- Background: from blue gradient to deep dark navy/black gradient
- Navbar: dark glass with gold logo accent
- Section cards: from white to dark glass (rgba dark bg, gold border)
- Section titles: from blue to gold gradient
- Skill bars: from solid color to gold-blue gradient
- Buttons: from flat blue/red/green to premium gold/blue glowing pills
- Profile avatar border: keep gold glow, enhance with pulsing animation
- Hero orbs: update to gold and deep blue tones
- QR section: dark card style
- Floating buttons: add subtle glow effect

### Remove
- White section cards
- Flat blue gradient background
- Plain blue text headings

## Implementation Plan
1. Update index.css: new dark background, gold/blue CSS variables, dark glass card styles, updated keyframes, VIP button styles
2. Update App.tsx: update all inline styles to use new dark glass theme, gold section titles, enhanced animations, VIP profile border pulse, particle orbs in hero
3. Keep all content, sections, and functionality identical — only visual redesign
