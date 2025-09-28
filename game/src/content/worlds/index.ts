import type { WorldDefinition } from "../../types/app";
import { electromagnetismWorld } from "./electromagnetism";
import { mechanicsWorld } from "./mechanics";

export const worldsCatalog: WorldDefinition[] = [electromagnetismWorld, mechanicsWorld];

export const worldsById = Object.fromEntries(worldsCatalog.map((world) => [world.id, world]));
