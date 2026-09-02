/**
 * Design QA helper: drives a local Chrome to capture the site at phone and
 * desktop widths. Not part of the app — run with `node scripts/shoot.mjs`.
 */
import puppeteer from "puppeteer-core";
import { mkdirSync } from "fs";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const BASE = process.env.BASE_URL ?? "http://localhost:4010";
// Outside the project on purpose: writing into the repo makes the dev server
// recompile and reload the page between every shot.
const OUT = process.env.SHOT_DIR ?? "/tmp/wedding-shots";
const only = process.argv[2];

mkdirSync(OUT, { recursive: true });

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ["--no-sandbox", "--hide-scrollbars", "--force-device-scale-factor=2"],
});

async function shoot(name, { width, height, steps, reducedMotion }) {
  const page = await browser.newPage();
  await page.setViewport({ width, height, deviceScaleFactor: 2 });
  if (reducedMotion) {
    await page.emulateMediaFeatures([
      { name: "prefers-reduced-motion", value: "reduce" },
    ]);
  }
  await page.goto(BASE, { waitUntil: "networkidle2" });
  await wait(1400);
  await steps(page, name);
  await page.close();
}

const capture = (page, file) => page.screenshot({ path: `${OUT}/${file}.png` });

async function enterSite(page) {
  // Skip the envelope so the page below can be measured.
  const skipped = await page.evaluate(() => {
    const buttons = [...document.querySelectorAll("button")];
    const skip = buttons.find((b) => /skip intro/i.test(b.textContent ?? ""));
    if (skip) {
      skip.click();
      return true;
    }
    return false;
  });
  if (!skipped) throw new Error("Skip button not found");
  await wait(1200);
}

const jobs = {
  async mobile() {
    await shoot("mobile", {
      width: 390,
      height: 844,
      steps: async (page) => {
        await capture(page, "m-01-envelope");
        await page.evaluate(() => {
          const b = [...document.querySelectorAll("button")].find((x) =>
            /open invitation/i.test(x.textContent ?? ""),
          );
          b?.click();
        });
        await wait(900);
        await capture(page, "m-02-envelope-opening");
        await wait(1400);
        await capture(page, "m-02b-card");
        await wait(2600);
        await capture(page, "m-03-hero");

        const sections = ["story", "wedding", "rsvp", "aso-ebi", "dress-code", "gallery", "registry", "faq", "contact"];
        for (const id of sections) {
          await page.evaluate((sectionId) => {
            document.getElementById(sectionId)?.scrollIntoView({ block: "start" });
          }, id);
          await wait(1500);
          await capture(page, `m-${id}`);
        }
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await wait(1400);
        await capture(page, "m-footer");
      },
    });
  },

  async desktop() {
    await shoot("desktop", {
      width: 1440,
      height: 900,
      steps: async (page) => {
        await capture(page, "d-01-envelope");
        await enterSite(page);
        await capture(page, "d-02-hero");
        const sections = ["story", "wedding", "rsvp", "aso-ebi", "dress-code", "gallery", "registry", "faq"];
        for (const id of sections) {
          await page.evaluate((sectionId) => {
            document.getElementById(sectionId)?.scrollIntoView({ block: "start" });
          }, id);
          await wait(1500);
          await capture(page, `d-${id}`);
        }
      },
    });
  },

  async tablet() {
    await shoot("tablet", {
      width: 820,
      height: 1180,
      steps: async (page) => {
        await capture(page, "t-01-envelope");
        await enterSite(page);
        await capture(page, "t-02-hero");
        for (const id of ["wedding", "rsvp", "registry", "dress-code"]) {
          await page.evaluate((sectionId) => {
            document.getElementById(sectionId)?.scrollIntoView({ block: "start" });
          }, id);
          await wait(1500);
          await capture(page, `t-${id}`);
        }
      },
    });
  },

  async reduced() {
    await shoot("reduced", {
      width: 390,
      height: 844,
      reducedMotion: true,
      steps: async (page) => {
        await capture(page, "rm-01-envelope");
        await page.evaluate(() => {
          const b = [...document.querySelectorAll("button")].find((x) =>
            /open invitation/i.test(x.textContent ?? ""),
          );
          b?.click();
        });
        await wait(1800);
        await capture(page, "rm-02-hero");
      },
    });
  },

  async rsvp() {
    await shoot("rsvp", {
      width: 390,
      height: 844,
      steps: async (page) => {
        await enterSite(page);
        await page.evaluate(() => document.getElementById("rsvp")?.scrollIntoView({ block: "start" }));
        await wait(1000);
        await page.type("#rsvp-fullName", "Chidera Okeke");
        await page.type("#rsvp-contact", "0803 555 1212");
        await page.evaluate(() => {
          const yes = [...document.querySelectorAll("button")].find((b) =>
            /Yes, I'll be there/i.test(b.textContent ?? ""),
          );
          yes?.click();
        });
        await wait(900);
        await capture(page, "r-01-filled");
        await page.evaluate(() => {
          const submit = [...document.querySelectorAll("button")].find((b) =>
            /send my rsvp/i.test(b.textContent ?? ""),
          );
          submit?.click();
        });
        await wait(2600);
        await capture(page, "r-02-confirmed");
        await page.evaluate(() => {
          document
            .querySelector("[data-rsvp-confirmation]")
            ?.scrollIntoView({ block: "center" });
        });
        await wait(1200);
        await capture(page, "r-03-reference");
      },
    });
  },
};

for (const [name, run] of Object.entries(jobs)) {
  if (only && only !== name) continue;
  await run();
  console.log(`captured: ${name}`);
}

await browser.close();
