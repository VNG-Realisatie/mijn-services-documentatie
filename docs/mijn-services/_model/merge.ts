function isObject(waarde: unknown): waarde is Record<string, unknown> {
  return waarde !== null && typeof waarde === 'object' && !Array.isArray(waarde);
}

export function voegSamen(...bronnen: unknown[]): Record<string, unknown> {
  const resultaat: Record<string, unknown> = Object.create(null);

  function voegToe(doel: Record<string, unknown>, bron: unknown, pad: string) {
    if (!isObject(bron)) {
      throw new Error(`MijnServices-model: '${pad || 'bron'}' moet een object zijn.`);
    }
    for (const [sleutel, waarde] of Object.entries(bron)) {
      const locatie = pad ? `${pad}.${sleutel}` : sleutel;
      if (Object.hasOwn(doel, sleutel)) {
        if (isObject(doel[sleutel]) && isObject(waarde)) {
          voegToe(doel[sleutel], waarde, locatie);
        } else {
          throw new Error(`MijnServices-model: dubbele definitie van '${locatie}'.`);
        }
      } else if (isObject(waarde)) {
        const onderdeel: Record<string, unknown> = Object.create(null);
        voegToe(onderdeel, waarde, locatie);
        doel[sleutel] = onderdeel;
      } else {
        doel[sleutel] = Array.isArray(waarde) ? structuredClone(waarde) : waarde;
      }
    }
  }

  for (const bron of bronnen) {
    voegToe(resultaat, bron, '');
  }
  return resultaat;
}