//This is a Sample Topology for CCDC. 
import * as pulumi from "@pulumi/pulumi";
import * as gcp from "@pulumi/gcp";

// Create a sample Ubuntu Instance in Pulumi
const instance1 = new gcp.compute.Instance("My-Instance", {
    hostname: "Ubuntu.nhlabs.org",
    bootDisk: {
        initializeParams: {
            image: 	"ubuntu-2004-lts",
        },
    },
    machineType: "f1-micro",
    zone: "us-east1-b",
    networkInterfaces: [{
        accessConfigs: [{}],
    }],
    name: "nubuntu"
    

});
// Export the DNS name of the bucket
export const url = instance1.hostname;
export const ip = instance1.ipAddress;