const StoryRemote = require("../storyremote");

class EnStoryRemote extends StoryRemote {
    constructor(repo) {
        super("EN", repo);
    }
}

module.exports = EnStoryRemote;