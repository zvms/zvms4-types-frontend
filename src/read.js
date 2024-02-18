import { globSync } from "glob";
import { readFileSync } from "fs";

export function readAllTypes() {
  const files = globSync("types/*.ts");

  const types = [];

  function getTypes(content) {
    // starts with export
    const lines = content.split("\n");
    const types = lines.filter(
      (line) =>
        line.trim().startsWith("export interface")
    );
    const typeNames = types.map((type) => type.split(" ")[2]);
    return typeNames;
  }

  for (const file of files) {
    const content = readFileSync(file, "utf-8");
    types.push(...getTypes(content));
  }

  const typing = types.map((x) => (x.includes("<") ? x.split("<")[0] : x));

  return typing;
}
