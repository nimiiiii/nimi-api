import Ship from "../lib/models/ships/model.ship";
import dotenv from "dotenv";
import getResolver from "../lib/getResolver";
import { is } from "uvu/assert";
import path from "path";
import { suite } from "uvu";

const $: uvu.Test<Record<string, any>> = suite("sample test");

// Setup process environment variables for uvu
const config = dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });
process.env.GITHUB_REPO = config.parsed.GITHUB_REPO;
process.env.GITHUB_TOKEN = config.parsed.GITHUB_TOKEN;

$("should do some math", async () => {
    is(1 + 4, 5);
});

$("should request some ship info", async () => {
    const ship = await new Ship(10701, 1).run(await getResolver());
    is(ship.name, "Langley");
});

$.run();