function buildInsideBase(entity, utils) /* Code[] */ {
  return [
    '',
    `public static buildOne<ENTITY extends ${entity._strings.entityClass}Base>(`,
    `  this: EntityConstructor<${entity.model}, Context, ENTITY>,`,
    `  model: Partial<${entity.model}>,`,
    '  context: Context,',
    '): ENTITY {',
    `  return (this as any).fromOne({`,
    ...entity.fields
      .filter(utils.isPrimitiveField)
      .map((field) => {
        const fieldName = field.aliasOf ?? field.name;
        if (utils.isNullableField(field)) {
          return `${fieldName}: null,`;
        } else if (utils.isArrayField(field)) {
          return `${fieldName}: [],`;
        }
        switch (field._strings.fieldClass) {
          case 'bigint':
            return `${fieldName}: BigInt(0),`;
          case 'boolean':
            return `${fieldName}: false,`;
          case 'number':
            return `${fieldName}: 0,`;
          case 'string':
            return `${fieldName}: '',`;
          case 'Date':
            return `${fieldName}: new Date(),`;
          default:
            return `${fieldName}: {} as any,`;
        }
      })
      .map((s) => `    ${s}`),
    '    ...model,',
    '  }, context);',
    '}',
  ];
}

function augmentOne(entity, utils, isVerbose) /* void */ {
  if (isVerbose) {
    console.log(`[plugins/airent/BUILDER/INFO] augmenting ${entity.name}`);
  }

  // const insideBase = buildInsideBase(entity, utils);
  // entity._code.insideBase.push(...insideBase);
}

function augment(data, isVerbose) {
  const { entityMap, utils } = data;
  Object.values(entityMap).forEach((entity) =>
    augmentOne(entity, utils, isVerbose)
  );
}

module.exports = { augment };
