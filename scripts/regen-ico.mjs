// Regenera o alfa.ico com PNG embutido (32bpp com alpha)
// O formato ICO moderno suporta PNG embutido para resolucoes grandes.
// Melhorias:
//  - trim(): remove as bordas transparentes do logo (436x572 -> conteudo real)
//  - canvas quadrado com padding para o icone preencher bem o tile do Windows

import sharp from 'sharp'
import { readFileSync, writeFileSync, existsSync, copyFileSync } from 'fs'
import { resolve } from 'path'

const LOGO_PNG = resolve('installer/assets/logo.png')
const ICO_OUT = resolve('installer/assets/alfa.ico')
const ICO_BACKUP = resolve('installer/assets/alfa-previous.ico')

const SIZES = [16, 24, 32, 48, 64, 128, 256]
// Reserva ~6% de margem ao redor para o icone nao encostar nas bordas do tile
const PADDING_RATIO = 0.06

// Constroi ICO com PNGs embutidos (formato moderno do Windows Vista+)
function buildIcoFromPngs(pngBuffers, sizes) {
  const count = pngBuffers.length
  const headerSize = 6
  const dirEntrySize = 16
  const dataOffset = headerSize + count * dirEntrySize

  let totalDataSize = 0
  for (const buf of pngBuffers) {
    totalDataSize += buf.length
  }

  const ico = Buffer.alloc(dataOffset + totalDataSize)

  // ICO header
  ico.writeUInt16LE(0, 0) // Reserved
  ico.writeUInt16LE(1, 2) // Type: 1 = ICO
  ico.writeUInt16LE(count, 4) // Number of images

  let currentDataOffset = dataOffset

  for (let i = 0; i < count; i++) {
    const size = sizes[i]
    const pngBuf = pngBuffers[i]
    const entryOffset = headerSize + i * dirEntrySize

    ico.writeUInt8(size >= 256 ? 0 : size, entryOffset) // Width (0 = 256)
    ico.writeUInt8(size >= 256 ? 0 : size, entryOffset + 1) // Height (0 = 256)
    ico.writeUInt8(0, entryOffset + 2) // Color palette (0 = no palette)
    ico.writeUInt8(0, entryOffset + 3) // Reserved
    ico.writeUInt16LE(1, entryOffset + 4) // Color planes
    ico.writeUInt16LE(32, entryOffset + 6) // Bits per pixel
    ico.writeUInt32LE(pngBuf.length, entryOffset + 8) // Image data size
    ico.writeUInt32LE(currentDataOffset, entryOffset + 12) // Image data offset

    pngBuf.copy(ico, currentDataOffset)
    currentDataOffset += pngBuf.length
  }

  return ico
}

async function main() {
  if (!existsSync(LOGO_PNG)) {
    console.error('logo.png nao encontrado em installer/assets/')
    process.exit(1)
  }

  // Backup do ico anterior
  if (existsSync(ICO_OUT)) {
    copyFileSync(ICO_OUT, ICO_BACKUP)
    console.log('Backup do ico anterior: alfa-previous.ico')
  }

  console.log('Lendo logo.png...')
  const logoPng = readFileSync(LOGO_PNG)
  const meta = await sharp(logoPng).metadata()
  console.log(`   Original: ${meta.width}x${meta.height}, canais: ${meta.channels}`)

  // Remove bordas transparentes e devolve imagem "apertada" no conteudo real
  const trimmed = sharp(logoPng).trim({ threshold: 8 })
  const trimmedMeta = await trimmed
    .clone()
    .toBuffer()
    .then((b) => sharp(b).metadata())
  console.log(`   Apos trim: ${trimmedMeta.width}x${trimmedMeta.height}`)

  console.log('Gerando PNGs quadrados em multiplas resolucoes (32bpp, alpha)...')

  const pngBuffers = []
  for (const size of SIZES) {
    const pad = Math.max(1, Math.round(size * PADDING_RATIO))
    const inner = size - pad * 2

    const logoResized = await trimmed
      .clone()
      .resize(inner, inner, { fit: 'inside' })
      .png()
      .toBuffer()

    const buf = await sharp({
      create: {
        width: size,
        height: size,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      },
    })
      .composite([{ input: logoResized, gravity: 'center' }])
      .png({ compressionLevel: 9 })
      .toBuffer()

    pngBuffers.push(buf)
    console.log(`   ${size}x${size} - ${buf.length} bytes`)
  }

  console.log('Codificando ICO com PNG embutido (32bpp)...')
  const icoBuffer = buildIcoFromPngs(pngBuffers, SIZES)
  writeFileSync(ICO_OUT, icoBuffer)

  // Validacao
  const result = readFileSync(ICO_OUT)
  const imageCount = result.readUInt16LE(4)
  const valid = result[0] === 0 && result[1] === 0 && result.readUInt16LE(2) === 1

  console.log(`\nalfa.ico gerado: ${result.length} bytes, ${imageCount} imagens`)
  for (let i = 0; i < imageCount; i++) {
    const offset = 6 + i * 16
    const w = result[offset] || 256
    const h = result[offset + 1] || 256
    console.log(`   Imagem ${i}: ${w}x${h}`)
  }

  if (!valid) {
    throw new Error('ICO gerado invalido!')
  }
  console.log('\nICO valido.')
}

main().catch((err) => {
  console.error('Erro:', err.message)
  process.exit(1)
})
