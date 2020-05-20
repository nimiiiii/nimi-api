workflow "Glitch Deployment" {
    on = "push"
    resolves = ["glitch-tools/sync-glitch-github-action@master"]
}

action "glitch-tools/sync-glitch-github-action@master" {
  uses = "glitch-tools/sync-glitch-github-action@master"
  secrets = ["GLITCH_PROJECT_ID", "GLITCH_TOKEN"]
}