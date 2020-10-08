import Ship from "lib/models/ships/model.ship";
import { is } from "uvu/assert";
import { suite } from "uvu";

const $: uvu.Test<Record<string, any>> = suite("sample test");

$("should request some ship info", async () => {
    const ship = await new Ship(10701, 1).run();
    is(ship.name, "Langley");
});

$.run();