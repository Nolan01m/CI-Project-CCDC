//This is a Sample Topology for CCDC. 
import * as pulumi from "@pulumi/pulumi";
import * as gcp from "@pulumi/gcp";
require("./instances.ts")

//VPC & Subnets
const vpcNetwork = new gcp.compute.Network("vpc_network",
    { autoCreateSubnetworks: false, name: "nhlabs", routingMode: "REGIONAL", });

const fw = new gcp.compute.Firewall("firewall", {
    network: vpcNetwork.selfLink,
    allows: [
        {
            protocol: "tcp",
            ports: ["22", "80", "443", "8080"]
        },
    ],
    priority: 1,
    sourceRanges: ["0.0.0.0/0"],
    sourceTags: ["web"],
}, {
    parent: vpcNetwork
});

const Network_Range1 = new gcp.compute.Subnetwork("range1", {
    ipCidrRange: "172.1.240.0/24",
    region: "us-east1",
    network: vpcNetwork.id,
}, {
    parent: fw
});
const Network_Range2 = new gcp.compute.Subnetwork("range2", {
    ipCidrRange: "172.1.241.0/24",
    region: "us-east1",
    network: vpcNetwork.id,
}, {
    parent: fw
});
const Network_Range3 = new gcp.compute.Subnetwork("range3", {
    ipCidrRange: "172.1.242.0/24",
    region: "us-east1",
    network: vpcNetwork.id,
}, {
    parent: fw
});

//Adresses
const Debian_IP = new gcp.compute.Address("debian", {
    addressType: 'INTERNAL',
    address: "172.1.240.5",
    region: "us-east1",
    subnetwork: Network_Range1.id,
},
    {
        parent: Network_Range1
    });
const Phantom_IP = new gcp.compute.Address("phantom", {
    addressType: 'INTERNAL',
    address: "172.1.240.6",
    region: "us-east1",
    subnetwork: Network_Range1.id,
},
    {
        parent: Network_Range1
    });

const Ubuntu_IP = new gcp.compute.Address("ubuntu", {
    addressType: 'INTERNAL',
    address: "172.1.241.5",
    region: "us-east1",
    subnetwork: Network_Range2.id,
},
    {
        parent: Network_Range2
    });
const Win_Serv_IP = new gcp.compute.Address("winserv", {
    addressType: 'INTERNAL',
    address: "172.1.241.6",
    region: "us-east1",
    subnetwork: Network_Range2.id,
},
    {
        parent: Network_Range2
    });
const Win_81_IP = new gcp.compute.Address("win81", {
    addressType: 'INTERNAL',
    address: "172.1.241.7",
    region: "us-east1",
    subnetwork: Network_Range2.id,
},
    {
        parent: Network_Range2
    });

const Cent1_IP = new gcp.compute.Address("cent1", {
    addressType: 'INTERNAL',
    address: "172.1.242.5",
    region: "us-east1",
    subnetwork: Network_Range3.id,
},
    {
        parent: Network_Range3
    });
const Cent2_IP = new gcp.compute.Address("cent2", {
    addressType: 'INTERNAL',
    address: "172.1.242.6",
    region: "us-east1",
    subnetwork: Network_Range3.id,
},
    {
        parent: Network_Range3
    });
const Fedora_IP = new gcp.compute.Address("fedora", {
    addressType: 'INTERNAL',
    address: "172.1.242.7",
    region: "us-east1",
    subnetwork: Network_Range3.id,
},
    {
        parent: Network_Range3
    });

//Outputs
export const NR1 = Network_Range1.id;
export const IP1D = Debian_IP.id;
export const IP2D = Phantom_IP.id;

export const NR2 = Network_Range2.id;
export const IP3D = Ubuntu_IP.id;
export const IP4D = Win_Serv_IP.id;
export const IP5D = Win_81_IP.id;

export const NR3 = Network_Range3.id;
export const IP6D = Cent1_IP.id;
export const IP7D = Cent2_IP.id;
export const IP8D = Fedora_IP.id;

//export let InstanceIP2 = computeInstance1.networkInterfaces[0].accessConfigs[0].natIp;
