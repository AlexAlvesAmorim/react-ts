// Aplica o alfa.ico no executável já gerado em release/win-unpacked
// Uso: node scripts/apply-icon-exe.mjs
import { rcedit } from 'rcedit'
import { existsSync, readFileSync } from 'fs'
import { resolve, join } from 'path'

const exePath = resolve('release/win-unpacked/ALFA PDF Reader.exe')
const iconPath = resolve('installer/assets/alfa.ico')

if (!existsSync(exePath)) {
  console.error('EXE nao encontrado:', exePath)
  process.exit(1)
}

const pkg = JSON.parse(readFileSync(resolve('package.json'), 'utf-8'))

console.log('Aplicando icone em:', exePath)
await rcedit(exePath, {
  icon: iconPath,
  'file-version': pkg.version,
  'product-version': pkg.version,
  'version-string': {
    ProductName: 'ALFA PDF Reader',
    FileDescription: 'ALFA PDF Reader - Visualizador PDF Profissional',
    CompanyName: 'Alex Alves Amorim',
    LegalCopyright: 'Copyright (c) 2026 Alex Alves Amorim',
    OriginalFilename: 'ALFA PDF Reader.exe',
    InternalName: 'ALFA PDF Reader',
  },
})
console.log('Icone e metadados aplicados com sucesso.')
