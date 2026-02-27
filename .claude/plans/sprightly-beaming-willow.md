# Gmail MCP Re-auth + AI Workshop Message

## Context
Gmail MCP "Login Required" — refresh tokens expirés (GCP OAuth Testing mode, 7-day limit).
Objectif : ré-auth Gmail → rechercher emails "hoji" → préparer message à Stéphane & JC sur le workshop IA mardi 3 mars PM.

## Résultat
**Status: Complété ✓**
Draft créé dans Gmail rodolphe, dans le thread existant "Claude x Hoji". Prêt à relire et envoyer.

## Progression
✓ Gmail re-auth — rodlecoent + rodolphe (OAuth flow complété pour les 2 comptes)
✓ Recherche "hoji" — 10 emails trouvés (thread "Claude x Hoji", rodolphe account)
✓ Contexte reconstitué — démo 6 fév → JC bloque 3 mars PM le 13 fév, attend use cases
✓ Draft créé (ID: r-4912783213965777119, threadId: 19c1f30244f81120)
  → To: stephane@hojiventures.com + jc@hojiventures.com
  → Programme 4 blocs, 4 questions (use cases/participants/salle/heure), Raycast, 750€ HT

## Learnings
- `mcp__gmail__draft_email` : le tool `to` attend un array → doit être chargé via ToolSearch avant appel
- Gmail MCP auth : `node dist/index.js auth` avec GMAIL_OAUTH_PATH + GMAIL_CREDENTIALS_PATH
- Tokens GCP Testing mode expirent tous les 7 jours → long-term fix = publish app (Testing → Production)

## Next Steps
► Relire draft dans Gmail et envoyer
► Long-term : GCP OAuth → publish app (Testing → Production) pour éviter re-auth hebdomadaire
