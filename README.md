# KRA Capital — Institutional Website

A completed, single-page, mobile-responsive institutional website for **KRA Capital**, with custom illustrations, original SVG systems graphics, navigation interactions, SEO metadata, and the approved brand copy.

## Preview locally

Requirements: Node.js 20+ and Python 3 (or any static file server).

```bash
npm ci
npm test
npm run preview
```

Open `http://localhost:8080/`.

No JavaScript framework, npm runtime libraries, external fonts, charting services, external assets, analytics trackers, or external APIs are required. The website is static and fully usable even if the enhancement JS does not run.

## GitHub source control

This distribution includes a local Git repository with an initial commit. To connect it to your GitHub account:

1. Create an empty private or public GitHub repository, suggested name `kra-capital-website`.
2. Add it as the remote and push:

   ```bash
   git remote add origin git@github.com:YOUR_ORGANIZATION/kra-capital-website.git
   git push -u origin main
   ```

Use the HTTPS remote if you do not have SSH authentication set up. GitHub credentials and repository permissions are **not included** in this deliverable.

## Cloudflare Workers deployment

The site is configured for **Cloudflare Workers Static Assets**, with the build output `dist/` defined in `wrangler.jsonc`. This follows Cloudflare's modern static hosting approach. It can be deployed to a `workers.dev` address and mapped to `kra.capital` once domain ownership and Cloudflare account access are available.

### Option A — automatic deploy from GitHub Actions (recommended)

1. In Cloudflare, create an API token with Workers Scripts edit/deploy permissions for the intended account, and identify the Cloudflare Account ID. Never commit tokens to the repository.
2. In GitHub repository **Settings → Secrets and variables → Actions**, add repository or `production` environment secrets:
   - `CLOUDFLARE_API_TOKEN`
   - `CLOUDFLARE_ACCOUNT_ID`
3. Push to `main`. `.github/workflows/deploy.yml` runs `npm test`, builds, and deploys the static assets. Pull requests are validated without deployment.
4. In Cloudflare **Workers & Pages → your Worker → Settings → Domains & Routes**, add the custom domain `kra.capital` after verifying ownership and reviewing any pre-existing website/DNS configuration. Optionally configure `www.kra.capital` to redirect to the apex domain.
5. Confirm the Worker deployment and custom-domain route are working before retiring any existing DNS or hosting configuration.

### Option B — manual first deployment

```bash
npm ci
npm test
npx wrangler login
npx wrangler deploy
```

`wrangler` is fetched when deploying (requires internet and Cloudflare authorization). You may need to select the intended account. Do not run `wrangler deploy` without understanding the target account.

Cloudflare Workers static assets docs: https://developers.cloudflare.com/workers/static-assets/

## DNS considerations

- This repository **does not modify production DNS** or current live services.
- Domain `kra.capital` is not assumed to be under any particular Cloudflare account.
- Do not overwrite existing MX, TXT, SPF, DKIM, DMARC, or other business records when connecting the apex domain.
- Any existing deployment should be backed up/reviewed before replacing it.

## SEO & analytics

- Homepage canonical: `https://kra.capital/`.
- Indexable homepage, static metadata, Open Graph preview, Twitter card, JSON-LD `Organization` and `WebSite` schema.
- `robots.txt` and `sitemap.xml` included.
- No analytics are enabled without a verified owner analytics account. Google Search Console and Cloudflare Web Analytics can be added when approved.
- Claims and disclaimer must receive owner/legal sign-off prior to publishing.

## Source layout

```
public/
  index.html         Landing page and approved content
  styles.css         Full responsive light-first design system
  main.js            Progressive enhancement, mobile menu, active navigation
  assets/            Original company logo and generated variants
  robots.txt         Search crawl rules
  sitemap.xml        Canonical sitemap
  404.html           Custom error page
  _headers           Defensive headers (supported on Pages; check Workers route behavior)
scripts/
  build.mjs          Dependency-free static build
  check.mjs          Source checks
.github/workflows/
  deploy.yml         GitHub Actions CI/CD
wrangler.jsonc       Cloudflare Workers static asset deployment config
```

## Brand and content guidelines

- Keep existing KRA Capital logo and logo proportions; never substitute an invented logo.
- Brand palette: navy `#061721`, turquoise `#18AAB7`, ice white `#f5fbfc`.
- No leader bios, investor solicitations, fund performance claims, named partners, or client CTA.
- Quantitative research into future asset classes is clearly described as exploratory rather than active trading.
- Abstract data visuals are conceptual, not actual trading data.
- Do not add a fake privacy-policy link or a contact method that has not been verified.

## Pending launch approvals

- Verify cumulative `$1B+` volume and `10+ Years` claims as approved public statements.
- Obtain business owner review of legal informational disclaimer and corporate name.
- Confirm which existing site/DNS entries will be replaced, if any.
- Authorize GitHub repository ownership/visibility and Cloudflare account/domain routing.