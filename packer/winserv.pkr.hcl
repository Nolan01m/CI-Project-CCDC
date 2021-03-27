#Need to be running windows docker backend. 
source "docker" "winserv" {
    image = "mcr.microsoft.com/windows/servercore:20H2"
    export_path = "image.tar"
    windows_container = "true"
    container_dir = "c:/app"
}

build {
  sources = ["source.docker.winserv"]
}