# Gmail Re-auth + /recap Template Fix

════════════════════════════════════════
## Context
════════════════════════════════════════
Session initiale : Gmail re-auth + draft workshop Hoji (complété).
Constat : le template `/recap` et les plans générés ne respectent pas les conventions CLAUDE.md (box-drawing, trees).
Objectif : aligner le template `/recap` sur les conventions de formatting.

════════════════════════════════════════
## Résultat
════════════════════════════════════════
**Status: En cours**
Session Gmail complétée. Fix /recap à implémenter.

════════════════════════════════════════
## Progression
════════════════════════════════════════
✓ Gmail re-auth — rodlecoent + rodolphe
✓ Draft workshop Hoji créé (thread "Claude x Hoji", ID: r-4912783213965777119)
✓ Diagnostic formatting — template vs conventions audité

════════════════════════════════════════
## Plan — Fix /recap template
════════════════════════════════════════
Fichier : `~/Code/rodlc/dotfiles/claude/commands/recap.md`

Problème : contradiction interne
├── Lignes 66-71 : prescrivent box-drawing, trees, frames
└── Lignes 36-57 : template utilise `##` markdown + `-` bullets

──── Changements ────

**1. Template sections (lignes 36-57)** → remplacer par box-drawing

Avant :
```
## Résultat
**Status: [...]**

## Progression
✓ [...]

## Next Steps
► [...]
```

Après :
```
═══════════════════════
Résultat
═══════════════════════
Status: [En cours | Complété ✓ | Bloqué ⚠]
[≤ 3 lignes]

═══════════════════════
Progression
═══════════════════════
✓ [completed — condense clusters > 5]
⚠ [blockers]

──── Learnings (optional) ────
├── [insight 1]
└── [insight 2]

═══════════════════════
Next Steps
═══════════════════════
► [actions restantes]
```

**2. Section Formatting (lignes 66-71)** → ajouter exemple concret

Ajouter après la liste de conventions :
```
Example output:
═══════════════════════
Résultat
═══════════════════════
Status: Complété ✓
Auth flow implémenté, 3 endpoints + tests.

═══════════════════════
Progression
═══════════════════════
✓ Auth flow — 3 endpoints + tests
✓ DB migration — users table

──── Learnings ────
├── OAuth token refresh nécessite scope offline
└── Zod validation avant MCP call

═══════════════════════
Next Steps
═══════════════════════
► Deploy staging
```

**3. Conserver** : `# Titre` en H1 markdown (compatibilité plan mode system-reminder)

════════════════════════════════════════
## Learnings
════════════════════════════════════════
├── `mcp__gmail__draft_email` `to` → array, charger via ToolSearch d'abord
├── Gmail auth : `node dist/index.js auth` + GMAIL_OAUTH_PATH/CREDENTIALS_PATH
└── GCP Testing mode → tokens 7 jours, fix = publish app

════════════════════════════════════════
## Next Steps
════════════════════════════════════════
► Appliquer les 2 changements dans `recap.md`
► Relire draft Gmail et envoyer
► Long-term : GCP OAuth Testing → Production
