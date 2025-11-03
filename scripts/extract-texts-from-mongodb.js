/**
 * Script para extraer todos los textos editables desde MongoDB
 * y guardarlos en formato JSON para usar en el proyecto
 * 
 * Uso: node scripts/extract-texts-from-mongodb.js
 */

const { MongoClient } = require('mongodb');
const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: '.env.local' });

// Configuración de MongoDB - Usar las mismas credenciales que sandra-vargas-editor
const MONGO_URI = process.env.MONGODB_CONNECTION_STRING || process.env.MONGODB_URI;
const DB_NAME = process.env.MONGODB_DATABASE || process.env.MONGODB_DB || 'sandra-vargas-db';

console.log('🔍 Intentando conectar a MongoDB...');
console.log('📊 Base de datos:', DB_NAME);

async function extractTexts() {
  if (!MONGO_URI) {
    console.error('❌ Error: No se encontró la cadena de conexión a MongoDB');
    console.error('Por favor, verifica que exista MONGODB_CONNECTION_STRING o MONGODB_URI en .env.local');
    process.exit(1);
  }

  const client = new MongoClient(MONGO_URI);
  
  try {
    await client.connect();
    console.log('✅ Conectado a MongoDB exitosamente');
    
    const db = client.db(DB_NAME);
    const collection = db.collection('editable_texts');
    
    // Obtener todos los textos
    console.log('📥 Extrayendo textos de la colección "editable_texts"...');
    const texts = await collection.find({}).sort({ key: 1 }).toArray();
    
    if (texts.length === 0) {
      console.log('⚠️  No se encontraron textos en la colección');
      return;
    }
    
    console.log(`✅ Se encontraron ${texts.length} textos`);
    
    // Crear objeto con formato key: value para fácil uso
    const textsObject = {};
    const textsDetailed = [];
    
    texts.forEach(text => {
      textsObject[text.key] = text.value;
      textsDetailed.push({
        key: text.key,
        value: text.value,
        page: text.page,
        component: text.component,
        lastModified: text.lastModified,
        modifiedBy: text.modifiedBy
      });
    });
    
    // Crear directorio exports si no existe
    const exportsDir = path.join(process.cwd(), 'exports');
    if (!fs.existsSync(exportsDir)) {
      fs.mkdirSync(exportsDir, { recursive: true });
    }
    
    // Generar nombre de archivo con fecha
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0].replace(/-/g, '');
    const timeStr = now.toTimeString().split(' ')[0].replace(/:/g, '');
    
    // Guardar versión simple (key: value)
    const simpleFilePath = path.join(exportsDir, `texts-simple-${dateStr}-${timeStr}.json`);
    fs.writeFileSync(simpleFilePath, JSON.stringify(textsObject, null, 2), 'utf8');
    console.log(`📄 Archivo simple guardado en: ${simpleFilePath}`);
    
    // Guardar versión detallada (con metadata)
    const detailedFilePath = path.join(exportsDir, `texts-detailed-${dateStr}-${timeStr}.json`);
    fs.writeFileSync(detailedFilePath, JSON.stringify(textsDetailed, null, 2), 'utf8');
    console.log(`📄 Archivo detallado guardado en: ${detailedFilePath}`);
    
    // Guardar versión TypeScript para usar directamente en el código
    const tsFilePath = path.join(exportsDir, `texts-export.ts`);
    const tsContent = `/**
 * Textos extraídos de MongoDB
 * Fecha de extracción: ${now.toISOString()}
 * Total de textos: ${texts.length}
 */

export const extractedTexts: { [key: string]: string } = ${JSON.stringify(textsObject, null, 2)};

export default extractedTexts;
`;
    fs.writeFileSync(tsFilePath, tsContent, 'utf8');
    console.log(`📄 Archivo TypeScript guardado en: ${tsFilePath}`);
    
    // Mostrar resumen por sección
    console.log('\n📊 Resumen por sección:');
    const sections = {};
    texts.forEach(text => {
      const section = text.key.split('.')[0];
      sections[section] = (sections[section] || 0) + 1;
    });
    
    Object.entries(sections).sort().forEach(([section, count]) => {
      console.log(`   - ${section}: ${count} textos`);
    });
    
    console.log('\n✅ Extracción completada exitosamente!');
    
  } catch (error) {
    console.error('❌ Error durante la extracción:', error);
    process.exit(1);
  } finally {
    await client.close();
    console.log('🔌 Conexión cerrada');
  }
}

// Ejecutar extracción
extractTexts().catch(error => {
  console.error('❌ Error fatal:', error);
  process.exit(1);
});

