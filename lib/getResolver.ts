/*
 * Copyright 2019 - 2020 Nathan Alo, Ayane Satomi, et al.
 * Licensed under the GNU General Public License v3
 * See LICENSE for details.
 */
import Repository from "./github/github.repository";
import Resolver from "./resolvers/resolver.base";

export default async function getResolver() : Promise<Resolver> {
    const [ owner, repoName ] = process.env.GITHUB_REPO.split("/");
    const repo = new Repository(process.env.GITHUB_TOKEN, owner, repoName);

    // TODO: get resolver based on model resolver type and language
    const Resolver = (await import("./resolvers/modules/resolver.sharefcg.en")).default;

    const resolver = new Resolver(repo);
    await resolver.init();

    return resolver;
}