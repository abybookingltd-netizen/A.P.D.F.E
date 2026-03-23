// scripts/convert-heic.js
import heicConvert from 'heic-convert'
import fs from 'fs'
import path from 'path'

function findHEIC(dir) {
  let results = []
  for (const file of fs.readdirSync(dir)) {
    const full = path.join(dir, file)
    if (fs.statSync(full).isDirectory()) {
      results = results.concat(findHEIC(full))
    } else if (/\.(heic|HEIC)$/.test(file)) {
      results.push(full)
    }
  }
  return results
}

const files = findHEIC('src/assets')

for (const file of files) {
  const outPath = file.replace(/\.heic$/i, '.jpg')
  const input = fs.readFileSync(file)

  const output = await heicConvert({
    buffer: input,
    format: 'JPEG',
    quality: 0.85
  })

  fs.writeFileSync(outPath, Buffer.from(output))
  fs.unlinkSync(file) // delete original HEIC
  console.log(`✓ ${file} → ${outPath}`)
}

console.log('Done!')