#This is a test shell script
wget https://apt.puppetlabs.com/puppet5-release-bionic.deb

dpkg -i puppet5-release-bionic.deb

apt update -y 

apt upgrade -y 

rm puppet5-release-bionic.deb

apt-get install puppetserver

systemctl start puppetserver
