#Need to be running windows docker backend. 
source "docker" "win10" {
    image = "microsoft/windows:20H2"
    export_path = "image.tar"
    windows_container = "true"
}

build {
  sources = ["source.docker.win10"]
}