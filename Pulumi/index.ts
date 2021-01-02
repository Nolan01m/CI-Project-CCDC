//This is a Sample Topology for CCDC. 
import * as pulumi from "@pulumi/pulumi";
import * as gcp from "@pulumi/gcp";

//VPC & Subnets
const vpcNetwork = new gcp.compute.Network("vpc_network",
    { autoCreateSubnetworks: false, name: "nhlabs", routingMode: "REGIONAL", });

const Network_Range1 = new gcp.compute.Subnetwork("range1", {
    ipCidrRange: "172.1.240.0/24",
    region: "us-east1",
    network: vpcNetwork.id,
});
const Network_Range2 = new gcp.compute.Subnetwork("range2", {
    ipCidrRange: "172.1.241.0/24",
    region: "us-east1",
    network: vpcNetwork.id,
});
const Network_Range3 = new gcp.compute.Subnetwork("range3", {
    ipCidrRange: "172.1.242.0/24",
    region: "us-east1",
    network: vpcNetwork.id,
});

const Firewall = new gcp.compute.Firewall("firewall", {
    network: vpcNetwork.id,
    allows: [
        {
            protocol: "tcp",
            ports: [
                "22",
                "80",
                "443",
            ],
        },
        {
            protocol: "udp",
            ports: [
                "22",
                "80",
                "443",
            ],
        },
    ],
    sourceTags: ["web"],
});

//Adresses
const Debian_IP = new gcp.compute.Address("debian", {
    addressType: 'INTERNAL',
    address: "172.1.240.5",
    region: "us-east1",
    subnetwork: Network_Range1.id,
});
const Phantom_IP = new gcp.compute.Address("phantom", {
    addressType: 'INTERNAL',
    address: "172.1.240.6",
    region: "us-east1",
    subnetwork: Network_Range1.id,
});

// Create a sample Ubuntu Instance in Pulumi
const computeInstance1 = new gcp.compute.Instance("Debian", {
    name: "debiansql",
    bootDisk: {
        initializeParams: {
            image: "debian-10",
        },
    },
    machineType: "f1-micro",
    zone: "us-east1-b",
    networkInterfaces: [{
        subnetwork: Network_Range1.id,
        networkIp: Debian_IP.id,
        accessConfigs: [{}],
    }],
});

const computeInstance2 = new gcp.compute.Instance("Phantom", {
    name: "centosphantom",
    bootDisk: {
        initializeParams: {
            image: "centos-8",
        },
    },
    machineType: "f1-micro",
    zone: "us-east1-b",
    networkInterfaces: [{
        subnetwork: Network_Range1.id,
        networkIp: Phantom_IP.id,
        accessConfigs: [{}],
    }],
});

//Outputs
export const InstanceName = Phantom_IP.id;
export const InstanceIP = gcp.compute.getAddress({
    region: "us-east1",
    name: "phantom-039442a"
});
//export const InstanceIP = computeInstance1.networkInterfaces[0].accessConfigs[0].natIp;
