workflow "ftp deploy" {
  resolves = ["FTP-Deploy-Action"]
  on = "push"
}

action "FTP-Deploy-Action" {
  uses = "SamKirkland/FTP-Deploy-Action@master"
  secrets = ["GITHUB_TOKEN", "FTP_SERVER", "FTP_PASSWORD", "FTP_USERNAME", "LOCAL_DIR", "REMOTE_DIR"]
}
