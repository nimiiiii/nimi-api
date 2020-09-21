const Model = require("./base");

class Story extends Model {
    constructor(name) {
        super();

        this._name = name;
    }

    async load(remote) {
        const data = await remote.get(this._name + ".json");

        this.dialogue = data.scripts.map(s => {
            const part = {};

            part.actorId = s.actor;
            part.actorName = s.actorName;
            part.text = s.say;
            part.effects = {
                sound: s.soundeffect,
                background: s.bgName,
                backgroundMusic: s.bgm
            };

            return part;
        });
    }
}

module.exports = Story;