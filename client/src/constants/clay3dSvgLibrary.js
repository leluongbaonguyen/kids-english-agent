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
</svg>`
};
