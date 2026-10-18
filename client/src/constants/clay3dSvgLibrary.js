/**
 * 3D Claymorphic Vector SVGs matching the Microsoft Fluent 3D clay toy aesthetic
 * - No background circle badges
 * - Volumetric linear and radial lighting gradients
 * - Soft diffuse highlights and under-shadows
 * - Chubby, friendly, rounded clay silhouettes
 */

export const CLAY_3D_SVGS = {
  // 1. TABLE - 3D Clay Handcrafted Oak Table
  "table": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <defs>
    <radialGradient id="tableTopGloss" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#E2A76F"/>
      <stop offset="50%" stop-color="#C2824B"/>
      <stop offset="100%" stop-color="#8F5322"/>
    </radialGradient>
    <linearGradient id="tableBevel" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#733F17"/>
      <stop offset="100%" stop-color="#4E270B"/>
    </linearGradient>
    <linearGradient id="tableLegGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#A56736"/>
      <stop offset="45%" stop-color="#C88E5B"/>
      <stop offset="100%" stop-color="#643612"/>
    </linearGradient>
    <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.25 0"/>
      <feOffset dx="0" dy="4"/>
      <feBlend in="SourceGraphic" in2="blurOut" mode="normal"/>
    </filter>
  </defs>
  <!-- Ground contact soft shadow -->
  <ellipse cx="60" cy="105" rx="46" ry="7" fill="rgba(0,0,0,0.18)"/>
  
  <!-- Back 2 Cylindrical Clay Legs -->
  <rect x="30" y="52" width="10" height="46" rx="5" fill="url(#tableLegGrad)" opacity="0.85"/>
  <rect x="80" y="52" width="10" height="46" rx="5" fill="url(#tableLegGrad)" opacity="0.85"/>
  
  <!-- Front 2 Cylindrical Clay Legs with Highlight -->
  <rect x="18" y="58" width="11" height="46" rx="5.5" fill="url(#tableLegGrad)"/>
  <rect x="20.5" y="60" width="3" height="42" rx="1.5" fill="#F4D3B2" opacity="0.6"/>
  <rect x="91" y="58" width="11" height="46" rx="5.5" fill="url(#tableLegGrad)"/>
  <rect x="93.5" y="60" width="3" height="42" rx="1.5" fill="#F4D3B2" opacity="0.6"/>
  
  <!-- Lower Table Apron / Thickness -->
  <rect x="12" y="44" width="96" height="18" rx="8" fill="url(#tableBevel)"/>
  
  <!-- Main Rounded 3D Clay Tabletop -->
  <rect x="8" y="24" width="104" height="26" rx="13" fill="url(#tableTopGloss)" filter="url(#softShadow)"/>
  
  <!-- Specular 3D Clay Highlight Ribbon across Tabletop -->
  <path d="M 22,29 Q 60,26 98,29" stroke="#FFF0DF" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.75"/>
  <ellipse cx="36" cy="32" rx="14" ry="4" fill="#FFFFFF" opacity="0.4"/>
</svg>`,

  // 2. SKIRT - 3D Clay Pastel Pink Pleated Skirt
  "skirt": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <defs>
    <radialGradient id="skirtWaist" cx="40%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#F472B6"/>
      <stop offset="60%" stop-color="#DB2777"/>
      <stop offset="100%" stop-color="#9D174D"/>
    </radialGradient>
    <linearGradient id="foldLight" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#F472B6"/>
      <stop offset="45%" stop-color="#FBCFE8"/>
      <stop offset="100%" stop-color="#DB2777"/>
    </linearGradient>
    <linearGradient id="foldShadow" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#BE185D"/>
      <stop offset="50%" stop-color="#831843"/>
      <stop offset="100%" stop-color="#BE185D"/>
    </linearGradient>
  </defs>
  <!-- Soft ground shadow -->
  <ellipse cx="60" cy="108" rx="42" ry="6" fill="rgba(0,0,0,0.16)"/>
  
  <!-- Waistband / Belt (Thick rounded clay belt) -->
  <rect x="36" y="20" width="48" height="16" rx="8" fill="url(#skirtWaist)"/>
  <!-- Gold Clay Buckle / Button -->
  <circle cx="60" cy="28" r="5" fill="#FDE047"/>
  <circle cx="58.5" cy="26.5" r="1.8" fill="#FFFFFF"/>
  <path d="M 42,24 Q 60,22 78,24" stroke="#FCE7F3" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.8"/>
  
  <!-- 3D Clay Pleated Folds (Volumetric Clay Flutes) -->
  <!-- Left Deep Flute -->
  <path d="M 38,34 L 16,92 C 24,98 32,96 36,92 L 44,34 Z" fill="url(#foldShadow)"/>
  <path d="M 22,86 C 26,94 34,92 38,86 L 44,34 L 38,34 Z" fill="url(#foldLight)"/>
  
  <!-- Mid-Left Flute -->
  <path d="M 44,34 L 36,92 C 44,98 52,98 56,92 L 52,34 Z" fill="url(#foldLight)"/>
  <path d="M 42,38 L 44,88" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" opacity="0.5"/>
  
  <!-- Center Main Flute (Bulging 3D Clay Volume) -->
  <path d="M 50,34 L 54,94 C 60,98 68,98 72,94 L 68,34 Z" fill="url(#foldLight)"/>
  <path d="M 60,38 L 62,90" stroke="#FFFFFF" stroke-width="3.5" stroke-linecap="round" opacity="0.6"/>
  
  <!-- Mid-Right Flute -->
  <path d="M 66,34 L 72,92 C 78,98 86,96 90,92 L 76,34 Z" fill="url(#foldLight)"/>
  
  <!-- Right Deep Flute -->
  <path d="M 76,34 L 88,92 C 96,96 104,92 102,86 L 82,34 Z" fill="url(#foldShadow)"/>
  <path d="M 78,34 L 86,90 C 92,94 98,92 98,88 L 82,34 Z" fill="url(#foldLight)"/>
  
  <!-- Rounded Clay Hem Bead at Bottom -->
  <path d="M 16,90 Q 38,100 60,98 Q 84,100 102,88" stroke="#FDF2F8" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.7"/>
</svg>`,

  // 3. TRICERATOPS - 3D Soft Emerald Clay Dinosaur with 3 Ivory Horns & Scalloped Frill
  "triceratops": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <defs>
    <radialGradient id="triBody" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#6EE7B7"/>
      <stop offset="45%" stop-color="#10B981"/>
      <stop offset="100%" stop-color="#047857"/>
    </radialGradient>
    <radialGradient id="triFrill" cx="40%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#A7F3D0"/>
      <stop offset="50%" stop-color="#059669"/>
      <stop offset="100%" stop-color="#064E3B"/>
    </radialGradient>
    <linearGradient id="hornClay" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFBEB"/>
      <stop offset="45%" stop-color="#FEF3C7"/>
      <stop offset="100%" stop-color="#D97706"/>
    </linearGradient>
  </defs>
  <!-- Soft ground shadow -->
  <ellipse cx="60" cy="110" rx="44" ry="7" fill="rgba(0,0,0,0.18)"/>
  
  <!-- Tail (Thick rounded clay tail) -->
  <path d="M 88,76 Q 106,78 114,88 Q 100,94 84,86 Z" fill="url(#triBody)"/>
  
  <!-- Back Legs (Chubby rounded clay cylinders) -->
  <rect x="74" y="74" width="16" height="30" rx="8" fill="#047857"/>
  <ellipse cx="82" cy="103" rx="7" ry="4" fill="#065F46"/>
  <rect x="28" y="74" width="15" height="30" rx="7.5" fill="#047857"/>
  <ellipse cx="35" cy="103" rx="7" ry="4" fill="#065F46"/>
  
  <!-- Main Chubby Body -->
  <ellipse cx="60" cy="74" rx="30" ry="22" fill="url(#triBody)"/>
  <!-- Belly Highlight Glow -->
  <ellipse cx="58" cy="70" rx="20" ry="12" fill="#6EE7B7" opacity="0.45"/>
  
  <!-- Front Legs (Chubby rounded with 3D highlight) -->
  <rect x="36" y="76" width="16" height="30" rx="8" fill="url(#triBody)"/>
  <rect x="38" y="78" width="4" height="22" rx="2" fill="#A7F3D0" opacity="0.7"/>
  <ellipse cx="44" cy="105" rx="8" ry="4" fill="#065F46"/>
  <!-- Round Clay Toenails -->
  <circle cx="40" cy="105" r="2" fill="#FEF3C7"/>
  <circle cx="44" cy="106" r="2.2" fill="#FEF3C7"/>
  <circle cx="48" cy="105" r="2" fill="#FEF3C7"/>
  
  <rect x="68" y="76" width="16" height="30" rx="8" fill="url(#triBody)"/>
  <rect x="70" y="78" width="4" height="22" rx="2" fill="#A7F3D0" opacity="0.7"/>
  <ellipse cx="76" cy="105" rx="8" ry="4" fill="#065F46"/>
  <circle cx="72" cy="105" r="2" fill="#FEF3C7"/>
  <circle cx="76" cy="106" r="2.2" fill="#FEF3C7"/>
  <circle cx="80" cy="105" r="2" fill="#FEF3C7"/>
  
  <!-- Large Neck Frill with Scalloped Clay Knobs -->
  <path d="M 32,56 C 24,32 50,18 64,28 C 76,38 68,60 52,64 Z" fill="url(#triFrill)"/>
  <!-- Frill decorative clay bosses -->
  <circle cx="34" cy="48" r="3.5" fill="#FDE047"/>
  <circle cx="40" cy="34" r="4" fill="#FDE047"/>
  <circle cx="52" cy="26" r="4.2" fill="#FDE047"/>
  <circle cx="64" cy="30" r="4" fill="#FDE047"/>
  <circle cx="70" cy="42" r="3.5" fill="#FDE047"/>
  
  <!-- Rounded Clay Head -->
  <ellipse cx="36" cy="64" rx="18" ry="16" fill="url(#triBody)"/>
  <!-- Cute Beak / Snout -->
  <path d="M 22,66 Q 14,72 20,78 Q 28,80 32,74 Z" fill="#065F46"/>
  <ellipse cx="22" cy="72" rx="3.5" ry="3" fill="#FEF3C7"/>
  
  <!-- 3 Ivory Clay Horns -->
  <!-- Nose Horn -->
  <path d="M 22,64 C 20,52 24,46 26,44 C 27,48 27,56 26,64 Z" fill="url(#hornClay)"/>
  <!-- Brow Horn 1 (Front) -->
  <path d="M 32,54 C 26,30 28,18 34,14 C 38,20 40,36 38,54 Z" fill="url(#hornClay)"/>
  <path d="M 31,50 Q 32,24 34,16" stroke="#FFFFFF" stroke-width="1.8" stroke-linecap="round" fill="none" opacity="0.7"/>
  <!-- Brow Horn 2 (Back) -->
  <path d="M 44,50 C 44,32 46,24 50,20 C 52,26 52,38 48,50 Z" fill="url(#hornClay)" opacity="0.85"/>
  
  <!-- Glossy 3D Clay Eye -->
  <ellipse cx="38" cy="58" rx="4.5" ry="5" fill="#0F172A"/>
  <circle cx="36.5" cy="56" r="1.8" fill="#FFFFFF"/>
  <circle cx="39.5" cy="59.5" r="0.8" fill="#FFFFFF"/>
  <!-- Cute Happy Smile -->
  <path d="M 26,74 Q 30,77 34,74" stroke="#064E3B" stroke-width="2" stroke-linecap="round" fill="none"/>
</svg>`,

  // 4. STEGOSAURUS - 3D Amber-Green Dinosaur with Coral-Orange Back Plates & Spiked Tail
  "stegosaurus": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <defs>
    <radialGradient id="stegoBody" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#A3E635"/>
      <stop offset="50%" stop-color="#65A30D"/>
      <stop offset="100%" stop-color="#3F6212"/>
    </radialGradient>
    <radialGradient id="plateCoral" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#FDBA74"/>
      <stop offset="45%" stop-color="#FB923C"/>
      <stop offset="100%" stop-color="#C2410C"/>
    </radialGradient>
  </defs>
  <!-- Ground contact shadow -->
  <ellipse cx="60" cy="110" rx="46" ry="7" fill="rgba(0,0,0,0.18)"/>
  
  <!-- Back Row Plates (Darker Coral) -->
  <polygon points="34,42 42,22 48,42" fill="#C2410C"/>
  <polygon points="50,38 60,16 68,38" fill="#C2410C"/>
  <polygon points="70,40 80,20 86,40" fill="#C2410C"/>
  <polygon points="88,48 96,32 100,50" fill="#C2410C"/>
  
  <!-- Tail (Sweeping upwards with 4 Thagomizer Spikes) -->
  <path d="M 78,74 Q 98,72 108,60 Q 112,68 94,84 Z" fill="url(#stegoBody)"/>
  <!-- 4 Clay Tail Spikes -->
  <polygon points="104,58 116,46 108,62" fill="#FEF08A"/>
  <polygon points="106,62 118,56 108,66" fill="#FEF08A"/>
  <polygon points="102,66 114,70 102,72" fill="#FEF08A"/>
  <polygon points="98,72 110,80 96,78" fill="#FEF08A"/>
  
  <!-- Chubby Back Legs -->
  <rect x="68" y="76" width="16" height="30" rx="8" fill="#365314"/>
  <ellipse cx="76" cy="105" rx="8" ry="4" fill="#1A2E05"/>
  <rect x="28" y="76" width="14" height="28" rx="7" fill="#365314"/>
  
  <!-- High Arched Body (Thick round 3D clay) -->
  <ellipse cx="56" cy="72" rx="30" ry="22" fill="url(#stegoBody)"/>
  <ellipse cx="54" cy="68" rx="20" ry="12" fill="#BEF264" opacity="0.45"/>
  
  <!-- Front Chubby Legs with Highlights -->
  <rect x="36" y="78" width="15" height="28" rx="7.5" fill="url(#stegoBody)"/>
  <rect x="38" y="80" width="3.5" height="20" rx="1.5" fill="#ECFCCB" opacity="0.7"/>
  <ellipse cx="43" cy="105" rx="7.5" ry="4" fill="#1A2E05"/>
  <circle cx="40" cy="105" r="1.8" fill="#FEF08A"/>
  <circle cx="44" cy="106" r="2" fill="#FEF08A"/>
  <circle cx="48" cy="105" r="1.8" fill="#FEF08A"/>
  
  <!-- Small Cute Low Head -->
  <path d="M 38,76 C 30,76 18,80 14,84 C 18,92 28,90 36,84 Z" fill="url(#stegoBody)"/>
  <ellipse cx="20" cy="84" rx="4.5" ry="4" fill="#4D7C0F"/>
  <!-- Glossy 3D Eye -->
  <circle cx="22" cy="82" r="3" fill="#0F172A"/>
  <circle cx="21" cy="81" r="1.2" fill="#FFFFFF"/>
  <circle cx="23" cy="83" r="0.6" fill="#FFFFFF"/>
  
  <!-- Front Row Main 3D Clay Plates (Big, volumetric coral plates) -->
  <polygon points="26,50 32,30 40,50" fill="url(#plateCoral)"/>
  <path d="M 32,32 L 32,48" stroke="#FED7AA" stroke-width="2" stroke-linecap="round"/>
  
  <polygon points="42,44 52,18 62,44" fill="url(#plateCoral)"/>
  <path d="M 52,22 L 52,42" stroke="#FED7AA" stroke-width="2.5" stroke-linecap="round"/>
  
  <polygon points="62,44 74,22 84,46" fill="url(#plateCoral)"/>
  <path d="M 74,26 L 74,44" stroke="#FED7AA" stroke-width="2.5" stroke-linecap="round"/>
  
  <polygon points="82,52 90,34 98,54" fill="url(#plateCoral)"/>
  <path d="M 90,36 L 90,52" stroke="#FED7AA" stroke-width="2" stroke-linecap="round"/>
</svg>`,

  // 5. PTERODACTYL - 3D Sky-Blue Flying Pterosaur with Sweeping Wings & Golden Beak
  "pterodactyl": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <defs>
    <radialGradient id="pteroBody" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#7DD3FC"/>
      <stop offset="50%" stop-color="#0284C7"/>
      <stop offset="100%" stop-color="#0369A1"/>
    </radialGradient>
    <linearGradient id="pteroWingClay" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#BAE6FD"/>
      <stop offset="45%" stop-color="#38BDF8"/>
      <stop offset="100%" stop-color="#0284C7"/>
    </linearGradient>
    <linearGradient id="goldBeak" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FDE047"/>
      <stop offset="50%" stop-color="#F59E0B"/>
      <stop offset="100%" stop-color="#D97706"/>
    </linearGradient>
  </defs>
  <!-- Flight shadow below -->
  <ellipse cx="60" cy="112" rx="42" ry="5" fill="rgba(0,0,0,0.14)"/>
  
  <!-- Left Clay Wing (Large sweeping rounded airfoil) -->
  <path d="M 54,62 C 38,36 18,28 8,36 C 8,56 28,78 50,72 Z" fill="url(#pteroWingClay)"/>
  <path d="M 52,60 C 38,38 22,32 10,38" stroke="#E0F2FE" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.8"/>
  <ellipse cx="28" cy="50" rx="12" ry="5" fill="#FFFFFF" opacity="0.25"/>
  
  <!-- Right Clay Wing -->
  <path d="M 66,62 C 82,36 102,28 112,36 C 112,56 92,78 70,72 Z" fill="url(#pteroWingClay)"/>
  <path d="M 68,60 C 82,38 98,32 110,38" stroke="#E0F2FE" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.8"/>
  <ellipse cx="92" cy="50" rx="12" ry="5" fill="#FFFFFF" opacity="0.25"/>
  
  <!-- Chubby Torpedo Clay Body -->
  <ellipse cx="60" cy="68" rx="12" ry="20" fill="url(#pteroBody)"/>
  <ellipse cx="60" cy="66" rx="7" ry="12" fill="#BAE6FD" opacity="0.5"/>
  
  <!-- Cute little feet tucked under -->
  <ellipse cx="55" cy="88" rx="3.5" ry="5" fill="#F59E0B"/>
  <ellipse cx="65" cy="88" rx="3.5" ry="5" fill="#F59E0B"/>
  
  <!-- Long Red-Orange Head Crest (Iconic Pterosaur Crest) -->
  <path d="M 58,54 C 54,34 42,20 34,16 C 46,24 54,38 60,48 Z" fill="#EF4444"/>
  <path d="M 40,22 Q 48,32 54,44" stroke="#FCA5A5" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.8"/>
  
  <!-- Round Head -->
  <circle cx="60" cy="52" r="10" fill="url(#pteroBody)"/>
  
  <!-- Curved Golden Clay Beak -->
  <path d="M 62,50 Q 86,54 94,62 Q 80,66 64,58 Z" fill="url(#goldBeak)"/>
  <path d="M 64,53 Q 82,56 90,62" stroke="#FFFBEB" stroke-width="1.8" stroke-linecap="round" fill="none" opacity="0.8"/>
  
  <!-- Glossy 3D Eye -->
  <circle cx="62" cy="50" r="3.2" fill="#0F172A"/>
  <circle cx="61" cy="49" r="1.3" fill="#FFFFFF"/>
  <circle cx="63" cy="51" r="0.6" fill="#FFFFFF"/>
</svg>`,

  // 6. VELOCIRAPTOR - 3D Agile Amber/Tangerine Raptor with Curved Foot Sickle Claw
  "velociraptor": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <defs>
    <radialGradient id="raptorBody" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#FB923C"/>
      <stop offset="50%" stop-color="#EA580C"/>
      <stop offset="100%" stop-color="#9A3412"/>
    </radialGradient>
    <linearGradient id="sickleClaw" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="50%" stop-color="#FEF08A"/>
      <stop offset="100%" stop-color="#CA8A04"/>
    </linearGradient>
  </defs>
  <!-- Ground contact shadow -->
  <ellipse cx="60" cy="110" rx="44" ry="7" fill="rgba(0,0,0,0.18)"/>
  
  <!-- Long Counterbalancing Tail -->
  <path d="M 52,72 Q 22,66 8,56 Q 14,64 48,80 Z" fill="url(#raptorBody)"/>
  <!-- Feathered Tail Tip Tuft -->
  <polygon points="8,56 2,52 6,60" fill="#DC2626"/>
  <polygon points="12,58 6,56 10,64" fill="#DC2626"/>
  
  <!-- Far Running Leg -->
  <rect x="42" y="74" width="10" height="26" rx="5" fill="#7C2D12"/>
  <path d="M 46,98 L 40,105 L 50,105 Z" fill="#431407"/>
  
  <!-- Main Agile Body -->
  <ellipse cx="58" cy="70" rx="20" ry="15" transform="rotate(-15, 58, 70)" fill="url(#raptorBody)"/>
  <ellipse cx="58" cy="68" rx="12" ry="8" fill="#FED7AA" opacity="0.45"/>
  
  <!-- Near Powerful Running Leg with SICKLE CLAW -->
  <path d="M 60,72 Q 68,82 64,96 L 74,105" stroke="#EA580C" stroke-width="8" stroke-linecap="round" fill="none"/>
  <!-- Foot Pads -->
  <ellipse cx="72" cy="105" rx="8" ry="3.5" fill="#7C2D12"/>
  <!-- ICONIC CURVED 3D SICKLE CLAW (Raised off the ground!) -->
  <path d="M 66,96 C 64,86 70,82 76,82 C 74,88 72,94 66,96 Z" fill="url(#sickleClaw)"/>
  <path d="M 68,93 Q 71,86 74,84" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" fill="none"/>
  
  <!-- Cute Folded Forearm / Winglets -->
  <path d="M 66,66 Q 76,70 72,78 M 72,78 L 76,80 M 70,78 L 72,82" stroke="#7C2D12" stroke-width="3" stroke-linecap="round" fill="none"/>
  <path d="M 64,66 Q 74,68 70,76" stroke="#FB923C" stroke-width="3" stroke-linecap="round" fill="none"/>
  
  <!-- Curved S-Neck & Head -->
  <path d="M 68,66 C 72,56 76,46 84,42 C 96,42 108,46 106,56 C 96,62 84,60 76,66 Z" fill="url(#raptorBody)"/>
  <!-- Snout highlights & sharp little white teeth -->
  <polygon points="94,54 96,58 98,54" fill="#FFFFFF"/>
  <polygon points="100,53 102,57 104,53" fill="#FFFFFF"/>
  
  <!-- Feathery Crest / Mohawk on head -->
  <polygon points="82,42 84,32 88,40" fill="#DC2626"/>
  <polygon points="86,40 90,30 94,40" fill="#DC2626"/>
  <polygon points="92,40 96,34 98,42" fill="#DC2626"/>
  
  <!-- Glossy 3D Gold Eye -->
  <circle cx="88" cy="46" r="3.5" fill="#FACC15"/>
  <circle cx="88" cy="46" r="2.2" fill="#0F172A"/>
  <circle cx="87" cy="45" r="1" fill="#FFFFFF"/>
</svg>`,

  // 7. SPINOSAURUS - 3D Deep Aqua Spinosaur with Vibrant Red/Yellow Dorsal Sail
  "spinosaurus": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <defs>
    <radialGradient id="spinoBodyClay" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#2DD4BF"/>
      <stop offset="50%" stop-color="#0D9488"/>
      <stop offset="100%" stop-color="#115E59"/>
    </radialGradient>
    <linearGradient id="sailClay" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#0D9488"/>
      <stop offset="40%" stop-color="#F59E0B"/>
      <stop offset="80%" stop-color="#F43F5E"/>
      <stop offset="100%" stop-color="#E11D48"/>
    </linearGradient>
  </defs>
  <!-- Ground contact shadow -->
  <ellipse cx="60" cy="110" rx="46" ry="7" fill="rgba(0,0,0,0.18)"/>
  
  <!-- MAGNIFICENT 3D CLAY DORSAL SAIL -->
  <path d="M 38,62 C 34,22 82,14 88,60 Z" fill="url(#sailClay)"/>
  <!-- Sail Neural Spine Ridges -->
  <line x1="46" y1="58" x2="44" y2="34" stroke="#FEF08A" stroke-width="2" stroke-linecap="round"/>
  <line x1="56" y1="56" x2="56" y2="22" stroke="#FEF08A" stroke-width="2.5" stroke-linecap="round"/>
  <line x1="66" y1="56" x2="68" y2="20" stroke="#FEF08A" stroke-width="2.5" stroke-linecap="round"/>
  <line x1="76" y1="56" x2="78" y2="28" stroke="#FEF08A" stroke-width="2" stroke-linecap="round"/>
  <path d="M 40,38 Q 62,20 86,34" stroke="#FFF1F2" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.6"/>
  
  <!-- Long Paddle/Crocodile-like Tail -->
  <path d="M 46,74 Q 24,76 10,70 Q 20,84 42,86 Z" fill="url(#spinoBodyClay)"/>
  <path d="M 12,70 Q 24,68 36,72" stroke="#042F2E" stroke-width="3" stroke-linecap="round" fill="none"/>
  
  <!-- Back Chubby Leg -->
  <rect x="44" y="78" width="15" height="28" rx="7.5" fill="#042F2E"/>
  <ellipse cx="51" cy="105" rx="7.5" ry="4" fill="#021C1B"/>
  
  <!-- Main Heavy Body -->
  <ellipse cx="62" cy="72" rx="26" ry="18" fill="url(#spinoBodyClay)"/>
  <ellipse cx="62" cy="68" rx="16" ry="10" fill="#99F6E4" opacity="0.45"/>
  
  <!-- Front Walking Leg with Highlights -->
  <rect x="68" y="78" width="15" height="28" rx="7.5" fill="url(#spinoBodyClay)"/>
  <rect x="70" y="80" width="3.5" height="20" rx="1.5" fill="#CCFBF1" opacity="0.7"/>
  <ellipse cx="75" cy="105" rx="7.5" ry="4" fill="#021C1B"/>
  <circle cx="72" cy="105" r="1.8" fill="#FEF08A"/>
  <circle cx="76" cy="106" r="2" fill="#FEF08A"/>
  <circle cx="80" cy="105" r="1.8" fill="#FEF08A"/>
  
  <!-- Elongated Crocodile Snout Head -->
  <path d="M 76,66 C 82,60 98,58 112,64 C 104,74 88,74 76,72 Z" fill="url(#spinoBodyClay)"/>
  <path d="M 88,68 L 108,68" stroke="#042F2E" stroke-width="2"/>
  <!-- Conical Fish-catching Teeth -->
  <polygon points="94,68 96,72 98,68" fill="#FFFFFF"/>
  <polygon points="100,68 102,72 104,68" fill="#FFFFFF"/>
  <circle cx="108" cy="64" r="1.5" fill="#042F2E"/>
  
  <!-- Glossy 3D Eye with Brow Ridge -->
  <circle cx="84" cy="60" r="3.2" fill="#0F172A"/>
  <circle cx="83" cy="59" r="1.3" fill="#FFFFFF"/>
</svg>`,

  // 8. ANKYLOSAURUS - 3D Bronze/Pebble-Stone Armored Dinosaur with Club Tail & Side Spikes
  "ankylosaurus": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <defs>
    <radialGradient id="ankyBodyClay" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#A8A29E"/>
      <stop offset="50%" stop-color="#78716C"/>
      <stop offset="100%" stop-color="#44403C"/>
    </radialGradient>
    <radialGradient id="clubClay" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#D6D3D1"/>
      <stop offset="50%" stop-color="#A8A29E"/>
      <stop offset="100%" stop-color="#57534E"/>
    </radialGradient>
  </defs>
  <!-- Ground contact shadow -->
  <ellipse cx="60" cy="110" rx="46" ry="7" fill="rgba(0,0,0,0.18)"/>
  
  <!-- Heavy Tail with Bone Club -->
  <path d="M 38,76 L 14,76" stroke="#292524" stroke-width="7" stroke-linecap="round"/>
  <!-- HEAVY 3D ROUNDED BONE CLUB -->
  <ellipse cx="12" cy="76" rx="10" ry="8" fill="url(#clubClay)"/>
  <ellipse cx="10" cy="74" rx="5" ry="3" fill="#FFFFFF" opacity="0.5"/>
  <circle cx="8" cy="76" r="2.5" fill="#E7E5E4"/>
  <circle cx="16" cy="76" r="2.5" fill="#E7E5E4"/>
  
  <!-- 4 Low Sturdy Cylindrical Legs -->
  <rect x="36" y="80" width="14" height="24" rx="7" fill="#292524"/>
  <ellipse cx="43" cy="103" rx="7" ry="3.5" fill="#1C1917"/>
  <rect x="72" y="80" width="14" height="24" rx="7" fill="#292524"/>
  <ellipse cx="79" cy="103" rx="7" ry="3.5" fill="#1C1917"/>
  
  <!-- Thick Dome-shaped Armor Carapace -->
  <ellipse cx="58" cy="70" rx="32" ry="22" fill="url(#ankyBodyClay)"/>
  <ellipse cx="56" cy="65" rx="20" ry="12" fill="#E7E5E4" opacity="0.35"/>
  
  <!-- Front Chubby Legs with Highlights -->
  <rect x="46" y="82" width="14" height="24" rx="7" fill="url(#ankyBodyClay)"/>
  <rect x="48" y="84" width="3" height="16" rx="1.5" fill="#F5F5F4" opacity="0.6"/>
  <ellipse cx="53" cy="105" rx="7" ry="3.5" fill="#1C1917"/>
  
  <rect x="64" y="82" width="14" height="24" rx="7" fill="url(#ankyBodyClay)"/>
  <rect x="66" y="84" width="3" height="16" rx="1.5" fill="#F5F5F4" opacity="0.6"/>
  <ellipse cx="71" cy="105" rx="7" ry="3.5" fill="#1C1917"/>
  
  <!-- Lateral Armor Spikes along the Flank -->
  <polygon points="32,70 20,68 32,76" fill="#F5F5F4"/>
  <polygon points="44,66 36,58 46,72" fill="#F5F5F4"/>
  <polygon points="58,64 54,52 64,68" fill="#F5F5F4"/>
  <polygon points="72,66 74,54 78,72" fill="#F5F5F4"/>
  <polygon points="84,70 94,66 84,76" fill="#F5F5F4"/>
  
  <!-- Rounded Osteoderm Armor Knobs across Back -->
  <circle cx="48" cy="68" r="4" fill="#E7E5E4" opacity="0.9"/>
  <circle cx="47" cy="67" r="1.5" fill="#FFFFFF"/>
  <circle cx="62" cy="66" r="4.5" fill="#E7E5E4" opacity="0.9"/>
  <circle cx="61" cy="65" r="1.8" fill="#FFFFFF"/>
  <circle cx="74" cy="68" r="4" fill="#E7E5E4" opacity="0.9"/>
  <circle cx="73" cy="67" r="1.5" fill="#FFFFFF"/>
  <circle cx="56" cy="74" r="3.5" fill="#E7E5E4" opacity="0.8"/>
  
  <!-- Low Armored Head with Cheek Horns -->
  <polygon points="86,66 94,58 92,68" fill="#F5F5F4"/>
  <polygon points="86,76 96,78 88,80" fill="#F5F5F4"/>
  <ellipse cx="88" cy="72" rx="12" ry="10" fill="url(#ankyBodyClay)"/>
  <ellipse cx="96" cy="74" rx="4" ry="3" fill="#292524"/>
  
  <!-- Glossy 3D Eye -->
  <circle cx="88" cy="68" r="2.8" fill="#0F172A"/>
  <circle cx="87" cy="67" r="1.1" fill="#FFFFFF"/>
</svg>`,

  // 9. REVOLUTION - 3D Clay Celestial Gyroscope Standing in Place & Revolving 360 Degrees
  "revolution": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <defs>
    <radialGradient id="sphereCoreGloss" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#38BDF8"/>
      <stop offset="45%" stop-color="#0284C7"/>
      <stop offset="85%" stop-color="#0369A1"/>
      <stop offset="100%" stop-color="#0C4A6E"/>
    </radialGradient>
    <radialGradient id="sunGoldCore" cx="40%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#FEF08A"/>
      <stop offset="50%" stop-color="#F59E0B"/>
      <stop offset="100%" stop-color="#B45309"/>
    </radialGradient>
    <linearGradient id="ringGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FDE047"/>
      <stop offset="50%" stop-color="#F59E0B"/>
      <stop offset="100%" stop-color="#D97706"/>
    </linearGradient>
    <linearGradient id="ringCyanGrad" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#67E8F9"/>
      <stop offset="50%" stop-color="#06B6D4"/>
      <stop offset="100%" stop-color="#0E7490"/>
    </linearGradient>
    <linearGradient id="standBaseGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#CBD5E1"/>
      <stop offset="50%" stop-color="#64748B"/>
      <stop offset="100%" stop-color="#334155"/>
    </linearGradient>
    <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="2.5"/>
      <feOffset dx="0" dy="3"/>
      <feBlend in="SourceGraphic" in2="blurOut" mode="normal"/>
    </filter>
    <style>
      @keyframes spin360Clockwise {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      @keyframes spin360Counter {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(-360deg); }
      }
      .spin-ring-cw {
        transform-origin: 60px 60px;
        animation: spin360Clockwise 7s linear infinite;
      }
      .spin-ring-ccw {
        transform-origin: 60px 60px;
        animation: spin360Counter 10s linear infinite;
      }
      .spin-orbit-beads {
        transform-origin: 60px 60px;
        animation: spin360Clockwise 4.5s linear infinite;
      }
    </style>
  </defs>

  <!-- Stable Ground Contact Shadow -->
  <ellipse cx="60" cy="110" rx="38" ry="6" fill="rgba(0,0,0,0.2)"/>

  <!-- Solid Gyroscope Pedestal Stand (Standing Firmly in One Place) -->
  <path d="M 42,107 Q 60,103 78,107 L 74,111 L 46,111 Z" fill="url(#standBaseGrad)"/>
  <rect x="57" y="86" width="6" height="21" rx="3" fill="url(#standBaseGrad)"/>
  <!-- Curved Brass Supporting Arm -->
  <path d="M 60,90 C 22,90 22,34 60,34" fill="none" stroke="url(#standBaseGrad)" stroke-width="4.5" stroke-linecap="round"/>
  <circle cx="60" cy="34" r="3.5" fill="#F8FAFC"/>
  <circle cx="60" cy="88" r="3.5" fill="#F8FAFC"/>

  <!-- Central 3D Celestial Core Sphere (Standing Perfectly Anchored at 60, 60) -->
  <circle cx="60" cy="60" r="22" fill="url(#sphereCoreGloss)" filter="url(#softGlow)"/>
  <!-- Latitude / Longitude 3D Clay Bands on Sphere -->
  <ellipse cx="60" cy="60" rx="22" ry="7" fill="none" stroke="#7DD3FC" stroke-width="1.8" opacity="0.5"/>
  <ellipse cx="60" cy="60" rx="9" ry="22" fill="none" stroke="#7DD3FC" stroke-width="1.8" opacity="0.5"/>
  <!-- Gloss Specular 3D Highlight Ribbon -->
  <ellipse cx="52" cy="52" rx="7" ry="3.5" transform="rotate(-30 52 52)" fill="#FFFFFF" opacity="0.75"/>
  <circle cx="56" cy="48" r="2.5" fill="#FFFFFF" opacity="0.9"/>

  <!-- Rotating Ring 1: Golden Orbital Ring Revolving in a Circle -->
  <g className="spin-ring-cw">
    <ellipse cx="60" cy="60" rx="44" ry="17" transform="rotate(-25 60 60)" fill="none" stroke="url(#ringGoldGrad)" stroke-width="3.5" stroke-dasharray="16 7" stroke-linecap="round"/>
    <!-- Directional Arrowhead 1 on Golden Orbit -->
    <path d="M 97,42 L 105,45 L 101,36 Z" fill="#FBBF24"/>
    <!-- Directional Arrowhead 2 Opposite -->
    <path d="M 23,78 L 15,75 L 19,84 Z" fill="#FBBF24"/>
    <!-- Orbiting Clay Pearl Satellite -->
    <circle cx="100" cy="43" r="5" fill="url(#sunGoldCore)"/>
    <circle cx="98.5" cy="41.5" r="1.5" fill="#FFFFFF"/>
  </g>

  <!-- Rotating Ring 2: Cyan Neon Counter-Rotating Orbital Ring -->
  <g className="spin-ring-ccw">
    <ellipse cx="60" cy="60" rx="40" ry="15" transform="rotate(35 60 60)" fill="none" stroke="url(#ringCyanGrad)" stroke-width="2.8" stroke-dasharray="14 6" stroke-linecap="round"/>
    <!-- Directional Arrowhead on Cyan Orbit -->
    <path d="M 88,80 L 96,81 L 91,73 Z" fill="#22D3EE"/>
    <circle cx="32" cy="40" r="4" fill="#38BDF8"/>
    <circle cx="31" cy="39" r="1.2" fill="#FFFFFF"/>
  </g>

  <!-- Fast Orbiting Shimmer Sparkles & Energy Nodes -->
  <g className="spin-orbit-beads">
    <circle cx="60" cy="22" r="3" fill="#FDE047"/>
    <circle cx="60" cy="98" r="2.5" fill="#67E8F9"/>
    <path d="M 28,60 Q 30,58 32,60 Q 30,62 28,60 Z" fill="#FFFFFF"/>
    <path d="M 92,60 Q 94,58 96,60 Q 94,62 92,60 Z" fill="#FFFFFF"/>
  </g>
</svg>`,

  // 10. ROTATION / SPIN - 3D Clay Gyroscopic Rotating Arrow Ring Standing in Place
  "rotation": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <defs>
    <radialGradient id="rotCoreGrad" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#F472B6"/>
      <stop offset="50%" stop-color="#DB2777"/>
      <stop offset="100%" stop-color="#831843"/>
    </radialGradient>
    <linearGradient id="rotArrowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FDE047"/>
      <stop offset="50%" stop-color="#F59E0B"/>
      <stop offset="100%" stop-color="#EF4444"/>
    </linearGradient>
    <style>
      @keyframes rotInPlace {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      .rot-spin-cw {
        transform-origin: 60px 60px;
        animation: rotInPlace 6s linear infinite;
      }
    </style>
  </defs>
  <!-- Stationary Central 3D Sphere -->
  <ellipse cx="60" cy="108" rx="34" ry="5.5" fill="rgba(0,0,0,0.18)"/>
  <circle cx="60" cy="60" r="24" fill="url(#rotCoreGrad)"/>
  <ellipse cx="52" cy="52" rx="7" ry="3.5" transform="rotate(-30 52 52)" fill="#FFFFFF" opacity="0.75"/>
  <circle cx="56" cy="48" r="2" fill="#FFFFFF"/>

  <!-- Rotating 3D Clay Circular Arrow Ring (Standing in Place & Revolving 360 Degrees) -->
  <g className="rot-spin-cw">
    <path d="M 60,18 A 42 42 0 0 1 102,60 A 42 42 0 0 1 60,102 A 42 42 0 0 1 18,60 A 42 42 0 0 1 54,18.5" fill="none" stroke="url(#rotArrowGrad)" stroke-width="6" stroke-linecap="round"/>
    <polygon points="56,10 68,20 54,26" fill="#F59E0B"/>
    <circle cx="102" cy="60" r="4" fill="#FDE047"/>
    <circle cx="18" cy="60" r="4" fill="#F43F5E"/>
    <circle cx="60" cy="102" r="4" fill="#FB923C"/>
  </g>
</svg>`,

  "spin": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <defs>
    <radialGradient id="spinCoreGrad" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#A7F3D0"/>
      <stop offset="45%" stop-color="#10B981"/>
      <stop offset="100%" stop-color="#064E3B"/>
    </radialGradient>
    <linearGradient id="spinRibbonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#67E8F9"/>
      <stop offset="50%" stop-color="#3B82F6"/>
      <stop offset="100%" stop-color="#8B5CF6"/>
    </linearGradient>
    <style>
      @keyframes spinLoop360 {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      .spin-loop-cw {
        transform-origin: 60px 60px;
        animation: spinLoop360 5s linear infinite;
      }
    </style>
  </defs>
  <ellipse cx="60" cy="108" rx="36" ry="6" fill="rgba(0,0,0,0.2)"/>
  <circle cx="60" cy="60" r="22" fill="url(#spinCoreGrad)"/>
  <ellipse cx="53" cy="53" rx="7" ry="3" transform="rotate(-30 53 53)" fill="#FFFFFF" opacity="0.8"/>
  <g className="spin-loop-cw">
    <ellipse cx="60" cy="60" rx="42" ry="16" transform="rotate(-35 60 60)" fill="none" stroke="url(#spinRibbonGrad)" stroke-width="4.5" stroke-dasharray="20 8" stroke-linecap="round"/>
    <polygon points="96,40 106,42 99,32" fill="#38BDF8"/>
    <polygon points="24,80 14,78 21,88" fill="#818CF8"/>
    <circle cx="98" cy="40" r="4.5" fill="#FDE047"/>
  </g>
</svg>`,

  // 11. CIRCLE - 3D Clay Iridescent Torus Ring Standing in Place and Spinning
  "circle": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <defs>
    <radialGradient id="circleTorusGrad" cx="30%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#F472B6"/>
      <stop offset="35%" stop-color="#EC4899"/>
      <stop offset="70%" stop-color="#9333EA"/>
      <stop offset="100%" stop-color="#4F46E5"/>
    </radialGradient>
    <style>
      @keyframes torusSpinInPlace {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      .torus-spin-cw {
        transform-origin: 60px 60px;
        animation: torusSpinInPlace 8s linear infinite;
      }
    </style>
  </defs>
  <!-- Stationary Ground Shadow -->
  <ellipse cx="60" cy="108" rx="42" ry="7" fill="rgba(0,0,0,0.2)"/>
  
  <!-- Rotating 3D Clay Torus Ring (Stands in Place and Spins in a Circle) -->
  <g className="torus-spin-cw">
    <circle cx="60" cy="60" r="40" fill="none" stroke="url(#circleTorusGrad)" stroke-width="16"/>
    <!-- Specular Clay Highlights along the Circular Ridge -->
    <path d="M 32,32 A 40 40 0 0 1 88,32" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" opacity="0.65"/>
    <circle cx="38" cy="40" r="3" fill="#FFFFFF" opacity="0.8"/>
    <!-- 4 Clay Pearl Accent Nodes -->
    <circle cx="60" cy="20" r="5" fill="#FDE047"/>
    <circle cx="100" cy="60" r="5" fill="#38BDF8"/>
    <circle cx="60" cy="100" r="5" fill="#4ADE80"/>
    <circle cx="20" cy="60" r="5" fill="#FB7185"/>
  </g>
</svg>`,

  // 12. CROSSING - 3D Isometric Pedestrian Road Crosswalk Scene with Lamp Posts & Traffic Sign
  "crossing": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 140">
  <defs>
    <linearGradient id="roadAsphalt" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#334155"/>
      <stop offset="60%" stop-color="#1E293B"/>
      <stop offset="100%" stop-color="#0F172A"/>
    </linearGradient>
    <linearGradient id="curbConcrete" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#E2E8F0"/>
      <stop offset="40%" stop-color="#CBD5E1"/>
      <stop offset="100%" stop-color="#94A3B8"/>
    </linearGradient>
    <linearGradient id="stripeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="85%" stop-color="#F1F5F9"/>
      <stop offset="100%" stop-color="#CBD5E1"/>
    </linearGradient>
    <radialGradient id="lampGlow" cx="40%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#FEF08A"/>
      <stop offset="45%" stop-color="#FBBF24"/>
      <stop offset="85%" stop-color="#F59E0B"/>
      <stop offset="100%" stop-color="#D97706"/>
    </radialGradient>
    <radialGradient id="bushGreen" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#86EFAC"/>
      <stop offset="45%" stop-color="#22C55E"/>
      <stop offset="85%" stop-color="#15803D"/>
      <stop offset="100%" stop-color="#14532D"/>
    </radialGradient>
    <filter id="softCurbShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
      <feOffset dx="0" dy="3"/>
      <feBlend in="SourceGraphic" in2="blurOut" mode="normal"/>
    </filter>
  </defs>

  <!-- Asphalt Roadway Perspective Base -->
  <polygon points="32,70 108,70 134,124 6,124" fill="url(#roadAsphalt)"/>
  
  <!-- Left Sidewalk Curb & Raised Pavement -->
  <polygon points="6,70 32,70 6,124 0,124" fill="url(#curbConcrete)"/>
  <rect x="2" y="70" width="28" height="3" fill="#F8FAFC" opacity="0.6"/>
  <!-- Right Sidewalk Curb & Raised Pavement -->
  <polygon points="108,70 134,70 140,124 134,124" fill="url(#curbConcrete)"/>
  <rect x="110" y="70" width="28" height="3" fill="#F8FAFC" opacity="0.6"/>

  <!-- Chubby Green Bushes behind curbs -->
  <circle cx="16" cy="68" r="9" fill="url(#bushGreen)"/>
  <circle cx="26" cy="66" r="7" fill="url(#bushGreen)"/>
  <circle cx="114" cy="66" r="7" fill="url(#bushGreen)"/>
  <circle cx="124" cy="68" r="9" fill="url(#bushGreen)"/>
  <ellipse cx="14" cy="64" rx="4" ry="2" fill="#BBF7D0" opacity="0.6"/>
  <ellipse cx="122" cy="64" rx="4" ry="2" fill="#BBF7D0" opacity="0.6"/>

  <!-- 3D Zebra Crossing Stripes in Perspective with Depth -->
  <!-- Stripe 1 (Leftmost) -->
  <polygon points="20,118 31,118 42,76 35,76" fill="url(#stripeGrad)"/>
  <polygon points="20,118 31,118 31,121 20,121" fill="#94A3B8"/>
  <!-- Stripe 2 -->
  <polygon points="38,118 49,118 53,76 46,76" fill="url(#stripeGrad)"/>
  <polygon points="38,118 49,118 49,121 38,121" fill="#94A3B8"/>
  <!-- Stripe 3 (Center-Left) -->
  <polygon points="56,118 67,118 64,76 57,76" fill="url(#stripeGrad)"/>
  <polygon points="56,118 67,118 67,121 56,121" fill="#94A3B8"/>
  <!-- Stripe 4 (Center-Right) -->
  <polygon points="73,118 84,118 76,76 69,76" fill="url(#stripeGrad)"/>
  <polygon points="73,118 84,118 84,121 73,121" fill="#94A3B8"/>
  <!-- Stripe 5 -->
  <polygon points="91,118 102,118 87,76 80,76" fill="url(#stripeGrad)"/>
  <polygon points="91,118 102,118 102,121 91,121" fill="#94A3B8"/>
  <!-- Stripe 6 (Rightmost) -->
  <polygon points="109,118 120,118 98,76 91,76" fill="url(#stripeGrad)"/>
  <polygon points="109,118 120,118 120,121 109,121" fill="#94A3B8"/>

  <!-- Left Warning Bollard Lamp Post -->
  <rect x="22" y="62" width="6" height="34" rx="2" fill="#1E293B"/>
  <rect x="22" y="70" width="6" height="6" fill="#FACC15"/>
  <rect x="22" y="82" width="6" height="6" fill="#FACC15"/>
  <ellipse cx="25" cy="96" rx="6" ry="3" fill="#0F172A"/>
  <!-- Golden Sphere Lamp Left -->
  <circle cx="25" cy="58" r="8" fill="url(#lampGlow)"/>
  <circle cx="23" cy="55" r="2.5" fill="#FFFFFF" opacity="0.85"/>
  <ellipse cx="25" cy="58" rx="12" ry="12" fill="#FDE047" opacity="0.2"/>

  <!-- Right Warning Bollard Lamp Post -->
  <rect x="112" y="62" width="6" height="34" rx="2" fill="#1E293B"/>
  <rect x="112" y="70" width="6" height="6" fill="#FACC15"/>
  <rect x="112" y="82" width="6" height="6" fill="#FACC15"/>
  <ellipse cx="115" cy="96" rx="6" ry="3" fill="#0F172A"/>
  <!-- Golden Sphere Lamp Right -->
  <circle cx="115" cy="58" r="8" fill="url(#lampGlow)"/>
  <circle cx="113" cy="55" r="2.5" fill="#FFFFFF" opacity="0.85"/>
  <ellipse cx="115" cy="58" rx="12" ry="12" fill="#FDE047" opacity="0.2"/>

  <!-- Blue Pedestrian Crossing Sign Post -->
  <rect x="52" y="44" width="4" height="32" rx="1" fill="#94A3B8"/>
  <rect x="53" y="44" width="1.5" height="32" fill="#E2E8F0"/>
  <!-- Sign Blue Rounded Square -->
  <rect x="36" y="16" width="36" height="36" rx="7" fill="#2563EB" stroke="#FFFFFF" stroke-width="2.5" filter="url(#softCurbShadow)"/>
  <!-- Inner White Triangle -->
  <polygon points="54,20 70,47 38,47" fill="#FFFFFF"/>
  <!-- Walking Person Silhouette on Crosswalk -->
  <!-- Head -->
  <circle cx="54" cy="27" r="2.5" fill="#1E3A8A"/>
  <!-- Body and Walking Limbs -->
  <path d="M 54,30 L 53,38 L 47,44 M 53,38 L 59,44 M 53,33 L 49,36 M 53,33 L 58,35" stroke="#1E3A8A" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <!-- Mini Stripes in Sign Base -->
  <line x1="43" y1="46" x2="65" y2="46" stroke="#1E3A8A" stroke-width="1.8" stroke-dasharray="3 2"/>
</svg>`,

  // 13. POLLUTION - 3D Industrial Factory Billowing Smoke, Polluted River, Trash & Floating Tire
  "pollution": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 140">
  <defs>
    <linearGradient id="factoryWall" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#94A3B8"/>
      <stop offset="40%" stop-color="#64748B"/>
      <stop offset="100%" stop-color="#475569"/>
    </linearGradient>
    <linearGradient id="chimneyClay" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#E2E8F0"/>
      <stop offset="45%" stop-color="#CBD5E1"/>
      <stop offset="100%" stop-color="#94A3B8"/>
    </linearGradient>
    <linearGradient id="redBand" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#F87171"/>
      <stop offset="45%" stop-color="#EF4444"/>
      <stop offset="100%" stop-color="#B91C1C"/>
    </linearGradient>
    <radialGradient id="smokeDark" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#94A3B8"/>
      <stop offset="45%" stop-color="#64748B"/>
      <stop offset="85%" stop-color="#475569"/>
      <stop offset="100%" stop-color="#1E293B"/>
    </radialGradient>
    <radialGradient id="smokeLight" cx="40%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#E2E8F0"/>
      <stop offset="50%" stop-color="#CBD5E1"/>
      <stop offset="85%" stop-color="#94A3B8"/>
      <stop offset="100%" stop-color="#64748B"/>
    </radialGradient>
    <linearGradient id="murkyRiver" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#334155"/>
      <stop offset="35%" stop-color="#1E3A5F"/>
      <stop offset="100%" stop-color="#0F2847"/>
    </linearGradient>
    <radialGradient id="tireGrad" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#475569"/>
      <stop offset="45%" stop-color="#1E293B"/>
      <stop offset="100%" stop-color="#090D16"/>
    </radialGradient>
  </defs>

  <!-- Giant Billowing Smoke Clouds in the Sky -->
  <!-- Back Dark Smoke Puff Layer -->
  <circle cx="56" cy="30" r="15" fill="url(#smokeDark)"/>
  <circle cx="74" cy="22" r="18" fill="url(#smokeDark)"/>
  <circle cx="94" cy="28" r="16" fill="url(#smokeDark)"/>
  <circle cx="106" cy="42" r="14" fill="url(#smokeDark)"/>
  <circle cx="44" cy="42" r="13" fill="url(#smokeDark)"/>
  
  <!-- Front Light Volumetric Smoke Clouds -->
  <circle cx="62" cy="24" r="13" fill="url(#smokeLight)"/>
  <circle cx="82" cy="18" r="15" fill="url(#smokeLight)"/>
  <circle cx="98" cy="26" r="12" fill="url(#smokeLight)"/>
  <circle cx="70" cy="36" r="14" fill="url(#smokeLight)"/>
  <circle cx="88" cy="38" r="13" fill="url(#smokeLight)"/>
  <!-- Specular highlight on smoke puffs -->
  <ellipse cx="78" cy="14" rx="8" ry="4" fill="#FFFFFF" opacity="0.45"/>
  <ellipse cx="60" cy="20" rx="6" ry="3" fill="#FFFFFF" opacity="0.45"/>

  <!-- Factory Buildings Backdrop -->
  <rect x="22" y="74" width="96" height="28" rx="4" fill="url(#factoryWall)"/>
  <!-- Roof Gables & Skylights -->
  <polygon points="26,74 36,66 46,74" fill="#475569"/>
  <polygon points="46,74 56,66 66,74" fill="#475569"/>
  <polygon points="84,74 96,64 108,74" fill="#475569"/>
  <!-- Factory Small Windows -->
  <rect x="30" y="80" width="8" height="6" rx="1.5" fill="#F8FAFC" opacity="0.85"/>
  <rect x="44" y="80" width="8" height="6" rx="1.5" fill="#F8FAFC" opacity="0.85"/>
  <rect x="92" y="80" width="8" height="6" rx="1.5" fill="#F8FAFC" opacity="0.85"/>

  <!-- Left Main Tall Chimney -->
  <path d="M 52,50 L 66,50 L 68,78 L 50,78 Z" fill="url(#chimneyClay)"/>
  <!-- Red and White Striped Bands on Left Chimney -->
  <path d="M 52,50 L 66,50 L 66,56 L 52,56 Z" fill="url(#redBand)"/>
  <path d="M 52,56 L 66,56 L 66.5,62 L 51.5,62 Z" fill="#F8FAFC"/>
  <path d="M 51.5,62 L 66.5,62 L 67,68 L 51,68 Z" fill="url(#redBand)"/>
  <ellipse cx="59" cy="50" rx="7" ry="2.5" fill="#1E293B"/>

  <!-- Right Slightly Shorter Chimney -->
  <path d="M 74,56 L 86,56 L 88,78 L 72,78 Z" fill="url(#chimneyClay)"/>
  <path d="M 74,56 L 86,56 L 86,61 L 74,61 Z" fill="url(#redBand)"/>
  <path d="M 74,61 L 86,61 L 86.5,66 L 73.5,66 Z" fill="#F8FAFC"/>
  <path d="M 73.5,66 L 86.5,66 L 87,71 L 73,71 Z" fill="url(#redBand)"/>
  <ellipse cx="80" cy="56" rx="6" ry="2.2" fill="#1E293B"/>

  <!-- Green Clay Shrubs on Factory Banks -->
  <circle cx="16" cy="88" r="9" fill="#16A34A"/>
  <circle cx="24" cy="85" r="7" fill="#22C55E"/>
  <circle cx="118" cy="85" r="8" fill="#16A34A"/>
  <circle cx="126" cy="88" r="9" fill="#15803D"/>

  <!-- Polluted Murky River Foreground -->
  <path d="M 6,94 C 36,90 104,90 134,94 L 140,126 L 0,126 Z" fill="url(#murkyRiver)"/>
  <ellipse cx="70" cy="98" rx="55" ry="3.5" fill="#475569" opacity="0.4"/>

  <!-- Floating Rubber Car Tire in River -->
  <ellipse cx="94" cy="107" rx="12" ry="8" fill="url(#tireGrad)"/>
  <ellipse cx="94" cy="106" rx="6" ry="4" fill="#0F2847"/>
  <path d="M 84,106 C 88,102 100,102 104,106" stroke="#64748B" stroke-width="2" fill="none"/>
  <!-- Tire Water Ripples -->
  <ellipse cx="94" cy="111" rx="16" ry="3.5" fill="none" stroke="#64748B" stroke-width="1.2" opacity="0.6"/>

  <!-- Floating Plastic Water Bottles & Trash -->
  <!-- Bottle 1 (Left Cyan Water Bottle) -->
  <rect x="36" y="104" width="10" height="4.5" rx="2" transform="rotate(-15 41 106)" fill="#67E8F9" opacity="0.9"/>
  <rect x="34" y="104.5" width="2.5" height="3" rx="0.8" transform="rotate(-15 35 106)" fill="#2563EB"/>
  <line x1="38" y1="104.5" x2="45" y2="102.5" stroke="#FFFFFF" stroke-width="1.2" opacity="0.85"/>
  <!-- Bottle 2 (Right smaller) -->
  <rect x="58" y="108" width="9" height="4" rx="1.8" transform="rotate(20 62 110)" fill="#67E8F9" opacity="0.8"/>
  <rect x="66" y="110" width="2" height="2.5" rx="0.6" transform="rotate(20 67 111)" fill="#2563EB"/>
  <!-- Crumpled tin cans & trash bits -->
  <ellipse cx="26" cy="108" rx="4" ry="2.2" fill="#FBBF24"/>
  <ellipse cx="48" cy="113" rx="3.5" ry="1.8" fill="#CBD5E1"/>
  <ellipse cx="78" cy="112" rx="4" ry="2" fill="#F43F5E"/>
</svg>`,

  // 14. COUNTRY - 3D Isometric Floating Island (Vietnam Map Shape) with Mountains, Pagoda & Vietnam Flag
  "country": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 140">
  <defs>
    <linearGradient id="islandRock" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#92400E"/>
      <stop offset="45%" stop-color="#78350F"/>
      <stop offset="100%" stop-color="#451A03"/>
    </linearGradient>
    <linearGradient id="lushGrass" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#86EFAC"/>
      <stop offset="35%" stop-color="#22C55E"/>
      <stop offset="100%" stop-color="#15803D"/>
    </linearGradient>
    <linearGradient id="riverBlue" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#67E8F9"/>
      <stop offset="50%" stop-color="#0284C7"/>
      <stop offset="100%" stop-color="#0369A1"/>
    </linearGradient>
    <radialGradient id="pagodaRoof" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#F87171"/>
      <stop offset="40%" stop-color="#EF4444"/>
      <stop offset="85%" stop-color="#DC2626"/>
      <stop offset="100%" stop-color="#991B1B"/>
    </radialGradient>
    <linearGradient id="flagRed" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#EF4444"/>
      <stop offset="60%" stop-color="#DC2626"/>
      <stop offset="100%" stop-color="#B91C1C"/>
    </linearGradient>
    <linearGradient id="seaWater" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#38BDF8"/>
      <stop offset="50%" stop-color="#0284C7"/>
      <stop offset="100%" stop-color="#075985"/>
    </linearGradient>
    <filter id="islandShadow" x="-15%" y="-15%" width="130%" height="130%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="3.5"/>
      <feOffset dx="0" dy="6"/>
      <feBlend in="SourceGraphic" in2="blurOut" mode="normal"/>
    </filter>
  </defs>

  <!-- Ground Sea Shadow -->
  <ellipse cx="70" cy="118" rx="55" ry="14" fill="rgba(2,132,199,0.22)"/>

  <!-- Floating Island Stratified Cliff Base (Curved S-Shape of Vietnam) -->
  <path d="M 40,42 Q 62,34 94,44 Q 106,56 98,72 Q 88,82 92,94 Q 96,104 84,114 Q 68,118 52,112 Q 42,98 50,88 Q 54,76 38,62 Q 32,50 40,42 Z" fill="url(#islandRock)" filter="url(#islandShadow)"/>
  
  <!-- Coastal Turquoise Shelf -->
  <path d="M 42,40 Q 64,32 96,42 Q 108,54 100,70 Q 90,80 94,92 Q 98,102 86,112 Q 70,116 54,110 Q 44,96 52,86 Q 56,74 40,60 Q 34,48 42,40 Z" fill="url(#seaWater)"/>

  <!-- Verdant Green Top Landmass Surface (S-Curve of Vietnam) -->
  <path d="M 44,38 Q 66,30 96,40 Q 106,52 98,68 Q 88,78 92,90 Q 96,100 84,110 Q 68,114 54,108 Q 44,94 52,84 Q 56,72 40,58 Q 36,46 44,38 Z" fill="url(#lushGrass)"/>

  <!-- Mountain Ranges along Annamite Range (Truong Son) -->
  <polygon points="56,58 66,42 76,58" fill="#475569"/>
  <polygon points="62,58 70,38 78,58" fill="#64748B"/>
  <polygon points="68,44 70,38 72,44" fill="#F8FAFC"/>
  <polygon points="68,76 76,60 84,76" fill="#475569"/>

  <!-- Winding Blue River flowing through the land -->
  <path d="M 64,48 Q 58,60 66,70 Q 74,80 68,90 Q 62,100 76,108" fill="none" stroke="url(#riverBlue)" stroke-width="3" stroke-linecap="round"/>

  <!-- Miniature Green Trees on Hills -->
  <circle cx="50" cy="52" r="5" fill="#15803D"/>
  <circle cx="58" cy="48" r="4.5" fill="#22C55E"/>
  <circle cx="82" cy="56" r="4.5" fill="#15803D"/>
  <circle cx="86" cy="64" r="5.5" fill="#16A34A"/>
  <circle cx="78" cy="88" r="5" fill="#22C55E"/>
  <circle cx="62" cy="102" r="6" fill="#16A34A"/>

  <!-- Traditional Vietnamese Pagoda / Citadel Pavilion -->
  <!-- Yellow Clay Walls -->
  <rect x="46" y="66" width="16" height="12" rx="2" fill="#FEF08A" stroke="#B45309" stroke-width="0.8"/>
  <rect x="52" y="72" width="4" height="6" rx="1" fill="#78350F"/>
  <!-- Multi-Tiered Red Terracotta Tile Roof with Curved Horn Eaves -->
  <path d="M 42,66 Q 54,61 66,66 L 63,61 Q 54,58 45,61 Z" fill="url(#pagodaRoof)"/>
  <path d="M 44,61 Q 54,56 64,61 L 61,56 Q 54,53 47,56 Z" fill="url(#pagodaRoof)"/>

  <!-- Small Red-Roofed Village Houses -->
  <rect x="74" y="74" width="7" height="6" fill="#FEF08A"/>
  <polygon points="72,74 77.5,70 83,74" fill="url(#pagodaRoof)"/>
  <rect x="80" y="82" width="7" height="6" fill="#FEF08A"/>
  <polygon points="78,82 83.5,78 89,82" fill="url(#pagodaRoof)"/>

  <!-- Golden Flagpole on Mountain Peak -->
  <rect x="92" y="16" width="2.5" height="34" rx="1" fill="#F59E0B"/>
  <circle cx="93.2" cy="15" r="2.5" fill="#FDE047"/>

  <!-- Majestic National Flag of Vietnam (Waving Red Silk with Golden Star) -->
  <path d="M 94,16 Q 108,12 122,18 Q 126,26 122,34 Q 108,28 94,32 Z" fill="url(#flagRed)"/>
  <path d="M 94,16 Q 108,12 122,18" stroke="#FECACA" stroke-width="1.2" fill="none" opacity="0.6"/>
  <!-- Golden Five-Point Star at Center of Vietnam Flag -->
  <polygon points="108,19 110,23.5 114.5,23.8 111,26.8 112.2,31.2 108,28.5 103.8,31.2 105,26.8 101.5,23.8 106,23.5" fill="#FDE047"/>
</svg>`,

  // 15. FOREIGN - 3D Earth Globe with Flying White Jet Airplane, Clouds & Blue Passport
  "foreign": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 140">
  <defs>
    <radialGradient id="globeOcean" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#38BDF8"/>
      <stop offset="40%" stop-color="#0284C7"/>
      <stop offset="80%" stop-color="#0369A1"/>
      <stop offset="100%" stop-color="#0C4A6E"/>
    </radialGradient>
    <radialGradient id="landGreen" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#86EFAC"/>
      <stop offset="45%" stop-color="#22C55E"/>
      <stop offset="85%" stop-color="#15803D"/>
      <stop offset="100%" stop-color="#14532D"/>
    </radialGradient>
    <linearGradient id="planeWhite" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="60%" stop-color="#F1F5F9"/>
      <stop offset="100%" stop-color="#CBD5E1"/>
    </linearGradient>
    <linearGradient id="planeBlue" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#3B82F6"/>
      <stop offset="100%" stop-color="#1D4ED8"/>
    </linearGradient>
    <linearGradient id="passportCover" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1E3A8A"/>
      <stop offset="60%" stop-color="#172554"/>
      <stop offset="100%" stop-color="#0F172A"/>
    </linearGradient>
    <linearGradient id="goldFoil" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FEF08A"/>
      <stop offset="50%" stop-color="#FACC15"/>
      <stop offset="100%" stop-color="#CA8A04"/>
    </linearGradient>
    <filter id="softPlaneShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
      <feOffset dx="2" dy="4"/>
      <feBlend in="SourceGraphic" in2="blurOut" mode="normal"/>
    </filter>
  </defs>

  <!-- Puffy Background Clouds -->
  <ellipse cx="26" cy="62" rx="14" ry="8" fill="#F8FAFC" opacity="0.9"/>
  <circle cx="20" cy="58" r="8" fill="#F8FAFC" opacity="0.9"/>
  <ellipse cx="112" cy="38" rx="14" ry="7" fill="#F8FAFC" opacity="0.85"/>
  <circle cx="106" cy="34" r="8" fill="#F8FAFC" opacity="0.85"/>

  <!-- Flight Path Swirling Trail Around Globe -->
  <path d="M 22,76 C 18,36 82,14 116,42" fill="none" stroke="#FFFFFF" stroke-width="2.2" stroke-dasharray="5 3.5" opacity="0.8"/>

  <!-- Central 3D Clay Earth Globe Sphere -->
  <circle cx="68" cy="62" r="38" fill="url(#globeOcean)"/>
  
  <!-- 3D Clay Continents in Relief -->
  <!-- North America / Eurasia Shapes -->
  <path d="M 44,40 Q 52,34 60,38 Q 68,36 74,42 Q 70,48 62,46 Q 52,50 44,40 Z" fill="url(#landGreen)"/>
  <path d="M 76,40 Q 88,38 98,46 Q 92,54 84,52 Q 78,48 76,40 Z" fill="url(#landGreen)"/>
  <!-- Africa / South America Shapes -->
  <path d="M 64,52 Q 76,50 82,58 Q 80,72 72,78 Q 66,74 64,62 Z" fill="url(#landGreen)"/>
  <path d="M 46,58 Q 54,56 56,66 Q 52,78 44,72 Z" fill="url(#landGreen)"/>

  <!-- Specular 3D Glossy Light Arc on Ocean -->
  <ellipse cx="54" cy="42" rx="12" ry="5" transform="rotate(-30 54 42)" fill="#FFFFFF" opacity="0.45"/>
  <circle cx="48" cy="36" r="3" fill="#FFFFFF" opacity="0.7"/>

  <!-- Flying White Commercial Jet Airplane (Flying Towards Viewer) -->
  <g filter="url(#softPlaneShadow)">
    <!-- Swept Wings -->
    <polygon points="102,60 114,38 120,41 106,66" fill="url(#planeWhite)"/>
    <polygon points="84,62 68,70 66,66 82,58" fill="url(#planeWhite)"/>
    <!-- Wing Blue Tips -->
    <polygon points="114,38 120,41 117,39" fill="url(#planeBlue)"/>
    <!-- Jet Engines Under Wings -->
    <rect x="100" y="52" width="6" height="3" rx="1.5" fill="#64748B" transform="rotate(-30 100 52)"/>
    <rect x="76" y="62" width="6" height="3" rx="1.5" fill="#64748B" transform="rotate(-30 76 62)"/>
    <!-- Fuselage Main Body -->
    <ellipse cx="98" cy="56" rx="20" ry="6" transform="rotate(-32 98 56)" fill="url(#planeWhite)"/>
    <!-- Tail Fin (Rudder) -->
    <polygon points="112,46 116,36 120,38 116,48" fill="url(#planeBlue)"/>
    <!-- Cockpit Windshield (Black Glass) -->
    <ellipse cx="84" cy="65" rx="3.5" ry="2" transform="rotate(-32 84 65)" fill="#0F172A"/>
    <!-- Passenger Windows Row -->
    <circle cx="92" cy="59" r="1.1" fill="#3B82F6"/>
    <circle cx="95" cy="57" r="1.1" fill="#3B82F6"/>
    <circle cx="98" cy="55" r="1.1" fill="#3B82F6"/>
    <circle cx="101" cy="53" r="1.1" fill="#3B82F6"/>
  </g>

  <!-- Fluffy Cloud Layer in Front of Globe Base -->
  <ellipse cx="98" cy="88" rx="16" ry="9" fill="#FFFFFF" opacity="0.95"/>
  <circle cx="90" cy="84" r="9" fill="#FFFFFF" opacity="0.95"/>
  <circle cx="106" cy="85" r="8" fill="#FFFFFF" opacity="0.95"/>

  <!-- 3D Navy Blue Passport Booklet in Foreground Left -->
  <g transform="rotate(-12 52 96)">
    <!-- Passport Back Shadow & Page Thickness -->
    <rect x="36" y="77" width="34" height="46" rx="4" fill="#0F172A"/>
    <rect x="37" y="76" width="34" height="46" rx="4" fill="#F8FAFC"/>
    <!-- Passport Dark Blue Cover -->
    <rect x="35" y="75" width="34" height="46" rx="4" fill="url(#passportCover)" stroke="#3B82F6" stroke-width="0.8"/>
    <!-- Gold Embossed Text: PASSPORT -->
    <text x="52" y="85" font-family="sans-serif" font-size="4.2" font-weight="900" fill="url(#goldFoil)" text-anchor="middle" letter-spacing="0.5">PASSPORT</text>
    <!-- Gold Globe Emblem Crest -->
    <circle cx="52" cy="98" r="7" fill="none" stroke="url(#goldFoil)" stroke-width="1.2"/>
    <ellipse cx="52" cy="98" rx="7" ry="2.8" fill="none" stroke="url(#goldFoil)" stroke-width="0.9"/>
    <line x1="52" y1="91" x2="52" y2="105" stroke="url(#goldFoil)" stroke-width="0.9"/>
    <circle cx="52" cy="98" r="2" fill="url(#goldFoil)"/>
    <!-- Biometric Chip Symbol at bottom -->
    <rect x="49" y="112" width="6" height="4" rx="1" fill="none" stroke="url(#goldFoil)" stroke-width="0.8"/>
    <line x1="47" y1="114" x2="57" y2="114" stroke="url(#goldFoil)" stroke-width="0.8"/>
  </g>
</svg>`,

  // 16. CHALLENGE - 3D Mountaineer Hiker Climbing Steep Rocky Mountain to Victory Summit Flag
  "challenge": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 140">
  <defs>
    <linearGradient id="rockFacetDark" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#475569"/>
      <stop offset="60%" stop-color="#334155"/>
      <stop offset="100%" stop-color="#1E293B"/>
    </linearGradient>
    <linearGradient id="rockFacetLight" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#94A3B8"/>
      <stop offset="45%" stop-color="#64748B"/>
      <stop offset="100%" stop-color="#475569"/>
    </linearGradient>
    <linearGradient id="snowCap" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="60%" stop-color="#F1F5F9"/>
      <stop offset="100%" stop-color="#BAE6FD"/>
    </linearGradient>
    <radialGradient id="hikerJacket" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#FDE047"/>
      <stop offset="45%" stop-color="#F59E0B"/>
      <stop offset="100%" stop-color="#D97706"/>
    </radialGradient>
    <radialGradient id="backpackBlue" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#60A5FA"/>
      <stop offset="45%" stop-color="#2563EB"/>
      <stop offset="100%" stop-color="#1E3A8A"/>
    </radialGradient>
    <linearGradient id="flagRedWaving" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#EF4444"/>
      <stop offset="50%" stop-color="#DC2626"/>
      <stop offset="100%" stop-color="#991B1B"/>
    </linearGradient>
    <radialGradient id="skinTone" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#FED7AA"/>
      <stop offset="60%" stop-color="#FDBA74"/>
      <stop offset="100%" stop-color="#FB923C"/>
    </radialGradient>
    <filter id="mountainShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
      <feOffset dx="0" dy="5"/>
      <feBlend in="SourceGraphic" in2="blurOut" mode="normal"/>
    </filter>
  </defs>

  <!-- Fluffy Cloud Backdrop Behind Summit -->
  <ellipse cx="44" cy="54" rx="14" ry="7" fill="#F8FAFC" opacity="0.9"/>
  <ellipse cx="116" cy="62" rx="15" ry="7.5" fill="#F8FAFC" opacity="0.9"/>
  <circle cx="110" cy="58" r="8" fill="#F8FAFC" opacity="0.9"/>

  <!-- Mountain Ground Shadow -->
  <ellipse cx="78" cy="124" rx="54" ry="8" fill="rgba(15,23,42,0.3)"/>

  <!-- Giant Rocky Mountain Body (Multi-Faceted Granite Crags) -->
  <g filter="url(#mountainShadow)">
    <!-- Base Rocky Crags Left & Right -->
    <polygon points="46,122 72,74 96,122" fill="url(#rockFacetDark)"/>
    <polygon points="68,122 88,60 114,122" fill="url(#rockFacetLight)"/>
    <polygon points="98,122 110,84 126,122" fill="url(#rockFacetDark)"/>
    <!-- Main Summit Tower Peak -->
    <polygon points="64,96 86,40 106,96" fill="url(#rockFacetDark)"/>
    <polygon points="86,40 96,44 104,96 86,96" fill="url(#rockFacetLight)"/>
    <!-- Stratified Crevice Lines on Rock -->
    <polygon points="76,82 86,54 84,88" fill="#1E293B"/>
    <polygon points="94,70 102,52 98,78" fill="#334155"/>
    <polygon points="106,92 114,76 112,98" fill="#1E293B"/>
    <!-- Pristine Snow & Glacier Ice Cap on Highest Summit -->
    <polygon points="86,40 76,52 82,50 86,56 92,48 98,54 96,44" fill="url(#snowCap)"/>
    <polygon points="86,40 82,50 86,56" fill="#E0F2FE"/>
  </g>

  <!-- Golden Flagpole on Mountain Apex -->
  <rect x="94" y="24" width="2" height="22" rx="1" fill="#F59E0B"/>
  <circle cx="95" cy="23.5" r="2" fill="#FDE047"/>

  <!-- Red Victory Pennant Flag Flying at the Summit Peak -->
  <path d="M 96,24 Q 106,21 118,26 Q 120,33 116,40 Q 106,34 96,37 Z" fill="url(#flagRedWaving)"/>
  <path d="M 96,24 Q 106,21 118,26" stroke="#FECACA" stroke-width="1.2" fill="none"/>

  <!-- Pine / Alpine Green Bushes along Mountain Trail Base -->
  <circle cx="48" cy="116" r="6" fill="#15803D"/>
  <circle cx="56" cy="114" r="5" fill="#22C55E"/>
  <circle cx="120" cy="116" r="6" fill="#15803D"/>
  <circle cx="126" cy="118" r="5" fill="#16A34A"/>

  <!-- Mountaineer / Hiker Climbing Up to the Peak -->
  <g transform="translate(42, 60)">
    <!-- Right Leg Stepping Upwards onto Rock -->
    <rect x="18" y="34" width="7" height="13" rx="3.5" transform="rotate(-35 21 40)" fill="#78350F"/>
    <ellipse cx="27" cy="45" rx="5.5" ry="3.5" fill="#451A03"/>
    <!-- Left Leg Grounded -->
    <rect x="8" y="36" width="7" height="13" rx="3.5" transform="rotate(15 11 42)" fill="#78350F"/>
    <ellipse cx="10" cy="48" rx="5.5" ry="3.5" fill="#451A03"/>

    <!-- Trekking Stick / Hiking Pole -->
    <line x1="28" y1="28" x2="34" y2="48" stroke="#94A3B8" stroke-width="2.2" stroke-linecap="round"/>
    <circle cx="28" cy="28" r="1.8" fill="#F59E0B"/>

    <!-- Yellow-Orange Jacket Torso & Arms -->
    <ellipse cx="18" cy="24" rx="9" ry="11" fill="url(#hikerJacket)"/>
    <!-- Arm Extending Forward with Hiking Pole -->
    <path d="M 20,20 Q 26,22 28,28" stroke="url(#hikerJacket)" stroke-width="5" stroke-linecap="round" fill="none"/>
    <circle cx="28" cy="28" r="2.5" fill="url(#skinTone)"/>

    <!-- Big 3D Clay Cobalt Blue Trekking Backpack -->
    <rect x="4" y="12" width="14" height="20" rx="6" fill="url(#backpackBlue)"/>
    <!-- Top Bedroll / Sleeping Bag on Backpack -->
    <rect x="3" y="8" width="16" height="6" rx="3" fill="#0284C7"/>
    <!-- Backpack Straps & Pocket Ribbons -->
    <rect x="8" y="24" width="8" height="6" rx="2" fill="#1D4ED8"/>
    <line x1="16" y1="14" x2="20" y2="22" stroke="#1E3A8A" stroke-width="1.8"/>

    <!-- Hiker Head with Brown Hair / Mountaineering Beanie -->
    <circle cx="20" cy="12" r="6.5" fill="url(#skinTone)"/>
    <path d="M 14,12 C 14,6 26,6 26,12 Z" fill="#451A03"/>
  </g>
</svg>`,
  "police station": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <defs>
    <linearGradient id="psWall" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3B82F6"/>
      <stop offset="50%" stop-color="#1D4ED8"/>
      <stop offset="100%" stop-color="#1E3A8A"/>
    </linearGradient>
    <linearGradient id="psRoof" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#64748B"/>
      <stop offset="100%" stop-color="#334155"/>
    </linearGradient>
    <radialGradient id="sirenRed" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#FCA5A5"/>
      <stop offset="40%" stop-color="#EF4444"/>
      <stop offset="100%" stop-color="#7F1D1D"/>
    </radialGradient>
    <radialGradient id="sirenBlue" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#93C5FD"/>
      <stop offset="40%" stop-color="#3B82F6"/>
      <stop offset="100%" stop-color="#1E3A8A"/>
    </radialGradient>
    <linearGradient id="goldBadge" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FDE047"/>
      <stop offset="60%" stop-color="#EAB308"/>
      <stop offset="100%" stop-color="#CA8A04"/>
    </linearGradient>
  </defs>
  <ellipse cx="60" cy="108" rx="48" ry="7" fill="rgba(0,0,0,0.25)"/>
  <rect x="22" y="46" width="76" height="58" rx="8" fill="url(#psWall)"/>
  <rect x="18" y="38" width="84" height="12" rx="4" fill="url(#psRoof)"/>
  <rect x="46" y="68" width="28" height="36" rx="4" fill="#0F172A"/>
  <rect x="49" y="72" width="10" height="32" rx="2" fill="#67E8F9" opacity="0.85"/>
  <rect x="61" y="72" width="10" height="32" rx="2" fill="#67E8F9" opacity="0.85"/>
  <polygon points="60,48 63,55 70,55 64,59 66,66 60,62 54,66 56,59 50,55 57,55" fill="url(#goldBadge)"/>
  <rect x="48" y="32" width="24" height="6" rx="2" fill="#1E293B"/>
  <rect x="48" y="24" width="10" height="8" rx="3" fill="url(#sirenRed)"/>
  <rect x="62" y="24" width="10" height="8" rx="3" fill="url(#sirenBlue)"/>
  <circle cx="53" cy="28" r="7" fill="#EF4444" opacity="0.35"/>
  <circle cx="67" cy="28" r="7" fill="#3B82F6" opacity="0.35"/>
</svg>`,

  "fire station": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <defs>
    <linearGradient id="fsBrick" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#EF4444"/>
      <stop offset="50%" stop-color="#DC2626"/>
      <stop offset="100%" stop-color="#991B1B"/>
    </linearGradient>
    <linearGradient id="garageDoor" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FDE047"/>
      <stop offset="50%" stop-color="#EAB308"/>
      <stop offset="100%" stop-color="#CA8A04"/>
    </linearGradient>
  </defs>
  <ellipse cx="60" cy="108" rx="48" ry="7" fill="rgba(0,0,0,0.25)"/>
  <rect x="22" y="42" width="76" height="62" rx="8" fill="url(#fsBrick)"/>
  <rect x="18" y="34" width="84" height="12" rx="4" fill="#78350F"/>
  <path d="M 38,104 L 38,62 Q 60,50 82,62 L 82,104 Z" fill="#1E293B"/>
  <rect x="42" y="64" width="36" height="40" rx="3" fill="url(#garageDoor)"/>
  <line x1="42" y1="72" x2="78" y2="72" stroke="#854D0E" stroke-width="2"/>
  <line x1="42" y1="82" x2="78" y2="82" stroke="#854D0E" stroke-width="2"/>
  <line x1="42" y1="92" x2="78" y2="92" stroke="#854D0E" stroke-width="2"/>
  <rect x="54" y="22" width="12" height="12" rx="6" fill="#F59E0B"/>
  <circle cx="60" cy="20" r="3" fill="#FDE047"/>
  <rect x="88" y="88" width="8" height="14" rx="3" fill="#DC2626"/>
  <circle cx="92" cy="86" r="4" fill="#EF4444"/>
  <circle cx="92" cy="92" r="2" fill="#FDE047"/>
</svg>`,

  "bakery": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <defs>
    <linearGradient id="bakeryWall" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FEF3C7"/>
      <stop offset="50%" stop-color="#FDE68A"/>
      <stop offset="100%" stop-color="#F59E0B"/>
    </linearGradient>
    <linearGradient id="croissantGold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FBBF24"/>
      <stop offset="60%" stop-color="#D97706"/>
      <stop offset="100%" stop-color="#78350F"/>
    </linearGradient>
  </defs>
  <ellipse cx="60" cy="108" rx="48" ry="7" fill="rgba(0,0,0,0.25)"/>
  <rect x="24" y="46" width="72" height="58" rx="8" fill="url(#bakeryWall)"/>
  <path d="M 18,48 L 24,34 L 96,34 L 102,48 Q 60,54 18,48 Z" fill="#DC2626"/>
  <path d="M 32,34 L 30,49 Q 45,51 45,34 Z" fill="#FFFFFF"/>
  <path d="M 60,34 L 60,51 Q 75,51 75,34 Z" fill="#FFFFFF"/>
  <rect x="30" y="60" width="38" height="32" rx="4" fill="#78350F"/>
  <rect x="32" y="62" width="34" height="28" rx="3" fill="#FEF08A" opacity="0.9"/>
  <g transform="translate(48, 14)">
    <ellipse cx="12" cy="10" rx="14" ry="7" fill="url(#croissantGold)"/>
    <path d="M 0,10 Q 12,2 24,10" stroke="#FEF3C7" stroke-width="2" fill="none"/>
  </g>
  <rect x="74" y="64" width="16" height="38" rx="3" fill="#92400E"/>
  <rect x="76" y="68" width="12" height="14" rx="2" fill="#FEF08A" opacity="0.75"/>
</svg>`,

  "museum": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <defs>
    <linearGradient id="marbleCol" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#F1F5F9"/>
      <stop offset="40%" stop-color="#E2E8F0"/>
      <stop offset="100%" stop-color="#94A3B8"/>
    </linearGradient>
  </defs>
  <ellipse cx="60" cy="108" rx="50" ry="7" fill="rgba(0,0,0,0.25)"/>
  <rect x="18" y="98" width="84" height="7" rx="3" fill="#CBD5E1"/>
  <rect x="22" y="92" width="76" height="7" rx="2" fill="#E2E8F0"/>
  <rect x="26" y="48" width="68" height="46" rx="4" fill="#1E293B"/>
  <rect x="48" y="58" width="24" height="28" rx="3" fill="#F59E0B"/>
  <rect x="51" y="61" width="18" height="22" rx="2" fill="#0284C7"/>
  <ellipse cx="60" cy="72" rx="5" ry="6" fill="#FED7AA"/>
  <rect x="28" y="48" width="8" height="44" rx="2" fill="url(#marbleCol)"/>
  <rect x="44" y="48" width="8" height="44" rx="2" fill="url(#marbleCol)"/>
  <rect x="68" y="48" width="8" height="44" rx="2" fill="url(#marbleCol)"/>
  <rect x="84" y="48" width="8" height="44" rx="2" fill="url(#marbleCol)"/>
  <rect x="22" y="42" width="76" height="7" rx="2" fill="#E2E8F0"/>
  <polygon points="60,20 16,42 104,42" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="2"/>
  <circle cx="60" cy="33" r="5" fill="#F59E0B"/>
</svg>`,

  "market": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <defs>
    <linearGradient id="crateWood" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#D97706"/>
      <stop offset="100%" stop-color="#78350F"/>
    </linearGradient>
  </defs>
  <ellipse cx="60" cy="108" rx="48" ry="7" fill="rgba(0,0,0,0.25)"/>
  <rect x="24" y="64" width="72" height="40" rx="6" fill="url(#crateWood)"/>
  <line x1="24" y1="76" x2="96" y2="76" stroke="#451A03" stroke-width="2"/>
  <line x1="24" y1="88" x2="96" y2="88" stroke="#451A03" stroke-width="2"/>
  <rect x="28" y="58" width="28" height="14" rx="3" fill="#B45309"/>
  <circle cx="35" cy="56" r="4.5" fill="#EF4444"/>
  <circle cx="42" cy="55" r="4.5" fill="#DC2626"/>
  <circle cx="49" cy="56" r="4.5" fill="#EF4444"/>
  <rect x="64" y="58" width="28" height="14" rx="3" fill="#B45309"/>
  <circle cx="71" cy="56" r="4.5" fill="#FACC15"/>
  <circle cx="78" cy="55" r="4.5" fill="#EAB308"/>
  <circle cx="85" cy="56" r="4.5" fill="#FACC15"/>
  <rect x="26" y="32" width="4" height="36" fill="#78350F"/>
  <rect x="90" y="32" width="4" height="36" fill="#78350F"/>
  <polygon points="60,18 16,36 104,36" fill="#EF4444"/>
  <polygon points="45,24 35,36 55,36" fill="#FFFFFF"/>
  <polygon points="75,24 65,36 85,36" fill="#FFFFFF"/>
</svg>`,

  "egg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <defs>
    <radialGradient id="eggGloss" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="25%" stop-color="#FEF3C7"/>
      <stop offset="70%" stop-color="#FDE68A"/>
      <stop offset="100%" stop-color="#D97706"/>
    </radialGradient>
  </defs>
  <ellipse cx="60" cy="104" rx="40" ry="8" fill="rgba(0,0,0,0.22)"/>
  <ellipse cx="60" cy="92" rx="44" ry="14" fill="#B45309"/>
  <path d="M 20,92 Q 60,105 100,92" stroke="#F59E0B" stroke-width="4" fill="none"/>
  <path d="M 24,88 Q 60,98 96,88" stroke="#FCD34D" stroke-width="3" fill="none"/>
  <path d="M 60,18 C 82,18 90,62 90,78 C 90,94 76,100 60,100 C 44,100 30,94 30,78 C 30,62 38,18 60,18 Z" fill="url(#eggGloss)"/>
  <ellipse cx="50" cy="38" rx="8" ry="12" fill="#FFFFFF" opacity="0.75" transform="rotate(-15 50 38)"/>
</svg>`,

  "thirsty": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <defs>
    <linearGradient id="glassDrink" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38BDF8"/>
      <stop offset="50%" stop-color="#0284C7"/>
      <stop offset="100%" stop-color="#0369A1"/>
    </linearGradient>
  </defs>
  <ellipse cx="60" cy="108" rx="36" ry="7" fill="rgba(0,0,0,0.22)"/>
  <path d="M 40,36 L 46,102 Q 60,106 74,102 L 80,36 Z" fill="rgba(224,242,254,0.3)" stroke="#BAE6FD" stroke-width="2.5"/>
  <path d="M 42,50 L 46,100 Q 60,104 74,100 L 78,50 Z" fill="url(#glassDrink)" opacity="0.9"/>
  <rect x="50" y="54" width="12" height="12" rx="2" fill="#FFFFFF" opacity="0.7"/>
  <rect x="62" y="64" width="11" height="11" rx="2" fill="#FFFFFF" opacity="0.7"/>
  <path d="M 56,86 L 68,26 L 82,14" stroke="#EF4444" stroke-width="5" stroke-linecap="round" fill="none"/>
  <path d="M 56,86 L 68,26 L 82,14" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round" stroke-dasharray="6 6" fill="none"/>
  <circle cx="38" cy="36" r="12" fill="#FACC15" stroke="#FEF08A" stroke-width="2"/>
  <circle cx="38" cy="36" r="9" fill="#FEF08A"/>
</svg>`,

  "nurse": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <defs>
    <radialGradient id="nurseHead" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#FED7AA"/>
      <stop offset="60%" stop-color="#FDBA74"/>
      <stop offset="100%" stop-color="#FB923C"/>
    </radialGradient>
  </defs>
  <ellipse cx="60" cy="108" rx="36" ry="6" fill="rgba(0,0,0,0.2)"/>
  <path d="M 38,76 Q 60,68 82,76 L 86,106 Q 60,110 34,106 Z" fill="#0D9488"/>
  <circle cx="60" cy="52" r="22" fill="url(#nurseHead)"/>
  <circle cx="52" cy="52" r="2.5" fill="#1E293B"/>
  <circle cx="68" cy="52" r="2.5" fill="#1E293B"/>
  <path d="M 54,60 Q 60,66 66,60" stroke="#C2410C" stroke-width="2" stroke-linecap="round" fill="none"/>
  <path d="M 42,34 Q 60,26 78,34 L 74,44 L 46,44 Z" fill="#FFFFFF"/>
  <rect x="58" y="32" width="4" height="10" fill="#EF4444"/>
  <rect x="55" y="35" width="10" height="4" fill="#EF4444"/>
  <path d="M 46,68 Q 60,90 74,68" stroke="#38BDF8" stroke-width="3" fill="none"/>
  <circle cx="60" cy="82" r="4.5" fill="#CBD5E1" stroke="#0284C7" stroke-width="1.5"/>
</svg>`,

  "gardening": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <defs>
    <linearGradient id="potTerra" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FB923C"/>
      <stop offset="50%" stop-color="#EA580C"/>
      <stop offset="100%" stop-color="#9A3412"/>
    </linearGradient>
  </defs>
  <ellipse cx="60" cy="108" rx="40" ry="7" fill="rgba(0,0,0,0.22)"/>
  <polygon points="40,70 80,70 74,104 46,104" fill="url(#potTerra)"/>
  <rect x="36" y="64" width="48" height="8" rx="3" fill="#C2410C"/>
  <ellipse cx="60" cy="66" rx="20" ry="4" fill="#451A03"/>
  <line x1="60" y1="66" x2="60" y2="38" stroke="#16A34A" stroke-width="4" stroke-linecap="round"/>
  <ellipse cx="52" cy="52" rx="6" ry="3" fill="#22C55E" transform="rotate(-20 52 52)"/>
  <ellipse cx="68" cy="48" rx="6" ry="3" fill="#22C55E" transform="rotate(20 68 48)"/>
  <circle cx="60" cy="32" r="10" fill="#78350F" stroke="#FACC15" stroke-width="6"/>
  <g transform="translate(80, 68) rotate(25)">
    <rect x="0" y="0" width="4" height="16" rx="2" fill="#F59E0B"/>
    <path d="M -3,14 L 7,14 L 2,26 Z" fill="#94A3B8"/>
  </g>
</svg>`,

  "energy": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <defs>
    <linearGradient id="battCyan" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38BDF8"/>
      <stop offset="50%" stop-color="#06B6D4"/>
      <stop offset="100%" stop-color="#0891B2"/>
    </linearGradient>
  </defs>
  <ellipse cx="60" cy="108" rx="38" ry="7" fill="rgba(0,0,0,0.25)"/>
  <rect x="36" y="32" width="48" height="72" rx="14" fill="#0F172A" stroke="#38BDF8" stroke-width="3"/>
  <rect x="52" y="24" width="16" height="8" rx="4" fill="#F59E0B"/>
  <rect x="42" y="46" width="36" height="52" rx="8" fill="url(#battCyan)"/>
  <polygon points="64,48 50,68 62,68 56,88 72,64 60,64" fill="#FEF08A" stroke="#F59E0B" stroke-width="1.5"/>
  <circle cx="60" cy="68" r="32" stroke="#22D3EE" stroke-width="2" fill="none" stroke-dasharray="6 6" opacity="0.6"/>
</svg>`,

  "gravity": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <defs>
    <radialGradient id="gravApple" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#FCA5A5"/>
      <stop offset="40%" stop-color="#EF4444"/>
      <stop offset="100%" stop-color="#991B1B"/>
    </radialGradient>
  </defs>
  <ellipse cx="60" cy="108" rx="44" ry="7" fill="rgba(0,0,0,0.25)"/>
  <path d="M 10,22 Q 50,30 90,20" stroke="#78350F" stroke-width="7" stroke-linecap="round" fill="none"/>
  <circle cx="35" cy="24" r="6" fill="#22C55E"/>
  <circle cx="45" cy="20" r="5" fill="#16A34A"/>
  <path d="M 60,40 L 60,70" stroke="#38BDF8" stroke-width="3" stroke-dasharray="4 4" stroke-linecap="round"/>
  <polygon points="60,82 54,72 66,72" fill="#0284C7"/>
  <ellipse cx="60" cy="88" rx="15" ry="14" fill="url(#gravApple)"/>
  <path d="M 60,76 Q 63,70 66,68" stroke="#78350F" stroke-width="2.5" stroke-linecap="round" fill="none"/>
  <ellipse cx="65" cy="70" rx="4" ry="2" fill="#22C55E" transform="rotate(-30 65 70)"/>
  <ellipse cx="60" cy="104" rx="24" ry="4" stroke="#38BDF8" stroke-width="1.5" fill="none" opacity="0.7"/>
</svg>`,

  "future": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <defs>
    <radialGradient id="botHead" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="50%" stop-color="#E2E8F0"/>
      <stop offset="100%" stop-color="#94A3B8"/>
    </radialGradient>
  </defs>
  <ellipse cx="60" cy="108" rx="36" ry="7" fill="rgba(0,0,0,0.25)"/>
  <rect x="34" y="32" width="52" height="44" rx="18" fill="url(#botHead)" stroke="#CBD5E1" stroke-width="2"/>
  <rect x="40" y="42" width="40" height="16" rx="8" fill="#0F172A"/>
  <circle cx="48" cy="50" r="3.5" fill="#22D3EE"/>
  <circle cx="72" cy="50" r="3.5" fill="#22D3EE"/>
  <rect x="58" y="18" width="4" height="14" fill="#64748B"/>
  <circle cx="60" cy="16" r="4.5" fill="#F59E0B"/>
  <rect x="44" y="78" width="32" height="22" rx="8" fill="#475569"/>
  <ellipse cx="60" cy="100" rx="12" ry="4" fill="#38BDF8" opacity="0.8"/>
</svg>`,

};
