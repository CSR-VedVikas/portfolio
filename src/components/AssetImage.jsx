const modules = import.meta.glob("../assets/images/*", { eager: true });

const IMAGES = {};
for (const [path, mod] of Object.entries(modules)) {
  IMAGES[path.split("/").pop().toUpperCase()] = mod.default;
}

export default function AssetImage({ file, alt, ratio = "16 / 10", testid }) {
  const src = IMAGES[file.toUpperCase()];
  if (src) {
    return <img src={src} alt={alt} data-testid={testid} className="w-full h-auto border border-hairline" />;
  }
  return (
    <div
      data-testid={testid}
      role="img"
      aria-label={`Placeholder for ${file} — drop the real file into src/assets/images with this name`}
      className="w-full border border-ink/40 flex items-center justify-center bg-ink/[0.03]"
      style={{ aspectRatio: ratio }}
    >
      <span className="font-mono text-xs uppercase tracking-[0.06em] text-muted px-4 text-center">{file}</span>
    </div>
  );
}
