import * as pulumi from "@pulumi/pulumi";

import * as resources from "@pulumi/azure-native/resources";
//import * as storage from "@pulumi/azure-native/storage";
import * as network from "@pulumi/azure-native/network";

//const config = new pulumi.Config();
//const username = config.require("jcccdc");
//const password = config.requireSecret("P@ssw0rd");

// Azure Resource Group -- Similar to a VPC
const ccdc = new resources.ResourceGroup("jc-ccdc").name;

// Create a network and subnet for all VMs.
const Virt_Network = new network.VirtualNetwork("topology-network", {
    resourceGroupName: ccdc,
    addressSpace: { addressPrefixes: ["172.20.240.0/23"] },
    subnets: [{
        name: "Internal",
        addressPrefix: "172.20.240.0/25",
    },
    {
        name: "Public",
        addressPrefix: "172.20.241.0/25",
    },
    {
        name: "User",
        addressPrefix: "172.20.242.0/25",
    }],
});
const publicIp = new network.PublicIPAddress("External Access IP", {
    resourceGroupName: ccdc,
    publicIPAllocationMethod: network.IPAllocationMethod.Dynamic,
},{parent: Virt_Network});


// Internal 172.20.240.0
// Public 172.20.241.0
// User 172.20.242.0