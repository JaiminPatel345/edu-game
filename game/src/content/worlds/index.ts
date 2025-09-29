import type { WorldDefinition } from "../../types/app";
import { chemistryWorld } from "./chemistry";
import { electromagnetismWorld } from "./electromagnetism";
import { geometryWorld } from "./geometry";
import { mechanicsWorld } from "./mechanics";

export const worldsCatalog: WorldDefinition[] = [
	electromagnetismWorld,
	mechanicsWorld,
	chemistryWorld,
	geometryWorld,
];

export const worldsById = Object.fromEntries(worldsCatalog.map((world) => [world.id, world]));
