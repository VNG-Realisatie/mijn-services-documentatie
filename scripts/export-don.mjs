import fs from "fs-extra";
import path from "path";
import matter from "gray-matter";

const ROOT_DIR = process.cwd();
const DIST_DON = path.join(ROOT_DIR, "dist", "don");

const SOURCE_DOCS = path.join(ROOT_DIR, "docs", "mijn-services");
const TARGET_DOCS = path.join(DIST_DON, "docs", "mijn-services");

const SOURCE_IMG = path.join(ROOT_DIR, "static", "img", "mijn-services");
const TARGET_IMG = path.join(DIST_DON, "static", "img", "mijn-services");

console.log("🚀 Start preparing DON delivery bundle...");

// 1. Clean dist/don
fs.emptyDirSync(DIST_DON);

// 2. Copy static images
if (fs.existsSync(SOURCE_IMG)) {
  fs.copySync(SOURCE_IMG, TARGET_IMG);
  console.log("✅ Static images copied to dist/don/static/img/mijn-services");
}

// 3. Filter and copy markdown files from docs/mijn-services
function copyNonDrafts(srcDir, destDir) {
  fs.ensureDirSync(destDir);
  const entries = fs.readdirSync(srcDir, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);

    if (entry.isDirectory()) {
      copyNonDrafts(srcPath, destPath);
      // Clean up empty directories if all files inside were drafts
      if (fs.readdirSync(destPath).length === 0) {
        fs.rmdirSync(destPath);
      }
    } else if (entry.name.endsWith(".md") || entry.name.endsWith(".mdx")) {
      const content = fs.readFileSync(srcPath, "utf-8");
      try {
        const parsed = matter(content);
        if (parsed.data.draft === true) {
          console.log(
            `⏩ Skipping draft: ${path.relative(SOURCE_DOCS, srcPath)}`,
          );
          continue;
        }
      } catch (err) {
        console.warn(
          `⚠️ Warning: could not parse frontmatter in ${srcPath}:`,
          err.message,
        );
      }
      fs.copyFileSync(srcPath, destPath);
    } else {
      // JSON, YAML, SVG, etc. inside docs
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

copyNonDrafts(SOURCE_DOCS, TARGET_DOCS);
console.log("✅ Filtered documentation copied to dist/don/docs/mijn-services");

console.log("🎉 DON delivery bundle ready in dist/don!");
