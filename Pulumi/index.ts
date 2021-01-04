//This is a Sample Topology for CCDC. 
import * as pulumi from "@pulumi/pulumi";
import * as gcp from "@pulumi/gcp";
import * as aws from "@pulumi/aws";
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

const computeInstance3 = new aws.ec2.Instance('WinServ',{
    associatePublicIpAddress: true,
    getPasswordData: true,
    ami: "ami-0093d2a4365944361", //Server2012
    instanceType: "t2.micro",
});

const computeInstance4 = new aws.ec2.Instance('Win81',{
    associatePublicIpAddress: true,
    getPasswordData: true,
    ami: "ami-0093d2a4365944361", //Server2012 -- no-public-av-win81
    instanceType: "t2.micro",
});

const computeInstance5 = new gcp.compute.Instance("Ubuntu", {
    name: "ubuntudns",
    bootDisk: {
        initializeParams: {
            image: "ubuntu-1604-lts",
        },
    },
    machineType: "f1-micro",
    zone: "us-east1-b",
    networkInterfaces: [{
        subnetwork: Network_Range2.id,
        networkIp: Ubuntu_IP.id,
        accessConfigs: [{}],
    }],
});
const computeInstance6 = new gcp.compute.Instance("Splunk", {
    name: "centsplunk",
    bootDisk: {
        initializeParams: {
            image: "centos-7",
        },
    },
    machineType: "f1-micro",
    zone: "us-east1-b",
    networkInterfaces: [{
        subnetwork: Network_Range3.id,
        networkIp: Cent1_IP.id,
        accessConfigs: [{}],
    }],
});
const computeInstance7 = new gcp.compute.Instance("Cent-E-Comm", {
    name: "ecomm",
    bootDisk: {
        initializeParams: {
            image: "centos-7",
        },
    },
    machineType: "f1-micro",
    zone: "us-east1-b",
    networkInterfaces: [{
        subnetwork: Network_Range3.id,
        networkIp: Cent2_IP.id,
        accessConfigs: [{}],
    }],
});
const computeInstance8 = new gcp.compute.Instance("Fedora", {
    name: "webmail",
    bootDisk: {
        initializeParams: {
            image: "centos-8", //Need to add Fedora Image
        },
    },
    machineType: "f1-micro",
    zone: "us-east1-b",
    networkInterfaces: [{
        subnetwork: Network_Range3.id,
        networkIp: Fedora_IP.id,
        accessConfigs: [{}],
    }],
});

//Outputs
//export let InstanceIP2 = computeInstance1.networkInterfaces[0].accessConfigs[0].natIp;
export const ec2_inst = computeInstance3.publicIp;