import Ship from "lib/models/ships/model.ship";
import { is } from "uvu/assert";
import { suite } from "uvu";

const $: uvu.Test<Record<string, any>> = suite("sample test");

$("should request some ship info", async () => {
    const ship = new Ship(10701, 1);
    ship.setResolverDefaults(process.env.GITHUB_TOKEN, process.env.REMOTE_REPO, "en");

    await ship.run();

    is((ship as any).name, "Langley");
});

$.run();