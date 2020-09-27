/*
 * Copyright 2019 - 2020 Nathan Alo, Ayane Satomi, et al.
 * Licensed under the GNU General Public License v3
 * See LICENSE for details.
 */
import { Octokit } from "@octokit/rest";
import Repository from "./github.repository";

type TreeItem = {
    path: string;
    mode: string;
    type: string;
    size: number;
    sha: string;
    url: string;
}

/**
 * Represents a directory in GitHub
 */
export default class Directory {
    github: Octokit;
    repo: Repository;
    path: string;
    tree: TreeItem[];

    /**
     * 
     * @param github The GitHub API
     * @param repo The repository that instantiated the directory listing
     * @param path The relative path that leads to this directory
     * @param tree The directory listing
     */
    constructor(github: Octokit, repo: Repository, path: string, tree: TreeItem[]) {
        this.github = github;
        this.repo = repo;
        this.path = path;
        this.tree = tree;
    }

    /**
     * Obtain a file's metadata from a directory
     * @param name The file to retrieve
     */
    get(name: string) : TreeItem {
        const file = this.tree.find(f => f.path == name && f.type == "blob");
        return file ? file : null;
    }

    /**
     * Download a file from the repository
     * @param name The file to download
     */
    async download(name:string) : Promise<string> {
        const file = this.get(name);

        const blob = await this.github.git.getBlob({
            repo: this.repo.name,
            owner: this.repo.owner,
            file_sha: file.sha
        });

        // This is valid. Typescript just doesn't want it. I hate you.
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return Buffer.from(blob.data.content, blob.data.encoding).toString("utf-8");
    }
}