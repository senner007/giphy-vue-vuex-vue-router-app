workflow "ftp deploy" {
  resolves = ["FTP-Deploy-Action"]
  on = "push"
}

action "ACTION1" {
  uses = "actions/setup-node@v1"
  runs = ["sh", "-c", "npm install"] 
}

action "FTP-Deploy-Action" {
  needs = "ACTION1"
  uses = "SamKirkland/FTP-Deploy-Action@master"
  secrets = ["GITHUB_TOKEN", "FTP_SERVER", "FTP_PASSWORD", "FTP_USERNAME", "LOCAL_DIR", "REMOTE_DIR"]
}
