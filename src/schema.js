import { writeFileSync } from "fs";
import { resolve } from "path";
import { readAllTypes } from "./read.js";

import * as TJS from "typescript-json-schema";

// optionally pass argument to schema generator
const settings = {
  required: true,
};

// optionally pass ts compiler options
const compilerOptions = {
  strictNullChecks: true,
};

const program = TJS.programFromConfig(resolve("tsconfig.json"));

// writeFileSync(resolve('schema/program.json'), JSON.stringify(program, null, 2))

console.log(program.getClassifiableNames());

// ... or a generator that lets us incrementally get more schemas

const generator = TJS.buildGenerator(program, settings);

// console.log(generator)

const typings = readAllTypes();

for (const type of typings) {
  const schema = generator.getSchemaForSymbol(type);
  writeFileSync(
    resolve(`schema/${type}.json`),
    JSON.stringify(schema, null, 2)
  );
}
