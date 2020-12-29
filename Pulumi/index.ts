//This is a Sample Topology for CCDC. 
import * as pulumi from "@pulumi/pulumi";
import * as gcp from "@pulumi/gcp";

//VPC & Subnets
const vpcNetwork = new gcp.compute.Network("vpc_network", { autoCreateSubnetworks: false, name:"nhlabs",});
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

//Instances
/*
const Debian_IP = new gcp.compute.Address("static", {
    address: "172.1.240.5",
    region: "us-east",
});


// Create a sample Ubuntu Instance in Pulumi
const instance1 = new gcp.compute.Instance("My-Instance", {
    name: "debian_MYSQL",
    bootDisk: {
        initializeParams: {
            image: 	"ubuntu-2004-lts",
        },
    },
    machineType: "f1-micro",
    zone: "us-east1-b",
    networkInterfaces: [{
        network: "default",
    }],
    
    

});
//Exports
*/