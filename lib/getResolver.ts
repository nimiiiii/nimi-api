import Repository from "./github/github.repository";
import Resolver from "./resolvers/resolver.base";

export default async function getResolver() : Promise<Resolver> {
    const [ owner, repoName ] = process.env.GITHUB_REPO.split("/");
    const repo = new Repository(process.env.GITHUB_TOKEN, owner, repoName);

    // TODO: get resolver based on model resolver type and language
    const Resolver = (await import("lib/resolvers/modules/resolver.sharefcg.en")).default;

    const resolver = new Resolver(repo);
    await resolver.init();

    return resolver;
}